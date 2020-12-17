
const gpiod = require("../")


describe('libgpiod gindings', function() {

  it("should list chips", function(done){
    gpiod.listChips()
    done()
  })
})