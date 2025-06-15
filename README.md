# [node-libgpiod][repo]

Native nodejs bindings for [libgpiod][libgpiod]

[![npm](https://img.shields.io/npm/v/node-libgpiod?style=plastic)][npm]
![Build status](https://github.com/sombriks/node-libgpiod/actions/workflows/node-test.yml/badge.svg)
[![MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Requirements / Dependencies

- libgpiod **1.5** minimum required (and devel headers)
- nodejs (and devel headers)
- linux (tested on fedora 33 running on raspberry pi model 3 B+ and rasp pi os on zero w)
- c development tools

## How to use into your project

First install libgpiod and node development packages, if not installed yet:

### RPM based

```bash
# fedora
sudo dnf install @development-tools g++ \
 libgpiod libgpiod-devel libgpiod-utils \
 nodejs nodejs-devel
```

```bash
# openSUSE
sudo zypper in -t pattern devel_basis
sudo zypper in libgpiod libgpiod-devel libgpiod-utils \ 
 nodejs nodejs-devel
```

### DEB based

```bash
# debian and its variants
sudo apt install build-essential gpiod libgpiod2 libgpiod-dev libnode-dev
```

Then just add it as a regular nodejs dependency:

```bash
npm i node-libgpiod
```

[node-gyp][node-gyp] will do the rest for you.

## Tested platforms

- [raspberry pi model 3 B+][rpi3b+] (64 bits, 1GB ram) running fedora
- [raspberry pi zero w][rpi3zw] (32 bits, 512MB ram) running rasp pi os
- [LTPPxG2][LTPPx62] with sp7021 SoC (32 bits, 512MB ram) running Yocto
- [ROCK 5A][ROCK5A] (64 bits, 2GB ram), running debian
- [ROCK 3C][ROCK3C] (64 bits, 2GB ram), running debian

Technically speaking it should work with [any modern vanilla kernel][libgpiod]
and **libgpiod 1.x**.

## What about libgpiod 2.x?

We're still working on [libgpiod 2.x][libgpiod-2x]

## Status

We already are able to read and write pins!

Here goes the sample blink led hello-world.js:

```javascript
const { version, Chip, Line } = require("node-libgpiod");

global.chip = new Chip(0);
global.line = new Line(chip, 17); // led on GPIO17
let count = 10;

console.log(version());
line.requestOutputMode();

const blink = () => {
  if(count){
    line.setValue(count-- % 2);
    setTimeout(blink,1000);
  } // else line.release(); 
  // not needed, libgpiod releases resources on process exit  
};

setTimeout(blink,1000);
```

Another example:

```javascript
const { version, Chip, Line } = require("node-libgpiod");
const express = require("express");

const app = express();
// avoid chip and line being gc-collected
app.chip = new Chip(0);
app.line = new Line(app.chip, 17); // led on GPIO17

console.log(version());
app.line.requestOutputMode();

app.get("/on", (req,res) => {
  app.line.setValue(1);
  res.send("it's on");
});

app.get("/off", (req,res) => {
  app.line.setValue(0);
  res.send("it's off");
});

app.listen(3000);
console.log("running");
```

See our [testcases][test-suite] for more information

See [node-libgpiod-examples][examples]
for more sample code

## known issues

- libgpiod 2.x series is around the corner, and its API is incompatible with 1.x
  the [2.x branch][libgpiod-2x] (under development) will handle 2.x while 0.x
  and 1.x will support libgpiod 1.x series.

- lines should not be defined twice. if, for example, line 19 was defined in the
  program already, then it shall not be redefined _unless_ it gets
  [**released** first][line-release]:

  ```javascript
  // ...
  let l17 = new Line(chip0, 17)
  l17.requestOutputMode()
  l17.setValue(1)

  l17 = new Line(chip0, 17) // ERROR: we didn't release the previous one
  l17.requestOutputMode()
  l17.setValue(1)
  ```

- gpio character device needs [special udev rules][udev-rules] in order
  to belong to a special group, so non-root users could access it freely

  ```bash
  # /etc/udev/rules.d/85-gpiochip.rules 
  KERNEL=="gpiochip*", SUBSYSTEM=="gpio", MODE="0660", GROUP="wheel"
  ```

  Another approach, if your system creates the **gpio** group, is to add the
  user into this group:

  ```bash
  sudo usermod -aG gpio $USER
  ```

- libgpiod must be installed in the system correctly with development headers
  otherwise npm install will fail.
- inside libgpiod 1.x series there is a set of new flags created on 1.5.x
  version around 2019 and they where no back ported to previous ones libgpiod
  releases. Your build might break because of this, we're working on solve this.
- node will garbage collect Chip and Line too early on certain cases. When
  writing the samples, the following error kept being thrown:

  ```bash
  /home/sombriks/git/sample-node-libgpiod/index2.js:12
      line.setValue(count-- % 2);
          ^

  Error: Unable to set value for this line
      at Timeout.blink [as _onTimeout] (/home/sombriks/git/sample-node-libgpiod/index2.js:12:10)
      at listOnTimeout (internal/timers.js:554:17)
      at processTimers (internal/timers.js:497:7)
  ```

  It occurs because main module body was already evaluated and finished while
  interval/timeout function still active, but has no local reference for Chip or
  Line instances.
  Therefore, v8 thinks that those objects can be garbage-collected releasing the
  underlying resources, giving us the error.
  To avoid this, make sure your objects will be present on function scope:

  ```javascript
  const { version, Chip, Line } = require("node-libgpiod");

  const chip = new Chip(0);
  const line = new Line(chip, 17); // led on GPIO17
  let count = 20;

  console.log(version());
  line.requestOutputMode();

  const blink = function () {
    // avoid early gc
    this.chip = chip
    this.line = line
    if(count){
      line.setValue(count-- % 2);
      setTimeout(blink,500);
    }
  };

  setTimeout(blink,500);
  ```

  Or, probably it is even better to create you chip and line instances globally:

  ```javascript
  global.mychip = new Chip(0);
  global.line1 = new Line(chip, 17);
  ```

## Roadmap

- [X] Basic read/write
- [X] Basic instant read/write
- [X] Chip/Line abstractions
- [X] [Simulator configuration][sim-config]
- [ ] GPIO monitoring callbacks
- [ ] Bulk read/write
- [ ] Test cases covering entire gpiod API

All features present on libgpiod eventually will be added to node bindings, then
the node package will finally enter in 1.x series.

Also see our [changelog][changelog] and [project updates][project-updates] for
details.

## Functionality parity

This is the api parity table:

| Description                            | Scope | C                                            | Node                         |
|----------------------------------------|-------|----------------------------------------------|------------------------------|
| get gpiod version                      | Misc  | gpiod_version_string                         | version                      |
| get chip names                         | Misc  | -                                            | getChipNames                 |
| get line's instant value               | Misc  | gpiod_ctxless_get_value                      | getInstantLineValue          |
| set line's instant value               | Misc  | gpiod_ctxless_set_value                      | setInstantLineValue          |
| get chip name                          | Chip  | gpiod_chip_name                              | getChipName                  |
| get chip label                         | Chip  | gpiod_chip_label                             | getChipLabel                 |
| get number of lines in a chip          | Chip  | gpiod_chip_num_lines                         | getNumberOfLines             |
| get all line names from chip           | Chip  | -                                            | getLineNames                 |
| get line by name or number             | Chip  | -                                            | getLine                      |
| get line/pin offset number             | Line  | gpiod_line_offset                            | getLineOffset                |
| get line/pin name                      | Line  | gpiod_line_name                              | getLineName                  |
| get line consumer                      | Line  | gpiod_line_consumer                          | getLineConsumer              |
| get line direction                     | Line  | gpiod_line_direction                         | getLineDirection             |
| get line active state                  | Line  | gpiod_line_active_state                      | getLineActiveState           |
| get line bias                          | Line  | gpiod_line_bias                              | getLineBias                  |
| check if line is used                  | Line  | gpiod_line_is_used                           | isLineUsed                   |
| check if line is open drain            | Line  | gpiod_line_is_open_drain                     | isLineOpenDrain              |
| check if line is open source           | Line  | gpiod_line_is_open_source                    | isLineOpenSource             |
| update line info                       | Line  | gpiod_line_update                            | update                       |
| check if line needs update             | Line  | gpiod_line_needs_update                      | isLineOpenSource             |
| get line/pin value                     | Line  | gpiod_line_get_value                         | getValue                     |
| set line/pin value                     | Line  | gpiod_line_set_value                         | setValue                     |
| request line (pass config options)     | Line  | gpiod_line_request                           | lineRequest                  |
| request line for input                 | Line  | gpiod_line_request_input                     | requestInputMode             |
| request line for output                | Line  | gpiod_line_request_output                    | requestOutputMode            |
| request rising edge events             | Line  | gpiod_line_request_rising_edge_events        | requestRisingEdgeEvents      |
| request falling edge events            | Line  | gpiod_line_request_falling_edge_events       | requestFallingEdgeEvents     |
| request both edges events              | Line  | gpiod_line_request_both_edges_events         | requestBothEdgesEvents       |
| request input with [flags][line-flags] | Line  | gpiod_line_request_input_flags               | requestInputModeFlags        |
| request output with flags              | Line  | gpiod_line_request_output_flags              | requestOutputModeFlags       |
| request rising edge events with flags  | Line  | gpiod_line_request_rising_edge_events_flags  | requestRisingEdgeEventFlags  |
| request falling edge events with flags | Line  | gpiod_line_request_falling_edge_events_flags | requestFallingEdgeEventFlags |
| request both edges events with flags   | Line  | gpiod_line_request_both_edges_events_flags   | requestBothEdgesEventFlags   |
| release the line                       | Line  | gpiod_line_release                           | release                      |

## Other implementations

Those are other notable libgpiod wrapper implementations:

### Official C++ binding

- <https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/bindings/cxx?h=v1.6.x>

### Official Python binding

- <https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/bindings/python?h=v1.6.x>

### Golang binding

### Rust binding

## Contributing

This is open source, i am willing to evaluate PR's :sunglasses:

[repo]: https://github.com/sombriks/node-libgpiod
[libgpiod]: https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/
[npm]: https://www.npmjs.com/package/node-libgpiod
[node-gyp]: https://www.npmjs.com/package/node-gyp
[rpi3b+]: https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/
[rpi3zw]: https://www.raspberrypi.com/products/raspberry-pi-zero-w/
[LTPPx62]: https://tibbo.com/store/tps/ltpp3g2.html
[ROCK5A]: https://radxa.com/products/rock5/5a
[ROCK3C]: https://radxa.com/products/rock3/3c
[libgpiod-2x]: https://github.com/sombriks/node-libgpiod/tree/main-2x
[line-release]: ./test/issues/issue-4.spec.js
[test-suite]: ./test
[examples]: https://github.com/sombriks/node-libgpiod-examples
[udev-rules]: https://blog.oless.xyz/post/fedorarpigpio/#udev
[changelog]: docs/CHANGELOG.md
[project-updates]: https://github.com/sombriks/node-libgpiod/discussions/31
[line-flags]: ./lib/line-flags.js
[sim-config]: ./test/prepare-gpio-sim.sh
