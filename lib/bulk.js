const libgpiod = require('bindings')('node-libgpiod');
const { Chip } = require('./chip');

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
   * @param {string} [consumer] - Consumer name for the request. 
   */
  requestInputMode(consumer = "") {
    return libgpiod.requestBulkInputMode(this._handler, consumer);
  }

  /**
   * Request output mode for all lines in the bulk.
   * @param {string} [consumer] - Consumer name for the request. 
   * @param {number[]} [defaultValues] default values for the output lines.
   */
  requestOutputMode(consumer = "", defaultValues) {
    return libgpiod.requestBulkOutputMode(this._handler, consumer, defaultValues);
  }

  /**
   * release a previously requested bulk
   */
  release() {
    libgpiod.releaseBulk(this._handler);
  }

  // gpiod_line_request_bulk

  // gpiod_line_request_bulk_input_flags
  // gpiod_line_request_bulk_output_flags

  // gpiod_line_request_bulk_rising_edge_events
  // gpiod_line_request_bulk_falling_edge_events
  // gpiod_line_request_bulk_both_edges_events

  // gpiod_line_request_bulk_rising_edge_events_flags
  // gpiod_line_request_bulk_falling_edge_events_flags
  // gpiod_line_request_bulk_both_edges_events_flags

  // gpiod_line_set_config_bulk
  // gpiod_line_set_flags_bulk

  // gpiod_line_set_direction_input_bulk
  // gpiod_line_set_direction_output_bulk
}

exports.Bulk = Bulk;
