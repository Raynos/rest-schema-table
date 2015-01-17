# rest-schema-table

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

<!-- [![browser support][test-png]][test] -->

A table of contents for your REST service schema

## Example

```js
var SchemaTable = require("rest-schema-table/schema-table");

var table = SchemaTable();
table.set('/foo/:bar', {
  'GET': {
    'requestSchema': { ... },
    'responseSchema': { ... }
  }
});

console.log('obj', table.toJSON());
```

## Motivation

SchemaTable is an in memory data structure that defines the interface
    of any network server.
    
It's designed to enforce REST semantics so it will restrict you
    to defining your interface in terms of endpoints that are named
    as URL patterns and having a set of methods that are named after
    HTTP verbs.
    
The requestSchema and responseSchema are arbitrary.


## Installation

`npm install rest-schema-table`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licenced

  [build-png]: https://secure.travis-ci.org/Raynos/rest-schema-table.png
  [build]: https://travis-ci.org/Raynos/rest-schema-table
  [cover-png]: https://coveralls.io/repos/Raynos/rest-schema-table/badge.png
  [cover]: https://coveralls.io/r/Raynos/rest-schema-table
  [dep-png]: https://david-dm.org/Raynos/rest-schema-table.png
  [dep]: https://david-dm.org/Raynos/rest-schema-table
  [test-png]: https://ci.testling.com/Raynos/rest-schema-table.png
  [test]: https://ci.testling.com/Raynos/rest-schema-table
  [npm-png]: https://nodei.co/npm/rest-schema-table.png?stars&downloads
  [npm]: https://nodei.co/npm/rest-schema-table
