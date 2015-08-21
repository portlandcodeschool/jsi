---
layout: post
title: Constructors, Prototypes, and Inheritance
class: fundamentals
date: 2015-08-21 00:00:00
---

## Factories vs. Constructors

### Factory

{% highlight javascript%}
function makeRect(w,h) {
	var rect = {};
	rect.width = w;
	rect.height= h;
	rect.area  = function() { 	//personal instance method
		return this.width * this.height;
	}
	return rect;
}

var rect1 = makeRect(1,1);
rect1.area();
{% endhighlight %}


### Freelance initializer method

{% highlight javascript%}
function initRect(w,h) {
	this.width = w;
	this.height= h;
	this.area = function() { 	//personal instance method
		return this.height * this.width
	}
}

var rect2 = {};
initRect.call(rect2,1,2);
rect2.area();
{% endhighlight %}


---

## Constructors

A constructor ("Ctor") often replaces a factory.  It's just a freelance initializer method intended to be called in a special way:

{% highlight javascript%}
function Rect(w,h) {
	this.width = w;
	this.height = h;
	this.area = function() {
		return this.height * this.width
	}
}
var rect3 = new Rect(3,1); // <-- operator 'new'
rect3.area();
{% endhighlight %}

A Ctor represents a "class" in JS, a family of objects (instances) constructed in a similar way and sharing a formal "membership" or "pedigree".

### The _new_ operator

Always used with constructors to create objects:
{% highlight javascript %}
var obj = new Object(),    // {}
	arr = new Array(1,2,3),// [1,2,3]
	fun = new Function('x','return x*2'),
	num = new Number(7),
	str = new String('boo');
{% endhighlight %}

#### EXERCISE: pseudo-new #1

Using this constructor:
{% highlight javascript%}
function Rect(w,h) {
	this.width = w || 1;
	this.height = h || 1;
	this.area = function() {
		return this.height * this.width
	}
}
var trueRect = new Rect();
{% endhighlight %}

Try emulating new as a function:
{% highlight javascript %}
function new1(Ctor) {
	//...
}
{% endhighlight %}

It should work like so:
{% highlight javascript %}
var fakeRect = new1(Rect);
fakeRect.area(); // 1
{% endhighlight %}


But compare:
{% highlight javascript %}
trueRect instanceof Rect //true
fakeRect instanceof Rect //false
trueRect.constructor //Rect
fakeRect.constructor //Object
{% endhighlight %}
Pseudo-instance (made with pseudo-new) has wrong pedigree!

Operator `new` must be doing something more...

#### EXERCISE: pseudo-new #2

Using the same `Rect` constructor as before, let's supplement our pseudo-new with one extra step:
{% highlight javascript%}
function new2(Ctor) {
	var inst = {};
	inst.__proto__ = Ctor.prototype; // add "magic stamp"
	Ctor.call(inst);
	return inst;
}

var fakeRect = new2(Rect);
{% endhighlight %}

Now compare again:
{% highlight javascript %}
trueRect instanceof Rect //true
fakeRect instanceof Rect //true
trueRect.constructor //Rect
fakeRect.constructor //Rect
{% endhighlight %}

## Prototypes

### Exercise 1: Basics

-   First make a constructor named _Ctor_ for an object that has properties _a_ and _b_ and initializes them to 0 and 1 respectively.
-   Now, make two objects named _obj1_ and _obj2_ using _Ctor_.
-   Now check the properties of a new object _obj3_ made this way:
{% highlight javascript%}
    var obj3 = {};
    Ctor.call(obj3);
{% endhighlight %}
-   Next, add a property _c_ to _obj1_ with a value of 2.  What will be the value of _obj2.c_?
-   Now, add a property _d_ with the value 3 to _obj1_'s "proto" (the object which helps out when _obj1_ can't do something by itself).  Remember that there are at least four ways of referring to that proto object.
-   What are the values of _obj1.d_, _obj2.d_, and _obj3.d_? Can you explain the results?

### Exercise 2: Modifying Prototypes

Consider this code:

{% highlight javascript%}
function A() {};
//set default values for instances of A:
A.prototype = {num:0, str:'default'};
var objA = new A();

function B() {};
// set default values for instances of B:
B.prototype.num = 0;
B.prototype.str = 'default';
var objB = new B();
{% endhighlight %}

There is a difference between the behaviors of `objA` and `objB`!  Explain.


### Exercise 3: Implementing Inheritance

Here is a module (IIFE) which provides a constructor `Rect` which builds rectangle instances.  The instance methods are shared but linked directly to each instance. 

{% highlight javascript%}
var Rect = (function() {

	var area = function() {
		return (this.width() * this.height());
	}

	function Ctor(w,h) {
		this.width = w || 1;
		this.height = h || 1;
		this.area = area;
	}

	return Ctor;
})()
{% endhighlight %}

1. Modify the Rect module so that the instance method `area` is inherited from a prototype.

2. In a new IIFE, implement a subclass of `Rect` called `Square`.  The `Square` constructor needs only one parameter: `Square(size)`, and it should call the parent class constructor (`Rect(width,height)`) to set the new instance's properties.
A Square instance should inherit the `area` method of Rectangles without needing any changes.

3. Within the Square module, add an inheritable instance method `size` which acts as both a getter and setter for a square's size.  That is, `square.size()` should return the current size of _square_, and `square.size(num)` should set the size to _num_.

4. For the moment, disable your Square module (by commenting it out or disabling the call operator () which triggers the IIFE).
Now Modify the Rect module so that the `Rect` constructor maintains a list of every instance it ever creates.  Attach a _class_ method `every` to constructor `Rect` which returns that list.
<p>
When finished, you should be able run the following sequence:
<pre>
	var r1 = new Rect(1,1),
		r2 = new Rect(2,2),
		r3 = new Rect(3,3),
		all = Rect.every(); //list of r1,r2,r3
	all[0] === r1; //true
