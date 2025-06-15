const {expect} = require('chai');
const gpiod = require('..');

describe('libgpiod line bindings', () => {
	it('should get a line by number', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		expect(chip0.getLine(17)).ok;
		done();
	});

	it('should get a line by name', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		expect(chip0.getLine('GPIO17')).ok;
		done();
	});

	it('should NOT get a nonexistent line from the chip', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		try {
			new gpiod.Line(chip0, 1700);
		} catch (error) {
			expect(error.syscall).eq('Line::new - Unable to open GPIO line 1700');
			expect(error.code).eq('EINVAL');
			expect(error.errno).eq(22);
			done();
		}
	});

	it('should set line value', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = new gpiod.Line(chip0, 17);
		line17.requestOutputMode();
		line17.setValue(1);
		setTimeout(() => {
			line17.release();
			done();
		}, 500); // Will blink for a half second on the real deal
	});

	it('should get line value', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		line17.requestInputMode();
		expect(line17.getValue()).eq(0);
		line17.release();
		done();
	});

	it('should get line offset', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		const line13 = chip0.getLine(13);
		let {offset} = line17;
		expect(17).eq(offset);
		offset = line13.offset;
		expect(13).eq(offset);
		line17.release();
		line13.release();
		done();
	});

	it('should get line name', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		const {name} = line17;
		expect('GPIO17').eq(name);
		line17.release();
		done();
	});

	it('should blink line value', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = new gpiod.Line(chip0, 17);
		line17.requestOutputMode();
		let count = 4;
		const interval = setInterval(() => {
			line17.setValue(count-- % 2);
			if (count == 0) {
				line17.release();
				clearInterval(interval);
				done();
			}
		}, 300);
	});

	it('should get line consumer', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		const line18 = chip0.getLine(18);
		expect('hog1').eq(line18.consumer);
		line18.release();

		const line19 = chip0.getLine(19);
		expect('hog2').eq(line19.consumer);
		line19.release();

		const line17 = chip0.getLine(17);
		line17.requestOutputMode('X', 1);
		consumer = line17.consumer;
		expect('X').eq(consumer);
		line17.release();

		done();
	});

	it('should get line direction', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		line17.requestInputMode();
		expect(gpiod.Line.Direction.INPUT).eq(line17.direction);
		line17.release();

		const line18 = chip0.getLine('GPIO18');
		expect(line18.used).eq(true);
		// Line18.requestOutputMode();
		expect(gpiod.Line.Direction.OUTPUT).eq(line18.direction);
		line18.release();
		expect(line18.free).eq(true);

		done();
	});

	it('should get line 17 active state', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		expect(gpiod.Line.ActiveState.HIGH).eq(line17.activeState);
		line17.release();

		done();
	});

	it('should get line 18 bias', done => {
		const chip0 = new gpiod.Chip();
		const line17 = chip0.getLine('GPIO17');
		line17.requestOutputMode();
		line17.setValue(1);
		expect(gpiod.Line.Bias.AS_IS).eq(line17.bias);
		line17.release();

		done();
	});

	it('should check if line 17 is free', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(true).eq(line17.free);
		line17.release();

		done();
	});

	it('should check if line 18 is used', done => {
		const chip0 = new gpiod.Chip();
		const line18 = chip0.getLine(18);
		expect(true).eq(line18.used);
		line18.release();

		done();
	});

	it('should check if line 17 is not open drain', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(false).eq(line17.openDrain);
		line17.release();

		done();
	});

	it('should check if line 17 is not open source', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(false).eq(line17.openSource);
		line17.release();

		done();
	});

	it('should update line info', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		try {
			line17.update();
			done();
		} catch (error) {
			done(error);
		} finally {
			line17.release();
		}
	});

	it('should check if line 17 needs update', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(false).eq(line17.needsUpdate);
		line17.release();
		done();
	});

	it('should request line 17 with config options', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		line17.lineRequest({
			requestType: gpiod.Line.RequestType.Direction.INPUT,
			flags: gpiod.Line.RequestFlags.BIAS_PULL_DOWN,
			consumer: 'X',
		}, 0);
		line17.release();
		done();
	});

	it('should request rising edge events on line 17', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		line17.requestRisingEdgeEvents();
		line17.release();
		done();
	});

	it('should request falling edge events on line 17', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		line17.requestFallingEdgeEvents();
		line17.release();
		done();
	});

	it('should request both edges events on line 17', done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		line17.requestBothEdgesEvents();
		line17.release();
		done();
	});

	it('should request input mode with flags', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		const line13 = chip0.getLine(13);

		line13.requestInputModeFlags('foobar', gpiod.Line.RequestFlags.BIAS_PULL_DOWN);
		const {consumer} = line13;
		expect('foobar').eq(consumer);
		line13.release();

		done();
	});

	it('should request output mode with flags', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		const line13 = chip0.getLine(13);

		line13.requestOutputModeFlags('foobar', gpiod.Line.RequestFlags.BIAS_PULL_DOWN, 0);
		const {consumer} = line13;
		expect('foobar').eq(consumer);
		line13.release();

		done();
	});

	it('should request rising edge events with flags', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		const line13 = chip0.getLine(13);

		line13.requestRisingEdgeEventFlags('foobar', gpiod.Line.RequestFlags.BIAS_PULL_DOWN, 0);
		const {consumer} = line13;
		expect('foobar').eq(consumer);
		line13.release();

		done();
	});

	it('should request falling edge events with flags', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		const line13 = chip0.getLine(13);

		line13.requestFallingEdgeEventFlags('foobar', gpiod.Line.RequestFlags.BIAS_PULL_DOWN, 0);
		const {consumer} = line13;
		expect('foobar').eq(consumer);
		line13.release();

		done();
	});

	it('should request both edges events with flags', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		const line13 = chip0.getLine(13);

		line13.requestBothEdgesEventFlags('foobar', gpiod.Line.RequestFlags.BIAS_PULL_DOWN, 0);
		const {consumer} = line13;
		expect('foobar').eq(consumer);
		line13.release();

		done();
	});
});
