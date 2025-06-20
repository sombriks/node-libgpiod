export function Pin(number: number): Line;
export type Chip = import('./chip').Chip;
/**
 * @typedef {import('./chip').Chip} Chip
 */
/**
 * @class Line
 * @description Class to handle a single line on the chip
 */
export class Line {
	/**
     * Possible values returned by line line direction
     * @typedef {Object} LineDirection
     */
	static Direction: {
		INPUT: number;
		OUTPUT: number;
	};

	/**
     * Possible values returned by line active state
     * @typedef {Object} LineActiveState
     * @property {number} HIGH - The line is active when high
     * @property {number} LOW - The line is active when low
     */
	static ActiveState: {
		HIGH: number;
		LOW: number;
	};

	/**
     * Possible values returned by line bias
     * @typedef {Object} LineBias
     * @property {number} AS_IS - The internal bias state is unknown
     * @property {number} DISABLE - The internal bias is disabled
     * @property {number} PULL_UP - The internal pull-up bias is enabled
     * @property {number} PULL_DOWN - The internal pull-down bias is enabled
     */
	static Bias: {
		AS_IS: number;
		/** < The internal bias state is unknown. */
		DISABLE: number;
		/** < The internal bias is disabled. */
		PULL_UP: number;
		/** < The internal pull-up bias is enabled. */
		PULL_DOWN: number;
	};

