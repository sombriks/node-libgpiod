#ifndef CHIP_HH
#define CHIP_HH

#include <gpiod.h>
#include <nan.h>

class Chip : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);
  gpiod_chip* getNativeChip();

 private:
  explicit Chip(const char* device = "0");
  ~Chip();

  static NAN_METHOD(New);
  static NAN_METHOD(getLine);
  static Nan::Persistent<v8::Function> constructor;

  gpiod_chip *chip;
};

#endif // CHIP_HH