'use strict';

var validate = require('./validate.js');

module.exports = {
  onto: pileOnto,
  over: pileOver
};

function pileOnto(a, b) {
  validate(a, b);
  b.returnStackedToOrigin();
  pile(a, b);
}

function pileOver(a, b) {
  validate(a, b);
  pile(a, b);
}

function pile(a, b) {
  var topForB = b.getTop().z;
  var lastIndex = topForB + 1;
  var stacked = a.getStacked();

  [a].concat(stacked).forEach(function (i) {
    i.z = lastIndex++;
    i.currentPosition = b.currentPosition;
  });
}
