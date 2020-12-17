#include <stdio.h>
#include <gpiod.h>

int main(int argc, char **argv) {

  struct gpiod_chip *chip = NULL;

  chip = gpiod_chip_open("/dev/gpiochip0");

  if(chip) {
    struct gpiod_line *line = gpiod_chip_get_line(chip, 1);

    int v = gpiod_line_get_value(line);

    printf("hello, line 1 is %d\n",v);
  } else {
    printf("Sem permissão pra abrir o chip!\n");
    return 1;
  }


  return 0;
}