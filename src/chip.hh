#ifndef CHIP_HH
#define CHIP_HH

#include <gpiod.h>
#include <nan.h>
#include <string.h>

class Chip : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);
  gpiod_chip* getNativeChip();

 private:
  explicit Chip(const char* device);
  ~Chip();
  static NAN_METHOD(New);
  static Nan::Persistent<v8::Function> constructor;
  gpiod_chip* chip;
};

NAN_METHOD(getChipName);
NAN_METHOD(getChipLabel);
NAN_METHOD(getNumberOfLines);
NAN_METHOD(getLineNames);

#endif  // CHIP_HH
