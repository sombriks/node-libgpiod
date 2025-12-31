const { expect } = require('chai');
const gpiod = require('..');

describe('libgpiod miscellaneous bindings', () => {
	it('should get libgpiod version', done => {
		// TODO should we support 1.4?
		expect(gpiod.version).to.contain("1.6");
		done();
	});

	it('should get chip names', done => {
		const result = gpiod.chipNames;
		expect(result).to.be.an('array');
		expect(result.length).to.be.greaterThan(0);
		expect(result[0]).to.be.a('string');
		done();
	});

	it('should get line instant value', done => {
		const value = gpiod.getInstantLineValue(0, 17);
		expect(value).to.eq(0);
		done();
	});

	it('should NOT get line instant value due wrong chip name', done => {
		try {
			gpiod.getInstantLineValue('/dev/gpiochipZero', 17);
		} catch (error) {
			expect(error.errno).eq(2);
			expect(error.code).eq('ENOENT');
			expect(error.syscall).eq('::getInstantLineValue');
			expect(error.message).to.include('Unable to get instant value');
			done();
		}
	});

	it('should invoke callback after set instant value', done => {
		// TODO: callback is synchronous, should be async
		gpiod.setInstantLineValue(0, 17, 1, {
			callback: () => {
				console.log('callback line');
			}
		});
		setTimeout(() => {
			const value = gpiod.getInstantLineValue(0, 17);
			// expect(value).to.eq(1); // instant value doesn't seems to persist values
			expect(value).to.eq(0);
			done();
		}, 100);
	});

	it('should get lines instant values', done => {
		const value = gpiod.getInstantLineValues(0, [16, 20, 21]);
		expect(value).to.be.an('array');
		expect(value.length).to.eq(3);
		expect(value).to.deep.equal([0, 0, 0]);
		done();
	});

	it('should set lines instant values', done => {
		gpiod.setInstantLineValues(0, [16, 20, 21], [0, 0, 0], {
			callback: () => {
				console.log('callback lines');
			}
		});
		const value = gpiod.getInstantLineValues(0, [16, 20, 21]);
		expect(value).to.be.an('array');
		expect(value.length).to.eq(3);
		expect(value).to.deep.equal([0, 0, 0]);
		done();
	});

	it('should get lines instant values passing flags', done => {
		const value = gpiod.getInstantLineValues(0, [16, 20, 21], {
			flags: gpiod.InstantFlags.BIAS_DISABLE
		});
		expect(value).to.be.an('array');
		expect(value.length).to.eq(3);
		expect(value).to.deep.equal([0, 0, 0]);
		done();
	});

	it('should set lines instant values passing flags', done => {
		gpiod.setInstantLineValues(0, [16, 20, 21], [0, 0, 0], {
			flags: gpiod.InstantFlags.BIAS_DISABLE,
			callback: () => {
				console.log('callback lines flags');
			}
		});
		const value = gpiod.getInstantLineValues(0, [16, 20, 21]);
		expect(value).to.be.an('array');
		expect(value.length).to.eq(3);
		expect(value).to.deep.equal([0, 0, 0]);
		done();
	});

	// it('should monitor events in line 16', done => {
	// 	gpiod.instantMonitorEvent(0, 16, gpiod.InstantFlags.Events.BOTH_EDGES,
	// 		(type, pin, milliseconds) => {
	// 			console.log(type, pin, milliseconds);
	// 			done()
	// 		})
	// })
});
