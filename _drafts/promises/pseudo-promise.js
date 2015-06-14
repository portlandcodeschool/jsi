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

// You can make a promise object with the ctor:
//var promise = new Promise(inASecond);
//promise.then(sayHello);

// Or if you prefer the factory form:
makePromise(inASecond).then(sayHello);

