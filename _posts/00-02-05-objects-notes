---
layout: notes
title: Object Oriented Design Notes
class: oo
date: 2014-09-16 00:00:00
---

## Alternative Approach

Just for future reference, objects in JavaScript could also be taught like so:

{% highlight javascript %}
// first start with functions on object
var person = {
  firstName: 'Whitney',
  lastName: 'Young',
  speak: function() { console.log('hello world'); },
  fullName: function() { return this.firstName + ' ' + this.lastName; }
};

// then explain `this`
var person = {
  firstName: 'Whitney',
  lastName: 'Young',
  fullName: function() { return this.firstName + ' ' + this.lastName; }
};

// then add encapsulation
var person = (function() {
  var firstName;
  var lastName;

  return {
    firstName: function() {
      if (arguments.length === 0) { return firstName; }
      else { firstName = arguments[0]; }
    },
    lastName: function() {
      if (arguments.length === 0) { return lastName; }
      else { lastName = arguments[0]; }
    },
    fullName: function() {
      return firstName + ' ' + lastName;
    }
  };
})();

// then add a constructor
var Person = function() {
  var firstName;
  var lastName;

  return {
    firstName: function() {
      if (arguments.length === 0) { return firstName; }
      else { firstName = arguments[0]; }
    },
    lastName: function() {
      if (arguments.length === 0) { return lastName; }
      else { lastName = arguments[0]; }
    },
    fullName: function() {
      return firstName + ' ' + lastName;
    }
  };
};
var person = Person();
{% endhighlight %}
