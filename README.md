# node-libgpiod

Native nodejs binding for libgpiod

[![npm](https://img.shields.io/npm/v/node-libgpiod?style=plastic)](https://www.npmjs.com/package/node-libgpiod)

## requirements

- libgpiod
- nodejs
- linux

## compiling

You'll need node development headers, nan, libgpiod library, utils and the 
development headers

## status

This is pre-alpha release, not working yet, willing to receive contributions!

## known issues

- gpio character device needs special udev rules in order to belong to a special
  group so non-root users could access it freely
- libgpiod must be installed in the system correctly with development headers
  otherwise npm install will fail.
