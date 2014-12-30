---
layout: notes
title: Bind, Call &amp; Apply Notes
class: bind+call+apply
date: 2014-09-17 00:00:00
---

This class may not feel appropriate at this time. You'll have to gauge how well
they understood objects and the functional stuff. Don't push it. If it doesn't
feel right, try coming back to this in week four. Try not to delay it too much,
though because the functions being built here were recently introduced. We
don't want them to forget what those functions were or how they worked.

## Class Flow

1. Start by looking at the two code examples. Students may guess that the
   code produces errors. If they don't, you can try to outline possible
   scenarios for them and have them vote on what they think will happen:
   * Won't compile (syntax error)
   * Won't run (runtime error)
   * Runs fine without problems (for the second, what would it log?)
1. Discuss `arguments`. Log out the `arguments` in the first example. Ask them
   what type of object this result is. Note that it's not an array, it's an
   object that has `length` and the other properties happen to be indexes. Also
   note that we'll soon learn how to convert it to a true array.
1. Jump into each of the sub-points.


## Functions

### Call

It will be best to show this off with an example function:

{% highlight javascript %}
var fn = function() {
  'use strict';
  console.log('fn called with this: %j, arguments: %j', this, arguments);
};
fn(1, 2, 3);
fn.call('hello', 1, 2, 3);
fn.call({ message: 'hello' }, 1, 2, 3);
{% endhighlight %}


## Partials

We're starting from this:

{% highlight javascript %}
var partial = function(fn, arg1) {
  return function(arg2, arg3) {
    return fn(arg1, arg2, arg3);
  };
};

var greet = function(greeting, firstName, lastName) {
  return greeting + ' ' + firstName + ' ' + lastName;
};

var hi = partial(greet, 'hi');

console.log(hi('Whitney', 'Young'));
{% endhighlight %}


Next step:

{% highlight javascript %}
var partial = function(fn, arg1) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var all = [arg1].concat(args)
    return fn.apply(null, all);
  };
};
{% endhighlight %}

Finally:

{% highlight javascript %}
var partial = function(fn) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 1);
  return function() {
    return fn.apply(null, args.concat(slice.call(arguments)));
  };
};
{% endhighlight %}


## Memoize

The `memoize` function they implemented previously should have been this:

{% highlight javascript %}
var memoize = function(fn) {
  var cache = {};
  return function(arg) {
    return cache[arg] || (cache[arg] = fn(arg));
  };
};
{% endhighlight %}

We can re-iterate the test driven development process by writing some tests
for `memoize` before we proceed. Depending on how things feel at this point,
either the students can do this on their own, or we can do it together. A test
would need to ensure that a function was called the first time it received an
argument, then ensure it's not called the next time it receives that same
argument. The same would be true for multiple arguments.

There are only two changes that need to happen to get this to work with
multiple arguments. First, they need to create a key from all of the
arguments.

Second, they need to use `apply` to call the original function with multiple
arguments.


{% highlight javascript %}
var memoize = function(fn) {
  var cache = {};
  var slice = Array.prototype.slice;
  return function () {
    var args = slice.call(arguments, 0);
    var key = JSON.stringify(args);
    return cache[key] ||
      (cache[key] = fn.apply(this, args));
  };
};
{% endhighlight %}


## Curry Code Reading Challenge

Have one group of students present their explanation of the `curry` function.
The other groups should ask questions as if they're co-workers.

Remind the students that it's important to understand the question being asked
before they answer. No one should try to trick anyone. It's a discussion, not
a boxing match.

Here are some questions to throw in the mix:

* Why did you name the function `helper` (instead of leaving it anonymous)?
* What is the point of creating a variable called `__slice`?
* Why two underscores on `__slice`?  
  _Answer: probably just convention to indicate a constant._
* What does `arity` mean? I've never heard that word before.  
  _Answer: number of arguments of a function. Math term used in programming
  sometimes._

## Bind

I found these interesting:

{% highlight javascript %}
(alarmClock['ring'])(); // automatic binding
(1 && alarmClock['ring'])() // not automatically bound
{% endhighlight %}

This is the solution to the alarm clock challenge:

{% highlight javascript %}
AlarmClock.prototype.schedule = function(date) {
  var delay = date.getTime() - Date.now();
  console.log('schedule for %d sec from now', delay);
  setTimeout(function() {
    this.ring();
    this.schedule(new Date(Date.now() + 1000 * 86400 / 2));
  }.bind(this), delay);
};
{% endhighlight %}

Students who come up with a solution similar to the one below should be
encouraged to form a solution without an extra method (this still shows good
understanding, though).

{% highlight javascript %}
AlarmClock.prototype.ringAndReschedule = function() {
  this.ring();
  this.schedule(new Date(Date.now() + 1000 * 86400 / 2));
};

AlarmClock.prototype.schedule = function(date) {
  var delay = date.getTime() - Date.now();
  setTimeout(this.ringAndReschedule.bind(this), delay);
};
{% endhighlight %}
