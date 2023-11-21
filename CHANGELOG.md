# changelog

## 2023-11-15

### 0.3.2

- added new `Pin(n)` as a syntax sugar to get a new `Line(n)` from `Chip(0)`.
- put the workflow to run tests but mostly are ignored for the moment. i am
  looking for a proper way to simulate a chip.

## 2023-11-13

### 0.3.1

- Merged PR #12 from @khill-fbmc fixing errors in index.d.ts
- Some dependency version bumps, it compiles again under node 18.
- Added GitHub Action to ease release process

I'll try to streamline more the changes we receive, let me know if anything needs
immediate attention.

## 2022-04-17

### 0.3.0

- Added Chip::getNumberOfLines which returns the number of available GPIO lines on the chip
- Added Chip::getChipName which returns chip's name as represented by the kernel
- Added Chip::getChipLabel which returns chip's label as represented by the kernel
- Added Line::getLineOffset which returns line's offset number
- Added Line::getLineName which returns line's name, if set, otherwise undefined
- Added Line::getLineConsumer which returns line's consumer, if set, otherwise undefined
- Extended the Typescript .d.ts file with the new methods and added jsdoc comments
- Added a condition in the binding.gyp to prevent builds on non-Linux environments (aka development machines)

## 2022-04-15

### 0.2.2

Fix for double line instantiation on same process contributed by [dmitrydvorkin](https://github.com/dmitrydvorkin)

## 2022-03-11

created the changelog file so we can properly track changes and contributions

### 0.2.1

Fixed argument index of consumer name on requestInputMode by [noctarius](https://github.com/noctarius)

## 2022-03-09

### 0.2.0

code fix and type definitions contributed by [noctarius](https://github.com/noctarius)

## 2020-12-30

### 0.1.4

first really usable version. present on [node-libgpiod-examples](https://github.com/sombriks/node-libgpiod-examples)

## 2020-12-17

### 0.0.1

initial release on npm
