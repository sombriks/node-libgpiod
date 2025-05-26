#ifndef LINE_HH
#define LINE_HH

#include <gpiod.h>
#include <nan.h>

#include "chip.hh"

class Line : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);
  static NAN_METHOD(New);
  gpiod_line *getNativeLine();

 private:
  explicit Line(Chip *chip, const char *name);
  explicit Line(Chip *chip, unsigned int pin);
  static Nan::Persistent<v8::Function> constructor;
  ~Line();
  gpiod_line *line;
};

NAN_METHOD(getLineOffset);
NAN_METHOD(getLineName);
NAN_METHOD(getLineConsumer);
NAN_METHOD(getLineDirection);
NAN_METHOD(getLineActiveState);
NAN_METHOD(getLineBias);
NAN_METHOD(isLineUsed);
NAN_METHOD(isLineFree);
NAN_METHOD(isLineOpenDrain);
NAN_METHOD(isLineOpenSource);
NAN_METHOD(update);
NAN_METHOD(needsUpdate);

NAN_METHOD(getValue);
NAN_METHOD(setValue);

NAN_METHOD(lineRequest);

NAN_METHOD(requestInputMode);
NAN_METHOD(requestOutputMode);
NAN_METHOD(requestRisingEdgeEvents);
NAN_METHOD(requestFallingEdgeEvents);
NAN_METHOD(requestBothEdgesEvents);

NAN_METHOD(requestInputModeFlags);
NAN_METHOD(requestOutputModeFlags);
NAN_METHOD(requestRisingEdgeEventFlags);
NAN_METHOD(requestFallingEdgeEventFlags);
NAN_METHOD(requestBothEdgesEventFlags);

NAN_METHOD(release);

#endif  // LINE_HH
