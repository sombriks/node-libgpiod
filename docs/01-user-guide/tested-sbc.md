# Tested Hardware

This library is built on topo of industry standards, but it's always good to
know if anyone had success before.

- [raspberry pi model 3 B+][rpi3b+] (64 bits, 1GB ram) running fedora
- [raspberry pi zero w][rpi3zw] (32 bits, 512MB ram) running rasp pi os
- [LTPPxG2][LTPPx62] with sp7021 SoC (32 bits, 512MB ram) running Yocto
- [ROCK 5A][ROCK5A] (64 bits, 2GB ram), running debian
- [ROCK 3C][ROCK3C] (64 bits, 2GB ram), running debian

[rpi3b+]: https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/
[rpi3zw]: https://www.raspberrypi.com/products/raspberry-pi-zero-w/
[LTPPx62]: https://tibbo.com/store/tps/ltpp3g2.html
[ROCK5A]: https://radxa.com/products/rock5/5a
[ROCK3C]: https://radxa.com/products/rock3/3c

Some hardware details follows.

## Raspberry pi zero w

::: code-group

<<< hardware/zero-w-gpiodetect.txt
<<< hardware/zero-w-gpioinfo.txt
<<< hardware/zero-w-inxi-f.txt

:::

Check the [raspberry pi gpio pinout](hardware/RASPBERRY-PI-J8-PINOUT.md) for
more details.

## Radxa rock 3c

::: code-group

<<< hardware/radxa-rock3c-gpiodetect.txt
<<< hardware/radxa-rock3c-gpioinfo.txt
<<< hardware/radxa-rock3c-inxi-f.txt

:::

Check the [rock 3c gpio pinout](hardware/RADXA-ROCK3C-PINOUT.md) for more
details.
