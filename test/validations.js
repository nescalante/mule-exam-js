'use strict';

var command = require('../src/command')();
var assert = require('assert');

describe('Validations', function () {
  it('should validate range', function () {
    assert.throws(command.bind(null, '-1'));
    assert.throws(command.bind(null, '26'));
    command('25');
    command('quit');
    command('0');
    command('quit');
  });

  it('should movements between same object', function () {
    command('1');
    assert.throws(command.bind(null, 'move 1 onto 1'));
    assert.throws(command.bind(null, 'move 1 over 1'));
    assert.throws(command.bind(null, 'pile 1 onto 1'));
    assert.throws(command.bind(null, 'pile 1 over 1'));
    command('quit');
  });
});
