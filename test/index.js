var test = require('tape');

var restSchemaTable = require('../index.js');

test('restSchemaTable is a function', function (assert) {
    assert.equal(typeof restSchemaTable, 'function');
    assert.end();
});
