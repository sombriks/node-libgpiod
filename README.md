# [node-libgpiod][repo]

Native nodejs bindings for [libgpiod][libgpiod]

[![npm](https://img.shields.io/npm/v/node-libgpiod?style=plastic)][npm]
![Build status](https://github.com/sombriks/node-libgpiod/actions/workflows/node-test.yml/badge.svg)
[![MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Requirements / Dependencies

- libgpiod **2.x** (and devel headers)
- nodejs (and devel headers)
- linux (tested on fedora 33 running on raspberry pi model 3 B+ and rasp pi os on zero w)
- c/c++ development tools

## How to use into your project

First install **libgpiod 2.x** and node development packages, if not installed
already:

### RPM based

```bash
# fedora
sudo dnf install @development-tools g++ \
  libgpiod libgpiod-devel libgpiod-utils \
  nodejs nodejs-devel
```

```bash
# openSUSE
sudo zypper in make g++ libgpiod libgpiod-devel libgpiod-utils nodejs-devel
```

### DEB based

```bash
# debian and its variants
sudo apt install build-essential g++ \
  gpiod libgpiod2 libgpiod-dev libnode-dev
```

Then just add it as a regular nodejs dependency:

```bash
npm i node-libgpiod
```

[node-gyp][node-gyp] will do the rest for you.

## Tested platforms

- [raspberry pi model 3 B+][rpi3] (64 bits, 1GB ram) running fedora
- [raspberry pi zero w][rpi0] (32 bits, 512MB ram) running rasp pi os
- [LTPPxG2][ltppxg2] with sp7021 SoC (32 bits, 512MB ram) running Yocto
- [ROCK 5A][rock5a] 2GB RAM running a custom debian

Technically speaking it should work with any modern vanilla kernel and
libgpio 2.x.

## Status

Version 2.x is going under a heavy redesign, since libgpiod changed its api.

We already are able to read and write pins!

## known issues

- gpio character device needs
  [special udev rules](https://blog.oless.xyz/post/fedorarpigpio/#udev) in order
  to belong to a special group so non-root users could access it freely

  ```bash
  # /etc/udev/rules.d/85-gpiochip.rules 
  KERNEL=="gpiochip*", SUBSYSTEM=="gpio", MODE="0660", GROUP="wheel"
  ```

- libgpiod must be installed in the system correctly with development headers
  otherwise npm install will fail.

## Roadmap

All features present on libgpiod eventually will be added to node bindings.

## Contributing

This is open source, i am willing to evaluate PR's :sunglasses:

[repo]: https://github.com/sombriks/node-libgpiod
[libgpiod]: https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/about
[npm]: https://www.npmjs.com/package/node-libgpiod
[node-gyp]: https://www.npmjs.com/package/node-gyp
[rpi3]: https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#raspberry-pi-3-model-b
[rpi0]: https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#raspberry-pi-zero-w
[ltppxg2]: https://tibbo.com/store/tps/ltpp3g2.html
[rock5a]: https://docs.radxa.com/en/rock5/rock5a/download
