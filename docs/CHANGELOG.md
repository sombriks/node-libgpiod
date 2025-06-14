# Changelog

Noteworthy changes

## 2025-06-14

Finally a decent and more realistic autocomplete is implemented. I've got the
typescript configuration done right, added a (thin) javascript layer to receive
jsdocs and boom! proper autocomplete, documentation snippets and so on.

Still facing trouble to test on proper real hardware, all my boards are dead or
dying, but gpio-sim on (virtualized) fedora 38 is holding things together.

## 2024-06-30

- closed the oldest issue, issue #4, covered it with a specific test case
- recomissioned chai. it must be v4 since it's a commonsjs project. more info
  [here](https://github.com/chaijs/chai/issues/1561#issuecomment-1871878274).
- CI/CD still broken, but if i self-host maybe i can get it working! time to
  homelab again!

## 2024-06-29

- acquired an [raxda rock 3c][https://radxa.com/products/rock3/3c/] so i can
  test on real hardware again. my rasp collection is aging and isn't reliable
  anymore.
- did a fedora38 virtual machine and to my happy surprise this version has the
  gpio-sim kernel module built and offers libgpiod 1.6.4! best of two worlds.
- github CI remains unable to run testsuite sadly, tweaked the yaml script to
  use a fedora 38 container but it's just not the same thing.
- on the plus side, thanks to the working gpio-sim on my dev environment i could
  finally cover everything already implemented quite fast. time to look at the
  issues and missing functions, notably bulk and watch operations.

## 2024-04-20

## 0.4.3

- added a more expressive message in exceptions, bubbling the
  [errno](https://en.wikipedia.org/wiki/Errno.h) value in message of thrown
  exception, many thanks to @splitice

## 2024-04-06

## 0.4.2

- adding compile flag so the wrapper work again with older libgpiod versions.
  thanks @alejandroclaro and @splitice for the report, guidance and time.
- working on docs to make people aware of api breaking even inside 1.x series of
  libgpiod.
- working on script to simulate mockup somehow

## 2024-03-29

## 0.4.1

- adding LineFlags definitions contributed by @d-beamon into index.d.ts
- merging a performance improvement contributed by @alessandromrc
- got a good direction on how to use the gpiod-sim <https://github.com/sombriks/node-libgpiod/issues/24>

## 2024-02-24

## 0.4.0

- Finally branched main into two distinct heads
- Prepared a new virtual machine to be able to work with 1.x series
- Still looking for a way to test the native part properly. There is
  [gpiomock][gpiomock] but i can't find it built on any distro i tried
  (opensuse/fedora). for 2.x there is gpio-sim, **IF** i figure out how to use
  it correctly.
- This same log entry on main-2x will be different.

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

- Added Chip::getNumberOfLines which returns the number of available GPIO lines
  on the chip
- Added Chip::getChipName which returns chip's name as represented by the kernel
- Added Chip::getChipLabel which returns chip's label as represented by the
  kernel
- Added Line::getLineOffset which returns line's offset number
- Added Line::getLineName which returns line's name, if set, otherwise undefined
- Added Line::getLineConsumer which returns line's consumer, if set, otherwise
  undefined
- Extended the Typescript .d.ts file with the new methods and added jsdoc
  comments
- Added a condition in the binding.gyp to prevent builds on non-Linux
  environments (aka macs or Windows machines)

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
