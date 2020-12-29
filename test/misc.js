const gpiod = require("..");

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
    console.log(gpiod.getInstantLineValue("/dev/gpiochipZero", 17));
    done();
  });

  it("should set line instant value to zero and back to 1", function (done) {
    gpiod.setInstantLineValue("/dev/gpiochip0", 17, 0);
    console.log(gpiod.getInstantLineValue(0, 17));
    setTimeout(() => {
      gpiod.setInstantLineValue("/dev/gpiochip0", 17, 1);
      console.log(gpiod.getInstantLineValue(0, 17));
      done();
    }, 500);
  });
});
