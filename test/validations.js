'use strict';

var assert = require('assert');

describe('Validations', function () {
  var command;

  beforeEach(function () {
    command = require('../src/command')();
  });

  it('should quit on first attemp', function () {
    assert.doesNotThrow(command.bind(null, 'quit'));
  });

  it('should require initialization', function () {
    assert.throws(command.bind(null, 'move 0 onto 1'), /Blocks initialization is required/);
    assert.throws(command.bind(null, 'move 0 over 1'), /Blocks initialization is required/);
    assert.throws(command.bind(null, 'pile 0 onto 1'), /Blocks initialization is required/);
    assert.throws(command.bind(null, 'pile 0 over 1'), /Blocks initialization is required/);
  });

  it('should throw error if already initialized', function () {
    command('1');
    assert.throws(command.bind(null, '2'), /Blocks are already initialized/);
  });

  it('should validate min range', function () {
    assert.throws(command.bind(null, '-1'), /Unknown command/);
    assert.doesNotThrow(command.bind(null, '0'));
  });

  it('should validate max range', function () {
    assert.throws(command.bind(null, '26'), /Blocks count should be between 0 and 25/);
    assert.doesNotThrow(command.bind(null, '25'));
  });

  it('should validate if block exists', function () {
    command('1');
    assert.throws(command.bind(null, 'move 1 onto 0'), /Block does not exist/);
  });

  it('should validate movements between same object', function () {
    command('1');
    assert.throws(command.bind(null, 'move 0 onto 0'), /Block from equals block to/);
    assert.throws(command.bind(null, 'move 0 over 0'), /Block from equals block to/);
    assert.throws(command.bind(null, 'pile 0 onto 0'), /Block from equals block to/);
    assert.throws(command.bind(null, 'pile 0 over 0'), /Block from equals block to/);
  });

  it('should validate movements between same position', function () {
    command('2');
    command('move 0 onto 1');
    assert.throws(command.bind(null, 'move 0 onto 1'), /Block from position equals block to position/);
    assert.throws(command.bind(null, 'move 0 over 1'), /Block from position equals block to position/);
    assert.throws(command.bind(null, 'pile 0 onto 1'), /Block from position equals block to position/);
    assert.throws(command.bind(null, 'pile 0 over 1'), /Block from position equals block to position/);
  });

  it('should validate unknown command', function () {
    assert.throws(command.bind(null, 'unknown command'), /Unknown command/);
  });
});
