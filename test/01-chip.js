const gpiod = require("..");

describe("libgpiod chip bindings", function () {
  it("should 'create' a new chip by number", (done) => {
    const chip0 = new gpiod.Chip("0");
    done();
  });

  it("should 'create' a new chip by name", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    done();
  });

  it("should 'create' a new chip by path", (done) => {
    const chip0 = new gpiod.Chip("/dev/gpiochip0");
    done();
  });

  it("should NOT 'create' a chip because it does not exists", (done) => {
    try {
      const chip0 = new gpiod.Chip("/dev/gpiochippuden");
    } catch (err) {
      done();
    }
  });
});
