const { expect } = require('chai');
const gpiod = require('..');

describe('libgpiod chip bindings', () => {
	// 54 for raspberry pi zero w, 32 for radxa rock-3c
	const numberLines = process.env.NUM_LINES || 54;
	const chipLabel = process.env.LABEL || 'pinctrl-bcm2835';
	const pinOffset = process.env.PIN_OFFSET || 17;
	const pinLabel = process.env.PIN_LABEL || 'GPIO17';

	it('should \'create\' a new chip by number and check chip name', done => {
		const chip0 = new gpiod.Chip(0);
		expect('gpiochip0').eq(chip0.name);
		done();
	});

	it('should \'create\' a new chip by name and check number of lines', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		// expect(chip0.numberOfLines).eq(numberLines); // fails due to type checking
		expect(chip0.numberOfLines - 0).eq(numberLines - 0);
		done();
	});

	it('should \'create\' a new chip by path and check label', done => {
		const chip0 = new gpiod.Chip('/dev/gpiochip0');
		expect(chip0.label).eq(chipLabel);
		done();
	});

	it('should NOT \'create\' a chip because it does not exists', done => {
		try {
			const chip0 = new gpiod.Chip('/dev/gpiochip-0');
			expect(chip0.numberOfLines).eq(numberLines);
		} catch (error) {
			expect(error.errno).eq(2);
			expect(error.code).eq('ENOENT');
			expect(error.syscall).eq('Chip::new - Unable to open device /dev/gpiochip-0');
			done();
		}
	});

	it('should get line names', done => {
		const chip0 = new gpiod.Chip('0');
		const result = chip0.lineNames;
		expect(result).to.be.an('array');
		expect(result.length - 0).eq(numberLines - 0);
		expect(result[pinOffset]).to.be.eq(pinLabel);
		done();
	});

	it('should get line names many times', done => {
		const chip0 = new gpiod.Chip('0');
		let result;
		let i = 1000;
		while (i-- > 0) {
			result = chip0.lineNames;
		}

		expect(result).to.be.an('array');
		expect(result.length - 0).eq(numberLines - 0);
		expect(result[pinOffset]).to.be.eq(pinLabel);
		done();
	});

	it('should get line', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(pinOffset - 0);
		expect(line17).to.be.an('object');
		line17.release && line17.release();
		done();
	});
});
