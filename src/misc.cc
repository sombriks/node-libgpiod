#include "node_libgpiod.hh"

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

  int value = gpiod_ctxless_get_value(*device, offset, active_low, *consumer);

  info.GetReturnValue().Set(Nan::New<v8::Integer>(value));
}

NAN_METHOD(setInstantLineValue) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  unsigned int value = Nan::To<unsigned int>(info[2]).FromJust();
  bool active_low = Nan::To<bool>(info[3]).FromJust();
  Nan::Utf8String consumer(info[4]);

  int result = gpiod_ctxless_set_value(*device, offset, value, active_low, *consumer, NULL, NULL);

  if (result == -1)
    info.GetReturnValue().Set(Nan::New<v8::Boolean>(false));
  else
    info.GetReturnValue().Set(Nan::New<v8::Boolean>(true));
}

NAN_MODULE_INIT(InitAll) {
  Nan::Set(target, Nan::New("version").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(version)).ToLocalChecked());
  Nan::Set(target, Nan::New("getInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getInstantLineValue)).ToLocalChecked());
  Nan::Set(target, Nan::New("setInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(setInstantLineValue)).ToLocalChecked());
  Chip::Init(target);
}

NODE_MODULE(NativeExtension, InitAll)