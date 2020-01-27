/**
 * @typedef {()} ExpressionTransformer
 * @param {string} expression detected expression without leadIn / leadOut
 * @param {string} remainder chunk after leadOut
 * @param {Iterable<string>} source original source
 * @param {EarlyConsumerCallback} cb to be called if remainder has changed
 * @param {string} leadIn expression entry sequence
 * @param {string} leadOut expression exit sequence
 * @return {Iterable<string>} transformed source
 */

/**
 * will be called from the ExpressionTransformer if the given remainder needs to be altered
 * @typedef {()} EarlyConsumerCallback
 * @param {string} remainder new remainder to be used by iterableStringInterceptor
 */

/**
 * intercept into a async iterable string source detecting lead in/outs like '{{' and '}}'
 * and asking a transformer for a replacement iterable string
 * @param {Iterable<string>} source
 * @param {ExpressionTransformer} transform
 * @param {string} leadIn expression entry sequence
 * @param {string} leadOut expression exit sequence
 * @return {Iterable<string>} transformed source
 */
export async function* iterableStringInterceptor(
  source,
  transform,
  leadIn = "{{",
  leadOut = "}}"
) {
  let buffer;
  let inside;
  let li;

  const leadInFirst = leadIn[0];

  for await (let chunk of source) {
    if (buffer !== undefined) {
      chunk = buffer + chunk;
      buffer = undefined;
    }
    do {
      if (inside) {
        const lo = chunk.indexOf(leadOut, li + leadIn.length);
        if (lo >= 0) {
          const key = chunk.slice(li + leadIn.length, lo);
          chunk = chunk.slice(lo + leadOut.length);
          yield* transform(
            key,
            chunk,
            source,
            remainder => {
              chunk = remainder;
            },
            leadIn,
            leadOut
          );
          inside = false;
        }
      }

      li = chunk.indexOf(leadIn);
      if (li >= 0) {
        if (li > 0) {
          yield chunk.slice(0, li);
        }

        const lo = chunk.indexOf(leadOut, li + leadIn.length);

        if (lo >= 0) {
          const key = chunk.slice(li + leadIn.length, lo);
          chunk = chunk.slice(lo + leadOut.length);
          yield* transform(
            key,
            chunk,
            source,
            remainder => {
              chunk = remainder;
            },
            leadIn,
            leadOut
          );
        } else {
          inside = true;
          buffer = chunk;
          break;
        }
      } else {
        // maybe leadIn
        if (chunk.indexOf(leadInFirst) >= 0) {
          buffer = chunk;
        } else {
          yield chunk;
        }

        break;
      }
    } while (chunk.length > 0);
  }
  if (buffer != undefined) {
    yield buffer;
  }
}
