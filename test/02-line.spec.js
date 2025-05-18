const { expect } = require('chai');
const gpiod = require('..');

describe('libgpiod line bindings', () => {

	it('should get a line by number', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		expect(chip0.getLine(17)).ok;
		done();
	});

	it('should get a line by name', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		expect(chip0.getLine("GPIO17")).ok;
		done();
	});

	it('should NOT get a nonexistent line from the chip', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		try {
			new gpiod.Line(chip0, 1700);
		} catch (e) {
			expect(e.syscall).eq("Line::new - Unable to open GPIO line 1700")
			expect(e.code).eq("EINVAL")
			expect(e.errno).eq(22)
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
		}, 500); // will blink for a half second on the real deal
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
		let offset = line17.getLineOffset();
		expect(17).eq(offset);
		offset = line13.getLineOffset();
		expect(13).eq(offset);
		line17.release();
		line13.release();
		done();
	});

	it('should get line name', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		const name = line17.getLineName();
		expect("GPIO17").eq(name);
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
				done();
				line17.release();
				clearInterval(interval);
			}
		}, 300);
	});

	it('should get line consumer', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		const line18 = chip0.getLine(18);
		expect("hog1").eq(line18.getLineConsumer());
		line18.release();

		const line19 = chip0.getLine(19);
		expect("hog2").eq(line19.getLineConsumer());
		line19.release();

		const line17 = chip0.getLine(17);
		line17.requestOutputMode(1, "X");
		consumer = line17.getLineConsumer();
		expect("X").eq(consumer);
		line17.release();

		done();
	});

	it("should get line direction", done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		let line17 = chip0.getLine(17);
		line17.requestInputMode();
		expect(1).eq(line17.getLineDirection());
		line17.release();

		const line18 = chip0.getLine("GPIO18");
		line18.requestOutputMode();
		expect(2).eq(line18.getLineDirection());
		line18.release();

		done();
	});

	it("should get line 17 active state", done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		let line17 = chip0.getLine(17);
		expect(1).eq(line17.getLineActiveState());
		line17.release();

		done();
	});

	it("should get line 18 active state", done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line18 = chip0.getLine("GPIO18");
		line18.requestOutputMode();
		line18.setValue(1);
		expect(1).eq(line18.getLineActiveState());
		line18.release();

		done();
	});

	it("should get line 18 bias", done => {
		const chip0 = new gpiod.Chip();
		const line18 = chip0.getLine("GPIO18");
		line18.requestOutputMode();
		line18.setValue(1);
		expect(1).eq(line18.getLineBias());
		line18.release();

		done();
	});

	it("should check if line 17 is not used", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(false).eq(line17.isLineUsed());
		line17.release();

		done();
	});

	it("should check if line 18 is used", done => {
		const chip0 = new gpiod.Chip();
		const line18 = chip0.getLine(18);
		expect(true).eq(line18.isLineUsed());
		line18.release();

		done();
	});

	it("should check if line 17 is not open drain", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(false).eq(line17.isLineOpenDrain());
		line17.release();

		done();
	});

	it("should check if line 17 is not open source", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(false).eq(line17.isLineOpenSource());
		line17.release();

		done();
	});

	it("should update line info", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		try {
			line17.update();
			done();
		} catch (e) {
			done(e);
		} finally {
			line17.release();
		}
	});

	it("should check if line 17 needs update", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		expect(false).eq(line17.needsUpdate());
		line17.release();
		done();
	});

	it("should request line 17 with config options", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		// TODO need better scenarios 
		line17.lineRequest({ requestType: 1, consumer: "X", flags: 0 }, 1);
		line17.release();
		done();
	});

	it("should request rising edge events on line 17", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		line17.requestRisingEdgeEvents();
		line17.release();
		done();
	});

	it("should request falling edge events on line 17", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		line17.requestFallingEdgeEvents();
		line17.release();
		done();
	});

	it("should request both edges events on line 17", done => {
		const chip0 = new gpiod.Chip(0);
		const line17 = chip0.getLine(17);
		line17.requestBothEdgesEvents();
		line17.release();
		done();
	});

	it("should request input mode with flags", done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		let line13 = chip0.getLine(13);

		line13.requestInputModeFlags("foobar", gpiod.LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_DOWN);
		const consumer = line13.getLineConsumer();
		expect("foobar").eq(consumer);
		line13.release();

		done();
	});

	it("should request output mode with flags", done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		let line13 = chip0.getLine(13);

		line13.requestOutputModeFlags("foobar", gpiod.LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_DOWN, 0);
		const consumer = line13.getLineConsumer();
		expect("foobar").eq(consumer);
		line13.release();

		done();
	});

	it("should request rising edge events with flags", done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		let line13 = chip0.getLine(13);

		line13.requestRisingEdgeEventFlags("foobar", gpiod.LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_DOWN, 0);
		const consumer = line13.getLineConsumer();
		expect("foobar").eq(consumer);
		line13.release();

		done();
	});

	it("should request falling edge events with flags", done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		let line13 = chip0.getLine(13);

		line13.requestFallingEdgeEventFlags("foobar", gpiod.LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_DOWN, 0);
		const consumer = line13.getLineConsumer();
		expect("foobar").eq(consumer);
		line13.release();

		done();
	});

	it("should request both edges events with flags", done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		let line13 = chip0.getLine(13);

		line13.requestBothEdgesEventFlags("foobar", gpiod.LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_DOWN, 0);
		const consumer = line13.getLineConsumer();
		expect("foobar").eq(consumer);
		line13.release();

		done();
	});

});
