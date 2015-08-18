---
layout: post
title: Methods and <i>this</i>
class: fundamentals
date: 2015-08-18 00:00:00
---


## Methods and _this_

Here is a simple instance object representing a rectangle:
{% highlight javascript %}
var rect = {
	width:2,
	height:1
}
{% endhighlight %}

Here is an ordinary function which can compute a rectangle's area.  We might call it "freelance" since it belongs to no particular rectangle:
{% highlight javascript %}
function area(rect) { //needs target object as argument
	return rect.width * rect.height;
}
var answer = area(rect);
{% endhighlight %}

We can attach that function as a _method_ of the target rectangle:
{% highlight javascript %}
var rect1 = {
	width:1,
	height:2,
	area: function() { //no target arg needed
		return rect1.width * rect1.height;
	}
};
answer = rect1.area();
{% endhighlight %}

But a better alternative uses the keyword `this`:
{% highlight javascript %}
var rect2 = {
	width:2,
	height:3,
	area: function() {
		return this.width * this.height;
	}
};
answer = rect2.area();
{% endhighlight %}

_Why is using 'this' better?_

### Exercise

Make an object for an animal of your choice, and give it a method to talk by displaying a `noise` property.  Use `this` to refer to that noise from within the `talk` method.

### Lexical vs. Dynamic Scoping

All variables we've ever seen are 'lexically' scoped--
the declaration they refer to (the closure for that variable) can be determined in advance by looking at the structure of the code (how function definitions are nested).

For example: what is the scope of `rect1` in
{% highlight javascript %}
var rect1 = {
	width:1,
	height:2,
	area: function() { //no target arg needed
		return rect1.width * rect1.height;
	}
};
{% endhighlight %}

The word `this` behaves somewhat like a variable, except:

1. You can never set it (e.g. `this=that`)

2. It always refers to an object, never a primitive

3. It is 'dynamically' scoped; its referent cannot be determined by looking at the code surrounding it.  Its value is not determined by closure, like a local variable, but instead depends on how its function is called, like a parameter.  It is essentially an invisible parameter.

For example:
{% highlight javascript %}
var rect2 = {
	width:2,
	height:3,
	area: function() {
		return this.width * this.height;
	}
};
answer = rect2.area();
{% endhighlight %}

`this` refers to rect2, but _not because the function is 'embedded' in the description of rect2_.  Instead, it's only because the function is called as a method of rect2.


### Sharing methods:
{% highlight javascript %}
var square1 = {
	width:1,
	height:1,
	area: rect2.area; // share rect2's method
}
answer = square1.area();
{% endhighlight %}

#### Single-use borrowing with _call_

This object has no method of its own:
{% highlight javascript %}
var square2 = {
	width:2,
	height:2
}
{% endhighlight %}

We could "borrow" another object's method by momentarily linking to it:
{% highlight javascript %}
square2.area = rect2.area;
answer = square2.area();
delete square2.area;
{% endhighlight %}

But an easier way is to use the 'call' method of the borrowed method:
{% highlight javascript %}
answer = rect2.area.call(square2);
{% endhighlight %}

#### Sharing predefined methods

Freelance method:
{% highlight javascript %}
function area() {
	return this.width * this.height;
}
{% endhighlight %}

Permanently shared:
{% highlight javascript %}
var rhombus1 = {width:1, height:1, area:area};
var rhombus2 = {width:2, height:2, area:area};
answer = rhombus1.area();
answer = rhombus2.area();
{% endhighlight %}

Borrowed on demand:
{% highlight javascript %}
var rhombus3 = {width:3, height:2};
var rhombus4 = {width:4, height:2};
answer = area.call(rhombus1);
answer = area.call(rhombus2);
{% endhighlight %}

### Exercise

Write a method `talk` which can be used by any animal object.  When called via that animal, it should display a `noise` property of that animal.
Use your method to make several different animals talk, each with a unique noise.

---

##  Instance Objects: Arrays!

### Testing Arrays

Write some code to verify that Arrays behave as advertised.  Specifically, write three different functions, each testing one method of Arrays:

