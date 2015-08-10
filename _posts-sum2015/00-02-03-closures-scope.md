---
layout: post
title: Closures &amp; Scope
class: closures+scope
date: 2015-05-13
---

Understanding _closures_ and _scope_ will help us really understand what's going on when we use variables inside and outside of functions.

You may already be using closures and scope effectively without knowing it! We now just need to attach some terms so that you have a common vocabulary to discuss these concepts with other programmers.

## Scope

Scope is the term that we use to define where variables are usable.

{% highlight javascript %}
var add = function(x, y) {
  var result;
  result = x + y;
  return result;
};
var subtract = function(x, y) {
  var result;
  result = x - y;
  return result;
};

// insert code to call add & subtract
{% endhighlight %}

In the above example, `x`, `y`, and `result` are the names of variables that
are defined in two different functions.

Let's ask some questions in order to better understand scope:

* What will happen if we `console.log(z)` (where the comment is)?
* What will happen if we `console.log(x)`?
* What will happen if we `console.log(x)` before a call to `add`?
* What if we do it after?
* What if we `console.log(result)` before `var result;`?
* What if we `console.log(result)` after `var result;`?
* What if we `console.log(result)` and call `add` more than once?
* What if we remove `var result;`? Will anything change? If so, why?
* What if we re-define subtract to be `result = add(x, -y)`?

Here's another example:

{% highlight javascript %}
var x = 0;
var foo = function(x) {
  var bar = function(x) {
    return x;
  };
  return bar(x);
};
console.log(foo(x));
{% endhighlight %}

How can you access the first use of `x` inside of `bar`? Because you've re-defined what that variable means in a _new scope_, you cannot.

This is called shadowing. In this case, it's not a big deal. In general, you should try to avoid shadowing variables, though, as you may come back to your code later and not understand why using `x` doesn't get you the first `x` that you declared (because you didn't notice that there's a later declaration of `x`).

## Closures

Closures are basically functions that reference variables that are defined outside of their scope. Here's an example:

{% highlight javascript %}
var x = 0;
var fn = function() {
  return x;
};
{% endhighlight %}

Formally, `x` is referred to as a _free variable_ or _non-local variable_. Functions that have free variables are _closures_, and those that have no free variables are _pure_.


### Challenge

* Write a function that generates the next number each time it's called:

{% highlight javascript %}
sequence(); //=> 0
sequence(); //=> 1
sequence(); //=> 2
{% endhighlight %}

* Write a function, `counter` that returns your sequence generator:

{% highlight javascript %}
var sequence1 = counter();
var sequence2 = counter();
sequence1(); //=> 0
sequence1(); //=> 1
sequence2(); //=> 0
sequence1(); //=> 2
sequence2(); //=> 1
{% endhighlight %}

* Allow your counter to start at any number, for instance, `counter(5)`.
* Allow your counter to be reset:

{% highlight javascript %}
var sequence1 = counter();
var sequence2 = counter();
sequence1.next(); //=> 0
sequence1.next(); //=> 1
sequence2.next(); //=> 0
sequence1.next(); //=> 2
sequence1.reset(); //=> void
sequence1.next(); //=> 0
sequence2.next(); //=> 1
sequence1.reset(5); //=> void
sequence1.next(); //=> 5
{% endhighlight %}

## Advanced Scope

### The `var` keyword

Let's look at some examples to really understand `var`.

{% highlight javascript %}
var foo = 1;
function bar() {
  if (foo === 0) {
    var foo = 10;
  }
  console.log(foo);
}
bar();
{% endhighlight %}

{% highlight javascript %}
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
{% endhighlight %}

The above examples are taken (and slightly modified) from this excellent article on [_hoisting_][hoisting].

The main consideration is that any time you use `var`, you can consider that variable to be declared at the top of the function in which it's defined. It is good practice, therefore, to put `var` declarations at the top of the function to avoid confusion.

Here's another gotcha:

{% highlight javascript %}
var array = ["hello", "world"];
var callbacks = [];
for (var i = 0; i < array.length; i++) {
  callbacks.push(function() {
    console.log(array[i]);
  });
}
callbacks.forEach(function(c) { c(); });
{% endhighlight %}

* What's the intended result of this code?
* What's the actual result of this code?
* How can you avoid this gotcha?

<aside>
  **`let`**

  The `let` keyword will be added in ES6 and will allow us to define block-scope variables. This will make JavaScript a bit more similar to other programming languages and address some of the gotchas above.
</aside>

### Immediately invoked function expressions

It's possible to create an environment, or scope, to protect a set of variables from access. This is used frequently by JavaScript programmers.

{% highlight javascript %}
var greet = (function() {
  var greeting = "Hello, ";

  return function(personName) {
    console.log(greeting + personName);
  };
})();

greet('Andrew');
{% endhighlight %}

Note that `sayHello` is set to a function that actually returns a function. The inner function is the one that's called later with `greet('Andrew')`. The `greeting` variable is not accessible outside of the scope created by the immediately invoked function expression. This example is a bit contrived, but we'll start using these soon.

## Takeaway

If all of the vocabulary didn't make sense on this pass, don't worry too much about it. Generally if your code is well written, you won't really need to think about scope or think too hard about what a closure is. It will be handy to understand the terminology to discuss this with other programmers, though.

[hoisting]: http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
