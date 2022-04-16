#ifndef CHIP_HH
#define CHIP_HH

#include <gpiod.h>
#include <nan.h>

#define USE_PRINTF 0

#if USE_PRINTF
#define DOUT(fmt,args...) printf(fmt,##args)
#else
#define DOUT(fmt,args...)
#endif

class Chip : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);
  gpiod_chip* getNativeChip();

 private:
  explicit Chip(const char* device = "0");
  ~Chip();

  static NAN_METHOD(getNumberOfLines);
  static NAN_METHOD(getChipName);
  static NAN_METHOD(getChipLabel);

  static NAN_METHOD(New);
  static Nan::Persistent<v8::Function> constructor;

  gpiod_chip *chip;
};

#endif // CHIP_HH
