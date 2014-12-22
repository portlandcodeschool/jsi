---
layout: notes
title: Fundamentals Notes
class: fundamentals
date: 2014-09-03 01:00:00
---

TODO: How do you best explain that objects are mutable?

TODO: Add some more activities with objects and variables. For instance, what
happens when you create a variable, assign it to the current property of an
object, then change the object's property? What's the value of the variable?

TODO: Common problems included not quite understanding the difference between
a variable and what a variable was. How can we do a better job of that?

TODO: Introduction of objects can be improved. The confusion centers around the
difference between variables and the fact that they _name_ things and the fact
that properties name things as well. Perhaps there's a way where we can use
props and hand them out that will help solidify the idea of what a _string_ or
a _number_ or an _object_ are. The hard part of that will be how to associate
those with symbols, or the variable names.

TODO: Differentiating the names of variables from the names of parameters needs
to be improved. For some people, it's been hard to understand that a function
has its own variables. Those variables don't relate to values outside of the
function.

TODO: Reorder some of the challenges so that a few come before the return value
stuff.

TODO: Consider updating the return value example to not use the return value
right away and instead assign it to a variable.

TODO: Conditionals are only lightly introduced. Is it okay the way it is or
should we list off the different types of checks that can be done?

TODO: All challenges can be better defined at this point. Also it'd be good to
have more challenges to select from.

TODO: Add notes to this page to cover arrays by demonstrating a few different
concepts. Accessing/altering values that are outside the length of the array,
appending by array[array.length] = 'val'.

TODO: It may be best to recommend using the bracket syntax for objects instead
of the dot syntax. This would probably make later assignments where objects are
used as key/value storage (hash/dictionary) much easier.

## Class Flow

- There's no expectation to get through all the material on this one day, it
  could bleed over into later in the week.
- Break the slides into two sections and allow the students to try out objects
  before moving on to functions. Be sure they understand pretty well before
  moving on. This stuff should be pretty straight forward.
- Discuss JSHint briefly before functions, have them lint a file. Show some
  examples like `==`, whitespace problems, and mistyped variable names.
- Once getting into the functions section, take things very slowly.
- Introduce the _Learning To Count_ example very slowly in particular.
- The `continueCounting` function progress is described in detail below.
- The array section is basically a copy of the ideas presented in counting
- The instructor should note that we're building up to a recursive
  implementation of `forEach` in the next class, but don't mention that these
  are recursive functions at this point. There's no reason to introduce that
  jargon right now.

## Counting

### The `continueCounting` Function Progression

Discuss the comment on the class page, try to get the students to understand
that they'll need to both say the number and continue counting afterwards.
This code turns out to be:

{% highlight javascript %}
var continueCounting = function(n) {
  sayNumber(n);
  continueCounting(n+1);
};
{% endhighlight %}

Gage how hard this is for students to understand. Regardless of whether they
fully understand, it's a very good idea to walk through what will happen as
this function progresses. Do not discuss call stacks. Simply ask them what's
going to happen next.

There's a note on the class page that refers to proper tail calls in ES6. If
anyone asks about this, simply point out that the comment tells them to ask
later and leave it at that. Absolutely do not mention tail calls at this point.

#### Final Counting Code

{% highlight javascript %}
var sayNumber = function(person, n) {
  console.log(person.name + " says '" + n.toString() + "'");
};

var continueCounting = function(person, n) {
  if (person.age <= 3 && n > 10) {
    console.log(person.name + " can't count past 10 at age " + person.age + ".");
  }
  else if (person.age <= 4 && n > 20) {
    console.log(person.name + " can't count past 20 at age " + person.age + ".");
  }
  else if (n > 100) {
    console.log(person.name + " got bored and stopped counting.");
  }
  else {
    sayNumber(person, n);
    continueCounting(person, n+1);
  }
};

var startCounting = function(person) {
  // a previous version of this function was:
  //   sayNumber(person, 0);
  //   continueCounting(person, 1);
  // but it can be simplified because starting
  // to count is really just continuing from 0.
  continueCounting(person, 0);
};

startCounting({
  name: "Whitney",
  age: 4
});
{% endhighlight %}


## Fruits

Here's the full fruits code:


{% highlight javascript %}
var indicateFruitThatNeedsPurchasing = function(fruit) {
  console.log("I need to purchase " + fruit + ".");
};

var continueIndicatingFruitThatNeedsPurchasing = function(array, n) {
  if (n < array.length) {
    indicateFruitThatNeedsPurchasing(array[n]);
    continueIndicatingFruitThatNeedsPurchasing(array, n+1);
  }
};

var startIndicatingFruitThatNeedsPurchasing = function(array) {
  continueIndicatingFruitThatNeedsPurchasing(array, 0);
};

var indicateFruitPurchased = function(fruit) {
  console.log("I purchased " + fruit + " today.");
};

var continueIndicatingFruitPurchased = function(array, n) {
  if (n < array.length) {
    indicateFruitPurchased(array[n]);
    continueIndicatingFruitPurchased(array, n+1);
  }
};

var startIndicatingFruitPurchased = function(array, n) {
  continueIndicatingFruitPurchased(array, 0);
};

var fruits = ['apples', 'oranges', 'bananas'];
startIndicatingFruitThatNeedsPurchasing(fruits, 0);
startIndicatingFruitPurchased(fruits, 0);
{% endhighlight %}
