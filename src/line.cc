#include "line.hh"

Nan::Persistent<v8::Function> Line::constructor;

NAN_MODULE_INIT(Line::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Line").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "getLineOffset", getLineOffset);
  Nan::SetPrototypeMethod(tpl, "getLineName", getLineName);
  Nan::SetPrototypeMethod(tpl, "getLineConsumer", getLineConsumer);
  Nan::SetPrototypeMethod(tpl, "getValue", getValue);
  Nan::SetPrototypeMethod(tpl, "setValue", setValue);
  Nan::SetPrototypeMethod(tpl, "requestInputMode", requestInputMode);
  Nan::SetPrototypeMethod(tpl, "requestOutputMode", requestOutputMode);
  Nan::SetPrototypeMethod(tpl, "release", release);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Line").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Line::Line(Chip *chip, unsigned int pin) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  line = gpiod_chip_get_line(chip->getNativeChip(), pin);
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, line);
  if (!line) Nan::ThrowError("Unable to open GPIO line ");
}

Line::~Line() {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  if ( !line) return;
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  gpiod_line_close_chip(line);
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  line = NULL;
}

NAN_METHOD(Line::New) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  if (info.IsConstructCall()) {
    DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
    Chip *chip = Nan::ObjectWrap::Unwrap<Chip>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
    unsigned int pin = Nan::To<unsigned int>(info[1]).FromJust();
    Line *obj = new Line(chip, pin);
    DOUT( "%s %s(%d):%d %p\n", __FILE__, __FUNCTION__, pin, __LINE__, obj);
    if ( !obj->line) return;
    DOUT( "%s %s(%d):%d %p->%p\n", __FILE__, __FUNCTION__, pin, __LINE__, obj, obj->line);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    DOUT( "%s %s():%d !construct\n", __FILE__, __FUNCTION__, __LINE__);
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
}

NAN_METHOD(Line::getLineOffset) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if ( !obj->line) {
    Nan::ThrowError( "::getLineOffset() for line==NULL");
    return;
  }
  int ret = gpiod_line_offset(obj->getNativeLine());
  if(-1 == ret) {
    Nan::ThrowError( "::getLineOffset() failed");
  } else info.GetReturnValue().Set(ret);
}

NAN_METHOD(Line::getLineName) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if ( !obj->line) {
    Nan::ThrowError( "::getLineName() for line==NULL");
    return;
  }
  const char *name = gpiod_line_name(obj->getNativeLine());
  if(!name) info.GetReturnValue().Set(Nan::Undefined());
  else info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
}

NAN_METHOD(Line::getLineConsumer) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if ( !obj->line) {
    Nan::ThrowError( "::getLineConsumer() for line==NULL");
    return;
  }
  const char *name = gpiod_line_consumer(obj->getNativeLine());
  if(!name) info.GetReturnValue().Set(Nan::Undefined());
  else info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
}

NAN_METHOD(Line::getValue) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if ( !obj->line) {
    Nan::ThrowError( "::getValue() for line==NULL");
    return;
  }
  int ret = gpiod_line_get_value(obj->getNativeLine());
  if(-1 == ret) {
    Nan::ThrowError( "::getValue() failed");
  } else info.GetReturnValue().Set(ret);
}

NAN_METHOD(Line::setValue) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if ( !obj->line) {
    Nan::ThrowError( "::setValue() for line==NULL");
    return;
  }
  unsigned int value = Nan::To<unsigned int>(info[0]).FromJust();
  if(-1 == gpiod_line_set_value(obj->getNativeLine(), value))
    Nan::ThrowError( "::setValue() failed");
}

NAN_METHOD(Line::requestInputMode) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError( "::requestInputMode() for line==NULL");
    return;
  }
  Nan::Utf8String consumer(info[0]);
  if (-1 == gpiod_line_request_input(obj->getNativeLine(), *consumer))
    Nan::ThrowError( "::requestInputMode() failed");
}

NAN_METHOD(Line::requestOutputMode) {
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
      Nan::ThrowError( "::requestOutputMode() for line==NULL");
      return;
    }
  unsigned int value = 0;
  v8::Local<v8::Value> defaultValue = info[0];
  if (!defaultValue->IsUndefined() && defaultValue->IsNumber()) {
    unsigned int val = Nan::To<unsigned int>(defaultValue).FromJust();
    if (val > 1) {
      Nan::ThrowError( "::requestOutputMode() value is not in {0,1} range");
      return;
    }
    value = val;
  }
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, obj);
  Nan::Utf8String consumer(info[1]);
  if (-1 == gpiod_line_request_output(obj->getNativeLine(), *consumer, value))
    Nan::ThrowError( "::requestOutputMode() failed");
}


NAN_METHOD(Line::release) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  if ( !obj->getNativeLine()) return;
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  gpiod_line_release(obj->getNativeLine());
  DOUT( "%s %s():%d\n", __FILE__, __FUNCTION__, __LINE__);
  obj->line = NULL;
}

gpiod_line *Line::getNativeLine() {
  DOUT( "%s %s():%d %p\n", __FILE__, __FUNCTION__, __LINE__, line);
  return line;
}
