'use strict';

var phases = require('../phases');
var assert = require('assert');

describe('Phases', function () {
  var command;

  beforeEach(function () {
    command = require('../src/command')();
  });

  Object.keys(phases).forEach(function (phase) {
    it('tests ' + phase + ' phase', function () {
      assertPhase(phases[phase], ['move 3 onto 1']);
    });
  });

  function assertPhase(phase) {
    var result;

    phase.commands.forEach(function (instruction) {
      try {
        result = command(instruction);
      }
      catch (err) {
        if (phase.exceptions.indexOf(instruction) === -1) {
          throw err;
        }
      }
    });

    assertPositions(result);
    assertBlocks(result, phase.expected);
    result = command('quit');
  }

  function assertPositions(blocks) {
    blocks.forEach(function (block, index) {
      assert.equal(blocks[index].initialPosition, index);
    });
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
