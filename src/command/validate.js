'use strict';

module.exports = validate;

function validate(a, b) {
  if (!a || !b) {
    throw new Error('Block does not exist');
  }

  if (a === b) {
    throw new Error('Block from equals block to');
  }

  if (a.currentPosition === b.currentPosition) {
    throw new Error('Block from position equals block to position');
  }
}
