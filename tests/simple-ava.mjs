import test from "ava";
import { it, collect } from "./helpers/util.mjs";
import { iterableStringInterceptor } from "iterable-string-interceptor";

async function* nullTransformer(expression, remainder, source, cb,leadIn,leadOut) {
//  yield undefined;
  yield leadIn + expression + leadOut;
}

async function* simpleTransformer(expression, remainder, source, cb) {
  yield `<<${expression}>>`;
}

async function* doubleTransformer(expression, remainder, source, cb) {
  yield "<<";
  yield expression;
  yield "-";
  yield expression;
  yield ">>";
}

test("expressions within chunks", async t => {
  t.is(
    await collect(
      iterableStringInterceptor(
        it(["1{{aa}}2", "3{{bb}}4", "5{{cc}}67{{dd}}"]),
        simpleTransformer
      )
    ),
    "1<<aa>>23<<bb>>45<<cc>>67<<dd>>"
  );
});

test("expressions within chunks serveral transformed chunks", async t => {
  t.is(
    await collect(
      iterableStringInterceptor(
        it(["1{{aa}}2", "3{{bb}}4", "5{{cc}}67{{dd}}"]),
        doubleTransformer
      )
    ),
    "1<<aa-aa>>23<<bb-bb>>45<<cc-cc>>67<<dd-dd>>"
  );
});

test("expressions splitted between chunks", async t => {
  t.is(
    await collect(
      iterableStringInterceptor(
        it(["1{", "{a", "a}}2", "3{{bb}}4"]),
        simpleTransformer
      )
    ),
    "1<<aa>>23<<bb>>4"
  );
});

test("with ${ } lead -in/ -out", async t => {
  t.is(
    await collect(
      iterableStringInterceptor(
        it(["1{}${aa}2}", "3${bb}4", "5${cc}67${dd}"]),
        simpleTransformer,
        "${",
        "}"
      )
    ),
    "1{}<<aa>>2}3<<bb>>45<<cc>>67<<dd>>"
  );
});

test("expressions null transformer", async t => {
  const str =`   * @param {string[]} argv
  * @return {{operands: string[], unknown: string[]}}`;

  t.is(
    await collect(
      iterableStringInterceptor(
        it([str]),
        nullTransformer
      )
    ),
    str
  );
});

test("yielding several chunks", async t => {
  async function* transformer(expression) {
    for (let i = 0; i < 10; i++) {
      yield expression.toUpperCase();
    }
  }

  t.is(
    await collect(iterableStringInterceptor(it(["1{{b}}2"]), transformer)),
    "1BBBBBBBBBB2"
  );
});

test("double lead-in handled by transformer", async t => {
  async function* transformer(
    expression,
    remainder,
    source,
    cb,
    leadIn,
    leadOut
  ) {
    const li = expression.indexOf(leadIn);
    if (li >= 0) {
      const lo = remainder.indexOf(leadOut, li);
      expression += leadOut + remainder.substring(0, lo);
      yield `<<${expression}>>`;

      cb(remainder.substring(lo + leadOut.length));
    } else {
      yield `<<${expression}>>`;
    }
  }

  t.is(
    await collect(
      iterableStringInterceptor(it(["1{{aa {{bb}} cc}}2"]), transformer)
    ),
    "1<<aa {{bb}} cc>>2"
  );
});
