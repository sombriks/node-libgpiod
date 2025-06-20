const libgpiod = require('bindings')('node-libgpiod');

/**
 * @typedef {import('./chip').Chip} Chip
 */

/**
 * @class Line
 * @description Class to handle a single line on the chip
 */
class Line {
	/**
	 * Possible values returned by line line direction
	 * @typedef {Object} LineDirection
	 */
	static Direction = {
		INPUT: 1,
		OUTPUT: 2,
	};

	/**
	 * Possible values returned by line active state
	 * @typedef {Object} LineActiveState
	 * @property {number} HIGH - The line is active when high
	 * @property {number} LOW - The line is active when low
	 */
	static ActiveState = {
		HIGH: 1,
		LOW: 2,
	};

	/**
	 * Possible values returned by line bias
	 * @typedef {Object} LineBias
	 * @property {number} AS_IS - The internal bias state is unknown
	 * @property {number} DISABLE - The internal bias is disabled
	 * @property {number} PULL_UP - The internal pull-up bias is enabled
	 * @property {number} PULL_DOWN - The internal pull-down bias is enabled
	 */
	static Bias = {
		AS_IS: 1,
		/** < The internal bias state is unknown. */
		DISABLE: 2,
		/** < The internal bias is disabled. */
		PULL_UP: 3,
		/** < The internal pull-up bias is enabled. */
		PULL_DOWN: 4,
		/** < The internal pull-down bias is enabled. */
	};

	/**
	 * Possible request types for line request
	 */
	static RequestType = {
		get Direction() {
			return {
				/** < Request the line(s), but don't change current direction. */
				AS_IS: 1,
				/** < Request the line(s) for reading the GPIO line state. */
				INPUT: 2,
				/** < Request the line(s) for setting the GPIO line state. */
				OUTPUT: 3,
			};
		},
		get Event() {
			return {
				FALLING_EDGE: 4,
				/** < Only watch falling edge events. */
				RISING_EDGE: 5,
				/** < Only watch rising edge events. */
				BOTH_EDGES: 6,
				/** < Monitor both types of events. */
			};
		},
	};

	/**
	 * Possible flags for line request
	 * @typedef {Object} RequestFlags
	 * @property {number} OPEN_DRAIN - The line is an open-drain port
	 * @property {number} OPEN_SOURCE - The line is an open-source port
	 * @property {number} ACTIVE_LOW - The active state of the line is low (high is the default)
	 * @property {number} BIAS_DISABLE - The line has neither pull-up nor pull-down resistor
	 * @property {number} BIAS_PULL_DOWN - The line has pull-down resistor enabled
	 * @property {number} BIAS_PULL_UP - The line has pull-up resistor enabled
	 */
	static RequestFlags = {
		OPEN_DRAIN: 1,
		/** < The line is an open-drain port. */
		OPEN_SOURCE: 1 << 1,
		/** < The line is an open-source port. */
		ACTIVE_LOW: 1 << 2,
		/** < The active state of the line is low (high is the default). */
		BIAS_DISABLE: 1 << 3,
		/** < The line has neither either pull-up nor pull-down resistor. */
		BIAS_PULL_DOWN: 1 << 4,
		/** < The line has pull-down resistor enabled. */
		BIAS_PULL_UP: 1 << 5,
		/** < The line has pull-up resistor enabled. */
	};

	/**
	 * @constructor
	 * @param {Chip} chip - chip to which the line belongs
	 * @param {string|number} identifier - line number or name
	 */
	constructor(chip, identifier) {
		this._handler = new libgpiod.Line(chip._handler, identifier);
	}

	/**
	 * @property offset - The line number
	 * @returns {number} - The line number
	 *
	 */
	get offset() {
		return libgpiod.getLineOffset(this._handler);
	}

	/**
	 * @property name - The line name
	 * @returns {string} - The line name
	 */
	get name() {
		return libgpiod.getLineName(this._handler);
	}

	/**
	 * @property consumer - Name of line consumer or hog
	 *
	 * @returns {string} - The line hog name, if any
	 */
	get consumer() {
		return libgpiod.getLineConsumer(this._handler);
	}

	/**
	 * @property direction - The line direction
	 * @returns {Line.Direction} - either input (1) or output (2)
	 */
	get direction() {
		return libgpiod.getLineDirection(this._handler);
	}

	/**
	 * @property activeState - The line active state
	 * @returns {Line.ActiveState} - either high (1) or low (2)
	 */
	get activeState() {
		return libgpiod.getLineActiveState(this._handler);
	}

	/**
	 * @property bias - The line bias
	 * @returns {Line.Bias} - either as_is (1), disable (2), pull_up (3) or pull_down (4)
	 */
	get bias() {
		return libgpiod.getLineBias(this._handler);
	}

	/**
	 * @property used - The line used state
	 * @returns {boolean} - true if the line is used, false otherwise
	 */
	get used() {
		return libgpiod.isLineUsed(this._handler);
	}

	/**
	 * @property free - The line free state
	 * @returns {boolean} - true if the line is free, false otherwise
	 */
	get free() {
		return libgpiod.isLineFree(this._handler);
	}

