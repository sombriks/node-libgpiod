#include "bulk.hh"

Bulk::Bulk(Chip *chip, unsigned int lines[], unsigned int count) {
  gpiod_line_bulk_init(&bulk);
  int result = gpiod_chip_get_lines(chip->getNativeChip(), lines, count, &bulk);
  if (result < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "failed to get bulk lines by numbers"));
  }
}

Bulk::Bulk(Chip *chip) {
  gpiod_line_bulk_init(&bulk);
  int result = gpiod_chip_get_all_lines(chip->getNativeChip(), &bulk);
  if (result < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "failed to get all lines from chip"));
  }
}

Bulk::Bulk(Chip *chip, const char **lines) {  // Must end with a NULL-pointer.
  gpiod_line_bulk_init(&bulk);
  int result = gpiod_chip_find_lines(chip->getNativeChip(), lines, &bulk);
  if (result < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "failed to get bulk lines by names"));
  }
}

Bulk::~Bulk() {
  gpiod_line_release_bulk(&bulk);
}

gpiod_line_bulk *Bulk::getNativeBulk() {
  return &bulk;
}

Nan::Persistent<v8::Function> Bulk::constructor;

NAN_MODULE_INIT(Bulk::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Bulk").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Bulk").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

NAN_METHOD(Bulk::New) {
  if (info.IsConstructCall()) {
    Chip *chip = Nan::ObjectWrap::Unwrap<Chip>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
    unsigned int *lines = nullptr;
    unsigned int count = 0;
    if (info[1]->IsUndefined()  //
        || info[1]->IsNull()    //
        || (info[1]->IsArray()  //
            && v8::Local<v8::Array>::Cast(info[1])->Length() == 0)) {
      // No lines specified, get all lines from the chip
      Bulk *obj = new Bulk(chip);
      obj->Wrap(info.This());
      info.GetReturnValue().Set(info.This());
      return;
    } else if (info[1]->IsArray()) {
      v8::Local<v8::Array> arr = v8::Local<v8::Array>::Cast(info[1]);
      if (arr->Get(Nan::GetCurrentContext(), 0).ToLocalChecked()->IsNumber()) {
        unsigned int count = arr->Length();
        unsigned int *lines = new unsigned int[count];
        for (unsigned int i = 0; i < count; i++) {
          lines[i] = arr->Get(Nan::GetCurrentContext(), i).ToLocalChecked().As<v8::Uint32>()->Value();
        }
        Bulk *obj = new Bulk(chip, lines, count);
        delete[] lines;  // Clean up the dynamically allocated array
        obj->Wrap(info.This());
        info.GetReturnValue().Set(info.This());
      } else {  // i hope those are strings then
        unsigned int count = arr->Length();
        char **lines = new char *[count + 1];  // +1 for NULL-terminator
        for (unsigned int i = 0; i < count; i++) {
          v8::String::Utf8Value line(Nan::GetCurrentContext()->GetIsolate(), arr->Get(Nan::GetCurrentContext(), i).ToLocalChecked());
          lines[i] = strdup(*line);  // Duplicate the string
        }
        lines[count] = nullptr;  // NULL-terminate the array
        Bulk *obj = new Bulk(chip, (const char **)lines);
        for (unsigned int i = 0; i < count; i++) {
          free(lines[i]);  // Free each duplicated string
        }
        obj->Wrap(info.This());
        info.GetReturnValue().Set(info.This());
      }
    }
  } else {
    const int argc = 2;
    v8::Local<v8::Value> argv[argc] = {info[0], info[1]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}

NAN_METHOD(getValues) {
  Bulk *obj = Nan::ObjectWrap::Unwrap<Bulk>(info[0]->ToObject(Nan::GetCurrentContext()).ToLocalChecked());
  gpiod_line_bulk *bulk = obj->getNativeBulk();
  unsigned int *values = new unsigned int[bulk->num_lines];
  int result = gpiod_line_get_value_bulk(bulk, (int *)values);
  if (result < 0) {
    delete[] values;  // Clean up the dynamically allocated array
    Nan::ThrowError(Nan::ErrnoException(errno, "failed to get bulk values"));
    return;
  }
  v8::Local<v8::Array> arr = Nan::New<v8::Array>(bulk->num_lines);
  for (unsigned int i = 0; i < bulk->num_lines; i++) {
    Nan::Set(arr, i, Nan::New<v8::Uint32>(values[i]));
  }
  delete[] values;  // Clean up the dynamically allocated array
  info.GetReturnValue().Set(arr);
}

NAN_METHOD(setValues) {
  v8::Local<v8::Context> ctx = Nan::GetCurrentContext();
  Bulk *obj = Nan::ObjectWrap::Unwrap<Bulk>(info[0]->ToObject(ctx).ToLocalChecked());
  gpiod_line_bulk *bulk = obj->getNativeBulk();
  v8::Local<v8::Array> arr = info[1].As<v8::Array>();
  if (arr->Length() != bulk->num_lines) {
    Nan::ThrowError("Array length does not match the number of lines in the bulk");
    return;
  }
  unsigned int *values = new unsigned int[bulk->num_lines];
  for (unsigned int i = 0; i < bulk->num_lines; i++) {
    v8::Local<v8::Value> value = arr->Get(ctx, i).ToLocalChecked();
    if (!value->IsUint32()) {
      delete[] values;  // Clean up the dynamically allocated array
      Nan::ThrowTypeError("Array elements must be integers");
      return;
    }
    values[i] = value.As<v8::Uint32>()->Value();
  }
  int result = gpiod_line_set_value_bulk(bulk, (const int *)values);
  delete[] values;
  if (result < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "failed to set bulk values"));
    return;
  }
}

