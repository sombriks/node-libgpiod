const { expect } = require("chai")

const { Chip, Line } = require("../../")

describe("Line double-definition issue (#4)", () => {

  it("Should fail on double definition", done => {

    const chip0 = new Chip(0) // see prepare-gpio-sim.sh or real hardware

    expect(chip0).to.be.ok
    let l17 = new Line(chip0, 17)

    try {
      l17.requestOutputMode()
      l17.setValue(1)

      l17 = new Line(chip0, 17) // we didn't release the previous one
      l17.requestOutputMode()
      l17.setValue(1)
    } catch (e) {
      expect(e).to.be.ok
      expect(e.code).to.eq('EBUSY')
      expect(e.syscall).to.eq('::requestOutputMode')
      done()
    } finally {
      l17.release()
    }
  })

  it("Should work fine with proper line release", done => {

    const chip0 = new Chip(0) // see prepare-gpio-sim.sh or real hardware

    expect(chip0).to.be.ok

    let l17 = new Line(chip0, 17)
    l17.requestOutputMode()
    l17.setValue(1)
    l17.release()

    l17 = new Line(chip0, 17) // we must release the previous one
    l17.requestOutputMode()
    l17.setValue(1)
    l17.release()

    done()
  })
})