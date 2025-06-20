const libgpiod = require('bindings')('node-libgpiod');
const {Chip} = require('./chip');
const {Line} = require('./line');

/**
 * @class Bulk
 * @description Class to handle bulk operations on the chip lines
 */
class Bulk {
	/**
   * @constructor
   * @param {Chip} chip - The chip to request the line bulk
   * @param {Number[]|String[]} [lines] which lines to request from the chip.
   * Either pass the names or the pin numbers. If no list is passed, or the list
   * is empty, all lines from the chip will be requested.
   */
	constructor(chip, lines) {
		this._handler = new libgpiod.Bulk(chip._handler, lines);
	}

	/**
   * @property {number[]} values - get current values of the lines in the bulk.
   */
	get values() {
		return libgpiod.getValues(this._handler);
	}

	/**
   * @method setValues
   * @description Set values for the lines in the bulk.
   * @param {number[]} values - An array of values to set for each line in the bulk.
   * The length of the array must match the number of lines in the bulk.
   * Number values must be either 0 or 1.
   */
	setValues(values) {
		return libgpiod.setValues(this._handler, values);
	}

	/**
   * Request input mode for all lines in the bulk.
   * @param {string} [consumers] - Consumer names for the request.
   */
	requestInputMode(consumers = '') {
		return libgpiod.requestBulkInputMode(this._handler, consumers);
	}

	/**
   * Request output mode for all lines in the bulk.
   * @param {string} [consumers] - Consumer names for the request.
   * @param {number[]} [defaultValues] default values for the output lines.
   */
	requestOutputMode(consumers = '', defaultValues) {
		return libgpiod.requestBulkOutputMode(this._handler, consumers, defaultValues);
	}

	/**
   * Request rising edge events for all lines in the bulk.
   * @param {string} [consumer] - Consumer name for the request.
   */
	requestRisingEdgeEvents(consumer = '') {
		return libgpiod.requestBulkRisingEdgeEvents(this._handler, consumer);
	}

	/**
   * Request falling edge events for all lines in the bulk.
   * @param {string} [consumer] - Consumer name for the request.
   */
	requestFallingEdgeEvents(consumer = '') {
		return libgpiod.requestBulkFallingEdgeEvents(this._handler, consumer);
	}

	/**
   * Request both edges events for all lines in the bulk.
   * @param {string} [consumer] - Consumer name for the request.
   */
	requestBothEdgesEvents(consumer = '') {
		return libgpiod.requestBulkBothEdgesEvents(this._handler, consumer);
	}

	/**
   * Set the direction of all lines in the bulk to input.
   */
	setDirectionInput() {
		libgpiod.requestBulkDirectionInput(this._handler);
	}

	/**
   * Set the direction of all lines in the bulk to output.
   * @param {number[]} [values] - An array of values to set for each line in the bulk.
   * The length of the array must match the number of lines in the bulk.
   * Number values must be either 0 or 1.
   */
	setDirectionOutput(values) {
		libgpiod.requestBulkDirectionOutput(this._handler, values);
	}

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
	request(config, defaultValues) {
		libgpiod.requestBulk(this._handler, config, defaultValues);
	}

	/**
   * Set an updated configuration for the bulk lines.
   *
   * @param {Line.RequestType.Direction} direction - The direction of the lines.
   * @param {Line.RequestFlags} flags - Flags for the request.
   * @param {number[]} [values] - Values to set for the lines. Only used if the
   * direction is OUTPUT.
   */
	updateConfig(direction, flags, values) {
		libgpiod.setConfigBulk(this._handler, direction, flags, values);
	}

	/**
   * Update the flags for the bulk lines.
   *
   * @param {Line.RequestFlags} flags - Flags to set for the request.
   */
	updateFlags(flags) {
		libgpiod.setFlagsBulk(this._handler, flags);
	}

	/**
   * Request input mode for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestInputFlags(consumer, flags) {
		libgpiod.requestBulkInputFlags(this._handler, consumer, flags);
	}

	/**
   * Request output mode for the bulk lines with specific flags and default values.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   * @param {number[]} [defaultValues] - Default values for the output lines.
   */
	requestOutputFlags(consumer, flags, defaultValues) {
		libgpiod.requestBulkOutputFlags(this._handler, consumer, flags, defaultValues);
	}

	/**
   * Request rising edge events for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestRisingEdgeEventsFlags(consumer, flags) {
		libgpiod.requestBulkRisingEdgeEventsFlags(this._handler, consumer, flags);
	}

	/**
   * Request falling edge events for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestFallingEdgeEventsFlags(consumer, flags) {
		libgpiod.requestBulkFallingEdgeEventsFlags(this._handler, consumer, flags);
	}

	/**
   * Request both edges events for the bulk lines with specific flags.
   *
   * @param {string} consumer - Consumer name for the request.
   * @param {Line.RequestFlags} flags - Flags for the request.
   */
	requestBothEdgesEventsFlags(consumer, flags) {
		libgpiod.requestBulkBothEdgesEventsFlags(this._handler, consumer, flags);
	}

	/**
   * Release a previously requested bulk.
   *
   * Remember to call this method when you are done with the bulk.
   */
	release() {
		libgpiod.releaseBulk(this._handler);
	}
}

exports.Bulk = Bulk;
