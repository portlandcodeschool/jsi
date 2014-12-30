---
layout: notes
title: Functional Programming Notes
class: functional
date: 2014-09-15 00:00:00
---

## Class Flow

* Go through each of the different functions and discuss
* If short on time, consider skipping `once` and/or `filter` and have the
  students do these during the final challenge.

## Memoize

1. Show the Fibonacci code.
1. Ask if anyone knows why it's slow (before they answer, make sure they didn't
   know the answer before class started). The expectation is that no one knows
   why.
1. Discuss why it may be slow. Talk through what the computer has to do step by
   step. Have someone come write on the board to show the sequence of events.
1. Show the tracing program below and explain how it works.
1. Count the number of occurrences of calculating a sub-result using `grep`.
   You'll have to briefly explain `grep` and regular expressions and note that
   we'll come back to regular expressions soon.
1. Discuss how to make it faster &mdash; don't re-calculate a sub result when
   we've already calculated it once.
1. Continue with the code below.

Here's a tracing program for the Fibonacci sequence:

{% highlight javascript %}
var fibonacci = function(n, indent) {
  var pad = function(n) {
    var res = '';
    for (var i = 0; i < n; i++) {
      res += ' ';
    }
    return res;
  };
  if (n > 1) {
    console.log('%sfibonacci(%d) -> fibonacci(%d) + fibonacci(%d)', pad(indent), n, n-1, n-2);
    return fibonacci(n - 1, indent + 1) + fibonacci(n - 2, indent + 1);
  }
  else {
    return n;
  }
};
console.log(fibonacci(Number(process.argv[2]), 0));
{% endhighlight %}

Show how the tracing program works by showing it with a low number:

{% highlight bash %}
node fibonacci.js 3
node fibonacci.js 4
node fibonacci.js 5

node fibonacci.js 20
node fibonacci.js 20 | grep "fibonacci\(8\) ->"
node fibonacci.js 20 | grep "fibonacci\(8\) ->" | wc -l
{% endhighlight %}


Start by getting to this:

{% highlight javascript %}
var cache = {};
var factorial = function(n) {
  if (!cache[n]) {
    cache[n] = n === 0 ? 1 : n * factorial(n - 1);
  }
  return cache[n];
};
{% endhighlight %}

Then use an immediately invoked function expression to get to this state
before moving over to abstracting the `memoize` function.

{% highlight javascript %}
var fibonacci = (function() {
  var cache = {};
  return function(n) {
    if (!cache[n]) {
      cache[n] = n > 1 ? fibonacci(n - 1) + fibonacci(n - 2) : 1;
    }
    return cache[n];
  };
})();
{% endhighlight %}

Factorial doesn't have the same performance problem, but let's imagine that it
did for the sake of simplicity. Here's what a version with caching might look
like:

{% highlight javascript %}
var factorial = (function() {
  var cache = {};
  return function(n) {
    if (!cache[n]) {
      cache[n] = n === 0 ? 1 : n * factorial(n - 1);
    }
    return cache[n];
  };
})();
{% endhighlight %}

Allow students to try to abstract the `memoize` function on their own. This
could be quite a challenge. In the end, the `memoize` function should look
like this (for a single argument):

{% highlight javascript %}
var memoize = function(fn) {
  var cache = {};
  return function(arg) {
    return cache[arg] || (cache[arg] = fn(arg));
  };
};
var fibonacci = memoize(function(n) {
  return n > 1 ? fibonacci(n - 1) + fibonacci(n - 2) : 1;
});
{% endhighlight %}

For reference, eventually, we'll get it to this, but for now we aren't going to
talk about `apply`:

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


## Partial Application

We won't get all the way through partial applications since we can't, `call`,
`apply`, and `arguments`.

{% highlight javascript %}
var partial = function(fn, arg1) {
  return function(arg2) {
    return fn(arg1, arg2);
  };
};

var greet = function(greeting, name) {
  return greeting + ' ' + name;
};

var hi = partial(greet, 'hi');

console.log(hi('Whitney'));
{% endhighlight %}

Show an example of what it would mean to handle 3 arguments (below), and note
that it only handles the case where one argument is provided to the `partial`
call and the other two are provided to the resulting function. This isn't very
flexible.

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


## Reduce

This one will probably be pretty tricky. Take it really slowly through each one
of the examples. Try to get the students to realize that the following things
are shared between each code base:

* An input array
* A result value set to some initial value
* Alteration of the result value for each item in the array

If you're feeling that there's some time, and you feel that people weren't
totally confused by `curry`, you could implement the `reduce` function to
really give them understanding of how it works. Or you could have them do it,
too. It looks like this:

{% highlight javascript %}
var fold = function(array, fn, start) {
  array.forEach(function(item) {
    start = fn(start, item);
  });
  return start;
};
{% endhighlight %}


This is the solution to the reduce/fold challenge:

{% highlight javascript %}
_.reduce(pairs, function(obj, pair) {
  obj[pair[0]] = pair[1];
  return obj;
}, {});

var zipObject = _.partialRight(_.reduce, function(obj, pair) {
  obj[pair[0]] = pair[1];
  return obj;
}, {});
{% endhighlight %}


## Final Challenge

Have the students present their function that they studied. Have them teach
about how it works and what it does. Politely correct only those details that
matter. Ignore minor things that may not be right.

Have them present their code and implementation if they wrote any. Ask them to
discuss challenges and difficulties they faced while implementing their version
(even if they didn't get it done). If they didn't get it done, ask them how
they might implement it.

If need be, have this spill over into the next day. If it's on the next day,
have the students reflect on whether it was easy to remember everything that
they did from the previous day.


## Promises

This was an attempt to try to show what promises could do for callback flow and
how you might build that on your own. The promise implementation here isn't
very good and I'm not sure it's illustrative either. This probably would be bad
to use even when discussing promises later. I'm putting it in here in case it
ever becomes useful later.

{% highlight javascript %}
// save as promise.js
// echo "promise.js" > filename.txt
// node promise.js filename.txt

var fs = require('fs');

// fs.readFile(process.argv[2], { encoding: 'utf8' }, function(err, fileName) {
//   fs.readFile(fileName.trim(), { encoding: 'utf8' }, function(err, contents) {
//     console.log(contents);
//   });
// });


var readFile = function(file, options) {
  var promise = {};

  promise.thenCallbacks = [];
  promise.errorCallback = function(err) { throw new Error(err) };
  promise.then = function(callback) {
    promise.thenCallbacks.push(callback);
    return promise;
  };
  promise.error = function(callback) {
    promise.errorCallback = callback;
    return promise;
  };

  fs.readFile(file, options, function(err, data) {
    var success = promise.thenCallbacks.shift();
    if (err) { promise.errorCallback(err); }
    else {
      var result = success(data);
      var thenable = (result && typeof result.then === 'function');
      if (thenable) {
        result.thenCallbacks = promise.thenCallbacks;
        result.errorCallback = promise.errorCallback;
      }
    }
  });

  return promise;
};

readFile(process.argv[2], { encoding: 'utf8' })
.then(function(fileName) {
  return readFile(fileName.trim(), { encoding: 'utf8' });
})
.then(function(contents) {
  console.log(contents);
});
{% endhighlight %}


# Week 2 Quiz

- Create a new repository on GitHub
- Use TDD to write the following functions in a module:
  * A `fullName` function that takes a person object with the properties
    `firstName` and `lastName` and returns their full name.
  * A function that takes an array of people and returns an array of their
    full names.
- Explain what the purpose of callbacks are and one case where they are used
  in JavaScript.
