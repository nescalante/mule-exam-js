'use strict';

var move = require('./move.js');
var pile = require('./pile.js');
var getOutput = require('./output.js');
var define = require('./define.js');

// commands regexs
var defineBlocks = /^(\d+)$/;
var moveOnto = /^move (\d+) onto (\d+)$/;
var moveOver = /^move (\d+) over (\d+)$/;
var pileOnto = /^pile (\d+) onto (\d+)$/;
var pileOver = /^pile (\d+) over (\d+)$/;
var quit = /^quit$/;

module.exports = function (options) {
  var blocks;
  options = options || {};

  return execCommand;

  function execCommand(command) {
    var result, output;

    if (defineBlocks.test(command)) {
      if (blocks) {
        throw new Error('Blocks are already initialized');
      }

      result = defineBlocks.exec(command);
      blocks = define(+result[1]);
    }
    else if (quit.test(command)) {
      output = blocks ? getOutput(blocks).join('\n') : '';
      blocks = undefined;

      if (options.cli) {
        process.stdout.write(output);
        process.stdin.end();
      }
    }
    else if (moveOnto.test(command)) {
      validateBlocks();
      result = moveOnto.exec(command);
      move.onto(blocks[+result[1]], blocks[+result[2]]);
    }
    else if (moveOver.test(command)) {
      validateBlocks();
      result = moveOver.exec(command);
      move.over(blocks[+result[1]], blocks[+result[2]]);
    }
    else if (pileOnto.test(command)) {
      validateBlocks();
      result = pileOnto.exec(command);
      pile.onto(blocks[+result[1]], blocks[+result[2]]);
    }
    else if (pileOver.test(command)) {
      validateBlocks();
      result = pileOver.exec(command);
      pile.over(blocks[+result[1]], blocks[+result[2]]);
    }
    else {
      throw new Error('Unknown command');
    }

    return blocks;

    function validateBlocks() {
      if (!blocks) {
        throw new Error('Blocks initialization is required');
      }
    }
  }
};
