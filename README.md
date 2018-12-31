[![npm](https://img.shields.io/npm/v/iterable-string-interceptor.svg)](https://www.npmjs.com/package/iterable-string-interceptor)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/iterable-string-interceptor.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/iterable-string-interceptor)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://secure.travis-ci.org/arlac77/iterable-string-interceptor.png)](http://travis-ci.org/arlac77/iterable-string-interceptor)
[![codecov.io](http://codecov.io/github/arlac77/iterable-string-interceptor/coverage.svg?branch=master)](http://codecov.io/github/arlac77/iterable-string-interceptor?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/iterable-string-interceptor/badge.svg)](https://coveralls.io/r/arlac77/iterable-string-interceptor)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/iterable-string-interceptor/badge.svg)](https://snyk.io/test/github/arlac77/iterable-string-interceptor)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/iterable-string-interceptor.svg?style=flat-square)](https://github.com/arlac77/iterable-string-interceptor/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/iterable-string-interceptor.svg?label=ready&title=Ready)](http://waffle.io/arlac77/iterable-string-interceptor)
[![Dependency Status](https://david-dm.org/arlac77/iterable-string-interceptor.svg)](https://david-dm.org/arlac77/iterable-string-interceptor)
[![devDependency Status](https://david-dm.org/arlac77/iterable-string-interceptor/dev-status.svg)](https://david-dm.org/arlac77/iterable-string-interceptor#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/iterable-string-interceptor.svg?branch=master)](http://inch-ci.org/github/arlac77/iterable-string-interceptor)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![downloads](http://img.shields.io/npm/dm/iterable-string-interceptor.svg?style=flat-square)](https://npmjs.org/package/iterable-string-interceptor)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# iterable-string-interceptor

Intercept Iterable string - backbone for templates

<!-- skip example -->

´´´js
iterableStringInterceptor(createReadStream('aFile',{ encoding:"utf8"}),
async _ (expression) => { yield expression _ 2; }
)
´´´

# API

# install

With [npm](http://npmjs.org) do:

```shell
npm install iterable-string-interceptor
```

# license

BSD-2-Clause
