const gpiod = require("../");

const assert = require("assert");

describe("libgpiod Pin sugar", () => {

  xit("should create a Pin fo line 10", done => {
    const pin = new gpiod.Pin(10);
    assert(pin instanceof gpiod.Line);
    done();
  })
})