#include "misc.hh"

/**
 * @brief class to offload set value callbacks, single values
 *
 */
class InstantLineValueWorker : public Nan::AsyncWorker {
 public:
  InstantLineValueWorker(
      const char* device,
      unsigned int offset,
      unsigned int value,
      bool active_low,
      const char* consumer,
      Nan::Callback* callback)
      : Nan::AsyncWorker(callback) {
    this->device = device;
    this->offset = offset;
    this->value = value;
    this->active_low = active_low;
    this->consumer = consumer;
    this->flags = -1;
    result = -1;
  }

  InstantLineValueWorker(
      const char* device,
      unsigned int offset,
      unsigned int value,
      bool active_low,
      const char* consumer,
      Nan::Callback* callback,
      int flags)
      : Nan::AsyncWorker(callback) {
    this->device = device;
    this->offset = offset;
    this->value = value;
    this->active_low = active_low;
    this->consumer = consumer;
    this->flags = flags;
    result = -1;
  }

  void Execute() {
    auto dataCallback = [](void* data) {
      // TODO what to return for a more detailed result?
      InstantLineValueWorker* worker =
          static_cast<InstantLineValueWorker*>(data);
    };
    if (flags > -1)
      result = gpiod_ctxless_set_value_ext(
          device, offset, value, active_low,
          consumer, dataCallback, this, flags);
    else
      result = gpiod_ctxless_set_value(
          device, offset, value, active_low,
          consumer, dataCallback, this);
  }

  void HandleOKCallback() {
    Nan::HandleScope scope;
    v8::Local<v8::Value> argv[] = {Nan::New(result)};
    // TODO what to return for a more detailed result?
    callback->Call(1, argv, async_resource);
  }

 private:
  const char* device;
  unsigned int offset;
  unsigned int value;
  bool active_low;
  const char* consumer;
  int flags;
  int result;
};

/**
 * @brief class to offload set values callbacks, multiple values
 *
 */
class InstantLineValuesWorker : public Nan::AsyncWorker {
 public:
  InstantLineValuesWorker(
      const char* device,
      int* _offsets,
      int* _values,
      int size,
      bool active_low,
      const char* consumer,
      Nan::Callback* callback)
      : Nan::AsyncWorker(callback),
        offsets(_offsets),
        values(_values) {
    this->device = device;
    this->size = size;
    this->active_low = active_low;
    this->consumer = consumer;
    this->flags = -1;
    result = -1;
  }

  InstantLineValuesWorker(
      const char* device,
      int* _offsets,
      int* _values,
      int size,
      bool active_low,
      const char* consumer,
      Nan::Callback* callback,
      int flags)
      : Nan::AsyncWorker(callback),
        offsets(_offsets),
        values(_values) {
    this->device = device;
    this->size = size;
    this->active_low = active_low;
    this->consumer = consumer;
    this->flags = flags;
    result = -1;
  }

  void Execute() {
    auto dataCallback = [](void* data) {
      // TODO what to return for a more detailed result?
      InstantLineValuesWorker* worker =
          static_cast<InstantLineValuesWorker*>(data);
    };
    if (flags > -1)
      result = gpiod_ctxless_set_value_multiple_ext(
          device, (const unsigned int*)offsets.get(), values.get(),
          size, active_low, consumer, dataCallback, this, flags);
    else
      result = gpiod_ctxless_set_value_multiple(
          device, (const unsigned int*)offsets.get(), values.get(),
          size, active_low, consumer, dataCallback, this);
  }

  void HandleOKCallback() {
    Nan::HandleScope scope;
    v8::Local<v8::Value> argv[] = {Nan::New(result)};
    // TODO what to return for a more detailed result?
    callback->Call(1, argv, async_resource);
  }

 private:
  const char* device;
  std::unique_ptr<int[]> offsets;
  std::unique_ptr<int[]> values;
  int size;
  bool active_low;
  const char* consumer;
  int flags;
  int result;
};

// callback for set value operations
void misc_callback(void* nanCb) {
  Nan::Callback* callback = static_cast<Nan::Callback*>(nanCb);
  v8::Local<v8::Value> argv[] = {Nan::Null()};
}

// callback for event monitors
int misc_event_callback(int event_type, unsigned int offset,
                        const struct timespec* event_timestamp, void* nanCb) {
  Nan::Callback* callback = static_cast<Nan::Callback*>(nanCb);
  v8::Local<v8::Value> argv[] = {
      Nan::New<v8::Number>(event_type),
      Nan::New<v8::Number>(offset),
      Nan::New<v8::Number>(event_timestamp->tv_sec * 1000.0 + event_timestamp->tv_nsec / 1e6),
  };
  callback->Call(3, argv);
}

int* to_native_int_array(v8::Local<v8::Array>& array) {
  int size = array->Length();
  int* native_array = new int[size];
  for (unsigned int i = 0; i < size; ++i) {
    v8::Local<v8::Value> value = Nan::Get(array, i).ToLocalChecked();
    native_array[i] = Nan::To<int32_t>(value).FromJust();
  }
  return native_array;
}

void from_native_int_array(v8::Local<v8::Array>& array, int native_array[], int size) {
  for (int i = 0; i < size; ++i) {
    Nan::Set(array, i, Nan::New(native_array[i]));
  }
}

std::string int_array_to_string(int array[], int size) {
  std::string result = "[";
  for (int i = 0; i < size; ++i) {
    result += std::to_string(array[i]);
    if (i < size - 1) {
      result += ", ";
    }
  }
  result += "]";
  return result;
}

NAN_METHOD(version) {
  info.GetReturnValue()
      .Set(Nan::New<v8::String>(gpiod_version_string()).ToLocalChecked());
}

NAN_METHOD(getChipNames) {
  v8::Local<v8::Array> chipNames = Nan::New<v8::Array>();
  gpiod_chip_iter* iter = gpiod_chip_iter_new();
  if (!iter) {
    Nan::ThrowError(Nan::ErrnoException(errno, "::getChipNames", "Unable to get chip names"));
    return;
  }
  struct gpiod_chip* chip;
  unsigned int i = 0;
  gpiod_foreach_chip_noclose(iter, chip) {
    chipNames->Set(
        Nan::GetCurrentContext(), i++,
        Nan::New<v8::String>(gpiod_chip_name(chip)).ToLocalChecked());
  }
  gpiod_chip_iter_free(iter);
  info.GetReturnValue().Set(chipNames);
}

NAN_METHOD(getInstantLineValue) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  bool active_low = Nan::To<bool>(info[2]).FromJust();
  Nan::Utf8String consumer(info[3]);
  int value = gpiod_ctxless_get_value(*device, offset, active_low, *consumer);
  if (0 > value) {
    std::string error_message = "Unable to get instant value:";
    error_message += " chip: " + std::string(*device) +
                     " line: " + std::to_string(offset) +
                     " active_low: " + (active_low ? "true" : "false") +
                     " consumer: '" + std::string(*consumer) + "'" +
                     " result: " + std::to_string(value);
    Nan::ThrowError(Nan::ErrnoException(errno, "::getInstantLineValue", error_message.c_str()));
    return;
  }
  info.GetReturnValue().Set(value);
}

NAN_METHOD(getInstantLineValues) {
  Nan::Utf8String device(info[0]);
  v8::Local<v8::Array> offsetsArray = info[1].As<v8::Array>();
  unsigned int num_lines = offsetsArray->Length();
  bool active_low = Nan::To<bool>(info[2]).FromJust();
  Nan::Utf8String consumer(info[3]);
  std::unique_ptr<int[]> offsets(to_native_int_array(offsetsArray));
  std::unique_ptr<int[]> values(new int[num_lines]);
  if (0 > gpiod_ctxless_get_value_multiple(*device, (const unsigned int*)offsets.get(),
                                           values.get(), num_lines, active_low, *consumer)) {
    std::string error_message = "Unable to get instant values:";
    error_message += " chip: " + std::string(*device) + " offsets: ";
    error_message += int_array_to_string(offsets.get(), num_lines);
    error_message += " active_low: " + std::string(active_low ? "true" : "false");
    error_message += " consumer: '" + std::string(*consumer) + "'";
    Nan::ThrowError(Nan::ErrnoException(errno, "::getInstantLineValues", error_message.c_str()));
    return;
  }
  v8::Local<v8::Array> valuesArray = Nan::New<v8::Array>(num_lines);
  from_native_int_array(valuesArray, values.get(), num_lines);
  info.GetReturnValue().Set(valuesArray);
}

#if GPIOD_VERSION_MAJOR == 1 && GPIOD_VERSION_MINOR >= 5

NAN_METHOD(getInstantLineValueFlags) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  bool active_low = Nan::To<bool>(info[2]).FromJust();
  Nan::Utf8String consumer(info[3]);
  unsigned int flags = Nan::To<unsigned int>(info[4]).FromJust();
  int value = gpiod_ctxless_get_value_ext(*device, offset, active_low, *consumer, flags);
  if (0 > value) {
    std::string error_message = "Unable to get instant value with flags:";
    error_message += " chip: " + std::string(*device) +
                     " line: " + std::to_string(offset) +
                     " active_low: " + (active_low ? "true" : "false") +
                     " consumer: '" + std::string(*consumer) + "'" +
                     " flags: " + std::to_string(flags) +
                     " result: " + std::to_string(value);
    Nan::ThrowError(Nan::ErrnoException(errno, "::getInstantLineValueFlags", error_message.c_str()));
    return;
  }
  info.GetReturnValue().Set(value);
}

NAN_METHOD(getInstantLineValuesFlags) {
  Nan::Utf8String device(info[0]);
  v8::Local<v8::Array> offsetsArray = info[1].As<v8::Array>();
  unsigned int num_lines = offsetsArray->Length();
  bool active_low = Nan::To<bool>(info[2]).FromJust();
  Nan::Utf8String consumer(info[3]);
  unsigned int flags = Nan::To<unsigned int>(info[4]).FromJust();
  std::unique_ptr<int[]> offsets(to_native_int_array(offsetsArray));
  std::unique_ptr<int[]> values(new int[num_lines]);
  if (0 > gpiod_ctxless_get_value_multiple_ext(*device, (const unsigned int*)offsets.get(),
                                               values.get(), num_lines, active_low, *consumer, flags)) {
    std::string error_message = "Unable to get instant values:";
    error_message += " chip: " + std::string(*device) + " offsets: ";
    error_message += int_array_to_string(offsets.get(), num_lines);
    error_message += " active_low: " + std::string(active_low ? "true" : "false");
    error_message += " consumer: '" + std::string(*consumer) + "'" +
                     " flags: " + std::to_string(flags);
    Nan::ThrowError(Nan::ErrnoException(errno, "::getInstantLineValues", error_message.c_str()));
    return;
  }
  v8::Local<v8::Array> valuesArray = Nan::New<v8::Array>(num_lines);
  from_native_int_array(valuesArray, values.get(), num_lines);
  info.GetReturnValue().Set(valuesArray);
}

#endif

NAN_METHOD(setInstantLineValue) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  unsigned int value = Nan::To<unsigned int>(info[2]).FromJust();
  bool active_low = Nan::To<bool>(info[3]).FromJust();
  Nan::Utf8String consumer(info[4]);
  // if there is a callback, let's go async
  if (info[5]->IsFunction()) {
    v8::Local<v8::Function> cb = info[5].As<v8::Function>();
    Nan::Callback* callback = new Nan::Callback(cb);
    InstantLineValueWorker* worker = new InstantLineValueWorker(
        *device, offset, value, active_low, *consumer, callback);
    Nan::AsyncQueueWorker(worker);
  } else {
    int result = gpiod_ctxless_set_value(
        *device, offset, value, active_low, *consumer, NULL, NULL);
    if (0 > result) {
      std::string error_message = "Unable to set instant value:";
      error_message += " chip: " + std::string(*device) +
                       " line: " + std::to_string(offset) +
                       " value: " + std::to_string(value) +
                       " active_low: " + (active_low ? "true" : "false") +
                       " consumer: '" + std::string(*consumer) + "'" +
                       " result: " + std::to_string(result);
      Nan::ThrowError(Nan::ErrnoException(errno, "::setInstantLineValue", error_message.c_str()));
      return;
    }
    // TODO what could be a more detailed result?
    info.GetReturnValue().Set(result);
  }
}

