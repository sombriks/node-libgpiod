#include "misc.hh"

NAN_METHOD(version) {
  info.GetReturnValue()
      .Set(Nan::New<v8::String>(gpiod_version_string())
               .ToLocalChecked());
}

NAN_METHOD(getInstantLineValue) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  bool active_low = Nan::To<bool>(info[2]).FromJust();
  Nan::Utf8String consumer(info[3]);

  int value = -1;
  if (-1 == (value = gpiod_ctxless_get_value(*device, offset, active_low, *consumer))) {
    Nan::ThrowError("Unable to get instant value");
    return;
  }

  info.GetReturnValue().Set(Nan::New<v8::Integer>(value));
}

NAN_METHOD(setInstantLineValue) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  unsigned int value = Nan::To<unsigned int>(info[2]).FromJust();
  bool active_low = Nan::To<bool>(info[3]).FromJust();
  Nan::Utf8String consumer(info[4]);

  if (-1 == gpiod_ctxless_set_value(*device, offset, value, active_low, *consumer, NULL, NULL)) {
    Nan::ThrowError("Unable to get instant value");
    return;
  }

  info.GetReturnValue().Set(true);
}