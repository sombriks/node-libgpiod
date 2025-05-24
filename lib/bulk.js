const libgpiod = require('bindings')('node-libgpiod')
const { Chip } = require('./chip')

/**
 * @class Bulk
 * @description Class to handle bulk operations on the chip lines
 */
class Bulk {

  /**
   * @constructor
   * @param {Chip} chip - The chip to request the line bulk
   * @param {Number[]} lineNumbers which lines to request from the chip
   */
  constructor(chip, lineNumbers) {
    this._handler = new libgpiod.Bulk(chip._handler, lineNumbers)
  }

}

exports.Bulk = Bulk
