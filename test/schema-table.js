'use strict';

var test = require('tape');

var SchemaTable = require('../schema-table.js');

test('optional new', function t(assert) {
    var table = SchemaTable();

    assert.deepEqual(table.toJSON(), {});
    assert.end();
});

test('works with new', function t(assert) {
    var table = new SchemaTable();

    assert.deepEqual(table.toJSON(), {});
    assert.end();
});

test('can add endpoints', function t(assert) {
    var table = SchemaTable();

    table.multiSet('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    assert.deepEqual(table.toJSON(), {
        'GET /foo': {
            request: {},
            response: {}
        }
    });
    assert.end();
});

test('add throws without args', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.multiSet();
    }, /endpoint must be a string/);
    assert.end();
});

test('add throws with func', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.multiSet('/foo', function handler() {});
    }, /methods must be an object/);
    assert.end();
});

test('supports arbitrary methods', function t(assert) {
    var table = SchemaTable();

    table.multiSet('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        },
        'POST': {
            requestSchema: {},
            responseSchema: {}
        },
        'X-WAT': {
            requestSchema: {},
            responseSchema: {}
        },
        'someKey': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    assert.deepEqual(table.toJSON(), {
        'GET /foo': {
            request: {},
            response: {}
        },
        'POST /foo': {
            request: {},
            response: {}
        },
        'X-WAT /foo': {
            request: {},
            response: {}
        },
        'someKey /foo': {
            request: {},
            response: {}
        }
    });
    assert.end();
});

test('can add multiple schemas', function t(assert) {
    var table = SchemaTable();
    table.multiSet('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        }
    });
    table.multiSet('/bar', {
        'POST': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    assert.deepEqual(table.toJSON(), {
        'GET /foo': { request: {}, response: {} },
        'POST /bar': { request: {}, response: {} }
    });
    assert.end();
});

test('can get data out', function t(assert) {
    var table = SchemaTable();

    table.multiSet('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    assert.deepEqual(table.toJSON(), {
        'GET /foo': {
            request: {},
            response: {}
        }
    });
    assert.end();
});

test('data that comes out is a copy', function t(assert) {
    var table = SchemaTable();

    table.multiSet('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    var one = table.toJSON();
    var two = table.toJSON();

    one.foo = 'bar';
    assert.equal(one.foo, 'bar');
    assert.equal(two.foo, undefined);

    assert.end();
});

test('throws assertions for missing schemas', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.multiSet('/foo', {
            'GET': {}
        });
    }, /requestSchema required/);
    assert.throws(function throwIt() {
        table.multiSet('/bar', {
            'POST': { requestSchema: {} }
        });
    }, /responseSchema required/);
    assert.end();
});

test('set can add operations', function t(assert) {
    var table = SchemaTable();

    table.set('foo', {
        requestSchema: {},
        responseSchema: {}
    });

    assert.deepEqual(table.toJSON(), {
        'foo': { request: {}, response: {} }
    });
    assert.end();
});

test('set can add operations with method', function t(assert) {
    var table = SchemaTable();

    table.set('GET foo', {
        requestSchema: {},
        responseSchema: {}
    });

    assert.deepEqual(table.toJSON(), {
        'GET foo': { request: {}, response: {} }
    });
    assert.end();
});

test('set throws without args', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.set();
    }, /endpoint must be a string/);

    assert.end();
});

test('set throws with non-object', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.set('foo', function handler() {});
    }, /schemas must be an object/);

    assert.end();
});

test('set throws without requestSchema', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.set('foo', {});
    }, /requestSchema required/);

    assert.end();
});

test('set throws without responseSchema', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.set('foo', { requestSchema: {} });
    }, /responseSchema required/);

    assert.end();
});

test('can set multiple ops', function t(assert) {
    var table = SchemaTable();

    table.set('GET foo', {
        requestSchema: {},
        responseSchema: {}
    });
    table.set('POST bar', {
        requestSchema: {},
        responseSchema: {}
    });

    assert.deepEqual(table.toJSON(), {
        'GET foo': {
            request: {},
            response: {}
        },
        'POST bar': {
            request: {},
            response: {}
        }
    });

    assert.end();
});
