// prevent module being loaded on anything other than Linux
const os = require('os');
if (os.type() === 'Linux') {
    // entry point
    const libgpiod = require('bindings')('node-libgpiod');
    libgpiod.Chip.prototype.getLine = function getLine(n) {
        return new libgpiod.Line(this, n);
    };

    libgpiod.available = function() {
        return true;
    }

    module.exports = libgpiod;
} else {
    const libgpiod = {
        available: function() {
            return false;
        }
    }

    module.exports = libgpiod;
}

