const gpiod = require("../");

describe("libgpiod bindings", function () {
  it("should get libgpiod version", function (done) {
    console.log(gpiod.version());
    done();
  });

  it("should get line value by chip number", function (done) {
    console.log(gpiod.getLine(0, 0));
    done();
  });

  it("should get line 1 value by chip name", function (done) {
    console.log(gpiod.getLine("gpiochip0", 0));
    done();
  });

  it("should get line 1 value by chip path", function (done) {
    console.log(gpiod.getLine("/dev/gpiochip0", 0));
    done();
  });

  it("should NOT get line 1 value due wrong chip name", function (done) {
    console.log(gpiod.getLine("/dev/gpiochipZero", 0));
    done();
  });

  it("should set line 10 value to zero and back to 1", function (done) {
    gpiod.setLine("/dev/gpiochip0", 9, 0);
    console.log(gpiod.getLine(0, 9));
    gpiod.setLine("/dev/gpiochip0", 9, 1);
    console.log(gpiod.getLine(0, 9));
    done();
  });
});
