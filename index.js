'use strict';

var inherits = require('inherits');
var methods = require('methods');
var assert = require('assert');

var SchemaTable = require('./schema-table.js');

var plainWordRegex = /^\w+$/;
var METHODS_HASH = methods.reduce(function buildHash(acc, k) {
    acc[k.toUpperCase()] = true;
    return acc;
}, {});

module.exports = RestSchemaTable;

function RestSchemaTable() {
    if (!(this instanceof RestSchemaTable)) {
        return new RestSchemaTable();
    }

    SchemaTable.call(this);
}

inherits(RestSchemaTable, SchemaTable);

var proto = RestSchemaTable.prototype;

proto.set = function set(endpoint, schemas) {
    assert(typeof endpoint === 'string',
        'expected string endpoint');
    var parts = endpoint.split(' ');
    assert(parts.length === 2, 'expected only two parts');
    var httpMethod = parts[0];
    var uriPattern = parts[1];

    assert(METHODS_HASH[httpMethod],
        'expected valid HTTP method');

    assertPattern(uriPattern);

    SchemaTable.prototype.set.call(this, endpoint, schemas);
};

function assertPattern(uriPattern) {
    var parts = uriPattern.split('/');

    assert(parts[0] === '', 'expected leading slash');

    parts = parts.slice(1);

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var hasSplat = part.indexOf('*') >= 0;
        var isParam = part.indexOf(':') === 0;

        if (hasSplat &&
            (part.length > 1 || i !== parts.length - 1)
        ) {
            assert(false, 'expected * to be trailing');
        }

        if (isParam && !part.slice(1).match(plainWordRegex)) {
            assert(false, 'expected params to be plain word');
        }
    }
}