NAN_METHOD(requestBulkInputMode) {
  v8::Local<v8::Context> ctx = Nan::GetCurrentContext();
  Bulk *obj = Nan::ObjectWrap::Unwrap<Bulk>(info[0]->ToObject(ctx).ToLocalChecked());
  gpiod_line_bulk *bulk = obj->getNativeBulk();
  v8::Local<v8::String> consumerStr = info[1].As<v8::String>();
  int result = gpiod_line_request_bulk_input(bulk, *Nan::Utf8String(consumerStr));
  if (result < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "failed to request bulk input mode"));
    return;
  }
}

NAN_METHOD(requestBulkOutputMode) {
  v8::Local<v8::Context> ctx = Nan::GetCurrentContext();
  Bulk *obj = Nan::ObjectWrap::Unwrap<Bulk>(info[0]->ToObject(ctx).ToLocalChecked());
  gpiod_line_bulk *bulk = obj->getNativeBulk();
  v8::Local<v8::String> consumerStr = info[1].As<v8::String>();
  unsigned int *defaultValues = nullptr;
  if (info[2]->IsArray()) {
    v8::Local<v8::Array> arr = info[2].As<v8::Array>();
    if (arr->Length() != bulk->num_lines) {
      Nan::ThrowError("Array length does not match the number of lines in the bulk");
      return;
    }
    defaultValues = new unsigned int[bulk->num_lines];
    for (unsigned int i = 0; i < bulk->num_lines; i++) {
      v8::Local<v8::Value> value = arr->Get(ctx, i).ToLocalChecked();
      if (!value->IsUint32()) {
        delete[] defaultValues;
        Nan::ThrowTypeError("Array elements must be integers");
        return;
      }
      defaultValues[i] = value.As<v8::Uint32>()->Value();
    }
  } else {
    defaultValues = new unsigned int[bulk->num_lines];
    memset(defaultValues, 0, sizeof(unsigned int) * bulk->num_lines);  // Default to 0
  }
  int result = gpiod_line_request_bulk_output(bulk, *Nan::Utf8String(consumerStr), (const int *)defaultValues);
  delete[] defaultValues;
  if (result < 0) {
    Nan::ThrowError(Nan::ErrnoException(errno, "failed to request bulk output mode"));
    return;
  }
}

NAN_METHOD(releaseBulk) {
  v8::Local<v8::Context> ctx = Nan::GetCurrentContext();
  Bulk *obj = Nan::ObjectWrap::Unwrap<Bulk>(info[0]->ToObject(ctx).ToLocalChecked());
  gpiod_line_release_bulk(obj->getNativeBulk());
}
