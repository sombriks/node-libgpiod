#include <stdio.h>
#include <gpiod.h>

#include <nan.h>

NAN_METHOD(version);
NAN_METHOD(getInstantLineValue);
NAN_METHOD(setInstantLineValue);

NAN_MODULE_INIT(InitAll);