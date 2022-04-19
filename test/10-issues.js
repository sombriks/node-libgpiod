const gpiod = require("..");

const assert = require("assert");

describe("libgpiod testcases for issues", function () {

  it("should be ok double-define line object", function (done) {
    const chip0 = new gpiod.Chip("gpiochip0");

    const lineA = chip0.getLine(19);
    lineA.requestOutputMode();
    lineA.setValue(1);

    const lineB = new gpiod.Line(chip0, 19)
    // lineB.requestOutputMode();
    lineB.setValue(0);

    done();
  });

});