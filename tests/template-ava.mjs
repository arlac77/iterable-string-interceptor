import test from "ava";
import { it, collect } from "./helpers/util.mjs";
import { iterableStringInterceptor } from "iterable-string-interceptor";

async function* templateTransformer(expression, remainder, source, cb) {
  const m = expression.match(/^#for\s+(\w+)\s+of\s+(.*)/);

  if (m) {
    const item = m[1];
    const list = m[2].split(/\s*,\s*/);

    let body = remainder;

    let stop = false;
    let extra;

    async function* untilEnd(expression, remainder, source, cb) {
      stop = true;
      extra = remainder;
    }

    for await (const chunk of iterableStringInterceptor(
      source,
      untilEnd,
      "{{#end"
    )) {
      if (!stop) {
        body += chunk;
      }
    }

    for (const item of list) {
      yield body.replace(/\{\{x\}\}/g, item);
    }

    yield extra;
    yield* iterableStringInterceptor(source, templateTransformer);
  } else {
    yield expression;
  }
}

test("simple template engine", async t => {
  t.is(
    await collect(
      iterableStringInterceptor(
        it(["<A>{{#for x of a,b,c}}", "-{{x}}", "{{#end}}<E>"]),
        templateTransformer
      )
    ),
    "<A>-a-b-c<E>"
  );
});
