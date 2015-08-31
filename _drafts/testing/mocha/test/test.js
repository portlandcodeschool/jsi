var fakeArray = require('../fakeArray.js');
var array = [];
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');

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

  describe('testing the push method', function() {

      before(function() {
        fakeArray[0] = 1;
        fakeArray[1] = 2;
        fakeArray[2] = 3;
        fakeArray.length = 3;
        fakeArray.push(4);
      });

    it('it should increase the length of the array by one', function() {
      assert.equal(fakeArray.length, 4);
    });
  });
});
