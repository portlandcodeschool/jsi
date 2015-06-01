For demo purposes, we can use the following as a stand-in for any
async function:
```
function inASecond(cb) {
	setTimeout(cb,1000);
}
```

We could rewrite it this way to see the start and end of the delay:
```
function inASecond(cb) {
	console.log('one sec...')
	setTimeout(function() {
		console.log('doing it now:')
		cb();
	},1000);
}
```

And let's use this for our delayed result:
```
function sayHello() {
	console.log('hello!');
}
```

The following constructor implements a kind of pseudo-promise object:
```
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
```

The resulting Promise instance uses `then` to schedule one callback after the initial async function finishes, like so:
```
//var promise = new Promise(inASecond);
//promise.then(sayHello);

// Or if you prefer the factory form:
makePromise(inASecond).then(sayHello);
```

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

