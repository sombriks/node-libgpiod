# node-libgpiod

Native nodejs bindings for [libgpiod](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/about/)

[![npm](https://img.shields.io/npm/v/node-libgpiod?style=plastic)](https://www.npmjs.com/package/node-libgpiod)
![Build status](https://github.com/sombriks/node-libgpiod/actions/workflows/node-test.yml/badge.svg)
[![MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Requirements / Dependencies

- libgpiod **1.x** (and devel headers)
- nodejs (and devel headers)
- linux (tested on fedora 33 running on raspberry pi model 3 B+ and rasp pi os on zero w)
- c/c++ development tools

## How to use into your project

First install libgpiod and node development packages, if not installed yet:

### RPM based

```bash
# fedora
sudo dnf install libgpiod libgpiod-devel libgpiod-utils nodejs-devel
```

```bash
# openSUSE
sudo zypper in libgpiod libgpiod-devel libgpiod-utils nodejs-devel
```

### DEB based

```bash
# debian and its variants
sudo apt install gpiod libgpiod2 libgpiod-dev libnode-dev
```

Then just add it as a regular nodejs dependency:

```bash
npm i node-libgpiod
```

[node-gyp](https://www.npmjs.com/package/node-gyp) will do the rest for you.

## Tested platforms

- raspberry pi model 3 B+ (64 bits, 1GB ram) running fedora
- raspberry pi zero w (32 bits, 512MB ram) running rasp pi os
- [LTPPxG2](https://tibbo.com/store/tps/ltpp3g2.html) with sp7021 SoC (32 bits, 512MB ram) running Yocto
- [ROCK 5A](https://docs.radxa.com/en/rock5/rock5a/hardware/rock5a-gpio)

Technically speaking it should work with any modern vanilla kernel and
libgpio 1.x, we're still working on libgpio 2.x

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

See our [testcases](/test) for more information

See [node-libgpiod-examples](https://github.com/sombriks/node-libgpiod-examples)
for more sample code

## known issues

- libgpio 2.x series is around the corner and it's API is incompatible with 1.x
  the 2.x branch (under development) will handle 2.x while 0.x and 1.x will
  support libgpiod 1.x series.

- gpio character device needs
  [special udev rules](https://blog.oless.xyz/post/fedorarpigpio/#udev) in order
  to belong to a special group so non-root users could access it freely

  ```bash
  # /etc/udev/rules.d/85-gpiochip.rules 
  KERNEL=="gpiochip*", SUBSYSTEM=="gpio", MODE="0660", GROUP="wheel"
  ```

- libgpiod must be installed in the system correctly with development headers
  otherwise npm install will fail.
- node will garbage collect Chip and Line too early on certain cases. When
  writing the samples, sometimes the following error kept being thrown:

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

- [X] basic read/write
- [X] basic instant read/write
- [X] Chip/Line abstractions
- [ ] GPIO monitoring callbacks
- [ ] Bulk read/write

All features present on libgpiod eventually will be added to node bindings.

## Contributing

This is open source, i am willing to evaluate PR's :sunglasses:
