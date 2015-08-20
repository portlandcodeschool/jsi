---
layout: post
title: Closures and Private Variables
class: fundamentals
date: 2015-08-20 00:00:00
---

## Review of Scope

Remember these? Take a quick look at them to get your mind back to scope--that's what we're dealing with today.

1.

```
	var x=1, y=1;
	function fun() {
		x=3;
		console.log('x='+x, 'y='+y);
	}
	fun();
	console.log('x='+x, 'y='+y);
```

2.

```
	var x=1, y=1;
	function fun(x) {
		x=3;
		console.log('x='+x, 'y='+y);
	}
	fun(2);
	console.log('x='+x, 'y='+y);
```

3.

```
	var x=1, y=1;
	function fun(z) {
		x=3;
		console.log('x='+x, 'y='+y);
	}
	fun(2);
	console.log('x='+x, 'y='+y);
```

4.

```
	var x=1, y=1;
	function fun(x) {
		x=3, y=3;
		if (x) {
			var y=4;
			console.log('x='+x, 'y='+y);
		}
		console.log('x='+x, 'y='+y);
	}
	fun(2);
	console.log('x='+x, 'y='+y);
```

5.

```
	var x=1, y=1;
	function showXY(x,y) {
		console.log('x='+x, 'y='+y);
	}
	function fun(x) {
		x=3;
		showXY(x,y);
	}
	fun(2);
	showXY(x,y);
```

6.

```
	var x=1, y=1;
	function showXY() {
		console.log('x='+x, 'y='+y);
	}
	function fun(x) {
		x=3;
		showXY();
	}
	fun(2);
	showXY();
```

7.

```
	var x=1, y=1;
	function fun(x) {
		function showXY() {
			console.log('x='+x, 'y='+y);
		}
		x=3;
		showXY();
	}
	fun(2);
	showXY();
```

### Combined accessor function

Combine the getter and setter functions into a single function which can do both.  The accessor function `accessFn` should be the only way of modifying or retrieving the variable `privateVal`.

```
function makeAccessor() {
    var privateVal;
    function accessFn(val) {
        //...
    }
    return accessFn;
}
// Example of use:
var cache = makeAccessor();
cache(7);
cache(); //-->7
cache(9);
cache(); //-->9
```


### Practice: Factory with personal instance methods

```
function factory(id) {
	var instance = {};
	instance.id = id;
	instance.getID = function() {
		return this.id;
	}
	return instance;
}

var thing1 = factory(1);
console.log(thing1.getID());
```

Rewrite the factory above to use closure to persist and retrieve the value of `id` instead of putting an `id` property on the instance.


### Practice: Using Closure for Private Variables

```
var loanManager = {
    assets: 1000,
    debt: 1000,
    rate: 0,
    borrow: function(amount,rate) {
        this.assets += amount;
        this.debt += amount;
        this.rate = rate;
    }
    compoundInterest: function() {
        this.debt *= (1+this.rate);
    },
    repay: function(amount) {
        this.assets -= amount;
        this.debt -= amount;
    }
}
```

Rewrite the code above using a closure, so that the values for `assets`, `debt`, and `rate` can only be changed by the methods `borrow`, `compoundInterest`, and `repay`.  You'll need to group the methods together within an object and build that object in a factory.

### Practice: Using Closure for Persistence


1. Write a function that generates the next number each time it's called:

```
sequence(); //=> 0
sequence(); //=> 1
sequence(); //=> 2
```

2. Write a function `counter` that returns your sequence generator:

```
var sequence1 = counter();
var sequence2 = counter();
sequence1(); //=> 0
sequence1(); //=> 1
sequence2(); //=> 0
sequence1(); //=> 2
sequence2(); //=> 1
```

3. Allow your counter to start at any number, for instance, `counter(5)`.

4. Allow your counter to be reset:

```
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
```

#### Authenticator

Write a (toy) password-authentication system!
Start with a function `storePassword(passwd)`.
It should return a function which you can use
to check whether a submitted password
matches the stored one (passwd).

```
function storePassword(passwd) {
    //...code here...
}

// Use it like this:
var verifyPassword = storePassword("sekrit");

verifyPassword("password"); // false
verifyPassword("12345"); // false
verifyPassword("sekrit"); // true
```

## Practice: Counting Factory

Consider the following factory:

```
function makeThing(_id) {
    // thing needs no id propery; instead has personal getter:
    var thing = {
        // personal method
        id: function() {
            return _id;
        },
        // shared method:
        color: makeThing.color
    };
    return thing;
}
makeThing.color = function() {
    return (this.id()%2) ? 'red': 'blue';
}
```

Modify the factory to eliminate the `_id` parameter.  Instead, the factory
should auto-increment a counter and give each thing a unique id.

```
// some code here...

	function makeThing() { //<-- no parameter
    	//...
    	return thing;
	}

// more code here...
```

You'll be able to use the factory like so:

```
var thing0 = makeThing(),
    thing1 = makeThing(),
    thing2 = makeThing();
thing0.id(); //0
thing1.id(); //1
thing2.id(); //2
```

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

The above examples are taken (and slightly modified) from this excellent article on [_hoisting_](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html).

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

##Scope of `this` with `call`

Look at the following code and predict the results--talk about it with your table or group and see if you can predict what will happen. Then run it, and see if you were right. Explain any differences between actual and expected!

{% highlight javascript %}
function method() {
	// this is obj
	
	function inner() {
		console.log(this);
	}
	
	inner.call(this); // call as borrowed method
	inner();  // call as ordinary fn
}

var obj = {
	method:method
};

obj.method();
{% endhighlight %}

##Secrets at all levels

**a)**  Write a user-registration tool, a factory function `makeUser(name,pwd)` which accepts a username and password and generates a user object.  Once we have a user object we should be able to do two things with it: retrieve the corresponding username and test to see if a provided password matches that user's password.  Each user will have these methods:

  + `getName()` returns the username;
  + `validate(str)` takes a string and returns true if it matches that user's password.

It should not be possible, however, to modify the username or password once created nor to directly see the password.

Here is a [template](users-template.js) to get you started.

**b)**  Now that we can make user objects, let's assume that our system needs some version of a "system log" that will record messages left by different users. This system log, being shared by all user objects created, will contain all the messages that users have recorded. You will need to modify the factory you made above to be a part of a module that has a private variable that holds the system log.

  + Each *user* object should have an additional method `record(message)` which writes an entry to the shared log in the format "_username: message_" and returns true.  If no message is provided, the `record` method should return undefined instead.

  + Reading from the log is a operation of the system and not of individual users.
  The factory itself should have a method `getLog(username)` whose argument _username_ is optional.  If _username_ is provided, _getLog_ should return a string of all log entries recorded by that user.  If _username_ is omitted (therefore undefined), return a string of all log entries from everyone.  In either case, log entries should be separated by newlines.

The log should not be able to be modified other than through a user's _record_ method.
