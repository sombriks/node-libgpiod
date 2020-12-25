#ifndef NODE_LIBGPIOD_HH
#define NODE_LIBGPIOD_HH

#include <gpiod.h>
#include <nan.h>
#include <stdio.h>

NAN_METHOD(version);
NAN_METHOD(getInstantLineValue);
NAN_METHOD(setInstantLineValue);

NAN_MODULE_INIT(InitAll);

class Chip : Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);

 private:
  explicit Chip(const char* device = "0");
  ~Chip();

  static NAN_METHOD(New);
  static NAN_METHOD(getLine);
  static Nan::Persistent<v8::Function> constructor;

  gpiod_chip *chip;
};

#endif  // NODE_LIBGPIOD_HH