
#include "chip.hh"
#include "line.hh"
#include "misc.hh"

NAN_MODULE_INIT(InitAll) {
  // misc functions
  Nan::Set(target, Nan::New("version").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(version)).ToLocalChecked());
  Nan::Set(target, Nan::New("getInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getInstantLineValue)).ToLocalChecked());
  Nan::Set(target, Nan::New("setInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(setInstantLineValue)).ToLocalChecked());

  Chip::Init(target);
  Nan::Set(target, Nan::New("getChipName").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getChipName)).ToLocalChecked());
  Nan::Set(target, Nan::New("getChipLabel").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getChipLabel)).ToLocalChecked());
  Nan::Set(target, Nan::New("getNumberOfLines").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getNumberOfLines)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLineNames").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineNames)).ToLocalChecked());
}

NODE_MODULE(NativeExtension, InitAll)