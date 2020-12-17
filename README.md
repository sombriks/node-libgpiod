# node-libgpiod

Native nodejs binding for libgpiod

## requirements

- libgpiod
- nodejs
- linux

## compiling

you'll need node development headers, nan (already listed as project dependency)
and libgpiod library, utils and development headers

## status

this is alpha release, willing to receive contributions

## known issues

- gpio character device needs special udev rules in order to belong to a special
  group so non-root users could access it freely