	/**
     * Possible request types for line request
     */
	static RequestType: {
		readonly Direction: {
			/** < Request the line(s), but don't change current direction. */
			AS_IS: number;
			/** < Request the line(s) for reading the GPIO line state. */
			INPUT: number;
			/** < Request the line(s) for setting the GPIO line state. */
			OUTPUT: number;
		};
		readonly Event: {
			FALLING_EDGE: number;
			/** < Only watch falling edge events. */
			RISING_EDGE: number;
			/** < Only watch rising edge events. */
			BOTH_EDGES: number;
		};
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
	static RequestFlags: {
		OPEN_DRAIN: number;
		/** < The line is an open-drain port. */
		OPEN_SOURCE: number;
		/** < The line is an open-source port. */
		ACTIVE_LOW: number;
		/** < The active state of the line is low (high is the default). */
		BIAS_DISABLE: number;
		/** < The line has neither either pull-up nor pull-down resistor. */
		BIAS_PULL_DOWN: number;
		/** < The line has pull-down resistor enabled. */
		BIAS_PULL_UP: number;
	};

	/**
     * @constructor
     * @param {Chip} chip - chip to which the line belongs
     * @param {string|number} identifier - line number or name
     */
	constructor(chip: Chip, identifier: string | number);
	_handler: any;
	/**
     * @property offset - The line number
     * @returns {number} - The line number
     *
     */
	get offset(): number;
	/**
     * @property name - The line name
     * @returns {string} - The line name
     */
	get name(): string;
	/**
     * @property consumer - Name of line consumer or hog
     *
     * @returns {string} - The line hog name, if any
     */
	get consumer(): string;
	/**
     * @property direction - The line direction
     * @returns {Line.Direction} - either input (1) or output (2)
     */
	get direction(): {
		INPUT: number;
		OUTPUT: number;
	};
	/**
     * @property activeState - The line active state
     * @returns {Line.ActiveState} - either high (1) or low (2)
     */
	get activeState(): {
		HIGH: number;
		LOW: number;
	};
	/**
     * @property bias - The line bias
     * @returns {Line.Bias} - either as_is (1), disable (2), pull_up (3) or pull_down (4)
     */
	get bias(): {
		AS_IS: number;
		/** < The internal bias state is unknown. */
		DISABLE: number;
		/** < The internal bias is disabled. */
		PULL_UP: number;
		/** < The internal pull-up bias is enabled. */
		PULL_DOWN: number;
	};
	/**
     * @property used - The line used state
     * @returns {boolean} - true if the line is used, false otherwise
     */
	get used(): boolean;
	/**
     * @property free - The line free state
     * @returns {boolean} - true if the line is free, false otherwise
     */
	get free(): boolean;
	/**
     * @property openDrain - The line open drain state
     * @returns {boolean} - true if the line is open drain, false otherwise
     */
	get openDrain(): boolean;
	/**
     * @property openSource - The line open source state
     * @returns {boolean} - true if the line is open source, false otherwise
     */
	get openSource(): boolean;
	/**
     * Update - refresh line state
     */
	update(): any;
	/**
     * @property needsUpdate - check if line state needs update
     * @returns {boolean} - true if the line state needs update, false otherwise
     * @deprecated - does nothing in libgpiod 1.6 series
     */
	get needsUpdate(): boolean;
	/**
     * GetValue - The line value
     * @returns {0|1} - The line value, either 0 or 1
     */
	getValue(): 0 | 1;
	/**
     * SetValue - The line value
     * @param {number} val - The line value, either 0 or 1
     */
	setValue(value: any): any;
	/**
     * LineRequest - performs a line request
     * @param {object} config - request configuration
     * @param {string} config.consumer - consumer name
     * @param {Line.RequestType.Direction | Line.RequestType.Event} config.requestType - request type
     * @param {Line.RequestFlags} config.flags - request flags bits
     * @param {0|1} [defaultValue] - default value to set
     */
	lineRequest(config: {
		consumer: string;
		requestType: Line.RequestType.Direction | Line.RequestType.Event;
		flags: {
			OPEN_DRAIN: number;
			/** < The line is an open-drain port. */
			OPEN_SOURCE: number;
			/** < The line is an open-source port. */
			ACTIVE_LOW: number;
			/** < The active state of the line is low (high is the default). */
			BIAS_DISABLE: number;
			/** < The line has neither either pull-up nor pull-down resistor. */
			BIAS_PULL_DOWN: number;
			/** < The line has pull-down resistor enabled. */
			BIAS_PULL_UP: number;
		};
	}, defaultValue?: 0 | 1): any;
	/**
     * RequestInputMode - request line in input mode
     * @param {string} [consumer] - consumer name
     */
	requestInputMode(consumer?: string): any;
	/**
     * RequestOutputMode - request line in output mode
     * @param {string} [consumer] - consumer name
     * @param {0|1} [defaultValue] - default value to set
     */
	requestOutputMode(consumer?: string, defaultValue?: 0 | 1): any;
	/**
     * RequestRisingEdgeEvents
     * @param {string} [consumer] - consumer name
     */
	requestRisingEdgeEvents(consumer?: string): any;
	/**
     * RequestRisingEdgeEvents
     * @param {string} [consumer] - consumer name
     */
	requestFallingEdgeEvents(consumer?: string): any;
	/**
     * RequestBothEdgesEvents
     * @param {string} [consumer] - consumer name
     */
	requestBothEdgesEvents(consumer?: string): any;
	/**
     * RequestInputModeFlags
     *
     * @param {string} consumer  - consumer name
     * @param {Line.RequestFlags} flags  - request flags bits
     */
	requestInputModeFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		/** < The line is an open-drain port. */
		OPEN_SOURCE: number;
		/** < The line is an open-source port. */
		ACTIVE_LOW: number;
		/** < The active state of the line is low (high is the default). */
		BIAS_DISABLE: number;
		/** < The line has neither either pull-up nor pull-down resistor. */
		BIAS_PULL_DOWN: number;
		/** < The line has pull-down resistor enabled. */
		BIAS_PULL_UP: number;
	}): any;
	/**
     * RequestOutputModeFlags
     * @param {string} consumer  - consumer name
     * @param {Line.RequestFlags} flags - request flags bits
     * @param {number} [defaultValue=0] - default value to set
     */
	requestOutputModeFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		/** < The line is an open-drain port. */
		OPEN_SOURCE: number;
		/** < The line is an open-source port. */
		ACTIVE_LOW: number;
		/** < The active state of the line is low (high is the default). */
		BIAS_DISABLE: number;
		/** < The line has neither either pull-up nor pull-down resistor. */
		BIAS_PULL_DOWN: number;
		/** < The line has pull-down resistor enabled. */
		BIAS_PULL_UP: number;
	}, defaultValue?: number): any;
	/**
     * RequestRisingEdgeEventFlags
     * @param {string} consumer  - consumer name
     * @param {Line.RequestFlags} flags  - request flags bits
     */
	requestRisingEdgeEventFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		/** < The line is an open-drain port. */
		OPEN_SOURCE: number;
		/** < The line is an open-source port. */
		ACTIVE_LOW: number;
		/** < The active state of the line is low (high is the default). */
		BIAS_DISABLE: number;
		/** < The line has neither either pull-up nor pull-down resistor. */
		BIAS_PULL_DOWN: number;
		/** < The line has pull-down resistor enabled. */
		BIAS_PULL_UP: number;
	}): any;
	/**
     * RequestFallingEdgeEventFlags
     * @param {string} consumer  - consumer name
     * @param {Line.RequestFlags} flags  - request flags bits
     */
	requestFallingEdgeEventFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		/** < The line is an open-drain port. */
		OPEN_SOURCE: number;
		/** < The line is an open-source port. */
		ACTIVE_LOW: number;
		/** < The active state of the line is low (high is the default). */
		BIAS_DISABLE: number;
		/** < The line has neither either pull-up nor pull-down resistor. */
		BIAS_PULL_DOWN: number;
		/** < The line has pull-down resistor enabled. */
		BIAS_PULL_UP: number;
	}): any;
	/**
     * RequestBothEdgesEventFlags
     * @param {string} consumer  - consumer name
     * @param {Line.RequestFlags} flags  - request flags bits
     */
	requestBothEdgesEventFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		/** < The line is an open-drain port. */
		OPEN_SOURCE: number;
		/** < The line is an open-source port. */
		ACTIVE_LOW: number;
		/** < The active state of the line is low (high is the default). */
		BIAS_DISABLE: number;
		/** < The line has neither either pull-up nor pull-down resistor. */
		BIAS_PULL_DOWN: number;
		/** < The line has pull-down resistor enabled. */
		BIAS_PULL_UP: number;
	}): any;
	/**
     * Release - release the line
     */
	release(): any;
}
// # sourceMappingURL=line.d.ts.map
