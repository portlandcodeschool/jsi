
module.exports = {
  length: 0,
  pop: function() {
    var returnValue = this[this.length - 1];
    this[this.length-1] = undefined;
    this.length--;
    return returnValue;
  },
  push: function(input) {
    this[this.length] = input;
    return ++this.length;
  },
  shift: shift
};

var shift = function(thing) {
  //shift
};
