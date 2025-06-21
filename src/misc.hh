#ifndef NODE_LIBGPIOD_HH
#define NODE_LIBGPIOD_HH

#include <gpiod.h>
#include <nan.h>

NAN_METHOD(version);
NAN_METHOD(getChipNames);

NAN_METHOD(getInstantLineValue);
NAN_METHOD(setInstantLineValue);

NAN_METHOD(getInstantLineValues);
NAN_METHOD(setInstantLineValues);

NAN_METHOD(getInstantLineValueFlags);
NAN_METHOD(setInstantLineValueFlags);

NAN_METHOD(getInstantLineValuesFlags);
NAN_METHOD(setInstantLineValuesFlags);

#endif  // NODE_LIBGPIOD_HH