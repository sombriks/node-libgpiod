const {expect} = require('chai');
const {Chip, Line} = require('../../');

describe('Line double-definition issue (#4)', () => {
	it('Should fail on double definition', done => {
		const chip0 = new Chip(0); // See prepare-gpio-sim.sh or real hardware

		expect(chip0).to.be.ok;
		let l17 = new Line(chip0, 17);

		try {
			l17.requestOutputMode();
			l17.setValue(1);

			l17 = new Line(chip0, 17); // We didn't release the previous one
			l17.requestOutputMode();
			l17.setValue(1);
		} catch (error) {
			expect(error).to.be.ok;
			expect(error.code).to.eq('EBUSY');
			expect(error.syscall).to.eq('::requestOutputMode');
			done();
		} finally {
			l17.release();
		}
	});

	it('Should work fine with proper line release', done => {
		const chip0 = new Chip(0); // See prepare-gpio-sim.sh or real hardware

		expect(chip0).to.be.ok;

		let l17 = new Line(chip0, 17);
		l17.requestOutputMode();
		l17.setValue(1);
		l17.release();

		l17 = new Line(chip0, 17); // We must release the previous one
		l17.requestOutputMode();
		l17.setValue(1);
		l17.release();

		done();
	});
});
