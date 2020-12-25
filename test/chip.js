const gpiod = require("..");

describe("libgpiod chip bindings", function () {
  it("should 'create' a new chip", (done) => {
    const chip0 = new gpiod.Chip(0);
    console.log(chip0)
    done();
  });
});
