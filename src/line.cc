#include "line.hh"

Nan::Persistent<v8::Function> Line::constructor;

NAN_MODULE_INIT(Line::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Line").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "getLineOffset", getLineOffset);
  Nan::SetPrototypeMethod(tpl, "getLineName", getLineName);
  Nan::SetPrototypeMethod(tpl, "getLineConsumer", getLineConsumer);
  Nan::SetPrototypeMethod(tpl, "getLineDirection", getLineDirection);
  Nan::SetPrototypeMethod(tpl, "getLineActiveState", getLineActiveState);
  Nan::SetPrototypeMethod(tpl, "getLineBias", getLineBias);
  Nan::SetPrototypeMethod(tpl, "isLineUsed", isLineUsed);
  Nan::SetPrototypeMethod(tpl, "isLineOpenDrain", isLineOpenDrain);
  Nan::SetPrototypeMethod(tpl, "isLineOpenSource", isLineOpenSource);
  Nan::SetPrototypeMethod(tpl, "update", update);
  Nan::SetPrototypeMethod(tpl, "needsUpdate", needsUpdate);
  Nan::SetPrototypeMethod(tpl, "getValue", getValue);
  Nan::SetPrototypeMethod(tpl, "setValue", setValue);
  Nan::SetPrototypeMethod(tpl, "requestInputMode", requestInputMode);
  Nan::SetPrototypeMethod(tpl, "requestInputModeFlags", requestInputModeFlags);
  Nan::SetPrototypeMethod(tpl, "requestOutputMode", requestOutputMode);
  Nan::SetPrototypeMethod(tpl, "release", release);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Line").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Line::Line(Chip *chip, unsigned int pin) {
  line = gpiod_chip_get_line(chip->getNativeChip(), pin);
  std::string msg = "Line::new - Unable to open GPIO line ";
  msg = msg + std::to_string(pin);
  if (!line) Nan::ThrowError(Nan::ErrnoException(errno, msg.c_str()));
}

Line::Line(Chip *chip, const char *name) {
  line = gpiod_chip_find_line(chip->getNativeChip(), name);
  std::string msg = "Line::new - Unable to open GPIO line ";
  msg += name;
  if (!line) Nan::ThrowError(Nan::ErrnoException(errno, msg.c_str()));
}

Line::~Line() {
  if (!line) return;
  gpiod_line_close_chip(line);
  line = NULL;
}

NAN_METHOD(Line::New) {
  if (info.IsConstructCall()) {
    Chip *chip = Nan::ObjectWrap::Unwrap<Chip>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
    unsigned int pin = Nan::To<unsigned int>(info[1]).FromJust();
    Line *obj = new Line(chip, pin);
    if (!obj->line) return;
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}

NAN_METHOD(Line::getLineOffset) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineOffset() for line==NULL"));
    return;
  }
  int ret = gpiod_line_offset(obj->getNativeLine());
  if (-1 == ret) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineOffset"));
  } else
    info.GetReturnValue().Set(ret);
}

NAN_METHOD(Line::getLineName) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineName() for line==NULL"));
    return;
  }
  const char *name = gpiod_line_name(obj->getNativeLine());
  if (!name)
    info.GetReturnValue().Set(Nan::Undefined());
  else
    info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
}

NAN_METHOD(Line::getLineConsumer) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineConsumer() for line==NULL"));
    return;
  }
  const char *name = gpiod_line_consumer(obj->getNativeLine());
  if (!name)
    info.GetReturnValue().Set(Nan::Undefined());
  else
    info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
}

NAN_METHOD(Line::getLineDirection) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineDirection() for line==NULL"));
    return;
  }
  int direction = gpiod_line_direction(obj->getNativeLine());
  info.GetReturnValue().Set(direction);
}

NAN_METHOD(Line::getLineActiveState) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineActiveState() for line==NULL"));
    return;
  }
  int activeState = gpiod_line_active_state(obj->getNativeLine());
  info.GetReturnValue().Set(activeState);
}

NAN_METHOD(Line::getLineBias) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineBias() for line==NULL"));
    return;
  }
  int bias = gpiod_line_bias(obj->getNativeLine());
  info.GetReturnValue().Set(bias);
}

NAN_METHOD(Line::isLineUsed) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::isLineUsed() for line==NULL"));
    return;
  }
  bool used = gpiod_line_is_used(obj->getNativeLine());
  info.GetReturnValue().Set(used);
}

NAN_METHOD(Line::isLineOpenDrain) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::isLineOpenDrain() for line==NULL"));
    return;
  }
  bool drain = gpiod_line_is_open_drain(obj->getNativeLine());
  info.GetReturnValue().Set(drain);
}

NAN_METHOD(Line::isLineOpenSource) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::isLineOpenSource() for line==NULL"));
    return;
  }
  bool source = gpiod_line_is_open_source(obj->getNativeLine());
  info.GetReturnValue().Set(source);
}

NAN_METHOD(Line::update) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::update() for line==NULL"));
    return;
  }
  if (gpiod_line_update(obj->getNativeLine()) < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "line update failed"));
  }
}

NAN_METHOD(Line::needsUpdate) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::needsUpdate() for line==NULL"));
    return;
  }
  bool need = gpiod_line_needs_update(obj->getNativeLine());
  info.GetReturnValue().Set(need);
}

NAN_METHOD(Line::getValue) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getValue() for line==NULL"));
    return;
  }
  int ret = gpiod_line_get_value(obj->getNativeLine());
  if (-1 == ret) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getValue"));
  } else {
    info.GetReturnValue().Set(ret);
  }
}

NAN_METHOD(Line::setValue) {
  Line *obj = ObjectWrap::Unwrap<Line>(info.Holder());
  v8::Local<v8::Context> context = Nan::GetCurrentContext();
  uint32_t value = info[0]->Uint32Value(context).FromJust();
  if (gpiod_line_set_value(obj->line, value) == -1) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::setValue"));
  }
}

NAN_METHOD(Line::requestInputMode) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestInputMode() for line==NULL"));
    return;
  }
  Nan::Utf8String consumer(info[0]);
  if (-1 == gpiod_line_request_input(obj->getNativeLine(), *consumer))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestInputMode"));
}

NAN_METHOD(Line::requestInputModeFlags) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestInputModeFlags for line==NULL"));
    return;
  }
  Nan::Utf8String consumer(info[0]);
  int flags = Nan::To<int>(info[1]).FromJust();
  if (-1 == gpiod_line_request_input_flags(obj->getNativeLine(), *consumer, flags))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestInputModeFlags"));
}

NAN_METHOD(Line::requestOutputMode) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->line) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestOutputMode() for line==NULL"));
    return;
  }
  unsigned int value = 0;
  v8::Local<v8::Value> defaultValue = info[0];
  if (!defaultValue->IsUndefined() && defaultValue->IsNumber()) {
    unsigned int val = Nan::To<unsigned int>(defaultValue).FromJust();
    if (val > 1) {
      Nan::ThrowError(Nan::ErrnoException(errno, "::requestOutputMode() value is not in {0,1} range"));
      return;
    }
    value = val;
  }

  Nan::Utf8String consumer(info[1]);
  if (-1 == gpiod_line_request_output(obj->getNativeLine(), *consumer, value))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestOutputMode"));
}

NAN_METHOD(Line::release) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info.This());
  if (!obj->getNativeLine()) return;
  gpiod_line_release(obj->getNativeLine());
  obj->line = NULL;
}

gpiod_line *Line::getNativeLine() {
  return line;
}
