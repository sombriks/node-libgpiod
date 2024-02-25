#include "chip.hh"

Nan::Persistent<v8::Function> Chip::constructor;

NAN_MODULE_INIT(Chip::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Chip").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "getNumberOfLines", getNumberOfLines);
  Nan::SetPrototypeMethod(tpl, "getChipName", getChipName);
  Nan::SetPrototypeMethod(tpl, "getChipLabel", getChipLabel);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Chip").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Chip::Chip(const char *device) {
  chip = gpiod_chip_open_lookup(device);
  if (!chip) Nan::ThrowError("Unable to open device");
}

Chip::~Chip() {
  if (!chip) return;
  gpiod_chip_close(chip);
  chip = NULL;
}

NAN_METHOD(Chip::New) {
  if (info.IsConstructCall()) {
    Nan::Utf8String device(info[0]);
    Chip *obj = new Chip(*device);
    if (!obj->chip) return;
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}

NAN_METHOD(Chip::getNumberOfLines) {
  Chip *obj = Nan::ObjectWrap::Unwrap<Chip>(info.This());
  if (!obj->chip) {
    Nan::ThrowError("::getNumberOfLines() for chip==NULL");
    return;
  }
  int ret = gpiod_chip_num_lines(obj->getNativeChip());
  if (-1 == ret) {
    Nan::ThrowError("::getNumberOfLines() failed");
  } else
    info.GetReturnValue().Set(ret);
}

NAN_METHOD(Chip::getChipName) {
  Chip *obj = Nan::ObjectWrap::Unwrap<Chip>(info.This());
  if (!obj->chip) {
    Nan::ThrowError("::getChipName() for chip==NULL");
    return;
  }
  const char *name = gpiod_chip_name(obj->getNativeChip());
  if (!name) {
    Nan::ThrowError("::getChipName() failed");
  } else
    info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
}

NAN_METHOD(Chip::getChipLabel) {
  Chip *obj = Nan::ObjectWrap::Unwrap<Chip>(info.This());
  if (!obj->chip) {
    Nan::ThrowError("::getChipLabel() for chip==NULL");
    return;
  }
  const char *label = gpiod_chip_label(obj->getNativeChip());
  if (!label) {
    Nan::ThrowError("::getChipLabel() failed");
  } else
    info.GetReturnValue().Set(Nan::New<v8::String>(label).ToLocalChecked());
}

gpiod_chip *Chip::getNativeChip() {
  return chip;
}
