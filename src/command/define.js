'use strict';

module.exports = defineBlocks;

function defineBlocks(count) {
  var i = 0;
  var blocks = [];

  if (count < 0 || count > 25) {
    throw new Error('Blocks count should be between 0 and 25');
  }

  for (; i < count; i++) {
    blocks.push({
      initialPosition: i,
      currentPosition: i,
      z: 0,
      returnStackedToOrigin: returnStackedToOrigin,
      getStacked: getStacked,
      getTop: getTop
    });
  }

  return blocks;

  function returnStackedToOrigin() {
    var block = this;

    block.getStacked().forEach(function (b) {
      b.currentPosition = b.initialPosition;
      b.z = 0;
    });
  }

  function getStacked() {
    var block = this;

    return blocks.filter(function (b) {
      return b.currentPosition === block.currentPosition && b.z > block.z;
    }).sort(function (a, b) {
      return a.z - b.z;
    });
  }

  function getTop() {
    var max;
    var block = this;

    blocks.filter(function (i) {
      return i.currentPosition === block.currentPosition;
    }).forEach(function (i) {
      if (!max || max.z < i.z) {
        max = i;
      }
    });

    return max;
  }
}
