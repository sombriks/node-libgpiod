const { assert } = require('chai');
const gpiod = require('..');

describe('libgpiod Pin sugar', () => {
	const pinOffset = parseInt(process.env.PIN_OFFSET) || 17;


	it('should create a Pin from chip 0', done => {
		const pin = gpiod.Pin(pinOffset);
		assert(pin instanceof gpiod.Line);
		pin.release();
		done();
	});
});
