'use strict';

var assert = require('assert/');
var extend = require('xtend');

module.exports = SchemaTable;

function SchemaTable() {
    if (!(this instanceof SchemaTable)) {
        return new SchemaTable();
    }

    this.table = {};
}

var proto = SchemaTable.prototype;

proto.set = function set(endpoint, schemas) {
    assert(typeof endpoint === 'string',
        'endpoint must be a string');
    assert(schemas && typeof schemas === 'object',
        'schemas must be an object');

    assert(schemas.requestSchema, 'requestSchema required');
    assert(schemas.responseSchema, 'responseSchema required');

    this.table[endpoint] = {
        request: schemas.requestSchema,
        response: schemas.responseSchema
    };
};

proto.multiSet = function multiSet(endpoint, methods) {
    assert(typeof endpoint === 'string',
        'endpoint must be a string');
    assert(methods && typeof methods === 'object',
        'methods must be an object');

    var methodNames = Object.keys(methods);

    for (var i = 0; i < methodNames.length; i++) {
        var key = methodNames[i];
        var h = methods[key];

        this.set(key + ' ' + endpoint, {
            requestSchema: h.requestSchema,
            responseSchema: h.responseSchema
        });
    }
};

proto.toJSON = function toJSON() {
    return extend(this.table);
};
