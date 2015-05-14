'use strict';

var validate = require('./validate.js');

module.exports = {
  onto: moveOnto,
  over: moveOver
};

function moveOnto(a, b) {
  validate(a, b);
  a.returnStackedToOrigin();
  b.returnStackedToOrigin();
  move(a, b);
}

function moveOver(a, b) {
  validate(a, b);
  a.returnStackedToOrigin();
  move(a, b);
}

function move(a, b) {
  a.z = b.getTop().z + 1;
  a.currentPosition = b.currentPosition;
}
