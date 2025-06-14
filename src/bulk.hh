#ifndef BULK_HH
#define BULK_HH

#include <gpiod.h>
#include <nan.h>

class Bulk : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);
  gpiod_line_bulk *getNativeBulk();

 private:
  explicit Bulk();
  ~Bulk();
  static NAN_METHOD(New);
  static Nan::Persistent<v8::Function> constructor;
  gpiod_line_bulk *bulk;
};

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

#endif  // BULK_HH
