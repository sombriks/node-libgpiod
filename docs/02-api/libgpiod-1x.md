# libgpiod 1.x covered API

The libgpiod 1.x API is built on top of the following abstractions:

- Instant operations
- Chip
- Line
- Bulk

## Instant operations

Instant operations offers a way to get line information without too much drama.
No lines, no chips, just get value, set value.

Those functions are all under the `module root`:

```javascript
// import gpio from "node-libgpiod"
const gpio = require("node-libgpiod")
```

| C API                                  | Node.js API                 | Description              |
| -                                      | -                           | -                        |
| gpiod_version_string()                 | gpio.version                | get gpiod version        |
| -                                      | gpio.chipNames              | get available chip names |
| gpiod_ctxless_get_value()              | gpio.getInstantLineValue()  | get line value           |
| gpiod_ctxless_get_value_multiple()     | gpio.getInstantLineValues() | get line values          |
| gpiod_ctxless_set_value()              | gpio.setInstantLineValue()  | set line value           |
| gpiod_ctxless_set_value_multiple()     | gpio.setInstantLineValues() | set line values          |
| gpiod_ctxless_event_monitor()          | -                           | watch events i a line    |
| gpiod_ctxless_event_monitor_multiple() | -                           | watch events in lines    |

::: warning

At the moment, event monitoring is not implemented, if needed, you mus rely on
pooling to catch the line state.

:::

## Chip

A chip is the base abstraction for the gpio hardware. Some SBC's exposes the
hardware as more than one chips, so it'd important to know the manufacturer
documentation to better understand what chip offers.

The primary way to get a chip follows:

```javascript
// import gpio from "node-libgpiod"
const gpio = require("node-libgpiod")
// assuming that there is at least one chip
const chip = new gpio.Chip(0)
```

| C API                      | Node.js API        | Description                  |
| -                          | -                  | -                            |
| gpiod_chip_name()          | chip.name          | get the chip name            |
| gpiod_chip_label()         | chip.label         | get the chip label           |
| gpiod_chip_num_lines()     | chip.numberOfLines | number of lines in this chip |
| gpiod_chip_get_all_lines() | chip.lineNames     | all lines with names, if set |
| -                          | chip.getLine()     | get a `Line` instance        |

::: warning

In some chips/SBC's, the line name information might be missing. This does not
mean that the line is unavailable, but youy must refer to the line by a line
number instead of a line name.

:::

## Line

Line represents the physical pin in the board.

The simplest way to get a line is after get
 a chip:

```javascript
// import gpio from "node-libgpiod"
const gpio = require("node-libgpiod")
// assuming that there is at least one chip
const chip = new gpio.Chip(0)
// get the line either by offset or by name
const line = chip.getLine("PIN_7")
```

| C API                                   | Node.js API                    | Description                        |
| -                                       | -                              | -                                  |
| gpiod_line_offset()                     | line.offset                    | get line offset (line number)      |
| gpiod_line_name()                       | line.name                      | get line name                      |
| gpiod_line_consumer()                   | line.consumer                  | get the line consumer, if any      |
| gpiod_line_direction()                  | line.direction                 | get line direction                 |
| gpiod_line_active_state()               | line.activeState               | if line is active on low or high   |
| gpiod_line_bias()                       | line.bias                      | line bias                          |
| gpiod_line_is_used()                    | line.used                      | if the line is being used          |
| gpiod_line_is_free()                    | line.free                      | if the line is not being used      |
| gpiod_line_is_open_drain()              | line.openDrain                 | if it's open drain                 |
| gpiod_line_is_open_source()             | line.openSource                | if it's open source                |
| gpiod_line_update()                     | line.update()                  | refresh line state                 |
| gpiod_line_needs_update()               | line.needsUpdate               | if the line needs update           |
| gpiod_line_get_value()                  | line.getValue()                | get current line value             |
| gpiod_line_set_value()                  | line.setValue()                | set line value                     |
| gpiod_line_request()                    | line.lineRequest()             | request line passing configuration |
| gpiod_line_request_input()              | line.requestInputMode()        | request line for input (read)      |
| gpiod_line_request_output()             | line.requestOutputMode()       | request line for output (write)    |
| gpiod_line_request_rising_edge_events() | line.requestRisingEdgeEvents() | rising edge events                 |

## Bulk

| C API       | Node.js API                 | Description              |
| -           | -                           | -                        |