	/**
	 * @property openDrain - The line open drain state
	 * @returns {boolean} - true if the line is open drain, false otherwise
	 */
	get openDrain() {
		return libgpiod.isLineOpenDrain(this._handler);
	}

	/**
	 * @property openSource - The line open source state
	 * @returns {boolean} - true if the line is open source, false otherwise
	 */
	get openSource() {
		return libgpiod.isLineOpenSource(this._handler);
	}

	/**
	 * Update - refresh line state
	 */
	update() {
		return libgpiod.update(this._handler);
	}

	/**
	 * @property needsUpdate - check if line state needs update
	 * @returns {boolean} - true if the line state needs update, false otherwise
	 * @deprecated - does nothing in libgpiod 1.6 series
	 */
	get needsUpdate() {
		return libgpiod.needsUpdate(this._handler);
	}

	/**
	 * GetValue - The line value
	 * @returns {0|1} - The line value, either 0 or 1
	 */
	getValue() {
		return libgpiod.getValue(this._handler);
	}

	/**
	 * SetValue - The line value
	 * @param {number} val - The line value, either 0 or 1
	 */
	setValue(value) {
		return libgpiod.setValue(this._handler, value);
	}

	/**
	 * LineRequest - performs a line request
	 * @param {object} config - request configuration
	 * @param {string} config.consumer - consumer name
	 * @param {Line.RequestType.Direction | Line.RequestType.Event} config.requestType - request type
	 * @param {Line.RequestFlags} config.flags - request flags bits
	 * @param {0|1} [defaultValue] - default value to set
	 */
	lineRequest(config, defaultValue = 0) {
		return libgpiod.lineRequest(this._handler, config, defaultValue);
	}

	/**
	 * RequestInputMode - request line in input mode
	 * @param {string} [consumer] - consumer name
	 */
	requestInputMode(consumer = '') {
		return libgpiod.requestInputMode(this._handler, consumer);
	}

	/**
	 * RequestOutputMode - request line in output mode
	 * @param {string} [consumer] - consumer name
	 * @param {0|1} [defaultValue] - default value to set
	 */
	requestOutputMode(consumer = '', defaultValue = 0) {
		return libgpiod.requestOutputMode(this._handler, consumer, defaultValue);
	}

	/**
	 * RequestRisingEdgeEvents
	 * @param {string} [consumer] - consumer name
	 */
	requestRisingEdgeEvents(consumer = '') {
		return libgpiod.requestRisingEdgeEvents(this._handler, consumer);
	}

	/**
	 * RequestRisingEdgeEvents
	 * @param {string} [consumer] - consumer name
	 */
	requestFallingEdgeEvents(consumer = '') {
		return libgpiod.requestFallingEdgeEvents(this._handler, consumer);
	}

	/**
	 * RequestBothEdgesEvents
	 * @param {string} [consumer] - consumer name
	 */
	requestBothEdgesEvents(consumer = '') {
		return libgpiod.requestBothEdgesEvents(this._handler, consumer);
	}

	/**
	 * RequestInputModeFlags
	 *
	 * @param {string} consumer  - consumer name
	 * @param {Line.RequestFlags} flags  - request flags bits
	 */
	requestInputModeFlags(consumer, flags) {
		return libgpiod.requestInputModeFlags(this._handler, consumer, flags);
	}

	/**
	 * RequestOutputModeFlags
	 * @param {string} consumer  - consumer name
	 * @param {Line.RequestFlags} flags - request flags bits
	 * @param {number} [defaultValue=0] - default value to set
	 */
	requestOutputModeFlags(consumer, flags, defaultValue = 0) {
		return libgpiod.requestOutputModeFlags(this._handler, consumer, flags, defaultValue);
	}

	/**
	 * RequestRisingEdgeEventFlags
	 * @param {string} consumer  - consumer name
	 * @param {Line.RequestFlags} flags  - request flags bits
	 */
	requestRisingEdgeEventFlags(consumer, flags) {
		return libgpiod.requestRisingEdgeEventFlags(this._handler, consumer, flags);
	}

	/**
	 * RequestFallingEdgeEventFlags
	 * @param {string} consumer  - consumer name
	 * @param {Line.RequestFlags} flags  - request flags bits
	 */
	requestFallingEdgeEventFlags(consumer, flags) {
		return libgpiod.requestFallingEdgeEventFlags(this._handler, consumer, flags);
	}

	/**
	 * RequestBothEdgesEventFlags
	 * @param {string} consumer  - consumer name
	 * @param {Line.RequestFlags} flags  - request flags bits
	 */
	requestBothEdgesEventFlags(consumer, flags) {
		return libgpiod.requestBothEdgesEventFlags(this._handler, consumer, flags);
	}

	/**
	 * Release - release the line
	 */
	release() {
		return libgpiod.release(this._handler);
	}
}

exports.Line = Line;

/**
 * Pin sugar for Line. grab lines from chip 0
 * @param {number} number
 */
exports.Pin = function Pin(number) {
	const {Chip} = require('./chip');
	return new Line(new Chip(0), number);
};
