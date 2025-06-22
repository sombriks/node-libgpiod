const libgpiod = require('bindings')('node-libgpiod');

/**
 * Miscellaneous functions
 */
module.exports = {
	/**
		* Get the instant flags for instant (ctxless) operations.
		*
		* @returns {InstantFlags} - Miscellaneous instant flags.
		* Perform bitwise operations on these flags to combine them.
		* @returns {InstantFlags.Events} - Events types that the ctxless event monitor can wait for.
		* @returns {InstantFlags.Callbacks} - Event types that cn be passed to callbacks.
		* @returns {InstantFlags.Returns} - Values that event callbacks can return.
		* @returns {InstantFlags.Poll} - Return status values that the ctxless event poll callback can return.
		*/
	get InstantFlags() {
		return {
			// GPIOD_CTXLESS_FLAG_OPEN_DRAIN		= GPIOD_BIT(0),
			// /**< The line is an open-drain port. */
			OPEN_DRAIN: 1,
			// GPIOD_CTXLESS_FLAG_OPEN_SOURCE		= GPIOD_BIT(1),
			// /**< The line is an open-source port. */
			OPEN_SOURCE: 2,
			// GPIOD_CTXLESS_FLAG_BIAS_DISABLE		= GPIOD_BIT(2),
			// /**< The line has neither either pull-up nor pull-down resistor */
			BIAS_DISABLE: 4,
			// GPIOD_CTXLESS_FLAG_BIAS_PULL_DOWN	= GPIOD_BIT(3),
			// /**< The line has pull-down resistor enabled */
			PULL_DOWN: 8,
			// GPIOD_CTXLESS_FLAG_BIAS_PULL_UP		= GPIOD_BIT(4),
			// /**< The line has pull-up resistor enabled */
			PULL_UP: 16,
			get Events() {
				return {
					// /**< Wait for rising edge events only. */
					// GPIOD_CTXLESS_EVENT_RISING_EDGE = 1,
					RISING_EDGE: 1,
					// /**< Wait for falling edge events only. */
					// GPIOD_CTXLESS_EVENT_FALLING_EDGE,
					FALLING_EDGE: 2,
					// /**< Wait for both types of events. */
					// GPIOD_CTXLESS_EVENT_BOTH_EDGES,
					BOTH_EDGES: 3,
				};
			},
			get Callbacks() {
				return {
					// GPIOD_CTXLESS_EVENT_CB_TIMEOUT = 1,
					// /**< Waiting for events timed out. */
					TIMEOUT: 1,
					// GPIOD_CTXLESS_EVENT_CB_RISING_EDGE,
					// /**< Rising edge event occurred. */
					RISING_EDGE: 2,
					// GPIOD_CTXLESS_EVENT_CB_FALLING_EDGE,
					// /**< Falling edge event occurred. */
					FALLING_EDGE: 3,
				};
			},
			get Returns() {
				return {
					// GPIOD_CTXLESS_EVENT_CB_RET_ERR = -1,
					// /**< Stop processing events and indicate an error. */
					ERR: -1,
					// GPIOD_CTXLESS_EVENT_CB_RET_OK = 0,
					// /**< Continue processing events. */
					OK: 0,
					// GPIOD_CTXLESS_EVENT_CB_RET_STOP = 1,
					// /**< Stop processing events. */
					STOP: 1,
				};
			},
		};
	},
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
	get chipNames() {
		return libgpiod.getChipNames();
	},
	/**
	 * Get instant line value passing flags
	 * @param {number} chipNumber - The chip number
	 * @param {number} lineNumber - The line number
	 * @param {Object} [options] - Additional options
	 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
	 * @param {string} [options.consumer] - The line number
	 * @param {InstantFlags} [options.flags] - The flags to use for the operation
	 * @returns {0|1} - The current value of the line
	 */
	getInstantLineValue(chipNumber, lineNumber, {activeLow = false, consumer = '', flags} = {}) {
		if (flags) {
			return libgpiod.getInstantLineValueFlags(chipNumber, lineNumber, activeLow, consumer, flags);
		}

		return libgpiod.getInstantLineValue(chipNumber, lineNumber, activeLow, consumer);
	},
	/**
	 * Set instant line value passing flags
	 * @param {number} chipNumber  - The chip number
	 * @param {number} lineNumber  - The line number
	 * @param {0|1} value - The value to set the line to. Must be 0 or 1
	 * @param {Object} [options] - Additional options
	 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
	 * @param {string} [options.consumer] - The line number
	 * @param {function} [options.callback] - The callback function to call when the operation is complete
	 * @param {InstantFlags} [options.flags] - The flags to use for the operation
	 */
	setInstantLineValue(chipNumber, lineNumber, value, {activeLow = false, consumer = '', callback = () => {}, flags} = {}) {
		if (flags) {
			return libgpiod.setInstantLineValueFlags(chipNumber, lineNumber, value, activeLow, consumer, callback, flags);
		}

		return libgpiod.setInstantLineValue(chipNumber, lineNumber, value, activeLow, consumer, callback);
	},
	/**
	 * Get instant line values flags
	 * @param {number} chipNumber - The chip number
	 * @param {Array<number>} lineNumbers - An array of line numbers
	 * @param {Object} [options] - Additional options
	 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
	 * @param {string} [options.consumer] - The consumer name
	 * @param {InstantFlags} [options.flags] - The flags to use for the operation
	 * @returns {Array<number>} - An array of current values for the lines
	 */
	getInstantLineValues(chipNumber, lineNumbers, {activeLow = false, consumer = '', flags} = {}) {
		if (flags) {
			return libgpiod.getInstantLineValuesFlags(chipNumber, lineNumbers, activeLow, consumer, flags);
		}

		return libgpiod.getInstantLineValues(chipNumber, lineNumbers, activeLow, consumer);
	},
	/**
	 * Set instant line values passing flags
	 * @param {number} chipNumber - The chip number
	 * @param {Array<number>} lineNumbers - An array of line numbers
	 * @param {Array<number>} values - An array of values to set the lines to. Must be 0 or 1
	 * @param {Object} [options] - Additional options
	 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
	 * @param {string} [options.consumer] - The consumer name
	 * @param {function} [options.callback] - The callback function to call when the operation is complete
	 * @param {InstantFlags} [options.flags] - The flags to use for the operation
	 */
	setInstantLineValues(chipNumber, lineNumbers, values, {activeLow = false, consumer = '', callback = () => {}, flags} = {}) {
		if (flags) {
			libgpiod.setInstantLineValuesFlags(chipNumber, lineNumbers, values, activeLow, consumer, callback, flags);
		} else {
			libgpiod.setInstantLineValues(chipNumber, lineNumbers, values, activeLow, consumer, callback);
		}
	},
	/**
	 * Instant monitor events on a single line
	 *
	 * @param {string|number} device - device identification
	 * @param {number} lineNumber - line number to monitor
	 * @param {InstantFlags.Events} eventType - type of event to watch for
	 * @param {function} callback - callback to receive the event
	 * @param {object} [options] - additional options to the monitor
	 * @param {number} [options.timeout] - timeout to the monitor
	 * @param {boolean} [options.activeLow] - true if logical active state is low. default is false (active-high)
	 * @param {string} [options.consumer] - consumer name
	 * @param {InstantFlags} [options.flags] - flags for the monitor
	 */
	instantMonitorEvent(device, lineNumber, eventType, callback, {timeout = -1, activeLow = false, consumer = '', flags} = {}) {
		if (flags) {
			libgpiod.instantMonitorEventFlags(device, lineNumber, eventType, callback, timeout, activeLow, consumer, flags);
		} else {
			libgpiod.instantMonitorEvent(device, lineNumber, eventType, callback, timeout, activeLow, consumer);
		}
	},
	/**
	 * Instant monitor events on a single line
	 *
	 * @param {string|number} device - device identification
	 * @param {number} lineNumbers - line numbers to monitor
	 * @param {InstantFlags.Events} eventType - type of event to watch for
	 * @param {function} callback - callback to receive the event
	 * @param {object} [options] - additional options to the monitor
	 * @param {number} [options.timeout] - timeout to the monitor
	 * @param {boolean} [options.activeLow] - true if logical active state is low. default is false (active-high)
	 * @param {string} [options.consumer] - consumer name
	 * @param {InstantFlags} [options.flags] - flags for the monitor
	 */
	instantMonitorEvents(device, lineNumbers, eventType, callback, {timeout = -1, activeLow = false, consumer = '', flags} = {}) {
		if (flags) {
			libgpiod.instantMonitorEventsFlags(device, lineNumbers, eventType, callback, timeout, activeLow, consumer, flags);
		} else {
			libgpiod.instantMonitorEvents(device, lineNumbers, eventType, callback, timeout, activeLow, consumer);
		}
	},
};
