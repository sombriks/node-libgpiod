// Entry point
const {
	InstantFlags, version, chipNames,
	getInstantLineValue, setInstantLineValue,
	getInstantLineValues, setInstantLineValues,
} = require('./lib/misc');
const { Chip } = require('./lib/chip');
const { Bulk } = require('./lib/bulk');
const { Line, Pin } = require('./lib/line');

/**
 * @module libgpiod
 * @description Node.js bindings for libgpiod
 */
module.exports = {
	InstantFlags,
	version,
	chipNames,
	getInstantLineValue,
	setInstantLineValue,
	getInstantLineValues,
	setInstantLineValues,
	Chip,
	Bulk,
	Line,
	Pin,
};
