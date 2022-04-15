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
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  chip = gpiod_chip_open_lookup(device);
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, chip);
  if (!chip) Nan::ThrowError("Unable to open device");
}

Chip::~Chip() {
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, chip);
  if ( !chip) return;
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, chip);
  gpiod_chip_close(chip);
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, chip);
  chip = NULL;
}

NAN_METHOD(Chip::New) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  if (info.IsConstructCall()) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
    Nan::Utf8String device(info[0]);
    Chip *obj = new Chip(*device);
    DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, obj);
    if ( !obj->chip) return;
    DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, obj);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
}

gpiod_chip *Chip::getNativeChip() {
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, chip);
  return chip;
}
