---
layout: post
title: Functions as Objects and Factories
class: fundamentals
date: 2015-08-19 00:00:00
---

## Functions are Objects too!
Begin with this function definition in the exercises below:

```
function paint(obj) {
	obj.color = 'red';
}
```

All functions are also objects, which has the following implications:

1) _Functions can have aliases._ 

* Make an alias for `paint` and call that alias as a function.


2) _Functions can be methods of objects._

* Convert `paint` into a method, so that it always paints its owner.


3) _Functions can be arguments_.

* Use `paint` as a callback with `forEach` on some array of objects.

* Use an anonymous function which paints things 'blue' as a callback to `forEach`.

<!-- NEW PROPOSAL:
4) _Functions can be return values_.

* Write a function which returns a function...

-->

5) _Functions can have properties of their own_.

* Use the `length` property to determine how many arguments function `paint` requires.

* Rewrite paint to use, instead of 'red', a property of itself called `color`.  Then set that property to 'green'.  Then paint something green.


6) _Functions can have methods of their own_.

* Give function _paint_ a method which sets the color it uses to paint things.
You should be able to use it like this:

```
paint.useColor('turquoise');
paint(obj); // --> sets obj's color to 'turquoise'
```

### _call_ and _apply_

* Use this `paint` function to change of color of both `car` and `fence`:

```
function paint(color) {
	this.color = color;
}
var car = {wheels:4}, fence = {length:20};
```

* Use `Math.max` to find the largest number in this array:

```
var nums = [9,5,8,2,4,11,8,2,7,1,0,99,25,3,6,42];
```

### `this` pitfalls

There's a problem in the code below:

```
function talk() {
	console.log(this.noise);
}

var animals = [dog, cat, canary];
animals.allTalk = function() {
	this.forEach(talk);
}
animals.allTalk(); // failure!
```

Identify the problem and fix it!  Rewrite the `allTalk` method of array `animals` to  
make each animal talk.  You must use function `talk` without changing its definition, and `forEach(something)`.
`something` should be a function which is not `talk` but instead somehow calls `talk`.

## Instances and Factory functions

We know how to make animal instances by hand:

```
var dog = {
	name:'dog',
	noise:'woof',
	talk:function() {
		console.log(this.noise);
	}
}
var sheep = {
	name:'sheep',
	noise:'baaa',
	talk:function() {
		console.log(this.noise);
	}
}
```

Write a function to create any number of animals like those above.

### Sharing Instance Methods

Write two versions of a factory which makes animal instances which all share a single copy of their `talk` method.

1. First implement `talk` as a global function.

2. Instead of using a global function, attach `talk` as a property of the factory itself, but expect it to be called through individual animals.


## Finding one's marbles

1. Write a marble factory which can generate marbles with a custom size and color (having a property for each).

2. Give each marble instance a method `isBigger(other)` which returns true if it is bigger than another marble, `other`.  Attach that method to the factory initially, then link each marble instance to it, so that they all share the same function.


## In the bag

Next, you'll implement an abstract data structure for a bag, which contains multiple items (e.g. marbles) jumbled together.

1. Write a factory function `makeBag(items)` which makes bag instances.  Each bag holds a collection of items, and the parameter `items` is an array listing the items the bag starts with (though more may be added).  Each bag instance should have the following methods:

    1. `put(item)`: places item into the bag in an unspecified position.

    2. `draw()`: removes a random item from the bag and returns it.

    3. `divide(criterionFn)`: removes from the bag all items for which the callback `criterionFn(item)` returns truthy, and returns a new bag with just those items.  The original bag will retain the items not matching `criterionFn`.

    4. `serialize(compareFn)`: returns an array containing all items in the bag, sorted according to `compareFn`.

2. Make a bag and fill it with 100 marbles of random size 1-4, with (nearly) equal numbers of red, blue, and green.

    1. Use your `divide` method to extract the red marbles into another bag.

    2. `serialize` the red marbles into an array sorted by marble size, large to small.

    3. `serialize` the non-red marbles from the original bag, sorted by color (blues before greens).

3. Make another bag which holds the names of everyone in the class.  Serialize it in *reverse* alphabetical order.
