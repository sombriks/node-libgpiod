const gpiod = require("../");

describe("libgpiod gindings", function () {
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
});
