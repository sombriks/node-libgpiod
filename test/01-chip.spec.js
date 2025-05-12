const { expect } = require('chai');
const gpiod = require('..');

describe('libgpiod chip bindings', () => {

	// 40 for our gpio-sim setup, 54 for raspberry pi zero 
	const numLines = process.env.NUM_LINES ?? 40

	it('should \'create\' a new chip by number', done => {
		const chip0 = new gpiod.Chip('0');
		expect(chip0.getNumberOfLines()).eq(numLines);
		done();
	});

	it('should \'create\' a new chip by name', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		expect(chip0.getNumberOfLines()).eq(numLines);
		done();
	});

	it('should \'create\' a new chip by path', done => {
		const chip0 = new gpiod.Chip('/dev/gpiochip0');
		expect(chip0.getNumberOfLines()).eq(numLines);
		done();
	});

	it('should NOT \'create\' a chip because it does not exists', done => {
		try {
			const chip0 = new gpiod.Chip('/dev/gpiochippuden');
			chip0.getNumberOfLines()
		} catch (e) {
			expect(e.errno).eq(2)
			expect(e.code).eq("ENOENT")
			expect(e.syscall).eq("Chip::new - Unable to open device /dev/gpiochippuden")
			done();
		}
	});

	it('should get line names', done => {
		const chip0 = new gpiod.Chip('0');
		const result = chip0.getLineNames();
		expect(result).to.be.an('array');
		expect(result.length).eq(numLines);
		expect(result[17]).to.be.eq('GPIO17');
		done();
	});
});
