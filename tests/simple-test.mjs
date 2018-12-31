import test from "ava";
import { iterableStringInterceptor } from "../src/iterable-string-interceptor";

async function* it(a) {
  for (const c of a) {
    yield c;
  }
}

async function* simpleTransformer(expression, remainder, source, cb) {
  yield `<<${expression}>>`;
}

async function collect(a) {
  const parts = [];
  for await (const c of a) {
    parts.push(c);
  }

  return parts.join("");
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

test("double lead in handeled by transformer", async t => {
  async function* transformer(expression, remainder, source, cb) {
    const li = expression.indexOf("{{");
    if (li >= 0) {
      const lo = remainder.indexOf("}}");
      yield `<<XXX>>`;
      cb(remainder.substring(lo + 2));
    } else {
      yield `<<${expression}>>`;
    }
  }

  t.is(
    await collect(
      iterableStringInterceptor(it(["1{{aa {{bb}} cc}}2"]), transformer)
    ),
    "1<<XXX>>2"
  );
});
