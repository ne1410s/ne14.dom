const expect = require('chai').expect;
const ne14 = require('../dist/index');

describe('#thingamy', () => {

    it('1.1.1', () => {
        var sut = ne14.Dom.circumference(4.5);
        expect(sut).to.equal(3.141592 * 9);
    });

});