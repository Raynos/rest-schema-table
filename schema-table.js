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

proto.set = function set(endpoint, methods) {
    assert(typeof endpoint === 'string',
        'endpoint must be a string');
    assert(methods && typeof methods === 'object',
        'methods must be an object');

    var schemas = {};
    Object.keys(methods).forEach(function addSchema(key) {
        var h = methods[key];

        assert(h.requestSchema, 'requestSchema required');
        assert(h.responseSchema, 'responseSchema required');

        schemas[key] = {
            request: h.requestSchema,
            response: h.responseSchema
        };
    });
    this.table[endpoint] = schemas;
};

proto.toJSON = function toJSON() {
    return extend(this.table);
};