* `testPush(array)` should verify that `array.push(val)` adds _val_ to the end of _array_ and returns its new length;

* `testPop(array)` should verify that `array.pop()` removes and returns the last element of _array_;

* `testJoin(array)` should verify that `array.join(delim)` concatenates all elements of _array_ into a single string, with string _delim_ inserted between each element.


Each function should do several tests:  adding, removing, or joining values under various conditions to ensure that _array_ produces the correct outcome.  Each outcome may require multiple assertions to verify.  For each function, make sure one test is for how an empty array behaves.
Any assertion which fails should log a message to the console, but your test functions don't need return values.

More detailed instructions are in the [template file]({{ site.baseurl }}/samples/Aug18/array-test-template.js).

### Simulating Arrays

Now that you have a testing suite, implement your own version of Arrays!

Create a pseudo-array, an ordinary object which is not an actual Array but behaves
(somewhat) like one.  You may use a global variable _array_ to store
your pseudo-array.
It will have a property _length_, which is initially zero but needs to be adjusted as elements are added or removed.
The elements of _array_ will be stored as properties named by their index numbers.
So for example, an _array_ representing `[5,9]` would have three properties named "length", "0", and "1" whose values are 2, 5, and 9.

For this exercise, you don't need to delete any _array_ elements beyond its length if the length shrinks; just ignore them.  Setting _array.length_ to 0 is enough to reset it to "empty".

In addition to property _length_ and the element properties, give _array_ three more properties _pop_, _push_, and
_join_ which are functions (i.e. methods) behaving exactly like (and returning the same values as) the
corresponding methods of real Arrays.  When your _pop_ and _push_ methods modify the array, _length_ should change accordingly.

You may use the enclosed [template file]({{ site.baseurl }}/samples/Aug18/pseudo-array-template.js) to get started.

_Hint:_ Within each method, use the keyword `this` to refer to your array object.

### Testing the Simulation

Test your pseudo-array implementation using your tests from above.  Your pseudo-array should be able to pass the same tests of push, pop, and join as a real Array.


## Toolkit Objects


### Toolkit Object Example

Here's an example of a dictionary object, whose keys are not known in advance:

```
var unitsPerDollar = {
	Dollar: 1,
	Euro: 0.90,
	Pound: 0.64,
	Peso: 16.42,
	Yen: 124.41,
	Yuan: 6.40
}
```

In contrast, here's a simple example of a Toolkit object, a currency converter.  Its keys are fixed and can be mentioned in the code:

```
var exchange = {
    rate: 1.10, //dollars per euro

    toDollars: function(euros) {
		return euros * this.rate;
    },

    toEuros: function(dollars) {
		return dollars / this.rate;
    },

    convert: function(string) {
		if (string[0]==='$')
		    return 'E'+this.toEuros(string.slice(1));
		if (string[0]==='E')
			return '$'+this.toDollars(string.slice(1));
		return this.toDollars(string);
    }
};

exchange.convert('$20.00');
```


### Toolkit Exercise

Modify the exchange toolkit to have one data property, a dictionary object listing multiple exchange rates, and two methods:

* `convertTo(amount,toUnit)`: convert `amount` of dollars into the equivalent in `toCurrency`;

* `convertFrom(amount,fromUnit)`: convert 'amount' of foreign currency in `fromUnit`s to the 
equivalent in dollars.

It might be used as follows:

```
exchange.convertTo(20,"Yen");
exchange.convertFrom(5,"Euro");
```

## Playing Cards, Episode 2: Toolkit!

Revisit your playing card functions from [last Wednesday](00-01-03-arrays-functions1.md).  Repackage them in a Toolkit pattern, as methods of a single master object.  You may hold that object in a global variable named anything you like (it's _cardTools_ in the template below), but its name should not appear in the definitions of your methods; instead, refer to that object as `this`.  You'll need to change the form of your method definitions and the way they call other methods, but their logic and most of their code will remain the same as last week.

You may adopt the enclosed [template file]({{ site.baseurl }}/samples/Aug18/cards2-template.js).  Make sure your code still passes all the assertions there!


