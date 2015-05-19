'use strict';

var command = require('./command')({ cli: true });

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var blocks;
  var instruction = process.stdin.read();

  // remove \n
  instruction = instruction && instruction.substr(0, instruction.length - 1);

  if (instruction !== null) {
    try {
      command(instruction);
    }
    catch (err) {
      process.stdout.write('Error: ' + err.message + '\n');
    }
  }
});
