#include "misc.hh"

void misc_callback(void *nanCb) {
  Nan::Callback *callback = static_cast<Nan::Callback *>(nanCb);
  v8::Local<v8::Value> argv[] = {Nan::Null()};
  callback->Call(1, argv);
}

NAN_METHOD(version) {
  info.GetReturnValue()
      .Set(Nan::New<v8::String>(gpiod_version_string())
               .ToLocalChecked());
}

NAN_METHOD(getChipNames) {
  v8::Local<v8::Array> chipNames = Nan::New<v8::Array>();
  gpiod_chip_iter *iter = gpiod_chip_iter_new();
  if (!iter) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getChipNames", "Unable to get chip names"));
    return;
  }
  struct gpiod_chip *chip;
  unsigned int i = 0;
  gpiod_foreach_chip_noclose(iter, chip) {
    chipNames->Set(
        Nan::GetCurrentContext(), i++,
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
  int value = gpiod_ctxless_get_value(*device, offset, active_low, *consumer);
  if (0 > value) {
    std::string error_message = "Unable to get instant value:";
    error_message += " chip: " + std::string(*device) +
                     " line: " + std::to_string(offset) +
                     " value: " + std::to_string(value) +
                     " active_low: " + (active_low ? "true" : "false") +
                     " consumer: '" + std::string(*consumer) + "'";
    Nan::ThrowError(Nan::ErrnoException(errno, "::getInstantLineValue", error_message.c_str()));
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
  Nan::Callback callback(info[5].As<v8::Function>());
  int result = gpiod_ctxless_set_value(
      *device, offset, value, active_low, *consumer,
      &misc_callback, &callback);
  if (0 > result) {
    std::string error_message = "Unable to set instant value:";
    error_message += " chip: " + std::string(*device) +
                     " line: " + std::to_string(offset) +
                     " value: " + std::to_string(value) +
                     " active_low: " + (active_low ? "true" : "false") +
                     " consumer: '" + std::string(*consumer) + "'";
    Nan::ThrowError(Nan::ErrnoException(errno, "::setInstantLineValue", error_message.c_str()));
    return;
  }
  info.GetReturnValue().Set(result);
}

NAN_METHOD(getInstantLineValues) {
  // gpiod_ctxless_get_value_multiple
}

NAN_METHOD(setInstantLineValues) {
  // gpiod_ctxless_set_value_multiple
}

NAN_METHOD(getInstantLineValueFlags) {
  // gpiod_ctxless_get_value_ext
}

NAN_METHOD(setInstantLineValueFlags) {
  // gpiod_ctxless_set_value_ext
}

NAN_METHOD(getInstantLineValuesFlags) {
  // gpiod_ctxless_get_value_multiple_ext
}

NAN_METHOD(setInstantLineValuesFlags) {
  // gpiod_ctxless_set_value_multiple_ext
}
