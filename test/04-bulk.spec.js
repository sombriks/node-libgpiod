const chai = require('chai');
const { Bulk, Chip, Line } = require('..');

chai.should();
const { expect } = chai;

describe('libgpiod Bulk operations', () => {

	const pinOffset = parseInt(process.env.PIN_OFFSET) || 17;
	const pinLabel = process.env.PIN_LABEL || 'GPIO17';
	const pinValue = parseInt(process.env.PIN_VALUE) || 0;

	it('should create a bulk with all lines from chip 0', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0);
		bulk.should.be.an.instanceof(Bulk);
		expect(bulk._handler).to.be.ok;
		done();
	});

	it('should create a bulk with line numbers from chip 0', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.should.be.an.instanceof(Bulk);
		expect(bulk._handler).to.be.ok;
		done();
	});

	it('should create a bulk with line names from chip 0', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinLabel]);
		bulk.should.be.an.instanceof(Bulk);
		expect(bulk._handler).to.be.ok;
		done();
	});

	it('should get line values from the bulk', done => {
		const Chip0 = new Chip('gpiochip0');
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestInputMode();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		bulk.release();
		done();
	});

	it('should set line values from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestOutputMode();
		bulk.setValues([0]);
		bulk.release();
		done();
	});

	it('should NOT set line values from the bulk due to wrong number of values', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestOutputMode(0);
		expect(() => {
			bulk.setValues([1, 0]);
		}).to.throw(Error, 'Array length does not match the number of lines in the bulk');
		bulk.release();
		done();
	});

	it('should request rising edge events from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestRisingEdgeEvents('hog1');
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		bulk.release();
		done();
	});

	it('should request falling edge events from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestFallingEdgeEvents();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		bulk.release();
		done();
	});

	it('should request both edges events from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestBothEdgesEvents();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		bulk.release();
		done();
	});

	it('should set bulk direction to input', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinLabel]);
		bulk.requestOutputMode(['c1']);
		bulk.setValues([1]);
		bulk.setDirectionInput();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		expect(result).to.deep.equal([1]);
		bulk.release();
		done();
	});

	it('should set bulk to output mode', done => {
		const Chip0 = new Chip('gpiochip0');
		const bulk = new Bulk(Chip0, [pinLabel]);
		bulk.requestInputMode();
		const result = bulk.values;
		bulk.setDirectionOutput();
		bulk.setValues([1]);
		bulk.setDirectionInput();
		const result2 = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		expect(result).to.deep.equal([pinValue]);
		expect(result2).to.be.an('array');
		expect(result2.length).to.be.eq(1);
		expect(result2).to.deep.equal([1]);
		bulk.release();
		done();
	});

	it('should request bulk with config options', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.request({
			consumer: 'test',
			requestType: Line.RequestType.Direction.INPUT,
			flags: Line.RequestFlags.BIAS_DISABLE | Line.RequestFlags.ACTIVE_HIGH,
		});
		const result = bulk.values;
		bulk.release();
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		expect(result).to.deep.equal([pinValue]);
		done();
	});

	it('should update bulk config', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestInputMode('c1');
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		expect(result).to.deep.equal([pinValue]);
		bulk.updateConfig(Line.RequestType.Direction.AS_IS, Line.RequestFlags.ACTIVE_LOW);
		const result2 = bulk.values;
		bulk.release();
		expect(result2).to.be.an('array');
		expect(result2.length).to.be.eq(1);
		expect(result2).to.deep.equal([(pinValue + 1) % 2]);
		done();
	});

	it('should update bulk flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestInputMode('c1');
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		expect(result).to.deep.equal([pinValue]);
		bulk.updateFlags(Line.RequestFlags.ACTIVE_LOW);
		const result2 = bulk.values;
		expect(result2).to.be.an('array');
		expect(result2.length).to.be.eq(1);
		expect(result2).to.deep.equal([(pinValue + 1) % 2]);
		bulk.release();
		done();
	});

	it('should request bulk for input passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestInputFlags('c1', Line.RequestFlags.BIAS_DISABLE);
		const result = bulk.values;
		bulk.release();
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		expect(result).to.deep.equal([pinValue]);
		done();
	});

	it('should request bulk for output passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestOutputFlags('c1', Line.RequestFlags.BIAS_DISABLE, [1]);
		bulk.setValues([0]);
		bulk.setDirectionInput();
		const result = bulk.values;
		bulk.release();
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(1);
		expect(result).to.deep.equal([pinValue]);
		done();
	});

	it('should request bulk for rising edge events passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestRisingEdgeEventsFlags('c1', Line.RequestFlags.BIAS_DISABLE);

		bulk.release();
		done();
	});

	it('should request bulk for falling edge events passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestFallingEdgeEventsFlags('c1', Line.RequestFlags.BIAS_DISABLE);

		bulk.release();
		done();
	});

	it('should request bulk for both edges events passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [pinOffset]);
		bulk.requestBothEdgesEventsFlags('c1', Line.RequestFlags.BIAS_DISABLE);

		bulk.release();
		done();
	});
});
