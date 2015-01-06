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

    table.set('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    assert.deepEqual(table.toJSON(), {
        '/foo': {
            'GET': {
                request: {},
                response: {}
            }
        }
    });
    assert.end();
});

test('add throws without args', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.set();
    }, /endpoint must be a string/);
    assert.end();
});

test('add throws with func', function t(assert) {
    var table = SchemaTable();

    assert.throws(function throwIt() {
        table.set('/foo', function handler() {});
    }, /methods must be an object/);
    assert.end();
});

test('supports arbitrary methods', function t(assert) {
    var table = SchemaTable();

    table.set('/foo', {
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
        '/foo': {
            'GET': {
                request: {},
                response: {}
            },
            'POST': {
                request: {},
                response: {}
            },
            'X-WAT': {
                request: {},
                response: {}
            },
            'someKey': {
                request: {},
                response: {}
            }
        }
    });
    assert.end();
});

test('can add multiple schemas', function t(assert) {
    var table = SchemaTable();
    table.set('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        }
    });
    table.set('/bar', {
        'POST': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    assert.deepEqual(table.toJSON(), {
        '/foo': {
            'GET': { request: {}, response: {} }
        },
        '/bar': {
            'POST': { request: {}, response: {} }
        }
    });
    assert.end();
});

test('can get data out', function t(assert) {
    var table = SchemaTable();

    table.set('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        }
    });

    assert.deepEqual(table.toJSON(), {
        '/foo': {
            'GET': {
                request: {},
                response: {}
            }
        }
    });
    assert.end();
});
test('data that comes out is a copy', function t(assert) {
    var table = SchemaTable();

    table.set('/foo', {
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
        table.set('/foo', {
            'GET': {}
        });
    }, /requestSchema required/);
    assert.throws(function throwIt() {
        table.set('/bar', {
            'POST': { requestSchema: {} }
        });
    }, /responseSchema required/);
    assert.end();
});
