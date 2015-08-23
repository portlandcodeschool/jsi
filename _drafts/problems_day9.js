var counter = function() {
  var number = 0;
  var sequence = function() {
    console.log(++number);
  };
  return sequence;
};

function thingStamper() {
  var _id = 0;
  function makeThing() {
    var number = ++_id;
    var thing = {
      id: function() {
        return number;
      },
      color: makeThing.color
    };
    return thing;
  }
  makeThing.color = function() {
    return (this.id()%2) ? 'red': 'blue';
  };
  return makeThing;
}

function storePassword(passwd) {
    return function(input) {
      return input === passwd;
    };
}

// Use it like this:
var verifyPassword = storePassword("sekrit");

verifyPassword("password"); // false
verifyPassword("12345"); // false
verifyPassword("sekrit"); // true
