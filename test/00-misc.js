const gpiod = require("..");

const assert = require("assert");

describe("libgpiod miscellaneous bindings", function () {
  it("should get libgpiod version", function (done) {
    console.log(gpiod.version());
    done();
  });

  it("should get line instant value", function (done) {
    gpiod.getInstantLineValue(0, 17);
    done();
  });

  it("should NOT get line instant value due wrong chip name", function (done) {
    try {
      const ret = gpiod.getInstantLineValue("/dev/gpiochipZero", 17);
    } catch (ex) {
      done();
    }
  });

  it("should blink line with instant value", function (done) {
    let count = 7;
    const interval = setInterval(() => {
      gpiod.setInstantLineValue("/dev/gpiochip0", 17, count-- % 2);
      if (count == 0) {
        clearInterval(interval);
        done();
      }
    }, 70);
  });
});