</pre>

5.  Now reactivate your Square module and then re-run the sequence above.  What is the value of `all[0]===r1`?  What happened?

6. Notice that constructor `Square` does not inherit the class method from its parent class `Rect`!  Implement the class method `every` for `Square` as well, so that `Square.every()` will return all squares ever built.



#### Object.create

7. Modify constructor `Square` to use `Object.create` instead of `new Rect` when making Square's prototype.  Does that fix the problem in #5 above?


8.  Return to your earlier simulation of the _new_ operator, which we approximated like this:
<pre>
function new2(Ctor) {
	var instance = {};
	instance.\_\_proto\_\_ = ctor.prototype;
	ctor.call(instance);  //does initialization
	return instance;
};
</pre>

	Simplify `fakeNew` by using `Object.create`.


### Exercise 4: Imaginary Menagerie

**a)** Implement a simple taxonomy of four related classes, using a constructor for each:

- _Animal_: every instance of an Animal should inherit a method called _move()_.  For basic animals, this just returns the string "walk".  This method will be overridden by subclasses of Animal.
- _Bird_: A subclass of Animal.  Every Bird instance should return "fly" instead of "walk" when asked to _move()_.  All Birds also inherit a property _hasWings_ which is true.
- _Fish_: Another subclass of Animal.  A Fish instance will "swim" instead of "walk".
- _Penguin_: A subclass of Bird.  Penguins cannot fly and they should move like Fish.

Every instance of Animal and its subclasses should also have a personal _name_ property which is not inherited.  It should be set only within the constructor Animal, and each subclass constructor should first call its superclass constructor as an initializer, all the way up to Animal.

You should see these behaviors:
{% highlight javascript%}
new Animal("Simba").move();// 'walk'
new Fish("Nemo").move();   // 'swim'
new Bird("Lulu").move();   // 'fly'
var pengo = new Penguin("Pengo");
pengo.name;     // 'Pengo'
pengo.move();   // 'swim'
pengo.hasWings; // true;
pengo instanceof Penguin; //true
pengo instanceof Bird; 	  //true
pengo instanceof Animal;  //true
{% endhighlight %}

**b)** Create a class _Egg_, whose instances have one method, _hatch(name)_, which returns a new instance (named _name_) of the same species which laid the egg.
Assume that every Animal can lay an egg with an instance method _layEgg()_ which creates a new Egg instance.
Try to solve this without subclassing Egg and without implementing _layEgg_ and _hatch_ more than once.

You should see this behavior:
{% highlight javascript%}
var pengo = new Penguin("Pengo");
var egg = pengo.layEgg();
egg.constructor === Egg; //true
var baby = egg.hatch("Penglet");
baby instanceof Penguin; //true

var nemo = new Fish("Nemo");
egg = nemo.layEgg();
egg.constructor === Egg; //true
baby = egg.hatch("Nemolet");
baby instanceof Fish; //true
{% endhighlight %}

<!--

## Overriding Inheritance

Consider the module below which implements a simplified Deque class:

{% highlight javascript%}
var Deque = (function () {
	function Deque (vals) {
		// unprotected version
		this.array = vals.slice();
	}
	Deque.prototype.top = function () {
		if (this.array.length)
			return this.array[this.array.length-1];
	}
	Deque.prototype.bottom = function () {
		if (this.array.length)
			return this.array[0];
	}

	Deque.prototype.push = function(val) {
		return this.array.push(val);
	}
	Deque.prototype.pop = function() {
		return this.array.pop();
	}

	Deque.prototype.unshift = function(val) {
		return this.array.unshift(val);
	}
	Deque.prototype.shift = function() {
		return this.array.shift();
	}

	return Deque;
})();
{% endhighlight %}

1. In a new IIFE, implement a subclass of `Deque` called `Stack`.  A Stack is a kind of Deque which is top-access only, affording Last-In-First-Out (LIFO) storage.  A Stack instance will inherit all the method of Deque, but you'll need to disable the three methods which allow access to the bottom of the Stack.


2. In a similar way, implement another subclass of `Deque` called `Queue`.  A Queue is a kind of Deque which affords First-In-First-Out storage, where items are _push_ed onto the top and _shift_ed from the bottom.   Only the _bottom_ of a queue is visible.


## Automated Inheritance through _extend_

The process of generating a subclass can be automated by giving every function a method to _extend_ it with a subclass.  We'll use a variant of that pattern later with _Backbone_, but here is a rough approximation of how it works:

{% highlight javascript%}
Function.prototype.extend = function(protoProps) { // method of any function...
	var Super = this; //the function to be subclassed
	function Ctor() { // the subclass ctor
		Super.call(this);
	}

	// Make Ctor a subclass of Super:
	var proto = Object.create(Super.prototype); //the subclass prototype
	Ctor.prototype = proto;
	proto.constructor = Ctor;

	// Copy protoProps into subclass prototype:
	//_.extend(proto,protoProps);
	// OR
	for (var prop in protoProps) {
		proto[prop] = protoProps[prop];
	}

	return Ctor;
}
{% endhighlight %}

Here is an example of it in use:

{% highlight javascript%}
function Duck() {}
Duck.prototype.feet = 2;
Duck.prototype.noise = 'quack';

var MutantDuck = Duck.extend({feet:3});
var duck = new MutantDuck();
duck instanceof MutantDuck; //true
duck instanceof Duck; //true
// Inherited from MutantDuck:
duck.feet; // 3
duck.hasOwnProperty('feet'); //false
// Inherited from Duck:
duck.noise; // 'quack'
duck.hasOwnProperty('noise'); //false
{% endhighlight %}
-->