// Entry point
const {
	InstantFlags, version, chipNames,
	getInstantLineValue, setInstantLineValue,
	getInstantLineValues, setInstantLineValues,
	instantMonitorEvent, instantMonitorEvents,
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
	chipNames,
	getInstantLineValue,
	setInstantLineValue,
	getInstantLineValues,
	setInstantLineValues,
	instantMonitorEvent,
	instantMonitorEvents,
	Chip,
	Bulk,
	Line,
	Pin,
};
