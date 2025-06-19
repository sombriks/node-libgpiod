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

declare fakechip="/sys/kernel/config/gpio-sim/fakegpio"
declare bank0="$fakechip/gpio-bank0"

mkdir -p  $bank0
echo 0  > $fakechip/live
rm -rf    $bank0
mkdir -p  $bank0
echo 54 > $bank0/num_lines

# mimic lines from raspberry pi zero w
for i in $(seq 0 53)
do 
  mkdir -p $bank0/line$i
done
for i in $(seq 2 27)
do 
  echo "GPIO$i" > $bank0/line$i/name
done

# custom oins setup

echo "ID_SDA" > $bank0/line0/name
echo "ID_SCL" > $bank0/line1/name
echo "SDA0"   > $bank0/line28/name
echo "SCL0"   > $bank0/line29/name

mkdir -p             $bank0/line18/hog
echo "hog1"        > $bank0/line18/hog/name
echo "output-high" > $bank0/line18/hog/direction

mkdir -p             $bank0/line19/hog
echo "hog2"        > $bank0/line19/hog/name
echo "output-low"  > $bank0/line19/hog/direction

echo 1 > $fakechip/live

gpiodetect 
gpioinfo

chown root:wheel /dev/gpiochip* 
chmod g+rw /dev/gpiochip*
