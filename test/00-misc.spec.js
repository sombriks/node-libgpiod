const {expect} = require('chai');
const gpiod = require('..');

describe('libgpiod miscellaneous bindings', () => {
	it('should get libgpiod version', done => {
		expect(gpiod.version).to.be.ok;
		done();
	});

	it('should get chip names', done => {
		const result = gpiod.getChipNames();
		expect(result).to.be.an('array');
		expect(result.length).to.be.greaterThan(0);
		expect(result[0]).to.be.a('string');
		done();
	});

	it('should get line instant value', done => {
		const value = gpiod.getInstantLineValue(0, 17);
		expect(value).to.eq(0);
		done();
	});

	it('should NOT get line instant value due wrong chip name', done => {
		try {
			gpiod.getInstantLineValue('/dev/gpiochipZero', 17);
		} catch (error) {
			expect(error.errno).eq(2);
			expect(error.code).eq('ENOENT');
			expect(error.syscall).eq('::getInstantLineValue - Unable to get instant value');
			done();
		}
	});

	it('should blink line with instant value', done => {
		let count = 7;
		const interval = setInterval(() => {
			gpiod.setInstantLineValue('/dev/gpiochip0', 17, count-- % 2);
			if (count === 0) {
				clearInterval(interval);
				done();
			}
		}, 70);
	});
});
