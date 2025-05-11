#!/bin/sh

# This script makes use of gpio-sim to create a fake chip so our test suite can
# check if the library is doing its job. 

# Without it all testcases will fail.

# remember to create the udev rule:
#  # /etc/udev/rules.d/85-gpiochip.rules 
#  KERNEL=="gpiochip*", SUBSYSTEM=="gpio", MODE="0660", GROUP="wheel"

# for gpio-sim
# see https://docs.kernel.org/admin-guide/gpio/gpio-sim.html

# for gpio-mockup
# see https://docs.kernel.org/admin-guide/gpio/gpio-mockup.html

modprobe gpio-sim
# insmod /lib/modules/6.8.9-100.fc38.x86_64/kernel/drivers/gpio/gpio-sim.ko.xz

for i in $(seq 1 40)
do 
  mkdir -p /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line$i
done
echo 40 > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/num_lines
echo 1 > /sys/kernel/config/gpio-sim/fakegpio/live
gpiodetect 
gpioinfo
chown root:wheel /dev/gpiochip* 
chmod g+rw /dev/gpiochip*

echo "run sudo sh -c 'echo 0 > /sys/kernel/config/gpio-sim/fakegpio/live' to modify the simulator setup" 