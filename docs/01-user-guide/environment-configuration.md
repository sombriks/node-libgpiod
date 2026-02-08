# Environment setup

Besides the proper linux kernel version and node available, development tools
must be present in order to properly build the native part of the library.
Install it following the best suited instructions for your SBC.

## Requirements

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

## libpiod version

::: warning Check your libgpiod version

Current node-libgpiod version supports native libgpiod **from 1.5.x to 1.6.x**
releases.

:::

The libpiod 2.x series introduced breaking changes in the API, and our node
wrapper for this version is currently under construction.

Check the [API coverage](../02-api/libgpiod-1x) for more details.

## User permissions

Another important aspect is the user permissions to proper access to gpio device
exposed by libgpiod.

Some systems properly sets the `gpio` group to `/dev/gpiochip*` devices, some
does not.

You can check owner and group for gpio devices in your SBC by simply listing it:

```bash
ls -la /dev/gpio*
```

If your devices has the wrong group, add this udev rule to fix it:

```bash
# /etc/udev/rules.d/85-gpiochip.rules 
KERNEL=="gpiochip*", SUBSYSTEM=="gpio", MODE="0660", GROUP="gpio"
```

Next, make sure your user (the user running the scripts blinking things) has the
`gpio` group:

```bash
sudo usermod -aG gpio $USER
```

Then log out and login again. Or activate the new group for your actual session:

```bash
newgrp gpio
```

And that's it, the current user should be able to run tools like `gpiodetect`,
`gpioinfo` and run all sort of scripts using the libgpiod goodies.
