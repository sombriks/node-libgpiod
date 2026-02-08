# It's all about javascript and wires, baby

Assuming all requirements where met and environment setup is done, it's time to
do some real work.

## Check your hardware

use the commands `gpiodetect` and `gpioinfo` to get details about the hardware.

Uou need at least two key information:

- gpio chip names or numbers
- gpio lines labels or numbers

On some libraries, you just request a pin and read or write to it.

Although lode-libgpiod offers a `Pin`, it's just a syntax sugar for a line from
the first chip.
