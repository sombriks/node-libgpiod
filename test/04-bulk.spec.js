const chai = require('chai');
const { Chip, Bulk } = require('..');

chai.should();
const expect = chai.expect;

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
});
