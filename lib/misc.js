const libgpiod = require('bindings')('node-libgpiod');

/**
 * Miscellaneous functions
 */
module.exports = {
	/**
   * Get the version of the library
   * @returns {string} - The version of the library
   */
	get version() {
		return libgpiod.version();
	},
	/**
   * Get the names of all available chips
   * @returns {Array<string>} - An array of chip names
   */
	getChipNames() {
		return libgpiod.getChipNames();
	},
	/**
   * Get instant line value
   * @param {number} chipNumber - The chip number
   * @param {number} lineNumber - The line number
   * @returns {number} - The current value of the line
   */
	getInstantLineValue(chipNumber, lineNumber) {
		return libgpiod.getInstantLineValue(chipNumber, lineNumber);
	},
	/**
   * Set instant line value
   * @param {number} chipNumber  - The chip number
   * @param {number} lineNumber  - The line number
   * @param {0|1} value - The value to set the line to. Must be 0 or 1
   */
	setInstantLineValue(chipNumber, lineNumber, value) {
		return libgpiod.setInstantLineValue(chipNumber, lineNumber, value);
	},
};
