const { expect } = require('chai');
const gpiod = require('..');

describe('libgpiod miscellaneous bindings', () => {

	const pinOffset = parseInt(process.env.PIN_OFFSET) || 17;
	const pinLabel = process.env.PIN_LABEL || 'GPIO17';
	const pinValue = parseInt(process.env.PIN_VALUE) || 0;

	it('should get libgpiod version', done => {
		const mahjorMinorPatch = gpiod.version.split(".").map(v => parseInt(v))
		expect(mahjorMinorPatch[0]).eq(1);
		expect(mahjorMinorPatch[1]).gte(5);
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
		const value = gpiod.
			getInstantLineValue(0, pinOffset);
		expect(value).to.eq(pinValue);
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
		const result = gpiod.setInstantLineValue(0, pinOffset, (pinValue + 1) % 2, {
			callback: (result) => {
				console.log('set value callback result ' + result);
				done();
			}
		});
		console.log('set value called ' + result);
	});

	it('should set instant value, no callback', done => {
		const result = gpiod.setInstantLineValue(0, pinOffset, (pinValue + 1) % 2);
		console.log('set value called without callback ' + result);
		done();
	});

	it('should get lines instant values', done => {
		const value = gpiod.getInstantLineValues(0, [pinOffset]);
		expect(value).to.be.an('array');
		expect(value.length).to.eq(1);
		expect(value).to.deep.equal([pinValue]);
		done();
	});

	it('should set lines instant values', done => {
		gpiod.setInstantLineValues(0, [pinOffset], [0], {
			callback: (v) => {
				console.log('callback lines ' + v);
				done();
			}
		});
	});

	it('should get lines instant values passing flags', done => {
		const value = gpiod.getInstantLineValues(0, [pinOffset], {
			flags: gpiod.InstantFlags.BIAS_DISABLE
		});
		expect(value).to.be.an('array');
		expect(value.length).to.eq(1);
		expect(value).to.deep.equal([pinValue]);
		done();
	});

	it('should set lines instant values passing flags', done => {
		gpiod.setInstantLineValues(0, [pinOffset], [0], {
			flags: gpiod.InstantFlags.BIAS_DISABLE,
			callback: (v) => {
				console.log('callback lines flags');
			}
		});
		const value = gpiod.getInstantLineValues(0, [pinOffset]);
		expect(value).to.be.an('array');
		expect(value.length).to.eq(1);
		expect(value).to.deep.equal([pinValue]);
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
