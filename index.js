// prevent module being loaded on anything other than Linux
const os = require('os');
if (os.type() !== 'Linux') {
    throw new Error('libgpiod is only available on Linux!');
}

// entry point
const libgpiod = require('bindings')('node-libgpiod');

libgpiod.Chip.prototype.getLine = function getLine(n) {
    return new libgpiod.Line(this,n);
};

module.exports = libgpiod;