NAN_METHOD(setInstantLineValues) {
  Nan::Utf8String device(info[0]);
  v8::Local<v8::Array> offsetsArray = info[1].As<v8::Array>();
  v8::Local<v8::Array> valuesArray = info[2].As<v8::Array>();
  if (offsetsArray->Length() != valuesArray->Length()) {
    Nan::ThrowTypeError("Offsets and values arrays must have the same length");
    return;
  }
  unsigned int num_lines = offsetsArray->Length();
  bool active_low = Nan::To<bool>(info[3]).FromJust();
  Nan::Utf8String consumer(info[4]);

  // if there is a callback, go async
  if (info[5]->IsFunction()) {
    v8::Local<v8::Function> cb = info[5].As<v8::Function>();
    Nan::Callback* callback = new Nan::Callback(cb);
    InstantLineValuesWorker* worker = new InstantLineValuesWorker(
        *device, to_native_int_array(offsetsArray),
        to_native_int_array(valuesArray), num_lines,
        active_low, *consumer, callback);
    Nan::AsyncQueueWorker(worker);
  } else {
    std::unique_ptr<int[]> offsets(to_native_int_array(offsetsArray));
    std::unique_ptr<int[]> values(to_native_int_array(valuesArray));
    int result = gpiod_ctxless_set_value_multiple(
        *device, (const unsigned int*)offsets.get(),
        values.get(), num_lines, active_low, *consumer, NULL, NULL);
    if (0 > result) {
      std::string error_message = "Unable to set instant values:";
      error_message += " chip: " + std::string(*device);
      error_message += " offsets: " + int_array_to_string(offsets.get(), num_lines);
      error_message += " values: " + int_array_to_string(values.get(), num_lines);
      error_message += " active_low: " + std::string(active_low ? "true" : "false");
      error_message += " consumer: '" + std::string(*consumer) + "'";
      Nan::ThrowError(Nan::ErrnoException(errno, "::setInstantLineValues", error_message.c_str()));
      return;
    }
    // TODO what could be a more detailed result?
    info.GetReturnValue().Set(result);
  }
}

#if GPIOD_VERSION_MAJOR == 1 && GPIOD_VERSION_MINOR >= 5

NAN_METHOD(setInstantLineValueFlags) {
  Nan::Utf8String device(info[0]);
  unsigned int offset = Nan::To<unsigned int>(info[1]).FromJust();
  unsigned int value = Nan::To<unsigned int>(info[2]).FromJust();
  bool active_low = Nan::To<bool>(info[3]).FromJust();
  Nan::Utf8String consumer(info[4]);
  int flags = Nan::To<unsigned int>(info[6]).FromJust();
  // if there is a callback, let's go async
  if (info[5]->IsFunction()) {
    v8::Local<v8::Function> cb = info[5].As<v8::Function>();
    Nan::Callback* callback = new Nan::Callback(cb);
    InstantLineValueWorker* worker = new InstantLineValueWorker(
        *device, offset, value, active_low, *consumer, callback, flags);
    Nan::AsyncQueueWorker(worker);
  } else {
    int result = gpiod_ctxless_set_value_ext(
        *device, offset, value, active_low, *consumer, NULL, NULL, flags);
    if (0 > result) {
      std::string error_message = "Unable to set instant value:";
      error_message += " chip: " + std::string(*device) +
                       " line: " + std::to_string(offset) +
                       " value: " + std::to_string(value) +
                       " active_low: " + (active_low ? "true" : "false") +
                       " consumer: '" + std::string(*consumer) + "'" +
                       " result: " + std::to_string(result);
      Nan::ThrowError(Nan::ErrnoException(errno, "::setInstantLineValue", error_message.c_str()));
      return;
    }
    // TODO what could be a more detailed result?
    info.GetReturnValue().Set(result);
  }
}

