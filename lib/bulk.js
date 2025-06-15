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

  // Gpiod_line_get_value_bulk
  // gpiod_line_set_value_bulk

  // gpiod_line_request_bulk
  // gpiod_line_request_bulk_input
  // gpiod_line_request_bulk_output

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
