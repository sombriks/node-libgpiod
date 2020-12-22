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

  it("should get line value by chip name", function (done) {
    console.log(gpiod.getLine("gpiochip0", 0));
    done();
  });

  it("should get line value by chip path", function (done) {
    console.log(gpiod.getLine("/dev/gpiochip0", 0));
    done();
  });
});
