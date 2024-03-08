[![npm](https://img.shields.io/npm/v/iterable-string-interceptor.svg)](https://www.npmjs.com/package/iterable-string-interceptor)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript\&label\&labelColor=blue\&color=555555)](https://typescriptlang.org)
[![bundlejs](https://deno.bundlejs.com/?q=iterable-string-interceptor\&badge=detailed)](https://bundlejs.com/?q=iterable-string-interceptor)
[![downloads](http://img.shields.io/npm/dm/iterable-string-interceptor.svg?style=flat-square)](https://npmjs.org/package/iterable-string-interceptor)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/iterable-string-interceptor.svg?style=flat-square)](https://github.com/arlac77/iterable-string-interceptor/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fiterable-string-interceptor%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/iterable-string-interceptor/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/iterable-string-interceptor/badge.svg)](https://snyk.io/test/github/arlac77/iterable-string-interceptor)
[![Coverage Status](https://coveralls.io/repos/arlac77/iterable-string-interceptor/badge.svg)](https://coveralls.io/github/arlac77/iterable-string-interceptor)

# iterable-string-interceptor

Intercept Iterable string - backbone for template engines

<!-- skip-example -->

```javascript
import { iterableStringInterceptor } from "iterable-string-interceptor";
import { createReadStream } from "fs";
import { readFile } from "fs/promises";

// double values inside {{}}
// {{7}} -> 14
for await (const chunk of iterableStringInterceptor(createReadStream('aFile', { encoding: "utf8" }),
  expression => expression * 2
)) {
  process.stdout.write(chunk);
}
```

```javascript
import { iterableStringInterceptor } from "iterable-string-interceptor";
import { createReadStream } from "fs";
import { readFile } from "fs/promises";

// handle expression as to be included content {{filename}}
for await (const chunk of iterableStringInterceptor(createReadStream('aFile', { encoding: "utf8" }),
  async * (expression) => { yield readFile(expression, { encoding: "utf8" }); }
)) {
  process.stdout.write(chunk);
}
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [ExpressionTransformer](#expressiontransformer)
    *   [Parameters](#parameters)
*   [EarlyConsumerCallback](#earlyconsumercallback)
    *   [Parameters](#parameters-1)
*   [iterableStringInterceptor](#iterablestringinterceptor)
    *   [Parameters](#parameters-2)

## ExpressionTransformer

Type: function ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Iterable<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>, [EarlyConsumerCallback](#earlyconsumercallback), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)): AsyncIterable<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### Parameters

*   `expression` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** detected expression without leadIn / leadOut
*   `remainder` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** chunk after leadOut
*   `source` **Iterable<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** original source
*   `cb` **[EarlyConsumerCallback](#earlyconsumercallback)** to be called if remainder has changed
*   `leadIn` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression entry sequence
*   `leadOut` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression exit sequence

Returns **AsyncIterable<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** transformed source

## EarlyConsumerCallback

Will be called from the ExpressionTransformer if the given remainder needs to be altered.

Type: function ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)): void

### Parameters

*   `remainder` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** new remainder to be used by iterableStringInterceptor

## iterableStringInterceptor

Intercept into a async iterable string source, detecting lead in/outs like '{{' and '}}'
and asking a transformer for a replacement iterable string.

### Parameters

*   `source` **Iterable<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>**&#x20;
*   `transform` **[ExpressionTransformer](#expressiontransformer)**&#x20;
*   `leadIn` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression entry sequence (optional, default `"{{"`)
*   `leadOut` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression exit sequence (optional, default `"}}"`)

Returns **AsyncIterable<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** transformed source

# install

With [npm](http://npmjs.org) do:

```shell
npm install iterable-string-interceptor
```

# license

BSD-2-Clause
