const libgpiod = require('bindings')('node-libgpiod')
const { Chip } = require('./chip')

/**
 * @class Line
 * @description Class to handle a single line on the chip
 */
class Line {

  /**
   * @constructor
   * @param {Chip} chip - chip to which the line belongs
   * @param {string|number} identifier - line number or name
   */
  constructor(chip, identifier) {
    this._handler = new libgpiod.Line(chip._handler, identifier)
  }
}

exports.Line = Line

/**
 * Pin sugar for Line
 * @param {number} number 
 */
exports.Pin = function Pin(number) {
  return new Line(new Chip(0), number)
}
