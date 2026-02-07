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
import { Chip } from 'node-libgpiod'

const chip = new Chip(0)
const led = chip.getLine(21)

led.requestOutputMode()

let count = 5

const interval = setInterval(() => {
  if(count > 0) led.setValue(count-- % 2)
  else led.release() 
}, 1000)
while(led.used){
  // console.log('hardware resources still being used')
}
clearInterval(interval)
```

## Further steps

For more details, check out the rest of the docs.
