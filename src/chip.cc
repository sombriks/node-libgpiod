#include "chip.hh"

Nan::Persistent<v8::Function> Chip::constructor;

NAN_MODULE_INIT(Chip::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Chip").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Chip").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Chip::Chip(const char *device) {
  chip = gpiod_chip_open_lookup(device);
  if (!chip) Nan::ThrowError("Unable to open device");
}

Chip::~Chip() {
  gpiod_chip_close(chip);
}

NAN_METHOD(Chip::New) {
  if (info.IsConstructCall()) {
    Nan::Utf8String device(info[0]);
    Chip *obj = new Chip(*device);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}

gpiod_chip *Chip::getNativeChip() {
  return chip;
}
