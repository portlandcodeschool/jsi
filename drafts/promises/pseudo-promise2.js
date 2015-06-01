//Chainable version


/*
Exercise:
modify the Promise constructor to make `then` chainable.
That is, given a promise,
any call to `promise.then(task)` should return the same promise,
but with an additional task in its queue.
For example:
`makePromise(a).then(b).then(c).then(d)`
should run four async processes in order (a,b,c,d), each starting
only once the previous one finishes.

You may assume a,b,c,d each receive a single callback argument.
*/

// Solution:
function Promise(startDoingAsyncFn) {
	var pendingTasks = [];

	this.then = function(afterwardFn) {
		pendingTasks.push(afterwardFn);
		return this;
	}

	function fulfilPromise() {
		var nextTask = pendingTasks.shift();
		if (nextTask)
			nextTask(fulfilPromise);
	}

	startDoingAsyncFn(fulfilPromise);
}

// Unchanged code:

// Optional factory using that ctor:
function makePromise(startDoingAsyncFn) {
	return new Promise(startDoingAsyncFn);
}

function inASecond(cb) {
	console.log('one sec...')
	setTimeout(function() {
		console.log('doing it now:')
		cb();
	},1000);
}

function sayHello() {
	console.log('hello!');
}


// Now it's chainable!:
makePromise(inASecond)
	.then(inASecond)
	.then(inASecond)
	.then(sayHello);

/*
// Non-promise equivalent:
inASecond(function() {
	inASecond(function() {
		inASecond(sayHello)
	})
})
*/