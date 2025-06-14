const libgpiod = require('bindings')('node-libgpiod')
const { Chip } = require('./chip')

/**
 * @class Bulk
 * @description Class to handle bulk operations on the chip lines
 */
class Bulk {

  /**
   * @constructor
   * @param {Chip} chip - The chip to request the line bulk
   * @param {Number[]} lineNumbers which lines to request from the chip
   */
  constructor(chip, lineNumbers) {
    this._handler = new libgpiod.Bulk(chip._handler, lineNumbers)
  }

  // gpiod_line_bulk_init
  // gpiod_line_release_bulk

  // gpiod_chip_get_lines
  // gpiod_chip_get_all_lines
  // gpiod_chip_find_lines

  // gpiod_line_request_bulk
  // gpiod_line_request_bulk_input
  // gpiod_line_request_bulk_output
  // gpiod_line_request_bulk_rising_edge_events
  // gpiod_line_request_bulk_falling_edge_events
  // gpiod_line_request_bulk_both_edges_events

  // gpiod_line_request_bulk_input_flags
  // gpiod_line_request_bulk_output_flags
  // gpiod_line_request_bulk_rising_edge_events_flags
  // gpiod_line_request_bulk_falling_edge_events_flags
  // gpiod_line_request_bulk_both_edges_events_flags

  // gpiod_line_get_value_bulk
  // gpiod_line_set_value_bulk

  // gpiod_line_set_config_bulk
  // gpiod_line_set_flags_bulk

  // gpiod_line_set_direction_input_bulk
  // gpiod_line_set_direction_output_bulk

}

exports.Bulk = Bulk
