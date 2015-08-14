---
layout: post
title: Callbacks and Higher-Order Functions
class: fundamentals
date: 2015-08-14 00:00:00
---




## Customized Countdown

1. Write a function which counts down from 10 to 0, logging each number, and when it reaches 0 prints "Done!".

2. Write a function which counts down from N to 0, where N is a parameter, and then prints "Done!".

3. Write a function which counts down from N to 0 as before, but then prints a message of your choice, passed in as a second parameter.

4. Write a function which counts down from N to 0, then does any action of your choice!  The action should be expressed as another function which is passed in as a parameter to your countdown function.


## Callbacks


A callback is just a function passed as an argument to another function.  The receiving function is reponsible for calling the callback at the right time,
but that receiver has no idea what the callback function does.  Conversely, the callback knows how to perform some action, but it has no idea what will trigger it.


## setTimeout

Use the built-in function `setTimeout(fn,delay)` to trigger a callback `fn` after `delay` milliseconds have elapsed.



## Callbacks with parameters

Sometimes a function which receives a callback will provide one or more arguments when triggering the callback.  The two functions then cooperate in an interesting way:  each function knows only _part_ of the action they will perform together.  The callback knows what action to take with its arguments, but has no idea when it will be called nor precisely what its arguments will be.  Conversely, the receiver has no idea what action the callback will take, but knows when to trigger it and the values the callback will act on.

He is a simple example to illustrate the idea:
one callback knows how to shout a word, and another callback knows how to spell a word, but neither knows in advance what word it will shout or spell.

```
// Example Callback Functions:
function shout(str) {
	var output = str.toUpperCase()+'!';
	console.log(output);
	return output;
}
function spell(str) {
	var output = str.split('').join('...');
	console.log(output);
	return output;
}
```

Similarly, one receiver function knows how to find the third word in an array and trigger an action on it, and another knows how to find the _third-to-last_ word and trigger an action, but neither one knows what action will occur when triggered.

```
// Example Receiver Functions:
function withThird(array,callback) {
	for (var i=0; i<2; ++i)
		console.log(array[i]); // print items 0,1 normally
	callback(array[i]); // do something special with item 2
}
function withThirdFromEnd(array,callback) {
	for (var i=array.length-1; i>array.length-3; --i) {
		console.log(array[i]);
	}
	callback(array[i]);
}
```

But either receiver can be used with either callback to successfully complete an action on a particular word

```
var fruits = ['apple','banana','cranberry','plum'];

withThird(fruits,shout);
withThird(fruits,spell);

withThirdFromEnd(fruits,shout);
withThirdFromEnd(fruits,spell);
```

### Do it yourself!

1. Write a receiver function which takes an array of words and a callback, picks some word from the array, and triggers the callback on that word.  You may use either of the callbacks `shout` or `spell` to test your receiver.

2. Write a callback of your own to do something interesting with a word it receives as a parameter.  Pass your callback as an argument to either of the receiver functions `withThird` or `withThirdFromEnd`, or to the receiver you wrote in step 1 above.


### forEach

All arrays have a method called `forEach` which run a callback you provide on every element of the array.
No value is returned, so the callback must have some side-effect when it's called.


1. Use `forEach` to `shout` every string in an array of strings.

2. Now use it to `spell` a series of strings.

3. Pretend that `forEach` doesn't yet exist and you have to write it yourself.  Complete the following template to implement it:

```
function forEach(array,callback) {
	// do callback on every element of array...
}
```

### map

All arrays have a method called `map`.  `map`, like `forEach`, runs its callback on each array element, but it expects the callback to return a value each time.
The result of `map` is a new array built from those individual return values, one per element.

1. Use `map` to build an array of shouted strings.

2. Use `map` to build an array of spelled strings.

3. Pretend that `map` doesn't yet exist and you have to write it yourself.  Complete the following template to implement it:

```
function map(array,callback) {
	// build a new array using callback to transform each element of array
}
```

### filter

All arrays have a method called `filter`.  Like `map`, `filter` builds and returns a new array derived from the original array.  `filter` calls its callback function on each element of array, and if the callback returns anything _truthy_, filter copies the _original element_ (not the truthy result) into the new array.  Put another way, `filter` finds a subset of the original array according to a criterion decided by its callback.

1. Use `filter` on the fruits array to collect only fruits which contain the letter 'e'.

<!--
Use filter to return only the integers in a list of numbers.
-->

2. Pretend that `filter` doesn't yet exist and you have to write it yourself.
Complete the following template to implement it:

```
function filter(array,callback) {
	// build a new array using callback to decide which elements of array to include
}
```

### sort

Any array can `sort` itself.  The callback to `sort` has *two* parameters, which are different, unknown elements of array,
 and the callback indicates which is greater by returning either a positive or negative number.
Here is an example of a callback which sorts an array alphabetically:
```
function compareAlpha(strA,strB) {
	if (String(strA) < String(strB))
		return 1;
	else
		return -1
}
```

1. Use `sort` to sort a list of numbers in _descending_ order.

2. Use `sort` to sort the list of fruits alphabetically by their *second* letter. 

### reduce

Finally, any array can `reduce` itself to a single value.  The process works by repeatedly "merging" an "accumulator" value with each of the array's elements.  The callback function takes two inputs, the current accumulator and the next array element, and decides how they "merge" to yield the next accumulator.
Here's an example of a `reduce` callback which counts the total number of array elements:
```
function addOne(total,item) {
	return total+1; //regardless of item's value, make the new accumulator
					// one greater than the current accumulator (total)
}
```

1. Use reduce to calculate the total number of letters in a list of words.

2. Use reduce to compute the smallest number in a list of numbers.


## Rolodex

Using the following list of addresses:

```
var addresses = ["Tom McCluskey; 735 SW 20th Place; Portland, OR 97205", "Tyler Durden; 420 Paper St.; Wilmington, DE 19886", "Dana Scully; 3170 W. 53rd Rd. # 35; Annapolis, MD 21402", "Lisa Simpson; 742 Evergreen Terrace; Springfield, USA 02358", "Ada Lovelace; 12 St. James's Square; London, England SW1Y4JH",
"Sherlock Holmes; 221-B Baker St.; London, England NW16XE", "Bilbo Baggins; Bag End, Bagshot Row; Hobbiton, The Shire 10392", "Santa Claus; North Pole H0H0H0", "Sue Richards; Baxter Building; 42nd St & Madison Ave.; Manhattan, NY 10101-7435", "Kubla Khan; 1 Stately Pleasure Dome; Xanadu, 90210", "Arthur Dent; 155 Country Lane; Cottington, England, Earth"]
```

1. Generate a list of shortened entries, each of the form
```
"Holmes, Sherlock: NW16XE"
```

2. Generate a list of just the last names of everyone.

3. Return a subset of the original entries for which the person's last name is shorter than their first name.

4. Sort the original entries alphabetically by the person's last name.

5. Find the full address of the person whose name is longest.

## Rewrite for Fun and Profit

Return to any of the exercises you've solved this week using a `for` loop with an array, and rewrite it using either `map` or `forEach`.

## setReminder

Write a function `setReminder(dateDescription, action)` which receives a string `dateDescription` and a callback function `action`.  Use the `dateDescription` to construct a Date object (see [dates][mdn-dates]), find the delay from now until then, and schedule your reminder `action` for that time using `setInterval`.

[mdn-dates]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

