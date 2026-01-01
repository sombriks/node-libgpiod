const { expect } = require('chai');
const { Chip, Line } = require('../../');

describe('Line double-definition issue (#4)', () => {

	const pinOffset = parseInt(process.env.PIN_OFFSET) || 17;
	const pinLabel = process.env.PIN_LABEL || 'GPIO17';
	const pinValue = parseInt(process.env.PIN_VALUE) || 0;


	it('Should fail on double definition', done => {
		const chip0 = new Chip(0); // See prepare-gpio-sim.sh or real hardware

		expect(chip0).to.be.ok;
		const l17_1 = new Line(chip0, pinOffset);
		let l17_2;
		try {
			l17_1.requestOutputMode();
			l17_1.setValue(1);

			l17_2 = new Line(chip0, pinOffset); // We didn't release the previous one
			l17_2.requestOutputMode();
			l17_2.setValue(1);
		} catch (error) {
			expect(error).to.be.ok;
			expect(error.code).to.eq('EBUSY');
			expect(error.syscall).to.eq('::requestOutputMode');
			done();
		} finally {
			l17_1.release();
			l17_2.release();
		}
	});

	it('Should work fine with proper line release', done => {
		const chip0 = new Chip(0); // See prepare-gpio-sim.sh or real hardware

		expect(chip0).to.be.ok;

		let l17 = new Line(chip0, pinOffset);
		l17.requestOutputMode();
		l17.setValue(1);
		l17.release();

		setTimeout(() => {
			l17 = new Line(chip0, pinOffset); // We must release the previous one
			l17.requestOutputMode();
			l17.setValue(1);
			l17.release();

			done();
		}, 100);
	});
});
