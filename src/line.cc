#include "line.hh"

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
  gpiod_line_release(line);
  line = NULL;
}

gpiod_line *Line::getNativeLine() {
  return line;
}

Nan::Persistent<v8::Function> Line::constructor;

NAN_MODULE_INIT(Line::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Line").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Line").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

NAN_METHOD(Line::New) {
  if (info.IsConstructCall()) {
    Chip *chip = Nan::ObjectWrap::Unwrap<Chip>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
    Line *obj;
    if (info[1]->IsNumber()) {
      unsigned int pin = Nan::To<unsigned int>(info[1]).FromJust();
      obj = new Line(chip, pin);
    } else {
      Nan::Utf8String name(info[1]);
      obj = new Line(chip, *name);
    }
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 2;
    v8::Local<v8::Value> argv[argc] = {info[0], info[1]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}

NAN_METHOD(getLineOffset) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  int ret = gpiod_line_offset(obj->getNativeLine());
  if (-1 == ret) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getLineOffset"));
  } else {
    info.GetReturnValue().Set(ret);
  }
}

NAN_METHOD(getLineName) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  const char *name = gpiod_line_name(obj->getNativeLine());
  if (!name) {
    info.GetReturnValue().Set(Nan::Undefined());
  } else {
    info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
  }
}

NAN_METHOD(getLineConsumer) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  const char *name = gpiod_line_consumer(obj->getNativeLine());
  if (!name) {
    info.GetReturnValue().Set(Nan::Undefined());
  } else {
    info.GetReturnValue().Set(Nan::New<v8::String>(name).ToLocalChecked());
  }
}

NAN_METHOD(getLineDirection) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  int direction = gpiod_line_direction(obj->getNativeLine());
  info.GetReturnValue().Set(direction);
}

NAN_METHOD(getLineActiveState) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  int activeState = gpiod_line_active_state(obj->getNativeLine());
  info.GetReturnValue().Set(activeState);
}

NAN_METHOD(getLineBias) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  int bias = gpiod_line_bias(obj->getNativeLine());
  info.GetReturnValue().Set(bias);
}

NAN_METHOD(isLineUsed) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  bool used = gpiod_line_is_used(obj->getNativeLine());
  info.GetReturnValue().Set(used);
}

NAN_METHOD(isLineFree) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  bool free = gpiod_line_is_free(obj->getNativeLine());
  info.GetReturnValue().Set(free);
}

NAN_METHOD(isLineOpenDrain) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  bool drain = gpiod_line_is_open_drain(obj->getNativeLine());
  info.GetReturnValue().Set(drain);
}

NAN_METHOD(isLineOpenSource) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  bool source = gpiod_line_is_open_source(obj->getNativeLine());
  info.GetReturnValue().Set(source);
}

NAN_METHOD(update) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  if (gpiod_line_update(obj->getNativeLine()) < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "line update failed"));
  }
}

NAN_METHOD(needsUpdate) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  bool need = gpiod_line_needs_update(obj->getNativeLine());
  info.GetReturnValue().Set(need);
}

NAN_METHOD(getValue) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  int ret = gpiod_line_get_value(obj->getNativeLine());
  if (-1 == ret) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getValue"));
  } else {
    info.GetReturnValue().Set(ret);
  }
}

NAN_METHOD(setValue) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  uint32_t value = Nan::To<uint32_t>(info[1]).FromJust();
  if (gpiod_line_set_value(obj->getNativeLine(), value) == -1) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::setValue"));
  }
}

