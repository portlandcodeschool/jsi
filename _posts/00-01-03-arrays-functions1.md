---
layout: post
title: Introduction to Arrays and Functions
class: fundamentals
date: 2015-08-12 00:00:00
---


## Arrays
```
var x;
var nums = [3, 1, 4, 1, 5, 9, 2, 7]
```

Find the outcome of each of the these expressions:

```
nums[3];
nums[nums.length-1];
nums[nums[4]];

x = nums.concat(nums);
x[x[x[nums[2]]]];
nums[x[x[x[2]]]];

nums.push(x.pop());
x.push(nums.length);
x.push(x.push(0));

x.length = x[6];
```

## Arrays with Loops 1

Examine the following code and step through it by hand. Explain, in words, what this program does. Compare your answer with other members of your group.

```
var x = [1,2,3,4,5];

for (var i=0; i < x.length; i = i + 1){
    if (i % 2 == 0){
        console.log(i + " : " + x[i]);
    }
}
```

Now, write a small program that

1.  declares a variable holding an empty array;
2.  iterates from 1 through 10 and puts each odd number in the array;
3.  prints out the array.

Evaluate it by hand when you're done (at least for a couple of iterations) and confirm that it works correctly.


## Arrays with Loops 2

Given the following array definition:
```
var nums = [3, 1, 4, 1, 5, 9, 2, 7];
```

1. Write a loop to console.log each element of `nums`.

2. Write a loop to change `nums` so that each of its elements is doubled.

3. Write a loop to duplicate `nums`, copying each element of `nums` into a different array.

------

## Intermission: Capstone Showcase!


## Function Basics

Write a function to print "hello world!" to the console.

1.  First write it in the form of a function declaration.

2.  Then write it in the form of a function expression assigned to a variable.


## Fun with Functions

1. Write a function which receives a number parameter and returns the square of that number.

2. Write a function which receives one parameter, an array of numbers, and returns the mean of those numbers.  (Hint: you'll need a loop.)

3. Write a function which receives an integer up to 10 and returns the corresponding word (i.e. 'one', 'two', 'three', etc).  (Hint: you'll need an array.)

4.  Use your three functions together to print the word for the square of the mean of these numbers: [2,4,7,-1]

## Functions on Arrays

1. Write a function `concat(arrA,arrB)` which takes two arrays as parameters and returns their concatenation.

<!--
2. Write a function `pushOnto(arrA,arrB)` which takes two arrays, modifies the first by appending the second array to it, and returning its new length.
-->

2. Write a function `everyNthOf(arr,n)` which takes an array `arr` and a number `n` and returns a new array which contains every `n`th element of `arr`, until its elements run out.  For example, `everyNthOf([1,2,3,4,5,6,7],3)` should return `[3,6]`.

3. Write a function `sharedHead(arrA,arrB)` which takes two arrays as parameters and returns a new array which contains the longest common sequence of elements at the head of both input arrays.  For example, `sharedHead([2,3,4,5,6],[2,3,5,7])` should return `[2,3]`.  `sharedHead([0,'a',true],[0,'a',true,'banana',9])` should return `[0,'a',true]`.  If either array is empty or they have no common head, then return `[]`.

## Letter Pyramid

Yesterday you wrote some loops to generate a pyramid of numbers.
Now modify that code into a function which generates a pyramid of letters like this:

```
a
ba
cba
dcba
edcba
```

Your function should have a parameter controlling the size of the pyramid and it should return a string.
Don't just `console.log()` each line;  instead return all the lines together in a single string which includes a '\n' at each line break.  Use an array to store one copy of each letter, then insert copies into your output string as needed.

## Song Lyrics

Adapting your letter-pyramid solution above, write a function which returns a string containing the entire lyrics for the song "The Twelve Days of Christmas".  Make sure that your result is grammatically and typographically correct (include line breaks, commas, etc. where needed), but keep redundancy within your program to a minimum.  Don't just `console.log()` each line; return them together as a single string which includes a '\n' at each line break.
You may want to use helper functions, loops, and/or arrays to store repeated elements.

If you prefer a non-Christmas option, you may choose a different song with similarly repeating structure, such as "There was an Old Woman Who Swallowed a Fly".  If you prefer a vegan option, you may write your own cruelty-free song.

## Playing Cards, Episode 1

Imagine that a deck of playing cards is sorted by rank and suit: first all the Aces, then the Twos, etc, with the Kings last.  Within each rank, the suits are in the order Hearts, Diamonds, Spades, Clubs.  Number each card in order from 0 to 51 (i.e. 0=Ace of Hearts; 1=Ace of Diamonds; 51=King of Clubs), and let that ID number represent the corresponding card.  Use this encoding scheme throughout the challenge below.

Write five related functions to compute different aspects of a card:

* `rank(id)` returns 1-13, representing the card's rank (for an _id_ between 0-51).

* `suit(id)` returns 1-4, representing the card's suit (1 is Hearts, 4 is Clubs).

* `color(id)` returns "red" or "black".

* `name(id)` returns the full name of the card (e.g. "Four of Diamonds").

* `cardID(rank,suit)` returns 0-51, identifying the card id of a given rank and suit.

You may assume each function will be called with valid arguments (i.e. integers in the appropriate range).

Your functions may call each other to avoid duplicating code -- for example: _color_ could be derived from _suit_.

**Hint #1:** Notice the patterns as the card id ranges from 0 to 51:

- rank(id) increases slowly, like a quotient;
- suit(id) cycles quickly through 1-4, (almost) like a remainder;
- color(id) alternates _R,R,B,B,R,R,B,B..._

**Hint #2:** Generate your card names by combining a rank word from one array and suit word from another.


## Summary

Explain, in your own words, the following programming constructs and concepts:

-	arrays
-	elements and indicies (indexes)
-	functions
-	parameters and arguments
-	return values

After you're done, share your answers within your group and discuss them.
