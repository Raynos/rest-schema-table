'use strict';

var test = require('tape');

var RestSchemaTable = require('../index.js');

test('can alloc with new', function t(assert) {
    var table = new RestSchemaTable();

    table.set('GET /foo', {
        requestSchema: {}, responseSchema: {}
    });

    assert.deepEqual(table.toJSON(), {
        'GET /foo': {
            request: {}, response: {}
        }
    });

    assert.end();
});

test('can alloc without new', function t(assert) {
    var table = RestSchemaTable();

    table.set('GET /foo', {
        requestSchema: {}, responseSchema: {}
    });

    assert.deepEqual(table.toJSON(), {
        'GET /foo': {
            request: {}, response: {}
        }
    });

    assert.end();
});

test('throws with invalid method', function t(assert) {
    var table = RestSchemaTable();

    assert.throws(function throwIt() {
        table.set('get /foo');
    }, /expected valid HTTP method/);

    assert.throws(function throwIt() {
        table.set('X-POST /foo');
    }, /expected valid HTTP method/);

    assert.doesNotThrow(function noThrow() {
        table.set('GET /foo', {
            requestSchema: {}, responseSchema: {}
        });
    });

    assert.doesNotThrow(function noThrow() {
        table.set('POST /foo', {
            requestSchema: {}, responseSchema: {}
        });
    });

    assert.end();
});

test('throws with weird parts', function t(assert) {
    var table = RestSchemaTable();

    assert.throws(function throwIt() {
        table.set('single-word');
    }, /expected only two parts/);

    assert.throws(function throwIt() {
        table.set('');
    }, /expected only two parts/);

    assert.throws(function throwIt() {
        table.set();
    }, /expected string endpoint/);

    assert.throws(function throwIt() {
        table.set('foo bar baz');
    }, /expected only two parts/);

    assert.end();
});

test('throws with invalid url pattern', function t(assert) {
    var table = RestSchemaTable();

    assert.throws(function throwIt() {
        table.set('GET /foo/*/baz');
    }, /expected \* to be trailing/);

    assert.doesNotThrow(function noThrow() {
        table.set('GET /foo/baz/*', {
            requestSchema: {}, responseSchema: {}
        });
    }, /lul/);

    assert.throws(function throwIt() {
        table.set('GET /foo/:invalid-id');
    }, /expected params to be plain word/);

    assert.doesNotThrow(function noThrow() {
        table.set('GET /foo/:valid_id', {
            requestSchema: {}, responseSchema: {}
        });
    }, /lul/);

    assert.throws(function throwIt() {
        table.set('GET no-leading/slash');
    }, /expected leading slash/);

    assert.doesNotThrow(function noThrow() {
        table.set('GET /leading/slash', {
            requestSchema: {}, responseSchema: {}
        });
    }, /lul/);

    assert.end();
});

test('can add endpoints', function t(assert) {
    var table = RestSchemaTable();

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
    var table = RestSchemaTable();

    assert.throws(function throwIt() {
        table.multiSet();
    }, /endpoint must be a string/);
    assert.end();
});

test('add throws with func', function t(assert) {
    var table = RestSchemaTable();

    assert.throws(function throwIt() {
        table.multiSet('/foo', function handler() {});
    }, /methods must be an object/);
    assert.end();
});

test('supports valid http methods', function t(assert) {
    var table = RestSchemaTable();

    table.multiSet('/foo', {
        'GET': {
            requestSchema: {},
            responseSchema: {}
        },
        'POST': {
            requestSchema: {},
            responseSchema: {}
        },
        'PUT': {
            requestSchema: {},
            responseSchema: {}
        },
        'PATCH': {
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
        'PUT /foo': {
            request: {},
            response: {}
        },
        'PATCH /foo': {
            request: {},
            response: {}
        }
    });
    assert.end();
});

test('can add multiple schemas', function t(assert) {
    var table = RestSchemaTable();
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
    var table = RestSchemaTable();

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
    var table = RestSchemaTable();

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
    var table = RestSchemaTable();

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
