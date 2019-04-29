import test from "ava";
import { it, collect } from "./util.mjs";
import { iterableStringInterceptor } from "../src/iterable-string-interceptor.mjs";

async function* templateTransformer(expression, remainder, source, cb) {
  const m = expression.match(/^#for\s+(\w+)\s+of\s+(.*)/);

  if (m) {
    const item = m[1];
    const list = m[2].split(/\s*,\s*/);
    //console.log(item, list);
    //console.log(remainder);

    const body = [remainder];

    async function* untilEnd(expression, remainder, source, cb) {
      console.log("EXPRESSION", expression);
    }

    for await (const chunk of iterableStringInterceptor(
      source,
      untilEnd,
      "{{#end"
    )) {
      body.push(chunk);
    }

    for (const item of list) {
      yield body.join("");
    }

    yield* iterableStringInterceptor(source, templateTransformer);
  } else {
    yield expression;
  }
}

test.skip("simple template engine", async t => {
  t.is(
    await collect(
      iterableStringInterceptor(
        it(["<A>{{#for x of a,b,c}}", "-{{x}}", "{{#end}}<E>"]),
        templateTransformer
      )
    ),
    "<A>-a -b -c<E>"
  );
});
