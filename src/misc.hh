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

// gpiod_ctxless_event_monitor
// gpiod_ctxless_event_monitor_ext
// gpiod_ctxless_event_monitor_multiple
// gpiod_ctxless_event_monitor_multiple_ext

#endif  // NODE_LIBGPIOD_HH