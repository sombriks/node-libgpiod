#include "node_libgpiod.hh"

Nan::Persistent<v8::Function> Line::constructor;

NAN_MODULE_INIT(Line::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Line").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "getValue", getValue);
  Nan::SetPrototypeMethod(tpl, "setValue", setValue);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Line").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Line::Line(Chip *chip, unsigned int pin) {
  line = gpiod_chip_get_line(chip->getNativeChip(), pin);
}

Line::~Line() {
  gpiod_line_close_chip(line);
}

NAN_METHOD(Line::New) {
  if (info.IsConstructCall()) {
    Chip *chip = Nan::ObjectWrap::Unwrap<Chip>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
    unsigned int pin = Nan::To<unsigned int>(info[1]).FromJust();
    Line *obj = new Line(chip, pin);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}

NAN_METHOD(Line::getValue) {

}

NAN_METHOD(Line::setValue) {

}
