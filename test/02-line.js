const gpiod = require("../");

describe("libgpiod line bindings", () => {
  it("should get a line from the chip", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    done();
  });

  it("should set line value", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    line17.requestOutputMode();
    line17.setValue(1);
    setTimeout(() => {
      done();
    }, 500);
  });

  it("should get line value", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    line17.requestInputMode();
    console.log(line17.getValue());
    done();
  });

  it("should blink line value", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    line17.requestOutputMode();
    line17.setValue(0);
    setTimeout(() => {
      line17.setValue(1);
      done();
    }, 500);
  });
});
