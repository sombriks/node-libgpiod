# It's all about javascript and wires, baby

Assuming all requirements where met and environment setup is done, it's time to
do some real work.

## Check your hardware

use the commands `gpiodetect` and `gpioinfo` to get details about the hardware.

Uou need at least two key information:

- The gpio chip names or numbers.
- The gpio lines labels or numbers.

On some libraries, you just request a pin and read or write to it.

Although node-libgpiod offers a `Pin`, it's just a syntax sugar for a line from
the first chip.

## Create a chip

It's pretty simple:

```javascript
// const gpio = require('node-libgpiod')
import gpio from 'node-libgpiod'

const chip = new gpio.Chip(0)

// ...
```

To be sure about the chip namer or number, check available chops with
`gpiodetect`.

## create a line

Once you have a chip instance, get the line you want to work with:

```javascript
import gpio from 'node-libgpiod'

const chip = new gpio.Chip(0)

// const line = new gpio.Line(chip, 20)
const line = chip.getLine(20)

line.requestOutputMode()
line.setValue(1)

// line.requestInputMode()
// let v = line.getValue()
// let v2 = line.value

// ...

// if(line.used)
// if(!line.free)
line.release()

//...
```

Key features about the line are:

- You must set the **mode** before perform any operation on the line.
- Once you're done with the line, **release** it. If it goes out of scope, the
  garbage collector will take care of it, but if it's not collected yet, it will
  throw an error.

## It's up to the SBC docs to document the available lines

It is possible to create chips and lines either by their numbers, found using
`gpiodetect` and `gpioinfo`, but also by their names.

It's common to find line names like **GPIO_7**, but it will depend on the
specific hardware and software combination.

If things get hard and documentation get scarce, you can scan the hardware using
libgpiod tools or some scripts to check the hardware:

```javascript
// scan.js
// const gpio = require('node-libgpiod')
import gpio from 'node-libgpiod'

for(const chName of gpio.chipNames) {
  const chip = new gpio.Chip(chName)
  for(const n in chip.lineNames) {
    console.log(`chip ${chName} line #${n}: ${chip.lineNames[n]}`)
  }
}
```
