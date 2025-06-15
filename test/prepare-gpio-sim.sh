#!/bin/sh

# This script makes use of gpio-sim to create a fake chip so our test suite can
# check if the library is doing its job. 

# Without it all testcases will fail.

# remember to create the udev rule:
#
#  # /etc/udev/rules.d/85-gpiochip.rules 
#  KERNEL=="gpiochip*", SUBSYSTEM=="gpio", MODE="0660", GROUP="wheel"
#
# OR add the user into gpio grou:
#
#  sudo usermod -aG gpio $USER
#

# for gpio-sim
# see https://docs.kernel.org/admin-guide/gpio/gpio-sim.html

modprobe gpio-sim

mkdir -p  /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0
echo 0  > /sys/kernel/config/gpio-sim/fakegpio/live
rm -rf    /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0
echo 54 > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/num_lines

# mimic lines from raspberry pi zero w
for i in $(seq 0 53)
do 
  mkdir -p /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line$i
done
for i in $(seq 2 27)
do 
  echo "GPIO0$i" > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line$i/name
done

# custom oins setup

echo "GPIO18"      > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line18/name
mkdir -p             /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line18/hog
echo "hog1"        > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line18/hog/name
echo "output-high" > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line18/hog/direction

echo "GPIO19"      > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line19/name
mkdir -p             /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line19/hog
echo "hog2"        > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line19/hog/name
echo "output-low"  > /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line19/hog/direction

echo 1 > /sys/kernel/config/gpio-sim/fakegpio/live

gpiodetect 
gpioinfo

chown root:wheel /dev/gpiochip* 
chmod g+rw /dev/gpiochip*
