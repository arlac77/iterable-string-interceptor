[![npm](https://img.shields.io/npm/v/iterable-string-interceptor.svg)](https://www.npmjs.com/package/iterable-string-interceptor)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/iterable-string-interceptor)](https://bundlephobia.com/result?p=iterable-string-interceptor)
[![downloads](http://img.shields.io/npm/dm/iterable-string-interceptor.svg?style=flat-square)](https://npmjs.org/package/iterable-string-interceptor)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/iterable-string-interceptor.svg?style=flat-square)](https://github.com/arlac77/iterable-string-interceptor/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fiterable-string-interceptor%2Fbadge&style=flat)](https://actions-badge.atrox.dev/arlac77/iterable-string-interceptor/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/iterable-string-interceptor/badge.svg)](https://snyk.io/test/github/arlac77/iterable-string-interceptor)
[![Coverage Status](https://coveralls.io/repos/arlac77/iterable-string-interceptor/badge.svg)](https://coveralls.io/github/arlac77/iterable-string-interceptor)

# iterable-string-interceptor

Intercept Iterable string - backbone for templates

<!-- skip-example -->

```javascript
import { iterableStringInterceptor } from "iterable-string-interceptor";
import { createReadStream } from "fs";

// double values inside {{}}
// {{7}} -> 14
for await (const chunk of iterableStringInterceptor(createReadStream('aFile', { encoding: "utf8" }),
async * (expression) => { yield expression * 2; }
)) {
  process.stdout.write(chunk);
}
```

```javascript
import { iterableStringInterceptor } from "iterable-string-interceptor";
import fs,{ createReadStream } from "fs";

// handle expression as to be included content {{filename}}
for await (const chunk of iterableStringInterceptor(createReadStream('aFile', { encoding: "utf8" }),
async * (expression) => { yield fs.promises.readFile(expression,{encoding: "utf8"}); }
)) {
  process.stdout.write(chunk);
}
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [ExpressionTransformer](#expressiontransformer)
    -   [Parameters](#parameters)
-   [EarlyConsumerCallback](#earlyconsumercallback)
    -   [Parameters](#parameters-1)
-   [iterableStringInterceptor](#iterablestringinterceptor)
    -   [Parameters](#parameters-2)

## ExpressionTransformer

Type: ()

### Parameters

-   `expression` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** detected expression without leadIn / leadOut
-   `remainder` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** chunk after leadOut
-   `source` **Iterable&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** original source
-   `cb` **[EarlyConsumerCallback](#earlyconsumercallback)** to be called if remainder has changed
-   `leadIn` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression entry sequence
-   `leadOut` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression exit sequence

Returns **Iterable&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** transformed source

## EarlyConsumerCallback

will be called from the ExpressionTransformer if the given remainder needs to be altered

Type: ()

### Parameters

-   `remainder` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** new remainder to be used by iterableStringInterceptor

## iterableStringInterceptor

intercept into a async iterable string source detecting lead in/outs like '{{' and '}}'
and asking a transformer for a replacement iterable string

### Parameters

-   `source` **Iterable&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 
-   `transform` **[ExpressionTransformer](#expressiontransformer)** 
-   `leadIn` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression entry sequence (optional, default `"{{"`)
-   `leadOut` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** expression exit sequence (optional, default `"}}"`)

Returns **Iterable&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** transformed source

# install

With [npm](http://npmjs.org) do:

```shell
npm install iterable-string-interceptor
```

# license

BSD-2-Clause
