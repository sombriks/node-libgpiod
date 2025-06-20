const chai = require('chai');
const {Bulk, Chip, Line} = require('..');

chai.should();
const {expect} = chai;

describe('libgpiod Bulk operations', () => {
	it('should create a bulk with all lines from chip 0', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0);
		bulk.should.be.an.instanceof(Bulk);
		expect(bulk._handler).to.be.ok;
		done();
	});

	it('should create a bulk with line numbers from chip 0', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.should.be.an.instanceof(Bulk);
		expect(bulk._handler).to.be.ok;
		done();
	});

	it('should create a bulk with line names from chip 0', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, ['GPIO17', 'GPIO18', 'GPIO19']);
		bulk.should.be.an.instanceof(Bulk);
		expect(bulk._handler).to.be.ok;
		done();
	});

	it('should get line values from the bulk', done => {
		const Chip0 = new Chip('gpiochip0');
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestInputMode();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		bulk.release();
		done();
	});

	it('should set line values from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestOutputMode();
		bulk.setValues([1, 0, 1]);
		bulk.release();
		done();
	});

	it('should NOT set line values from the bulk due to wrong number of values', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestOutputMode(0);
		expect(() => {
			bulk.setValues([1, 0]);
		}).to.throw(Error, 'Array length does not match the number of lines in the bulk');
		bulk.release();
		done();
	});

	it('should request rising edge events from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestRisingEdgeEvents('hog1');
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		bulk.release();
		done();
	});

	it('should request falling edge events from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestFallingEdgeEvents();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		bulk.release();
		done();
	});

	it('should request both edges events from the bulk', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestBothEdgesEvents();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		bulk.release();
		done();
	});

	it('should set bulk direction to input', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, ['GPIO16', 'GPIO21', 'GPIO22']);
		bulk.requestOutputMode(['c1', 'c2', 'c3']);
		bulk.setValues([1, 1, 1]);
		bulk.setDirectionInput();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		expect(result).to.deep.equal([1, 1, 1]);
		bulk.release();
		done();
	});

	it('should set bulk to output mode', done => {
		const Chip0 = new Chip('gpiochip0');
		const bulk = new Bulk(Chip0, ['GPIO16', 'GPIO21', 'GPIO22']);
		bulk.requestInputMode();
		const result = bulk.values;
		bulk.setDirectionOutput();
		bulk.setValues([1, 1, 1]);
		bulk.setDirectionInput();
		const result2 = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		expect(result).to.deep.equal([0, 0, 0]);
		expect(result2).to.be.an('array');
		expect(result2.length).to.be.eq(3);
		expect(result2).to.deep.equal([1, 1, 1]);
		bulk.release();
		done();
	});

	it('should request bulk with config options', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.request({
			consumer: 'test',
			requestType: Line.RequestType.Direction.INPUT,
			flags: Line.RequestFlags.BIAS_DISABLE,
		});
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		expect(result).to.deep.equal([0, 0, 0]);
		bulk.release();
		bulk.request({
			consumer: 'test',
			requestType: Line.RequestType.Direction.INPUT,
			flags: Line.RequestFlags.BIAS_DISABLE | Line.RequestFlags.ACTIVE_LOW,
		});
		const result2 = bulk.values;
		expect(result2).to.be.an('array');
		expect(result2.length).to.be.eq(3);
		expect(result2).to.deep.equal([1, 1, 1]);
		bulk.release();
		done();
	});

	it('should update bulk config', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestInputMode('c1');
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		expect(result).to.deep.equal([0, 0, 0]);
		bulk.updateConfig(Line.RequestType.Direction.AS_IS, Line.RequestFlags.ACTIVE_LOW);
		const result2 = bulk.values;
		expect(result2).to.be.an('array');
		expect(result2.length).to.be.eq(3);
		expect(result2).to.deep.equal([1, 1, 1]);
		bulk.release();
		done();
	});

	it('should update bulk flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 21, 22]);
		bulk.requestInputMode('c1');
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		expect(result).to.deep.equal([0, 0, 0]);
		bulk.updateFlags(Line.RequestFlags.ACTIVE_LOW);
		const result2 = bulk.values;
		expect(result2).to.be.an('array');
		expect(result2.length).to.be.eq(3);
		expect(result2).to.deep.equal([1, 1, 1]);
		bulk.release();
		done();
	});

	it('should request bulk for input passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 20, 21]);
		bulk.requestInputFlags('c1', Line.RequestFlags.BIAS_DISABLE);
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		expect(result).to.deep.equal([0, 0, 0]);
		bulk.release();
		done();
	});

	it('should request bulk for output passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 20, 21]);
		bulk.requestOutputFlags('c1', Line.RequestFlags.BIAS_DISABLE, [1, 1, 1]);
		bulk.setValues([1, 0, 1]);
		bulk.setDirectionInput();
		const result = bulk.values;
		expect(result).to.be.an('array');
		expect(result.length).to.be.eq(3);
		expect(result).to.deep.equal([1, 0, 1]);
		bulk.release();
		done();
	});

	it('should request bulk for rising edge events passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 20, 21]);
		bulk.requestRisingEdgeEventsFlags('c1', Line.RequestFlags.BIAS_DISABLE);

		bulk.release();
		done();
	});

	it('should request bulk for falling edge events passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 20, 21]);
		bulk.requestFallingEdgeEventsFlags('c1', Line.RequestFlags.BIAS_DISABLE);

		bulk.release();
		done();
	});

	it('should request bulk for both edges events passing flags', done => {
		const Chip0 = new Chip(0);
		const bulk = new Bulk(Chip0, [16, 20, 21]);
		bulk.requestBothEdgesEventsFlags('c1', Line.RequestFlags.BIAS_DISABLE);

		bulk.release();
		done();
	});
});
