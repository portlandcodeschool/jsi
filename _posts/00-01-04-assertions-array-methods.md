---
layout: post
title: Assertions and Array Methods
class: fundamentals
date: 2015-08-13 00:00:00
---


## Scope and Shadowing 
Predict what will happen in each of the following programs:

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

## More Array methods

Use `indexOf` and `slice` to extract the queries from this html, and return them as an array:

```
var html = "https://www.portlandcodeschool.com?=javascript,full_stack,immersion"
```

Someone has hacked your online pizza order! Fortunately, you can hack it back into shape. The pizza place has sophisticated anti-hacking measures, so you can't simply redefine the array, but you can use `indexOf` and `splice` to remove the toppings you don't like and add the ones you do from the following array:

```
var toppings = ["green peppers", "mushrooms", "sausage", "anchovies"];
```

## More fun: emulating array functions

1. Write a function called `myPush` which receives an array and a value, and then behaves just like ordinary `push`: it should append the value to the array and return its new length.  Avoid using the built-in `push` method in your implementation.

2. Write a function called `muyPush` which receives two arrays, pushes all the elements of the second array onto the end of the first, and returns the new length of the first.

3. Write a function called `myConcat` which receives two arrays and returns a new array comprising a copy of the first with a copy of the second appended to the end.  Neither of the input arrays should change.  Avoid using built-in `concat` in your implementation.

## assert

Write a function called `assert` which will receive parameters `claim` and `warning`.
`claim` is the result of a Boolean expression, and if `claim` is not truthy, `assert` should `console.log` the string stored in parameter `warning`.

## Assertions as tests

Write a series of assertions that will use the card functions that you wrote yesterday. They should pass values into those functions and check to see if the functions are returning what you think they should be, for example:

```
assert((rank(3) === 1), "Card id 3 should be rank 1, but it isn't!");
```

Include these assertions in your cards code and use them to be sure that all of your card functions are working as intended. Talk with your group about any surprising edge cases that you found: did any assertions indicate a function wasn't working when it was, or vice versa? Look at each other's assertions and come up with ways to break the card functions in such a way that the assertions don't give any warnings.

## String and array manipulation

1. Write assertions that test a function that will take in an array of strings, where each string represents a name and an address formatted like so:

```
["Sherlock Holmes; 221-B Baker St.; London, England NW16XE"]
```

It should return a different array of strings, formatted like:

```
["Holmes, Sherlock: NW16XE"]
```

2. Now write the function! For starters, use the following array as a source:

```
var addresses = ["Tom McCluskey; 735 SW 20th Place; Portland, OR 97205", "WE 02358", "Tyler Durden; 420 Paper St.; Wilmington, DE 19886", "Dana Scully; 3170 W. 53rd Rd. # 35; Annapolis, MD 21402", "Lisa Simpson; 742 Evergreen Terrace; Springfield, USA 02358", "Ada Lovelace; 12 St. James's Square; London, England SW1Y4JH"];
```

3. Once you have that working well, try the following array and make sure that you're still getting the correct results:

```
var arr = ["Sherlock Holmes; 221-B Baker St.; London, England NW16XE", "Bilbo Baggins; Bag End, Bagshot Row; Hobbiton, The Shire 10392", "Santa Claus; North Pole H0H0H0", "Sue Richards; Baxter Building; 42nd St & Madison Ave.; Manhattan, NY 10101-7435", "Kubla Khan; 1 Stately Pleasure Dome; Xanadu, 90210", "Arthur Dent; 155 Country Lane; Cottington, England, Earth"];
```
