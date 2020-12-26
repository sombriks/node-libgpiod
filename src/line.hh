#ifndef LINE_HH  
#define LINE_HH

#include <gpiod.h>
#include <nan.h>

#include "chip.hh"

class Line : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);
  explicit Line(Chip *chip, unsigned int pin);

 private:
  ~Line();

  static NAN_METHOD(New);
  static NAN_METHOD(getValue);
  static NAN_METHOD(setValue);
  static Nan::Persistent<v8::Function> constructor;

  gpiod_line *line;
}; 

#endif // LINE_HH 