// Entry point
const { version, getInstantLineValue, setInstantLineValue } = require('./lib/misc')
const { Chip } = require('./lib/chip')
const { Bulk } = require('./lib/bulk')
const { Line, Pin } = require('./lib/line')

/**
 * @module libgpiod
 * @description Node.js bindings for libgpiod
 */
module.exports = {
	version,
	getInstantLineValue,
	setInstantLineValue,
	Chip,
	Bulk,
	Line,
	Pin
}
