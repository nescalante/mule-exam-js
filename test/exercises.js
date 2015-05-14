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

    assert.equal(result[0].currentPosition, 0);
    assert.equal(result[0].z, 0);
    assert.equal(result[1].currentPosition, 1);
    assert.equal(result[1].z, 0);
    assert.equal(result[2].currentPosition, 2);
    assert.equal(result[2].z, 0);
    assert.equal(result[3].currentPosition, 3);
    assert.equal(result[3].z, 0);
    assert.equal(result[4].currentPosition, 2);
    assert.equal(result[4].z, 2);
    assert.equal(result[5].currentPosition, 2);
    assert.equal(result[5].z, 1);
    assert.equal(result[6].currentPosition, 6);
    assert.equal(result[6].z, 0);
    assert.equal(result[7].currentPosition, 7);
    assert.equal(result[7].z, 0);
  });

  it('tests second phase', function () {
    result = command('6');
    command('move 4 onto 1');
    command('move 3 onto 2');
    command('move 2 over 1');
    assert.throws(command.bind(null, 'move 4 onto 2'));
    command('move 5 over 0');
    command('move 4 over 0');

    assert.equal(result[0].currentPosition, 0);
    assert.equal(result[0].z, 0);
    assert.equal(result[1].currentPosition, 1);
    assert.equal(result[1].z, 0);
    assert.equal(result[2].currentPosition, 2);
    assert.equal(result[2].z, 0);
    assert.equal(result[3].currentPosition, 3);
    assert.equal(result[3].z, 0);
    assert.equal(result[4].currentPosition, 0);
    assert.equal(result[4].z, 2);
    assert.equal(result[5].currentPosition, 0);
    assert.equal(result[5].z, 1);
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

    assert.equal(result[0].currentPosition, 0);
    assert.equal(result[0].z, 0);
    assert.equal(result[1].currentPosition, 1);
    assert.equal(result[1].z, 0);
    assert.equal(result[2].currentPosition, 2);
    assert.equal(result[2].z, 0);
    assert.equal(result[3].currentPosition, 3);
    assert.equal(result[3].z, 0);
    assert.equal(result[4].currentPosition, 4);
    assert.equal(result[4].z, 0);
    assert.equal(result[5].currentPosition, 5);
    assert.equal(result[5].z, 0);
    assert.equal(result[6].currentPosition, 1);
    assert.equal(result[6].z, 4);
    assert.equal(result[7].currentPosition, 1);
    assert.equal(result[7].z, 3);
    assert.equal(result[8].currentPosition, 1);
    assert.equal(result[8].z, 2);
    assert.equal(result[9].currentPosition, 1);
    assert.equal(result[9].z, 1);
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

    assert.equal(result[0].currentPosition, 0);
    assert.equal(result[0].z, 0);
    assert.equal(result[1].currentPosition, 1);
    assert.equal(result[1].z, 0);
    assert.equal(result[2].currentPosition, 1);
    assert.equal(result[2].z, 2);
    assert.equal(result[3].currentPosition, 3);
    assert.equal(result[3].z, 0);
    assert.equal(result[4].currentPosition, 1);
    assert.equal(result[4].z, 3);
    assert.equal(result[5].currentPosition, 5);
    assert.equal(result[5].z, 0);
    assert.equal(result[6].currentPosition, 5);
    assert.equal(result[6].z, 3);
    assert.equal(result[7].currentPosition, 5);
    assert.equal(result[7].z, 2);
    assert.equal(result[8].currentPosition, 5);
    assert.equal(result[8].z, 1);
    assert.equal(result[9].currentPosition, 1);
    assert.equal(result[9].z, 1);
  });

  function validatePositions(blocks) {
    var i = 0;
    for (; i < blocks.length; i++) {
      assert.equal(blocks[i].initialPosition, i);
    }
  }
});
