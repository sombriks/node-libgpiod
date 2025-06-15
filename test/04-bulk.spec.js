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
    const bulk = new Bulk(Chip0, ['GPIO16', 'GPIO21', 'GPIO22']);
    bulk.should.be.an.instanceof(Bulk);
    expect(bulk._handler).to.be.ok;
    done();
  });
});
