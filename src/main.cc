
#include "misc.hh"
#include "chip.hh"
#include "line.hh"

NAN_MODULE_INIT(InitAll) {
  Nan::Set(target, Nan::New("version").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(version)).ToLocalChecked());
  Nan::Set(target, Nan::New("getInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getInstantLineValue)).ToLocalChecked());
  Nan::Set(target, Nan::New("setInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(setInstantLineValue)).ToLocalChecked());
  Chip::Init(target);
  Line::Init(target);
}

NODE_MODULE(NativeExtension, InitAll)