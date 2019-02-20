import test from "ava";
import { it, collect } from "./util";
import { iterableStringInterceptor } from "../src/iterable-string-interceptor";


async function* forLoopTransformer(expression, remainder, source, cb) {
}

async function* templateTransformer(expression, remainder, source, cb) {
  let m = expression.match(/^#end/);
  if(m) {
    return;
  }

  m = expression.match(/^#for\s+(\w+)\s+of\s+(.*)/);

  if (m) {
    const item = m[1];
    const list = m[2].split(/\s*,\s*/);
    //console.log(item, list);
    console.log(remainder);

    for(const item of list) {

    }

    yield *iterableStringInterceptor(source,templateTransformer);
  }
  else {
    yield expression;
  }
}

test.skip("simple template engine", async t => {
  t.is(
    await collect(
      iterableStringInterceptor(
        it(["{{#for x of a,b,c}}","-{{x}}","{{#end}}"]),
        templateTransformer
      )
    ),
    "-a -b -c"
  );
});
