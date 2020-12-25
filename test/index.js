const gpiod = require("../");

describe("libgpiod bindings", function () {
  it("should get libgpiod version", function (done) {
    console.log(gpiod.version());
    done();
  });

  it("should get line value by chip number", function (done) {
    console.log(gpiod.getInstantLineValue(0, 0));
    done();
  });

  it("should get line 1 value by chip name", function (done) {
    console.log(gpiod.getInstantLineValue("gpiochip0", 0));
    done();
  });

  it("should get line 1 value by chip path", function (done) {
    console.log(gpiod.getInstantLineValue("/dev/gpiochip0", 0));
    done();
  });

  it("should NOT get line 1 value due wrong chip name", function (done) {
    console.log(gpiod.getInstantLineValue("/dev/gpiochipZero", 0));
    done();
  });

  it("should set line 10 value to zero and back to 1", function (done) {
    gpiod.setInstantLineValue("/dev/gpiochip0", 9, 0);
    console.log(gpiod.getInstantLineValue(0, 9));
    setTimeout(() => {
      gpiod.setInstantLineValue("/dev/gpiochip0", 9, 1);
      console.log(gpiod.getInstantLineValue(0, 9));
      done();
    }, 500);
  });
});
