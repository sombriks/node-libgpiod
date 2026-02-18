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
// const line = new gpio.Line(chip, "PIN_7")
const line = chip.getLine("PIN_7")
```

| C API                                    | Node.js API                     | Description                        |
| -                                        | -                               | -                                  |
| gpiod_chip_get_line                      | new gpio.Line()                 | new line instance                  |
| gpiod_line_offset()                      | line.offset                     | get line offset (line number)      |
| gpiod_line_name()                        | line.name                       | get line name                      |
| gpiod_line_consumer()                    | line.consumer                   | get the line consumer, if any      |
| gpiod_line_direction()                   | line.direction                  | get line direction                 |
| gpiod_line_active_state()                | line.activeState                | if line is active on low or high   |
| gpiod_line_bias()                        | line.bias                       | line bias                          |
| gpiod_line_is_used()                     | line.used                       | if the line is being used          |
| gpiod_line_is_free()                     | line.free                       | if the line is not being used      |
| gpiod_line_is_open_drain()               | line.openDrain                  | if it's open drain                 |
| gpiod_line_is_open_source()              | line.openSource                 | if it's open source                |
| gpiod_line_update()                      | line.update()                   | refresh line state                 |
| gpiod_line_needs_update()                | line.needsUpdate                | if the line needs update           |
| gpiod_line_get_value()                   | line.getValue()                 | get current line value             |
| gpiod_line_set_value()                   | line.setValue()                 | set line value                     |
| gpiod_line_request()                     | line.lineRequest()              | request line passing configuration |
| gpiod_line_request_input()               | line.requestInputMode()         | request line for input (read)      |
| gpiod_line_request_output()              | line.requestOutputMode()        | request line for output (write)    |
| gpiod_line_request_rising_edge_events()  | line.requestRisingEdgeEvents()  | rising edge events                 |
| gpiod_line_request_falling_edge_events() | line.requestFallingEdgeEvents() | falling edge events                |
| gpiod_line_request_both_edges_events()   | line.requestBothEdgesEvents()   | both edges events                  |
| gpiod_line_release()                     | line.release()                  | release the line (cleanup)         |

::: tip

for read/write scenarios, you need to call `requestInputMode()` or
`requestOutputMode()` before call `getValue()` or `setValue()`.

:::

::: tip

Always remember to call `release()` once you're done reading or writing. Avoid
the chance of the line instance either get garbage-collected or stale at a lower
level.

:::

## Line Constants

`Line` offers a set of constants to provide better meaning of return values:

| C API | Node.js API                         | Value  |
| -     | -                                   | -      |
| -     | Line.Direction.INPUT                | 1      |
| -     | Line.Direction.OUTPUT               | 2      |
| -     | Line.ActiveState.HIGH               | 1      |
| -     | Line.ActiveState.LOW                | 2      |
| -     | Line.Bias.AS_IS                     | 1      |
| -     | Line.Bias.DISABLE                   | 2      |
| -     | Line.Bias.PULL_UP                   | 3      |
| -     | Line.Bias.PULL_DOWN                 | 4      |
| -     | Line.RequestType.Direction.AS_IS    | 1      |
| -     | Line.RequestType.Direction.INPUT    | 2      |
| -     | Line.RequestType.Direction.OUTPUT   | 3      |
| -     | Line.RequestType.Event.FALLING_EDGE | 4      |
| -     | Line.RequestType.Event.RISING_EDGE  | 5      |
| -     | Line.RequestType.Event.BOTH_EDGES   | 6      |
| -     | Line.RequestFlags.OPEN_DRAIN        | 1      |
| -     | Line.RequestFlags.OPEN_SOURCE       | 1 << 1 |
| -     | Line.RequestFlags.ACTIVE_LOW        | 1 << 2 |
| -     | Line.RequestFlags.BIAS_DISABLE      | 1 << 3 |
| -     | Line.RequestFlags.BIAS_PULL_DOWN    | 1 << 4 |
| -     | Line.RequestFlags.BIAS_PULL_UP      | 1 << 5 |

## Bulk

Bulk is a way to work with several lines at once:

```javascript
// import gpio from "node-libgpiod"
const gpio = require("node-libgpiod")
// assuming that there is at least one chip
const chip = new gpio.Chip(0)
// get a bulk with 3 lines
const bulk = new gpio.Bulk(chip,[20, 21, 22])
```

| C API                                         | Node.js API                     | Description                   |
| -                                             | -                               | -                             |
| gpiod_chip_get_lines()                        | new gpio.Bulk()                 | get a bulk instance           |
| gpiod_line_get_value_bulk()                   | bulk.values                     | get line values (an array)    |
| gpiod_line_set_value_bulk()                   | bulk.setValues()                | set line values (array)       |
| gpiod_line_request_bulk()                     | bulk.request()                  | get lines according to config |
| gpiod_line_request_bulk_input()               | bulk.requestInputMode()         | set lines for input (read)    |
| gpiod_line_request_bulk_output()              | bulk.requestOutputMode()        | set lines for output (write)  |
| gpiod_line_request_bulk_rising_edge_events()  | bulk.requestRisingEdgeEvents()  | rising edge events            |
| gpiod_line_request_bulk_falling_edge_events() | bulk.requestFallingEdgeEvents() | falling edge events           |
| gpiod_line_request_bulk_both_edges_events()   | bulk.requestBothEdgesEvents()   | both edges events             |
| gpiod_line_set_direction_input_bulk()         | bulk.setDirectionInput()        | set bulk direction to input   |
| gpiod_line_set_direction_output_bulk()        | bulk.setDirectionOutput()       | set bulk direction to output  |
| gpiod_line_set_config_bulk()                  | bulk.updateConfig()             | change bulk config            |
| gpiod_line_set_flags_bulk()                   | bulk.updateFlags()              | change bulk flags             |
| gpiod_line_release_bulk()                     | bulk.release()                  | free the lines in the bulk    |

::: tip

Bulk lines can't be changed on the fly. If needed, release the current bulk and
make a new one.

:::
