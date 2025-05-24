#ifndef NODE_LIBGPIOD_HH
#define NODE_LIBGPIOD_HH

#include <iostream>

#include <gpiod.h>
#include <nan.h>

NAN_METHOD(version);
NAN_METHOD(getInstantLineValue);
NAN_METHOD(setInstantLineValue);

#endif  // NODE_LIBGPIOD_HH