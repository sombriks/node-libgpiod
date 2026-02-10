# Lifecycle

One important thing about node scripts interfacing with libgpiod is the
lifecycle of the process.

Take the following example:

```javascript
// unsafe-blink,js
// const gpio = require('node-libgpiod')
import gpio from 'node-libgpiod'

const chip = new gpio.Chip(3)

let count = 0

const led = chip.getLine(20)
led.requestOutputMode()

setInterval(() => {
  const v = count++ % 2
  led.setValue(v)
  console.log(`blink ${v}!`)
}, 1000)
```

This infinite loop will eventually die in an error.

Why?

because led is defined ouf of the scope of the anonymous function passed to the
interval, will eventually be garbage-collected and then die.

To avoid this, be sure to own a valid line reference and disposing it properly
after the use:

```javascript
// safe-blink,js
// const gpio = require('node-libgpiod')
import gpio from 'node-libgpiod'

const chip = new gpio.Chip(3)

let count = 0

setInterval(() => {
  const led = chip.getLine(20)
  led.requestOutputMode()
  const v = count++ % 2    
  led.setValue(v)
  console.log(`blink ${v}!`)
  led.release()
}, 1000)
```

So, mind your scope.
