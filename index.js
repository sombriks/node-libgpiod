// Entry point
const {
	InstantFlags, version, getChipNames,
	getInstantLineValue, setInstantLineValue,
	getInstantLineValues, setInstantLineValues,
	getInstantLineValueFlags, setInstantLineValueFlags,
	getInstantLineValuesFlags, setInstantLineValuesFlags,
} = require('./lib/misc');
const {Chip} = require('./lib/chip');
const {Bulk} = require('./lib/bulk');
const {Line, Pin} = require('./lib/line');

/**
 * @module libgpiod
 * @description Node.js bindings for libgpiod
 */
module.exports = {
	InstantFlags,
	version,
	getChipNames,
	getInstantLineValue,
	setInstantLineValue,
	getInstantLineValues,
	setInstantLineValues,
	getInstantLineValueFlags,
	setInstantLineValueFlags,
	getInstantLineValuesFlags,
	setInstantLineValuesFlags,
	Chip,
	Bulk,
	Line,
	Pin,
};
