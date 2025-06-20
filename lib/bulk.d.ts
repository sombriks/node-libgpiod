/**
 * @class Bulk
 * @description Class to handle bulk operations on the chip lines
 */
import {type Chip} from './chip.js';

export class Bulk {
	/**
   * @constructor
   * @param {Chip} chip - The chip to request the line bulk
   * @param {Number[]|String[]} [lines] which lines to request from the chip.
   * Either pass the names or the pin numbers. If no list is passed, or the list
   * is empty, all lines from the chip will be requested.
   */
	constructor(chip: Chip, lines?: number[] | string[]);
	_handler: any;
	/**
   * @property {number[]} values - get current values of the lines in the bulk.
   */
	get values(): any;
	/**
   * @method setValues
   * @description Set values for the lines in the bulk.
   * @param {number[]} values - An array of values to set for each line in the bulk.
   * The length of the array must match the number of lines in the bulk.
   * Number values must be either 0 or 1.
   */
	setValues(values: number[]): any;
	/**
   * Request input mode for all lines in the bulk.
   * @param {string} [consumers] - Consumer names for the request.
   */
	requestInputMode(consumers?: string): any;
	/**
   * Request output mode for all lines in the bulk.
   * @param {string} [consumers] - Consumer names for the request.
   * @param {number[]} [defaultValues] default values for the output lines.
   */
	requestOutputMode(consumers?: string, defaultValues?: number[]): any;
	/**
   * Request rising edge events for all lines in the bulk.
   * @param {string} [consumer] - Consumer name for the request.
   */
	requestRisingEdgeEvents(consumer?: string): any;
	/**
   * Request falling edge events for all lines in the bulk.
   * @param {string} [consumer] - Consumer name for the request.
   */
	requestFallingEdgeEvents(consumer?: string): any;
	/**
   * Request both edges events for all lines in the bulk.
   * @param {string} [consumer] - Consumer name for the request.
   */
	requestBothEdgesEvents(consumer?: string): any;
	/**
   * Set the direction of all lines in the bulk to input.
   */
	setDirectionInput(): void;
	/**
   * Set the direction of all lines in the bulk to output.
   * @param {number[]} [values] - An array of values to set for each line in the bulk.
   * The length of the array must match the number of lines in the bulk.
   * Number values must be either 0 or 1.
   */
	setDirectionOutput(values?: number[]): void;
	/**
   * Request bulk passing config object and default values, if requesting lines
   * for output and want to set default values.
   *
   * @param {Object} config config object
   * @param {string} [config.consumer] consumer name for the request.
   * @param {Line.RequestType} config.requestType request type.
   * @param {Line.RequestFlags} [config.flags] flags for the request.
   * @param {number[]} [defaultValues] default values for lines.
   */
	request(config: {
		consumer?: string;
		requestType: {
			readonly Direction: {
				AS_IS: number;
				INPUT: number;
				OUTPUT: number;
			};
			readonly Event: {
				FALLING_EDGE: number;
				RISING_EDGE: number;
				BOTH_EDGES: number;
			};
		};
		flags?: {
			OPEN_DRAIN: number;
			OPEN_SOURCE: number;
			ACTIVE_LOW: number;
			BIAS_DISABLE: number;
			BIAS_PULL_DOWN: number;
			BIAS_PULL_UP: number;
		};
	}, defaultValues?: number[]): void;
	/**
   * Set an updated configuration for the bulk lines.
   *
   * @param {Line.RequestType.Direction} direction - The direction of the lines.
   * @param {Line.RequestFlags} flags - Flags for the request.
   * @param {number[]} [values] - Values to set for the lines. Only used if the
   * direction is OUTPUT.
   */
	updateConfig(direction: Line.RequestType.Direction, flags: {
		OPEN_DRAIN: number;
		OPEN_SOURCE: number;
		ACTIVE_LOW: number;
		BIAS_DISABLE: number;
		BIAS_PULL_DOWN: number;
		BIAS_PULL_UP: number;
	}, values?: number[]): void;
	/**
   * Update the flags for the bulk lines.
   *
   * @param {Line.RequestFlags} flags - Flags to set for the request.
   */
	updateFlags(flags: {
		OPEN_DRAIN: number;
		OPEN_SOURCE: number;
		ACTIVE_LOW: number;
		BIAS_DISABLE: number;
		BIAS_PULL_DOWN: number;
		BIAS_PULL_UP: number;
	}): void;
	/**
   * Request input mode for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestInputFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		OPEN_SOURCE: number;
		ACTIVE_LOW: number;
		BIAS_DISABLE: number;
		BIAS_PULL_DOWN: number;
		BIAS_PULL_UP: number;
	}): void;
	/**
   * Request output mode for the bulk lines with specific flags and default values.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   * @param {number[]} [defaultValues] - Default values for the output lines.
   */
	requestOutputFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		OPEN_SOURCE: number;
		ACTIVE_LOW: number;
		BIAS_DISABLE: number;
		BIAS_PULL_DOWN: number;
		BIAS_PULL_UP: number;
	}, defaultValues?: number[]): void;
	/**
   * Request rising edge events for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestRisingEdgeEventsFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		OPEN_SOURCE: number;
		ACTIVE_LOW: number;
		BIAS_DISABLE: number;
		BIAS_PULL_DOWN: number;
		BIAS_PULL_UP: number;
	}): void;
	/**
   * Request falling edge events for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestFallingEdgeEventsFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		OPEN_SOURCE: number;
		ACTIVE_LOW: number;
		BIAS_DISABLE: number;
		BIAS_PULL_DOWN: number;
		BIAS_PULL_UP: number;
	}): void;
	/**
   * Request both edges events for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestBothEdgesEventsFlags(consumer: string, flags: {
		OPEN_DRAIN: number;
		OPEN_SOURCE: number;
		ACTIVE_LOW: number;
		BIAS_DISABLE: number;
		BIAS_PULL_DOWN: number;
		BIAS_PULL_UP: number;
	}): void;
	/**
   * Release a previously requested bulk.
   *
   * Remember to call this method when you are done with the bulk.
   */
	release(): void;
}
// # sourceMappingURL=bulk.d.ts.map
