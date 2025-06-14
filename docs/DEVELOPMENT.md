# Development

Whenever someone needs to modify or enhance something in libgpiod, a few things
must be done to prepare the development environment for it.

## Environment setup

To consume the library all it takes is to have node and libgpiod itself, just as
described in the [README][README].

To extend it, however, you need to know better the libgpiod provided by the
target platform.

### A tale of fragmentation

So far, there is at least 3 big releases to be aware of:

- [gpiod 1.4][gpiod-1.4]
- [gpiod 1.6][gpiod-1.6]
- [gpiod 2.0][gpiod-2.0]

The 1.5 version introduced new functionality still present in 1.6, 1.4 can be
considered the last in the "old" libgpiod still present on many systems out
there.

I decided to give up 1.4 series for now.

The 2.0 is a brand 'new' (several years old now) API with a very distinct way to
work with chips and lines and requests.

### Your openSUSE Tumbleweed daily driver might not be suitable for that work

Modern linux desktop is already shipping gpiod 2.x series, but node-libgpiod is
still under development. It might be a bit challenging proper setup the system
to compile against an older libgpiod version.

Currently my recommendation is to setup a reasonable recent linux distro with
the proper gpiod version being worked on (1.6).

I have a **Fedora 38** virtual machine just for that purpose at the moment, but
i am thinking on other ways to work around this version issue.

## Testing

Proper test is another challenge.

You see, the [examples project][examples] exists because back then i had the
time and the hardware to test it, but not the experience to write proper unit
and integration tests involving this.

But if the kernel module maintainer [wrote 100% software tests][gpiod-2x-test],
so can we!

I hope so.

### Mocking and simulating

There are two tools, two kernel modules, to help us on that endeavor:
[gpio-mockup][gpio-mockup], being discontinued, and [gpio-sim][gpio-sim], the
maintained one.

There is [this thread][reddit-lead] and good
[reference material][examples-native] to get started with.

The fedora 38 setup offers node libgpiod 1.6.4 and gpio-sim, which is a good
combo for 1.x series. But it's an EOL'ed distro, so some alternative must be
worked on in near future in order to keep 1.x going on.

[README]: ../README.md
[gpiod-1.4]: https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/log/?h=v1.4.x
[gpiod-1.6]: https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/log/?h=v1.6.x
[gpiod-2.0]: https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/log/?h=v2.0.x
[examples]: https://github.com/sombriks/node-libgpiod-examples
[gpiod-2x-test]: https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/tests/gpiod-test.c?h=v2.0.x
[gpio-mockup]: https://docs.kernel.org/admin-guide/gpio/gpio-mockup.html
[gpio-sim]: https://docs.kernel.org/admin-guide/gpio/gpio-sim.html
[reddit-lead]: https://www.reddit.com/r/raspberry_pi/comments/1aygn6h/comment/l3jn5ir/
[examples-native]: https://github.com/starnight/libgpiod-example
