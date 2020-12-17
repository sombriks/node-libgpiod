#include <stdio.h>
#include <gpiod.h>

#include <nan.h> 

NAN_METHOD(listChips) {
  struct gpiod_chip *chip = NULL;

  chip = gpiod_chip_open("/dev/gpiochip0");

  if(chip) {
    struct gpiod_line *line = gpiod_chip_get_line(chip, 1);

    int v = gpiod_line_get_value(line);

    printf("hello, line 1 is %d\n",v);
  } else {
    printf("unable to open chip!\n");
  }
}

NAN_MODULE_INIT(InitAll) {
  Nan::Set(target, Nan::New("listChips").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(listChips)).ToLocalChecked());
}

NODE_MODULE(NativeExtension, InitAll)