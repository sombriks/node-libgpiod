const gpiod = require("../");

describe("libgpiod line bindings", () => {
  it("should get a line from the chip", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    done();
  });
  it("should NOT get a nonexistent line from the chip", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    try {
      const line17 = new gpiod.Line(chip0, 1700);
    } catch (ex) {
      done();
    }
  });

  it("should set line value", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    line17.requestOutputMode();
    line17.setValue(1);
    setTimeout(() => {
      line17.release();
      done();
    }, 500);
  });

  it("should get line value", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    line17.requestInputMode();
    console.log(line17.getValue());
    line17.release();
    done();
  });

  it("should blink line value", (done) => {
    const chip0 = new gpiod.Chip("gpiochip0");
    const line17 = new gpiod.Line(chip0, 17);
    line17.requestOutputMode();
    let count = 7;
    const interval = setInterval(() => {
      line17.setValue(count-- % 2);
      if (count == 0) {
        done();
        line17.release();
        clearInterval(interval);
      }
    }, 800);
  });
});
