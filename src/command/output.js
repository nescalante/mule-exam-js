'use strict';

module.exports = getOutput;

function getOutput(blocks) {
  var i = 0;
  var output = [];

  if (!blocks) {
    return;
  }

  for (; i < blocks.length; i++) {
    appendLine(i);
  }

  return output;

  function appendLine(index) {
    output.push(index + ': ' + blocks.filter(function (b) {
      return b.currentPosition === index;
    }).sort(function (a, b) {
      return a.z - b.z;
    }).map(function (b) {
      return b.initialPosition;
    }).join(' '));
  }
}
