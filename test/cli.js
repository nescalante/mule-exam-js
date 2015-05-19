'use strict';

var assert = require('assert');
var sinon = require('sinon');

describe('CLI', function () {
  it('should run an instruction', function (done) {
    var proxyquire = require('proxyquire');
    var sandbox = sinon.sandbox.create();

    sandbox.stub(process.stdin, 'end', function () {
      process.stdin.on.restore();
      process.stdin.read.restore();
      process.stdin.end.restore();

      done();
    });
    sandbox.stub(process.stdin, 'read').returns('quit\q');
    sandbox.stub(process.stdin, 'on', function (event, callback) {
      if (event === 'readable') {
        callback();
      }
      else if (event === 'end') {
        done();
      }
    });

    proxyquire('../src/main.js', {
      './command': function (options) {
        var command = require('../src/command')(options);
        assert.deepEqual(options, { cli: true });

        return function (instruction) {
          assert.equal(instruction, 'quit');
          command(instruction);
        };
      }
    });
  });
});
