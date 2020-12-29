const gpiod = require("..");

const assert = require("assert");

describe("libgpiod miscellaneous bindings", function () {
  it("should get libgpiod version", function (done) {
    console.log(gpiod.version());
    done();
  });

  it("should get line instant value by chip number", function (done) {
    console.log(gpiod.getInstantLineValue(0, 17));
    done();
  });

  it("should get line instant value by chip name", function (done) {
    console.log(gpiod.getInstantLineValue("gpiochip0", 17));
    done();
  });

  it("should get line instant value by chip path", function (done) {
    console.log(gpiod.getInstantLineValue("/dev/gpiochip0", 17));
    done();
  });

  it("should NOT get line instant value due wrong chip name", function (done) {
    const ret = gpiod.getInstantLineValue("/dev/gpiochipZero", 17);
    assert(ret == -1, "chip should not exists");
    done();
  });

  it("should blink line instant value", function (done) {
    gpiod.setInstantLineValue("/dev/gpiochip0", 17, 1);
    console.log(gpiod.getInstantLineValue(0, 17));
    setTimeout(() => {
      gpiod.setInstantLineValue("/dev/gpiochip0", 17, 0);
      console.log(gpiod.getInstantLineValue(0, 17));
      done();
    }, 500);
  });
});
