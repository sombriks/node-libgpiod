// entry point
const libgpiod = require('bindings')('node-libgpiod');

libgpiod.Chip.prototype.getLine = function getLine(n) {
    return new libgpiod.Line(this,n);
};

module.exports = libgpiod;
