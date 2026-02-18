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

## Line

## Bulk

## C / Node API parity
