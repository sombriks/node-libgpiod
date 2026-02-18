# [node-libgpiod][repo]

[repo]: https://github.com/sombriks/node-libgpiod

Native nodejs bindings for [libgpiod][libgpiod]

|                           |                                       |                           |
| ------------------------- | ------------------------------------- | ------------------------- |
| [![npm][shield-npm]][npm] | ![Build status][shield-test]          | [![MIT][shield-mit]][mit] |
| ![downloads][down]        | [![Sponsor][shield-sponsor]][sponsor] |                           |

[shield-npm]: https://img.shields.io/npm/v/node-libgpiod?style=plastic
[npm]: https://www.npmjs.com/package/node-libgpiod
[shield-test]: https://github.com/sombriks/node-libgpiod/actions/workflows/node-test.yml/badge.svg
[shield-mit]: https://img.shields.io/badge/license-MIT-blue
[mit]: https://github.com/sombriks/node-libgpiod/LICENSE
[down]: https://img.shields.io/npm/dt/node-libgpiod.svg
[sponsor]: https://github.com/sponsors/sombriks
[shield-sponsor]: https://img.shields.io/github/sponsors/sombriks?label=Sponsor&logo=GitHub&color=ff69b4

## Quickstart

You need, to get started:

- An [SBC running a modern linux][sbc]
- Node.js (version **12** or newer) installed with devel headers
- Linux [libgpiod][libgpiod] (version **1.5** or **1.6**) installed with devel
  headers
- C++ and Python tooling installed

[sbc]: https://en.wikipedia.org/wiki/Single-board_computer
[libgpiod]: https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/

## Installing requirements

Install the dependencies on your system:

### Fedora

```bash [Fedora/RHEL-based]
sudo dnf install @development-tools g++ \
 libgpiod libgpiod-devel libgpiod-utils \
 nodejs nodejs-devel
```

### OpenSUSE

```bash [openSUSE]
sudo zypper in -t pattern devel_basis
sudo zypper in libgpiod libgpiod-devel libgpiod-utils
sudo zypper in nodejs-default nodejs-devel-default
```

### Debian

```bash [debina/ubuntu-based]
sudo apt install build-essential gpiod libgpiod2 \
 libgpiod-dev libnode-dev nodejs npm
```

## Install the npm dependency

Now, in your npm project, install the library:

```bash
npm i node-libgpiod
```

The native part will be compiled during the installation.

## Blink a led

Do the hello world:

```javascript
// blink.js
import gpio from 'node-libgpiod'

const chip = new gpio.Chip(0)
const led = chip.getLine(20)

led.requestOutputMode()

let count = 5

const interval = setInterval(() => {
  if(count > 0) {
    const v = count-- % 2
    led.setValue(v)
    console.log(`blink ${v}!`)
  } else {
  led.setValue(0)
    led.release() 
    clearInterval(interval)
  } 
}, 1000)
```

## Further steps

Check out or [complete documentation][docs].

[docs]: https://node-libgpiod.sombriks.net
