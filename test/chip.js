const gpiod = require("..");

describe("libgpiod chip bindings", function () {
  it("should 'create' a new chip", (done) => {
    const chip0 = new gpiod.Chip(0);
    console.log(chip0)
    done();
  });
  
  it("should get a line from the chip", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    console.log(chip0)
    const line17 = chip0.getLine(17);
    console.log(chip0)
    done();
  });
  
});