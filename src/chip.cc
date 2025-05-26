#include "chip.hh"

Chip::Chip(const char *device) {
  if (!device || strcmp(device, "undefined") == 0)
    chip = gpiod_chip_open_by_number(0);
  else
    chip = gpiod_chip_open_lookup(device);
  if (!chip) {
    std::string msg = "Chip::new - Unable to open device ";
    msg = msg + device;
    Nan::ThrowError(Nan::ErrnoException(errno, msg.c_str()));
  }
}

Chip::~Chip() {
  gpiod_chip_close(chip);
  chip = NULL;
}

gpiod_chip *Chip::getNativeChip() {
  return chip;
}

Nan::Persistent<v8::Function> Chip::constructor;

NAN_MODULE_INIT(Chip::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Chip").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Chip").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
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

NAN_METHOD(getChipName) {
  Chip *obj = Nan::ObjectWrap::Unwrap<Chip>(info[0]->ToObject(Nan::GetCurrentContext()).ToLocalChecked());
  const char *name = gpiod_chip_name(obj->getNativeChip());
  if (!name) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getChipName() failed"));
  } else {
    info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
  }
}

NAN_METHOD(getChipLabel) {
  Chip *obj = Nan::ObjectWrap::Unwrap<Chip>(info[0]->ToObject(Nan::GetCurrentContext()).ToLocalChecked());
  const char *label = gpiod_chip_label(obj->getNativeChip());
  if (!label) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getChipLabel() failed"));
  } else
    info.GetReturnValue().Set(Nan::New<v8::String>(label).ToLocalChecked());
}

NAN_METHOD(getNumberOfLines) {
  Chip *obj = Nan::ObjectWrap::Unwrap<Chip>(info[0]->ToObject(Nan::GetCurrentContext()).ToLocalChecked());
  int ret = gpiod_chip_num_lines(obj->getNativeChip());
  if (-1 == ret) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getNumberOfLines() failed"));
  } else {
    info.GetReturnValue().Set(ret);
  }
}

NAN_METHOD(getLineNames) {
  Chip *obj = Nan::ObjectWrap::Unwrap<Chip>(info[0]->ToObject(Nan::GetCurrentContext()).ToLocalChecked());
  struct gpiod_line_bulk bulk;
  gpiod_line_bulk_init(&bulk);
  if (gpiod_chip_get_all_lines(obj->getNativeChip(), &bulk) < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineNames() failed"));
    return;
  }
  v8::Local<v8::Array> names = Nan::New<v8::Array>(bulk.num_lines);
  int i = -1;
  while (++i < bulk.num_lines) {
    const char *name = gpiod_line_name(bulk.lines[i]);
    if (name) {
      names->Set(info.GetIsolate()->GetCurrentContext(), i,  //
                 Nan::New<v8::String>(name).ToLocalChecked());
    }
  }
  gpiod_line_release_bulk(&bulk);
  info.GetReturnValue().Set(names);
}