NAN_METHOD(lineRequest) {
  v8::Local<v8::Context> context = Nan::GetCurrentContext();
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(info[0]->ToObject(context).ToLocalChecked());
  struct gpiod_line_request_config config;
  if (!info[1]->IsObject()) {
    Nan::ThrowError(Nan::Error("::lineRequest config is not an object"));
    return;
  }
  v8::Local<v8::Object> jsObj = info[1]->ToObject(context).ToLocalChecked();
  v8::MaybeLocal<v8::Value> consumer = jsObj->Get(context, Nan::New("consumer").ToLocalChecked());
  Nan::Utf8String consumerStr(consumer.ToLocalChecked());
  config.consumer = *consumerStr;
  v8::Local<v8::Value>
      requestType = jsObj->Get(context, Nan::New("requestType").ToLocalChecked()).ToLocalChecked();
  if (requestType.IsEmpty() || !requestType->IsNumber()) {
    Nan::ThrowError(Nan::Error("::lineRequest config.requestType is not a number"));
    return;
  }
  config.request_type = Nan::To<int>(requestType).FromJust();
  config.flags = 0;
  v8::Local<v8::Value> flags = jsObj->Get(context, Nan::New("flags").ToLocalChecked()).ToLocalChecked();
  if (!flags.IsEmpty() && !flags->IsUndefined()) {
    if (!flags->IsNumber()) {
      Nan::ThrowError(Nan::Error("::lineRequest config.flags is not a number"));
      return;
    }
    config.flags = Nan::To<int>(flags).FromJust();
  }
  int defaultValue = 0;
  if (info[2]->IsNumber()) {
    defaultValue = Nan::To<int>(info[2]).FromJust();
  }
  if (gpiod_line_request(obj->getNativeLine(), &config, defaultValue) == -1) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::lineRequest"));
  }
}

NAN_METHOD(requestInputMode) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  if (-1 == gpiod_line_request_input(obj->getNativeLine(), *consumer))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestInputMode"));
}

NAN_METHOD(requestOutputMode) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  unsigned int value = 0;
  v8::Local<v8::Value> defaultValue = info[2];
  if (!defaultValue->IsUndefined() && defaultValue->IsNumber()) {
    unsigned int val = Nan::To<unsigned int>(defaultValue).FromJust();
    if (val > 1) {
      Nan::ThrowError(Nan::ErrnoException(errno, "::requestOutputMode() value is not in {0,1} range"));
      return;
    }
    value = val;
  }
  if (-1 == gpiod_line_request_output(obj->getNativeLine(), *consumer, value))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestOutputMode"));
}

NAN_METHOD(requestRisingEdgeEvents) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  if (-1 == gpiod_line_request_rising_edge_events(obj->getNativeLine(), *consumer))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestRisingEdgeEvents"));
}

NAN_METHOD(requestFallingEdgeEvents) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  if (-1 == gpiod_line_request_falling_edge_events(obj->getNativeLine(), *consumer))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestFallingEdgeEvents"));
}

NAN_METHOD(requestBothEdgesEvents) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  if (-1 == gpiod_line_request_both_edges_events(obj->getNativeLine(), *consumer))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestBothEdgesEvents"));
}

NAN_METHOD(requestInputModeFlags) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  int flags = Nan::To<int>(info[2]).FromJust();
  if (-1 == gpiod_line_request_input_flags(obj->getNativeLine(), *consumer, flags))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestInputModeFlags"));
}

NAN_METHOD(requestOutputModeFlags) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  int flags = Nan::To<int>(info[2]).FromJust();
  int defaultValue = Nan::To<int>(info[3]).FromJust();
  if (-1 == gpiod_line_request_output_flags(obj->getNativeLine(), *consumer, flags, defaultValue))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestOutputModeFlags"));
}

NAN_METHOD(requestRisingEdgeEventFlags) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  int flags = Nan::To<int>(info[2]).FromJust();
  if (-1 == gpiod_line_request_rising_edge_events_flags(obj->getNativeLine(), *consumer, flags))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestRisingEdgeEventFlags"));
}

NAN_METHOD(requestFallingEdgeEventFlags) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  int flags = Nan::To<int>(info[2]).FromJust();
  if (-1 == gpiod_line_request_falling_edge_events_flags(obj->getNativeLine(), *consumer, flags))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestFallingEdgeEventFlags"));
}

NAN_METHOD(requestBothEdgesEventFlags) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  Nan::Utf8String consumer(info[1]);
  int flags = Nan::To<int>(info[2]).FromJust();
  if (-1 == gpiod_line_request_both_edges_events_flags(obj->getNativeLine(), *consumer, flags))
    Nan::ThrowError(Nan::ErrnoException(errno, "::requestBothEdgesEventFlags"));
}

NAN_METHOD(release) {
  Line *obj = Nan::ObjectWrap::Unwrap<Line>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  gpiod_line_release(obj->getNativeLine());
}
