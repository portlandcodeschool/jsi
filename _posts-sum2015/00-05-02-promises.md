---
layout: post
title: Promises
class: promises
date: 2015-06-02 00:00:00
---

## What the heck is a "Promise"?

Very briefly, a Promise is an object which represents a chain of unfinished async processes.  There are lots of Promise libraries, and lots of packages include a promise-style interface which is easier to use than nested callbacks.

For demo purposes, we can use the following as a stand-in for any
async function:
{% highlight javascript %}
function inASecond(cb) {
	setTimeout(cb,1000);
}
{% endhighlight %}

We could rewrite it this way to see the start and end of the delay:
{% highlight javascript %}
function inASecond(cb) {
	console.log('one sec...')
	setTimeout(function() {
		console.log('doing it now:')
		cb();
	},1000);
}
{% endhighlight %}

And let's use this for our delayed result:
{% highlight javascript %}
function sayHello() {
	console.log('hello!');
}
{% endhighlight %}

The following constructor implements a kind of pseudo-promise object:
{% highlight javascript %}
function Promise(startDoingAsyncFn) {
	var pendingTask = null;

	this.then = function(afterwardFn) {
		pendingTask = afterwardFn;
	}

	function fulfilPromise() {
		if (pendingTask)
			pendingTask();
	}
	startDoingAsyncFn(fulfilPromise);
}

// Optional factory using that ctor:
function makePromise(startDoingAsyncFn) {
	return new Promise(startDoingAsyncFn);
}
{% endhighlight %}

The resulting Promise instance uses `then` to schedule one callback after the initial async function finishes, like so:
{% highlight javascript %}
//var promise = new Promise(inASecond);
//promise.then(sayHello);

// Or if you prefer the factory form:
makePromise(inASecond).then(sayHello);
{% endhighlight %}

Try it!

### Exercise

Modify the Promise constructor to make `then` chainable.
That is, given a promise,
any call to `promise.then(task)` should return the same promise,
but with an additional task in its queue.
For example:
`makePromise(a).then(b).then(c).then(d)`
should run four async processes in order (a,b,c,d), each starting
only once the previous one finishes.

You may assume a,b,c,d each receive a single callback argument.

