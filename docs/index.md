# Overview

This is the documentation on **node-libgpiod**. Here ypu find the minimum needed
to make yur SBC rig blink things with ease using [node.js][node].

[node]: https://nodejs.org

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

::: code-group

```bash [Fedora/RHEL-based]
sudo dnf install @development-tools g++ \
 libgpiod libgpiod-devel libgpiod-utils \
 nodejs nodejs-devel
```

```bash [openSUSE]
sudo zypper in -t pattern devel_basis
sudo zypper in libgpiod libgpiod-devel libgpiod-utils
sudo zypper in nodejs-default nodejs-devel-default
```

```bash [debina/ubuntu-based]
sudo apt install build-essential gpiod libgpiod2 \
 libgpiod-dev libnode-dev nodejs npm
```

:::

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

For more, check out the examples of the api.
