#include "misc.hh"

NAN_METHOD(version) {
  info.GetReturnValue()
      .Set(Nan::New<v8::String>(gpiod_version_string())
               .ToLocalChecked());
}

NAN_METHOD(getChipNames) {
  v8::Local<v8::Array> chipNames = Nan::New<v8::Array>();
  gpiod_chip_iter *iter = gpiod_chip_iter_new();
  if (!iter) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getChipNames - Unable to get chip names"));
    return;
  }

  struct gpiod_chip *chip;
  unsigned int i = 0;
  gpiod_foreach_chip_noclose(iter, chip) {
    chipNames->Set(
        info.GetIsolate()->GetCurrentContext(),
        i++,
        Nan::New<v8::String>(gpiod_chip_name(chip)).ToLocalChecked());
  }

  gpiod_chip_iter_free(iter);
  info.GetReturnValue().Set(chipNames);
}

NAN_METHOD(getInstantLineValue) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  bool active_low = Nan::To<bool>(info[2]).FromJust();
  Nan::Utf8String consumer(info[3]);

  int value = -1;
  if (-1 == (value = gpiod_ctxless_get_value(*device, offset, active_low, *consumer))) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getInstantLineValue - Unable to get instant value"));
    return;
  }

  info.GetReturnValue().Set(value);
}

NAN_METHOD(setInstantLineValue) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  unsigned int value = Nan::To<unsigned int>(info[2]).FromJust();
  bool active_low = Nan::To<bool>(info[3]).FromJust();
  Nan::Utf8String consumer(info[4]);

  if (-1 == gpiod_ctxless_set_value(*device, offset, value, active_low, *consumer, NULL, NULL)) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::setInstantLineValue - Unable to get instant value"));
    return;
  }

  info.GetReturnValue().Set(1);
}