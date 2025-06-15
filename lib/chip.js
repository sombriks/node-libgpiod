const libgpiod = require('bindings')('node-libgpiod');
const {Line} = require('./line');

/**
 * @class Chip
 * @description Class to handle the chip
 */
class Chip {
	/**
   * @constructor
   * @param {number|string} identifier - The chip identifier
   */
	constructor(identifier) {
		this._handler = new libgpiod.Chip(identifier);
	}

	/**
   * @description Get the chip name
   * @returns {string} The chip name
   */
	get name() {
		return libgpiod.getChipName(this._handler);
	}

	/**
   * @description Get the label of the chip
   * @returns {string} The label of the chip
   */
	get label() {
		return libgpiod.getChipLabel(this._handler);
	}

	/**
   * @description Get the number of lines in the chip
   * @returns {number} The number of lines in the chip
   */
	get numberOfLines() {
		return libgpiod.getNumberOfLines(this._handler);
	}

	/**
   * @description Get the names of lines in the chip
   * @returns {string[]} The line names from the chip
   */
	get lineNames() {
		return libgpiod.getLineNames(this._handler);
	}

	/**
   * Get a line instance from this chip
   * @param {number|string} identifier
   * @returns {Line} line instance
   */
	getLine(identifier) {
		const line = new Line(this, identifier);
		return line;
	}
}

exports.Chip = Chip;