NAN_METHOD(setInstantLineValuesFlags) {
  Nan::Utf8String device(info[0]);
  v8::Local<v8::Array> offsetsArray = info[1].As<v8::Array>();
  v8::Local<v8::Array> valuesArray = info[2].As<v8::Array>();
  if (offsetsArray->Length() != valuesArray->Length()) {
    Nan::ThrowTypeError("Offsets and values arrays must have the same length");
    return;
  }
  unsigned int num_lines = offsetsArray->Length();
  bool active_low = Nan::To<bool>(info[3]).FromJust();
  Nan::Utf8String consumer(info[4]);
  int flags = Nan::To<unsigned int>(info[6]).FromJust();

  // if there is a callback, go async
  if (info[5]->IsFunction()) {
    v8::Local<v8::Function> cb = info[5].As<v8::Function>();
    Nan::Callback* callback = new Nan::Callback(cb);
    InstantLineValuesWorker* worker = new InstantLineValuesWorker(
        *device, to_native_int_array(offsetsArray),
        to_native_int_array(valuesArray), num_lines,
        active_low, *consumer, callback, flags);
    Nan::AsyncQueueWorker(worker);
  } else {
    std::unique_ptr<int[]> offsets(to_native_int_array(offsetsArray));
    std::unique_ptr<int[]> values(to_native_int_array(valuesArray));
    int result = gpiod_ctxless_set_value_multiple_ext(
        *device, (const unsigned int*)offsets.get(),
        values.get(), num_lines, active_low, *consumer, NULL, NULL, flags);
    if (0 > result) {
      std::string error_message = "Unable to set instant values:";
      error_message += " chip: " + std::string(*device);
      error_message += " offsets: " + int_array_to_string(offsets.get(), num_lines);
      error_message += " values: " + int_array_to_string(values.get(), num_lines);
      error_message += " active_low: " + std::string(active_low ? "true" : "false");
      error_message += " consumer: '" + std::string(*consumer) + "'";
      Nan::ThrowError(Nan::ErrnoException(errno, "::setInstantLineValues", error_message.c_str()));
      return;
    }
    // TODO what could be a more detailed result?
    info.GetReturnValue().Set(result);
  }
}

#endif

NAN_METHOD(instantMonitorEvent) {
  Nan::Utf8String device(info[0]);
  unsigned int lineNumber = Nan::To<unsigned int>(info[1]).FromJust();
  unsigned int eventType = Nan::To<unsigned int>(info[2]).FromJust();
  Nan::Callback callback(info[3].As<v8::Function>());
  unsigned int timeout = Nan::To<unsigned int>(info[4]).FromJust();
  struct timespec timeout_t;
  timeout_t.tv_sec = 0;
  timeout_t.tv_nsec = 1000 * timeout;
  bool activeLow = Nan::To<bool>(info[5]).FromJust();
  Nan::Utf8String consumer(info[6]);

  // if (0 > gpiod_ctxless_event_monitor(*device, eventType, lineNumber, activeLow,
  //                                     *consumer, &timeout_t, NULL,
  //                                     &misc_event_callback, &callback)) {
  //   Nan::ThrowError(Nan::ErrnoException(errno, "instantMonitorEvent", "failed to monitor events"));
  // }
}

NAN_METHOD(instantMonitorEvents) {
  Nan::Utf8String device(info[0]);
  v8::Local<v8::Array> lineNumbers = info[1].As<v8::Array>();
  std::unique_ptr<int[]> offsets(to_native_int_array(lineNumbers));
  unsigned int eventType = Nan::To<unsigned int>(info[2]).FromJust();
  Nan::Callback callback(info[3].As<v8::Function>());
  unsigned int timeout = Nan::To<unsigned int>(info[4]).FromJust();
  bool activeLow = Nan::To<bool>(info[5]).FromJust();
  Nan::Utf8String consumer(info[6]);
  // gpiod_ctxless_event_monitor_multiple
}

NAN_METHOD(instantMonitorEventFlags) {
  Nan::Utf8String device(info[0]);
  unsigned int lineNumber = Nan::To<unsigned int>(info[1]).FromJust();
  unsigned int eventType = Nan::To<unsigned int>(info[2]).FromJust();
  Nan::Callback callback(info[3].As<v8::Function>());
  unsigned int timeout = Nan::To<unsigned int>(info[4]).FromJust();
  bool activeLow = Nan::To<bool>(info[5]).FromJust();
  Nan::Utf8String consumer(info[6]);
  unsigned int flags = Nan::To<unsigned int>(info[7]).FromJust();
  // gpiod_ctxless_event_monitor_ext
}

NAN_METHOD(instantMonitorEventsFlags) {
  Nan::Utf8String device(info[0]);
  v8::Local<v8::Array> lineNumbers = info[1].As<v8::Array>();
  std::unique_ptr<int[]> offsets(to_native_int_array(lineNumbers));
  unsigned int eventType = Nan::To<unsigned int>(info[2]).FromJust();
  Nan::Callback callback(info[3].As<v8::Function>());
  unsigned int timeout = Nan::To<unsigned int>(info[4]).FromJust();
  bool activeLow = Nan::To<bool>(info[5]).FromJust();
  Nan::Utf8String consumer(info[6]);
  unsigned int flags = Nan::To<unsigned int>(info[7]).FromJust();
  // gpiod_ctxless_event_monitor_multiple_ext
}
