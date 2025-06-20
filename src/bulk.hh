#ifndef BULK_HH
#define BULK_HH

#include <gpiod.h>
#include <nan.h>
#include <string.h>

#include "chip.hh"

class Bulk : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);
  gpiod_line_bulk *getNativeBulk();

 private:
  explicit Bulk(Chip *chip, unsigned int lines[], unsigned int count);
  explicit Bulk(Chip *chip);
  explicit Bulk(Chip *chip, const char **lines);
  ~Bulk();
  static NAN_METHOD(New);
  static Nan::Persistent<v8::Function> constructor;
  gpiod_line_bulk bulk;
};

NAN_METHOD(getValues);
NAN_METHOD(setValues);

NAN_METHOD(requestBulkInputMode);
NAN_METHOD(requestBulkOutputMode);

NAN_METHOD(requestBulkRisingEdgeEvents);
NAN_METHOD(requestBulkFallingEdgeEvents);
NAN_METHOD(requestBulkBothEdgesEvents);

NAN_METHOD(requestBulkDirectionInput);
NAN_METHOD(requestBulkDirectionOutput);

NAN_METHOD(requestBulk);
NAN_METHOD(setConfigBulk);
NAN_METHOD(setFlagsBulk);

NAN_METHOD(requestBulkInputFlags);
NAN_METHOD(requestBulkOutputFlags);
NAN_METHOD(requestBulkRisingEdgeEventsFlags);
NAN_METHOD(requestBulkFallingEdgeEventsFlags);
NAN_METHOD(requestBulkBothEdgesEventsFlags);

NAN_METHOD(releaseBulk);

#endif  // BULK_HH
