#ifndef NODE_LIBGPIOD_HH
#define NODE_LIBGPIOD_HH

#include <gpiod.h>
#include <nan.h>

#include <iostream>

NAN_METHOD(version);
NAN_METHOD(getChipNames);
NAN_METHOD(getInstantLineValue);
NAN_METHOD(setInstantLineValue);

#endif  // NODE_LIBGPIOD_HH