---
layout: post
title: Objects&#58; Methods and Inheritance
date: 2015-01-16
---

Today we're going to get into some of the more interesting things you can do with objects: _methods_, which are object attributes that are functions, and _inheritance_, which is a mechanism for sharing behavior between objects.

In the first part of this class, we'll be using the function `interpolate`, which takes a string and inserts it between each element of the array.

{% highlight javascript %}
  ["uno", "dos", "tres", "catorce"].interpolate(", "); // => "uno, dos, tres, catorce"
{% endhighlight %}

## Methods

You've used methods already. On day 1, we got into the `forEach` method on arrays:

{% highlight javascript %}
["a", "b", "c"].forEach(function(element, index) {
  console.log("'" + element + "' is at index " + index + ".")
});
{% endhighlight %}

Think about how you might implement the `interpolate` method.

{% highlight javascript %}
var myArray = [];
myArray.interpolate = function(delimiter) {
  // what to write here?
};
{% endhighlight %}

If you're writing a function that accepts an array as its argument like `var interpolate = function(array, delimiter) {...}`, it's easy to see how to write it. But how do you get access to the object for which you're writing a method? Well, you use the keyword `this`. In JavaScript, `this` is a special variable that refers to the current object. So we could write `interpolate` like so:

{% highlight javascript %}
var myArray = [];
myArray.interpolate = function(delimiter) {
  var joined = ""
  for (var i = 0; i < this.length - 1; i++) {
    joined += this[i] + delimiter;
  }
  joined += this[this.length - 1];
  return joined;
};
{% endhighlight %}

### Exercise: implement a method

Yesterday you implemented one of the functions from the LoDash library. Rewrite that function as a method on an array:

{% highlight javascript %}
var myArray = [...];
myArray.myIterateyFunction = function(...) {

};
{% endhighlight %}

## Constructors

Adding a function to a single object is ok, but it only gets you so far. If you have some code that wants to use `interpolate`, it needs to be able to rely on `interpolate` being present. It would be tedious and error-prone to manually add `interpolate` to every object on which you need it. One way to get around that is a _constructor_, which is a function that constructs and returns a new object. Here's a constructor that makes an array with `interpolate` attached:

{% highlight javascript %}
var MyArray = function () {
  var toReturn = [];
  for (var i = 0; i < arguments.length; i++) {
    toReturn[i] = arguments[i];
  }
  toReturn.interpolate = function(delimiter) {
    var joined = ""
    for (var i = 0; i < this.length - 1; i++) {
      joined += this[i] + delimiter;
    }
    joined += this[this.length - 1];
    return joined;
  };
  return toReturn;
}
{% endhighlight %}

Now if you want an array with a `interpolate` function, you can make it with the `MyArray` constructor:

{% highlight javascript %}
var someArray = MyArray(1, 2, 3, 4, 5);
{% endhighlight %}

However, that `toReturn` variable is a little fishy. It's not too bad, but it's not great either. JavaScript provides the keyword `new`, which takes a constructor, creates an object, and then calls the constructor with `this` bound to the newly-created object. It makes things a little nicer than before:

{% highlight javascript %}
var MyArray = function () {
  for (var i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }
  this.interpolate = function(delimiter) {
    var joined = ""
    for (var i = 0; i < this.length - 1; i++) {
      joined += this[i] + delimiter;
    }
    joined += this[this.length - 1];
    return joined;
  };
}

var someArray = new MyArray(1, 2, 3, 4, 5);
{% endhighlight %}

<aside>
  **Syntactic Sugar**

  _Syntactic sugar_ is any language syntax that accomplishes something you can already do, but in a more convenient way. In JavaScript, `[...]` is syntactic sugar for `new Array(...)`. Any time you see the one, you could replace it with the other. Generally, the sugared variant is easier to read and write, so we prefer it.
</aside>

Okay, that's a little nicer. There's still a glaring problem, though: all the arrays we get have to have been created by `MyArray`, not with `[]`. We could do something like this:

{% highlight javascript %}
var MyArray = function () {
  if (arguments.length === 1 && typeof(arguments[0]) === 'array') {
    arguments = arguments[0];
  }
  for (var i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }
  this.interpolate = function(delimiter) {
    var joined = ""
    for (var i = 0; i < this.length - 1; i++) {
      joined += this[i] + delimiter;
    }
    joined += this[this.length - 1];
    return joined;
  };
}

var someArray = new MyArray(regularArray);
{% endhighlight %}

But it's not that much better. What we really want is for every array everywhere to have `interpolate`. What we really want to do is mess with the _`prototype`_ from which all Arrays are created.

### Exercise: Objects with Methods

Let's go back to game.js. Update the code in jsi-gamelib so that:

* There is a class called `Room`.
* When `game.json` is loaded, the list of descriptions is used to instantiate a list of `Room`s.
* The `Room` class has methods for joining itself to its neighbors, so walls aren't drawn twice.

## Prototypes

Back on day 1 I told you that Objects are associations between keys and values. Well, I lied, a little. Objects also have a _prototype_, which is another Object that gets searched when you try to access an attribute that isn't there. If you type `someObject.someAttribute`, JavaScript first searches for a `someAttribute` attribute in `someObject`. If it doesn't find one, it then searches `someObject`'s prototype, and then the prototype's prototype, and so on, until it gets to the end of the prototype chain. That means we can put an attribute in `Array.prototype` and make it available to all arrays everywhere:

{% highlight javascript %}
Array.prototype.interpolate = function(delimiter) {
  var joined = ""
  for (var i = 0; i < this.length - 1; i++) {
    joined += this[i] + delimiter;
  }
  joined += this[this.length - 1];
  return joined;
};

["uno", "dos", "tres", "cuatro", "cinco", "cinco", "seis"].interpolate(", ");
{% endhighlight %}

<aside>
  **Monkey-patching**

  _Monkey-patching_ is an informal term for adding behavior to a datatype that you didn't create. Above, we monkey-patched `interpolate` into the main `Array` type. Monkey-patching can be useful, but use it with caution. If two modules try to monkey-patch a function with the same name, one of them will win and one will get its monkey-patch overridden. That's bad. There's a chance the two implementations are compatible, but more likely, the module that lost will end up behaving wrong.
</aside>

You can set the prototype for your own constructors as well:

{% highlight javascript %}
var MyConstructor = function() {
  ...
}
MyConstructor.prototype = {
  'doAThing': function() {...}
};
{% endhighlight %}

### Exercise: Prototypes

Let's add several types of room:

* cave
* dungeon
* lounge

Each type of room should have Room as its prototype, but describe itself differently.



