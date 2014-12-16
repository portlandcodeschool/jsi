---
layout: post
title: Bind, Call &amp; Apply
class: bind+call+apply
date: 2015-01-20
---

Today we're going to revisit some of the functions we wrote while discussing
functional programming topics. We'll make each of these functions work a little
better.

## Functions

### Arguments

What happens with this code?

{% highlight javascript %}
var fn = function() {

};
fn('hello', 'world');
{% endhighlight %}

What about this code?

{% highlight javascript %}
var fn = function(arg1, arg2) {
  console.log('%s %s', arg1, arg2);
};
fn();
{% endhighlight %}

Any function can take any number of arguments. What good is that if you can't
access the arguments? It's not, so JavaScript provides a hidden variable
called [`arguments`][mdn-arguments].

Let's take a look.


### Functions Are Objects

Remember when we said JavaScript treats functions just like any other object?
Well it treats them that way because they are objects!

Arrays have important methods like `forEach`, `map`, and `reduce` that we use
all the time. Strings have functions like `toUpperCase` and `toLowerCase`.
Functions have a few methods that are extremely important as well.

We'll see important uses for each of these methods shortly, but here are those
that we'll discuss today with a quick example of each.

#### Call

Allows you to call a function specifying what the value of `this` should be.

{% highlight javascript %}
fn.call(obj, 1, 2, 3);
{% endhighlight %}

Also, `call` allows us to convert `arguments` to a true array:

{% highlight javascript %}
Array.prototype.slice.call(arguments);
{% endhighlight %}

Can you explain the above code?

<aside>
When you understand the above use of `slice` on `arguments`, you'll realize
that you're invoking `slice` on an object that's not an array. That's not good!
But this is [documented][mdn-arguments] and is widely used, so it's certainly
going to continue to work. Think about it longer, and you'll realize that you
could implement your own version of slice that worked on real arrays as well
as the `arguments` array-like object.
</aside>

#### Apply

Allows you to call a function specifying what the value of `this` should be,
and the arguments are provided as an array.

{% highlight javascript %}
fn.apply(obj, [1, 2, 3]);
{% endhighlight %}

#### Bind

Lock in a value for `this` on a function by creating and returning a new
function.

{% highlight javascript %}
var bound = fn.bind(obj);
bound(1, 2, 3);
{% endhighlight %}


## Partial

Let's use our knowledge of `call`, and `apply` to update our `partial` function
so that it works for any number of arguments.

We're going to start from the code we implemented last week.

### Challenge

Create another function, `partialRight` that partially applies arguments
right to left instead of left to right.

<aside class="objective">
{% highlight javascript %}
var greet = function(greeting, name) { return greeting + ' ' + name; };
var greetFred = partialRight(greet, 'fred');
greetFred('hi'); //=> 'hi fred'
{% endhighlight %}
</aside>


## Memoize

Now let's revisit `memoize` function. How can we alter this function to accept
any number of arguments?


## Currying

Here's a short implementation of a [`curry` function][allonge-curry] taken from
[JavaScript Allongé][allonge]:

{% highlight javascript %}
var __slice = Array.prototype.slice;

function curry (fn) {
  var arity = fn.length;

  return given([]);

  function given (argsSoFar) {
    return function helper () {
      var updatedArgsSoFar = argsSoFar.concat(__slice.call(arguments, 0));

      if (updatedArgsSoFar.length >= arity) {
        return fn.apply(this, updatedArgsSoFar)
      }
      else return given(updatedArgsSoFar)
    }
  }

}

function sumOfFour (a, b, c, d) { return a + b + c + d }

var curried = curry(sumOfFour);

curried(1)(2)(3)(4) //=> 10

curried(1,2)(3,4) //=> 10

curried(1,2,3,4) //=> 10
{% endhighlight %}

### Challenge

* Determine how this function works.
* Pretend that you've now been given ownership of this code at your job.
  Prepare to explain how it works to a co-worker.
* Think of questions you'd ask a co-worker who wrote this code in order to
  fully understand it. Does anything stand out that's weird?

## Using Bind

The `bind` function will allow you to write cleaner and easier to read code.
It's also frequently used by others, so it's good to know about it and
understand how to use it.

Given the following:

{% highlight javascript %}
function AlarmClock(name) {
  this.name = name;
};

AlarmClock.prototype.ring = function() {
  console.log('RING RING RING!!!');
  console.log('%s!!!', this.name.toUpperCase());
  console.log('RING RING RING!!!');
};

var alarmClock = new AlarmClock('wake up');
setTimeout(function() {
  alarmClock.ring();
}, 1000);
{% endhighlight %}

The anonymous function passed to `setTimeout` is kind of redundant, isn't it?
We're creating a function that does one thing, calls a function. Why not just
pass `alarmClock.ring`?

Let's take a look.

Remember that _calling_ a method on an object via `.` or `[]` will result in
the function being invoked with `this` set to that object. The _binding_ of
`this` to the object on which the function is defined is only automatic,
though, when you access the function _and call it_ at the same time.

{% highlight javascript %}
alarmClock.ring(); // automatic binding
alarmClock['ring'](); // automatic binding

var ring = alarmClock.ring;
ring(); // no automatic binding

(function(ring) {
  ring()
})(alarmClock.ring); // no automatic binding
{% endhighlight %}

So we can lock in the value of `this` by using `bind`:

{% highlight javascript %}
function AlarmClock(name) {
  this.name = name;
};

AlarmClock.prototype.ring = function() {
  console.log('RING RING RING!!!');
  console.log('%s!!!', this.name.toUpperCase());
  console.log('RING RING RING!!!');
};

var alarmClock = new AlarmClock('wake up');
setTimeout(alarmClock.ring.bind(alarmClock), 1000);
{% endhighlight %}

You'll find this used by many JavaScript programmers, and I recommend using it
in your code as well.

### Challenge

* Implement a `schedule` method on the alarm clock class that will ring the
  clock at a certain date.

{% highlight javascript %}
alarmClock.schedule(new Date(Date.now() + 1000))
{% endhighlight %}

* Analog clocks go off ever 12 hours when you set them. Make your alarm clock
  act like an analog clock by scheduling it again after you call `ring`.
  Constraints: don't schedule the clock from within `ring`.

* **Advanced:** Understand and be able to explain this code:

{% highlight javascript %}
var slice = Function.prototype.call.bind(Array.prototype.slice);
slice(arguments);
{% endhighlight %}


[allonge]: https://leanpub.com/javascript-allonge
[allonge-curry]: https://leanpub.com/javascript-allonge/read#leanpub-auto-currying-1
[mdn-arguments]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments
[mdn-bind]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
