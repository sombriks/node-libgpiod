const {assert} = require('chai');
const gpiod = require('..');

describe('libgpiod Pin sugar', () => {
	it('should create a Pin for line 10 from chip 0', done => {
		const pin = gpiod.Pin(10);
		assert(pin instanceof gpiod.Line);
		pin.release();
		done();
	});
});
