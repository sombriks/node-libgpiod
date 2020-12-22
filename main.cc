#include <stdio.h>
#include <gpiod.h>

#include <nan.h>

NAN_METHOD(version)
{
  info.GetReturnValue()
      .Set(Nan::New<v8::String>(gpiod_version_string())
               .ToLocalChecked());
}

NAN_METHOD(getLine)
{
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  bool active_low = Nan::To<bool>(info[2]).FromJust();
  char *consumer = NULL;

  int value = gpiod_ctxless_get_value(*device, offset, active_low, consumer);

  info.GetReturnValue().Set(Nan::New<v8::Integer>(value));

}

NAN_MODULE_INIT(InitAll)
{
  Nan::Set(target, Nan::New("version").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(version)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLine").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLine)).ToLocalChecked());
}

NODE_MODULE(NativeExtension, InitAll)