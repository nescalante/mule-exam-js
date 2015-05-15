'use strict';

var command = require('../src/command')();
var assert = require('assert');

describe('Phases', function () {
  var result;

  afterEach(function () {
    validatePositions(result);
    result = command('quit');
    assert.equal(result.length, 0);
  });

  it('tests first phase', function () {
    result = command('8');
    command('move 7 onto 1');
    command('move 5 onto 1');
    command('move 1 onto 6');
    command('move 4 onto 3');
    command('move 1 onto 4');
    assert.throws(command.bind(null, 'move 3 onto 1'));
    command('move 5 onto 2');
    command('move 7 onto 5');
    command('move 4 onto 5');

    assertBlocks(result, {
      0: [0],
      1: [1],
      2: [2, 5, 4],
      3: [3]
    });
  });

  it('tests second phase', function () {
    result = command('6');
    command('move 4 onto 1');
    command('move 3 onto 2');
    command('move 2 over 1');
    assert.throws(command.bind(null, 'move 4 onto 2'));
    command('move 5 over 0');
    command('move 4 over 0');

    assertBlocks(result, {
      0: [0, 5, 4],
      1: [1],
      2: [2],
      3: [3]
    });
  });

  it('tests third phase', function () {
    result = command('10');
    command('move 9 onto 1');
    command('move 8 over 1');
    command('move 7 over 1');
    command('move 6 over 1');
    assert.throws(command.bind(null, 'pile 8 onto 6'));
    command('pile 8 onto 5');
    command('move 2 over 1');
    command('move 4 over 9');
    command('pile 8 onto 9');

    assertBlocks(result, {
      0: [0],
      1: [1, 9, 8, 7, 6],
      2: [2],
      3: [3],
      4: [4],
      5: [5]
    });
  });

  it('tests fourth phase', function () {
    result = command('10');
    command('move 9 onto 1');
    command('move 8 over 1');
    command('move 7 over 1');
    command('move 6 over 1');
    assert.throws(command.bind(null, 'pile 8 over 6'));
    command('pile 8 over 5');
    command('move 2 over 1');
    command('move 4 over 9');

    assertBlocks(result, {
      0: [0],
      1: [1, 9, 2, 4],
      3: [3],
      5: [5, 8, 7, 6]
    });
  });

  function validatePositions(blocks) {
    var i = 0;
    for (; i < blocks.length; i++) {
      assert.equal(blocks[i].initialPosition, i);
    }
  }

  function assertBlocks(blocks, output) {
    Object.keys(output).forEach(function (line) {
      output[line].forEach(function (number, index) {
        assert.equal(blocks[number].currentPosition, +line);
        assert.equal(blocks[number].z, index);
      });
    });
  }
});
