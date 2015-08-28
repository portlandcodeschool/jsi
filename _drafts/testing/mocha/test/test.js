var fakeArray = require('../fakeArray.js');
var chai = require('chai');
var expect = chai.expect;

describe('My fake array object', function() {
  describe('The pop method', function() {

    before(function() {
      fakeArray[0] = 1;
      fakeArray[1] = 2;
      fakeArray[2] = 3;
      fakeArray.length = 3;
    });

    it('should return the final element', function() {
      expect(fakeArray.pop()).to.equal(3);
    });
  });
});
