---
layout: post
title: Functional Programming
class: functional
date: 2015-01-15
---

Today we're going to discuss functions again. Again? Yes, functions are the
building blocks of pretty much everything we're doing. So we're going to learn
some more tricks with functions before we move on.

<aside>
Today will stretch your mind. It may be fun, it may be painful. Keep a good
mindset. It's okay if it doesn't stick at first. We can review and discuss
again. You may find yourself thinking, _why does this matter?_ Understanding
the contents of todays class will make you a better programmer. Have faith.
</aside>


## Just Like Everything Else

JavaScript treats functions just like other objects. In fact, in JavaScript,
they are objects (which we'll touch on shortly). You can pass them as arguments
to functions just like strings, numbers, booleans, and objects. You can assign
them to variables. You can return them from functions. Languages are said to
have _first class functions_ when they treat them like other values. This can
feel very natural if you learn this early in your programming career.

What this means as a programmer is that we can build great abstractions with
functions. This has been done since the 1950s in functional programming
languages. We're starting to see a renewed interest in functional programming
and functional concepts added to languages that didn't have them originally.
Programming languages like Lisp (of which Clojure is a dialect), Haskell,
Erlang, and F# are primarily functional.

{% highlight javascript %}
// functions can be assigned to variables
var foo = function() {

};

// functions can be passed as arguments
setTimeout(function() {
}, 1000);

// functions can be assigned to properties of objects
var utilities = {
  foo: function() {

  }
};
utilities.bar = function() {

};
utilities["baz"] = function() {

};

// functions can be returned from functions
var foo = function() {
  return function() {

  };
};
{% endhighlight %}

Regardless of whether or not you see a use case for everything above, do all
of these examples make sense? Do you understand the syntax?

We're going to start building some abstractions now!


<aside>
**Functional, Imperative, Procedural, and Object Oriented**

JavaScript is a multi-paradigm programming language. What that means is that
it incorporates many different programming paradigms. Because it has first
class functions, we can apply patters from functional programming languages.

Through the use of statements, we can approach JavaScript as an imperative
language, where statements are used to alter the state of execution. Functions
and modules make it procedural as well.

Finally, it uses objects and allows us to apply object oriented principles.
</aside>

## Memoize

The following is a function to get the n<sup><small>th</small></sup> Fibonacci number.

{% highlight javascript %}
/**
 * Find the nth (zero-indexed) Fibonacci number.
 */
var fibonacci = function(n) {
  return n > 1 ? fibonacci(n - 1) + fibonacci(n - 2) : 1;
};
console.log(fibonacci(Number(process.argv[2])));
{% endhighlight %}

It takes 1.5 seconds on my computer to generate the 40th Fibonacci number:

{% highlight bash %}
$ time node fibonacci.js 40
102334155

real  0m1.547s
user  0m1.533s
sys 0m0.020s
{% endhighlight %}

Why is this so slow? And how can we make it faster?


Note that `memoize` will only work with functions that have no side effects
(that is, they do not alter the program's state) and return a consistent result
for a given input.

### Challenge

* Abstract the shared logic of the speed enhancements that we made.


## Once

Another useful function, `once`, does just what you would think. It will only
allow something to happen once.

{% highlight javascript %}
var findTrueLove = once(function() {
  console.log("Looking for true love...");
});

findTrueLove(); //-> Looking for true love...
findTrueLove(); //=> undefined
{% endhighlight %}

### Challenge

* Implement the `once` function.


## Partials & Currying

Partially applying a function allows you to create new functions easily that
lock in arguments with specific values.

For instance:

{% highlight javascript %}
var greet = function(greeting, name) { return greeting + ' ' + name; };
var hi = _.partial(greet, 'hi');
hi('fred'); //=> 'hi fred'
{% endhighlight %}

Basically, calling `_.partial` on `greet` locks in the value of the `greeting`
parameter. The function, `hi`, that's returned from `_.partial` can be called
with any remaining arguments. In this case that's just name `name`. Calling
`hi` will put all the arguments together properly and result in a call to the
original function, `greet`, as if it had been called like so:
`greet('hi', 'fred')`.

You'll often hear currying and partial application used as synonyms, but
they're actually slightly different. A curry of the `greet` function would
look like this (note the location of parenthesis):

{% highlight javascript %}
var greet = function(greeting, name) { return greeting + ' ' + name; };
var hi = _.curry(greet)('hi');
hi('fred'); //=> 'hi fred'
{% endhighlight %}

These functions can be incredibly useful building blocks.

Let's take a look at how you might implement a `partial` function:

{% highlight javascript %}
var partial = function(/* args */) {
  // implementation
};

var greet = function(greeting, name) {
  return greeting + ' ' + name;
};

var hi = partial(greet, 'hi');

console.log(hi('Whitney'));
{% endhighlight %}


The result that we'll build will be only a starting place. We don't have all
of the tools we need to build a great version of `partial`. Later we'll come
back to this and make it work far better.


### Challenge

* Using partial application, define a function, `squareAll` returns a new
  array containing squares of the items in the array. Hint: there's another
  function that we've discussed that does part of this already.


## Filter

The `filter` function is another that does just what you would think. It
filters items out of an array. It's a little like `map` except that you
have to return `true` or `false` form your function. When the function
returns `true`, the value is included in the resulting array.

{% highlight javascript %}
var numbers = [1, 2, 3, 4, 5, 6];
var evenNumbers = _.filter(numbers, function(n) { return (n % 2) === 0; });
{% endhighlight %}

### Challenge

* Implement the `filter` function.


## Reduce/Fold

The `reduce` (or `fold`) function is one of the most conceptually complicated
abstractions that we'll look at.

Let's say we want to sum the numbers in an array:

{% highlight javascript %}
var numbers = [1, 2, 3, 4, 5, 6];
var sum = 0;
numbers.forEach(function(n) {
  sum += n;
});
sum; //=> 21
{% endhighlight %}

But concatenating an array of strings could look the same:

{% highlight javascript %}
var strings = ['hello', ' ', 'world'];
var result = '';
strings.forEach(function(s) {
  result += s;
});
result; //=> 'hello world'
{% endhighlight %}

As could concatenating an array of arrays:

{% highlight javascript %}
var arrays = [[10], ['string'], [{}]];
var result = [];
arrays.forEach(function(a) {
  result = result.concat(a);
});
result; //=> [10, 'string', {}]
{% endhighlight %}

Let's discuss what's shared between each of these functions so we can figure
out how an abstraction for this will work.

Don't peek below before we discuss. :)

<div style="height: 200px;"></div>

Space intentionally left blank.

<div style="height: 200px;"></div>

Really, no peeking! :)

<div style="height: 200px;"></div>

{% highlight javascript %}
var numbers = [1, 2, 3, 4, 5, 6];
var sum = _.reduce(numbers, function(sum, n) { return sum + n; }, 0);

var strings = ['hello', ' ', 'world'];
var string = _.reduce(strings, function(concatenated, s) { return concatenated + s; }, '');

var arrays = [[10], ['string'], [{}]];
var array = _.reduce(arrays, function(concatenated, a) { return concatenated.concat(a); }, []);
{% endhighlight %}

The concept behind this abstraction is that you have an array of items that
need to be reduced (or folded if that word makes more sense to you) until it's
just a single item.

You'll generally have a starting object, and for each reduction, you'll be
transforming that object into something new (or simply altering it). After all
transformations, you'll have the resulting object.


## Chaining

Chaining tends to be pretty common in JavaScript. We'll learn later about
chaining with jQuery and when using promises. Chaining tends to be a little
less useful with libraries like [Lo-Dash][lodash] and [Underscore][underscore],
but can still be useful.

With `_`, you create a chain which can then be used to apply a bunch of
transformations back to back. For this to work, `_` creates a _wrapper object_
that it returns from `chain`. Each chainable call returns a wrapper object as
well. When you're finished with the chain, you get a useful value back by
calling `value`.

{% highlight javascript %}
var characters = [
  { 'name': 'barney',  'age': 36 },
  { 'name': 'fred',    'age': 40 },
  { 'name': 'pebbles', 'age': 1 }
];

var youngest = _.chain(characters)
    .sortBy('age')
    .map(function(chr) { return chr.name + ' is ' + chr.age; })
    .first()
    .value();
//=> 'pebbles is 1'

// without chain
youngest = _.first(_.map(_.sortBy(characters, 'age'), function(chr) { return chr.name + ' is ' + chr.age; }));
{% endhighlight %}

We're not going to explore chaining in detail right now, but it's worth noting
that it exists in `_`.


### Challenge

Use `reduce` to transform an array of _tuples_ into an object.

<aside class="objective">
{% highlight javascript %}
var pairs = [['name', 'JSI'], ['location', { city: 'Portland', 'state': 'OR' }], ['school', 'PCS']];
_.reduce(pairs, /* other reduce args */);
//=> { name: 'JSI', location: { city: 'Portland', state: 'OR' }, school: 'PCS' }
{% endhighlight %}
</aside>

If you're able to get this quickly, create a function to do the same thing.

In `_`, this function is called `zipObject` and is so named because of its
relation to `zip` which we may explore later.

<aside>
The formal term for _zip_ is [convolution][convolution].
</aside>


## More (Challenge)

There are so many more abstractions that can be built and used to our
advantage!

Choose one of the below functions from [Lo-Dash][lodash]. Learn what it does
well enough to explain it to the group. Come up with some examples that
clearly and logically illustrate how it works. When would you want to use it?
When might you avoid using it? Why?

* [`flatten`][lodash-flatten]
* [`zip`][lodash-zip]
* [`union`][lodash-union] &amp; [`intersection`][lodash-intersection]
* [`unique`][lodash-unique]
* [`xor`][lodash-xor]
* [`groupBy`][lodash-groupBy], [`indexBy`][lodash-indexBy] &amp; [`countBy`][lodash-countBy]
* [`some`][lodash-some] &amp; [`every`][lodash-every]
* [`at`][lodash-at]
* [`after`][lodash-after]
* [`throttle`][lodash-throttle]
* [`defaults`][lodash-defaults] &amp; [`merge`][lodash-merge]
* [`values`][lodash-values] &amp; [`keys`][lodash-keys]

Once you understand how the function works, try re-implementing it yourself.
Some of these may be difficult to re-implement. Don't worry if you can't do it.
Sometimes taking the time to think through how the function was built will
increase your understanding of how it works.

[underscore]: http://underscorejs.org/
[lodash]: http://lodash.com
[lodash-flatten]: http://lodash.com/docs#flatten
[lodash-zip]: http://lodash.com/docs#zip
[lodash-union]: http://lodash.com/docs#union
[lodash-intersection]: http://lodash.com/docs#intersection
[lodash-unique]: http://lodash.com/docs#uniq
[lodash-xor]: http://lodash.com/docs#xor
[lodash-groupBy]: http://lodash.com/docs#groupBy
[lodash-indexBy]: http://lodash.com/docs#indexBy
[lodash-countBy]: http://lodash.com/docs#countBy
[lodash-some]: http://lodash.com/docs#some
[lodash-every]: http://lodash.com/docs#every
[lodash-at]: http://lodash.com/docs#at
[lodash-after]: http://lodash.com/docs#after
[lodash-throttle]: http://lodash.com/docs#throttle
[lodash-defaults]: http://lodash.com/docs#defaults
[lodash-merge]: http://lodash.com/docs#merge
[lodash-values]: http://lodash.com/docs#values
[lodash-keys]: http://lodash.com/docs#keys
[convolution]: http://en.wikipedia.org/wiki/Convolution_(computer_science)
