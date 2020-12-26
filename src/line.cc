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
  if(!line) Nan::ThrowError("Unable to open gpio line ");
  // std::cout << "Chip: " << chip << std::endl;
  // std::cout << "pin: " << pin << std::endl;
  // std::cout << "Line: " << line << std::endl;
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
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  info.GetReturnValue().Set(gpiod_line_get_value(obj->getNativeLine()));
}

NAN_METHOD(Line::setValue) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  unsigned int value = Nan::To<unsigned int>(info[0]).FromJust();
  int ret = gpiod_line_set_value(obj->getNativeLine(), value);
  info.GetReturnValue().Set(ret);
}

gpiod_line *Line::getNativeLine() {
  return line;
}
