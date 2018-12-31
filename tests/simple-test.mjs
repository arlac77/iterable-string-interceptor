import test from "ava";
import { iterableStringInterceptor } from "../iterable-string-interceptor";

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

  return parts.join();
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
