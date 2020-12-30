# node-libgpiod

Native nodejs bindings for libgpiod

[![npm](https://img.shields.io/npm/v/node-libgpiod?style=plastic)](https://www.npmjs.com/package/node-libgpiod)

[[TOC]]

## Requirements

- libgpiod (and devel headers)
- nodejs (and devel headers)
- linux (tested on fedora 33 running on raspberry pi model 3 B+)
- c/c++ development tools

## Compiling

Just add it as a regular nodejs dependency:

```bash
npm i node-libgpiod
```

[node-gyp](https://www.npmjs.com/package/node-gyp) will do the rest for you

## Status

We already are able to read and write pins!

Here goes the sample blink led hello-world.js:

```javascript
const { version, Chip, Line } = require("node-libgpiod");

const chip = new Chip(0);
const line = new Line(chip, 17); // led on GPIO17
let count = 10;

console.log(version());
line.requestOutputMode();

const interval = setInterval(() => {
  if(count-->0) {
      line.setValue(count % 2);
      setTimeout(blink, 500);
  } else {
    clearInterval(interval);
    line.release();
  }
}, 1000);
```

See our testcases for more information

## known issues

- gpio character device needs special udev rules in order to belong to a special
  group so non-root users could access it freely
- libgpiod must be installed in the system correctly with development headers
  otherwise npm install will fail.

## Roadmap

- [X] basic read/write
- [X] basic instant read/write
- [X] Chip/Line abstractions
- [ ] GPIO monitoring callbacks
- [ ] Bulk read/write

All features present on libgpiod eventually will be added to node bindings.