---
layout: post
title: Conditionals, Truthiness, and Loops
class: fundamentals
date: 2015-08-11 00:00:00
---

# Morning: Introduction to Topics
	* Boolean "and" and "or"
	* Truthiness
	* Conditionals
	* Blocks
	* &&, || as short-circuiting operators

### Boolean operators Part 1: Boolean Logic


Consider the following pieces of code and calculate by hand what value they should calculate, then check your results by entering them into the console.

1.  `true || false`
2.  `((true || false) && false) || true`
3.  `var x;`
    `(x < 10) || (x > 10);`
4.  `!!false`
5.  `!((x >= 0) && (x <= 10)) === (!(x >= 0) || !(x <= 10))`
6.  `!((x >= 0) && (x <= 10)) ===   ((x < 0) || (x > 10))`
7.  `var x=1, y=1;`
    `x === y === 1;`
8.  `var x = 0;`
    `-1 < x < 1`

### Boolean Operators Part 2: Non-Boolean values and Truthiness


1.	`'coffee' || 'tea'`
2.	`'coffee' && 'tea'`
3.	`2 && 1 && 0`
4.	`2*Infinity && 'beyond'`
5.	`undefined || false`
6.	`undefined || undefined`
7.	`'banana'/2 || 'false'`
8.	`var x, y=1;`
	`x || y;`
9.	`var x = 0;`
	`(x === 1 || 2)`


### Conditionals


Consider the following fragments of code: execute them by hand, as shown in class, and then compare your answers to what you get from running the examples in scratchpad.

1.

```
var x;
if (x || (x=10)) {
	console.log(x);
} else {
	if (x && (+"totes a string")){
		console.log("one thing");
	} else {
		console.log("another thing");
	}
}
```

2.

```
if (x || !x) {
	console.log("We've excluded the middle");
} else {
	console.log("The middle is not excluded");
}
```


### Boolean Operators Part 3: Short-circuting

Consider the following fragments of code and try to follow the logic of their execution and their outcome:

1.  `true || arglebarg`
2.	`if (doJShomework() || runMarathon()) deserveCookie();`
3.	`if (doJShomework() && runMarathon()) deserveCookie();`
4.  `(backup = '') && deleteAllFiles()`
5.  `treat() || trick()`
6.  `practice() && win() && celebrate()`

### While loops

Consider the following fragments of code: execute them by hand, as shown in class, and then compare your answers to what you get from running the examples in scratchpad. The second is *almost* the same as the first. Do you understand why they behave differently?

Be sure you understand the examples before you run them!

1.

```
var x;
var i = 0;
while (!x) {
	i = i + 1;
	if (i == 5) {
		x = true;
	}
	console.log("running");
}
```

2.

```
var y;
var j;
while (!y) {
	j = j + 1;
	if (j == 5) {
		y = true;
	}
	console.log("running");
}
```

<!-- GCD/Euclid's algorithm: -->
3.

```
var a=81, b=108;
while (b>0) {
	var t = b;
	b = a % b;
	a = t;
}
var g = a;
```
Setting aside the particular initial values of a and b, how might you summarize the purpose of this calculation?


4.

```
var a=60, b=84;
while (a!==b) {
	if (a>b)
		a-=b;
	else
		b-=a;
}
var g = b;
```
How might you summarize the purpose of this calculation?


## For-loops

Consider the following fragment of code: execute it by hand, as shown in class, and then compare your answer to what you get from running the examples in scratchpad.

```
var i;
    
for (i = 0; i < 8; i=i+1){
    if(i == 5){
        console.log("It's five!");
        i = i+1;
    }
    console.log(i);
}
```

What numbers are printed out by this code?


# Afternoon: Mixed Practice
---


## Nested Loops: Number Square, Number Pyramid

Write a set of nested loops that will `console.log` a square of numbers. You should be able to change a single loop's initial value to change the size of the square. Sample output:

```
012345
012345
012345
012345
012345
012345
```

Now do something similar, but with a triangle of numbers:

```
0
10
210
3210
43210
543210
```


## Simplifying code

Rewrite each block below as the simplest equivalent you can discover.  Your equivalent should produce the same final conditions as the original code given the same initial conditions.
In each case, if there is an undeclared variable, assume it has been declared earlier and set to an unknown value.

**a)**

```
var i;
if ((n - Math.floor(n)) >= .5) {
  i = Math.ceil(n);
} else {
  i = Math.floor(n);
}
```


**b)**
```
var y, xIsFalse = (x? false : true);
if (xIsFalse)
  y = false;
else
  y = x;
```


**c)**
```
for (var count = 15 - i ; count < 15 ; count=count+1) {
  i = i-1;
  console.log(i+1)
}
```


**d)**
```
var x;
if (a) {
  if (b) {
    x = 0;
  } else {
    x = 1;
  }
} else {
  if (b) {
    x = 1;
  } else {
    x = 2;
  }
}
```

## Simulating &&
<!-- w/o functions-->

Suppose the '&' key on your keyboard is missing, and you want to be able to continue programming without it.  You decide to simulate the && operator with an expression!

**a)**
Write an expression that tries to simulate the && operator: it should always return the same result as `(a && b)` for any values of _a_ and _b_.  (For example, given `var a = (0>1);` and `var b = true;`, it should return _false_.)  But you can't use && itself within your expression!

**b)** Write another expression that tries to simulate a double-&& operator: it should always return the same result as `(a && b && c)` for any values of a,b,c.  (For example, `var a = 1 > 0; var b = 0 > 1; var c = true;` should return `false`.)  As before, you're not allowed to use && itself.

---
## Checkerboard

Imagine that the squares of an ordinary checkerboard are numbered in two different ways:

* Each square has integer coordinates _(R,C)_ describing its row and column.  Both values should be in the range 0..7, so that the upper-left square is at (0,0) and the bottom-right is at (7,7).

* Each square has a unique integer number N from 0 to 63.  These numbers run sequentially left-to-right one row at a time, top to bottom.  Therefore the upper-left square has N===0 and the bottom-right has N===63.

**a)**  Given a particular R and C, find the corresponding N.  That is, write an expression for variable N containing variables R and C.

**b)**  Given N, find R.  Write an expression for R which contains N.

**c)**  Given N, find C.  Write an expression for C which contains N.

**d)**  Assume the squares are colored black and white, with the upper-left square black.
Write an expression (or pair of conditional statements) to set a variable _color_ to either 'black' or 'white', describing the square identified by variables R,C, and N (or a subset of them, if you don't need all three).

**e)** Print the board to a string, using `"#"` for black squares and `" "` for white squares.

---

## Prime numbers

Prime numbers are central to cryptography, and frequently used in other fields of science. Write an expression that will make use of a variable `num` and determine if it is a prime number or not. As a reminder, a prime number is any number that is evenly divisible only by itself and 1. The first ten primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.

---

## Roman Nvmerals

Write an expression that will convert a variable `num` to Roman numerals. Your expression should `console.log` a string that is the number represented as Roman numerals. For reference:

```
1000: M
900: CM
500: D
400: CD
100: C
90: XC
50: L
40: XL
10: X
9: IX
5: V
4: IV
1: I
```

You may assume that the `num` variable is a positive integer under 4000.

---

## nth Fibonacci number

The Fibonacci sequence is a sequence of numbers in which each number is the sum of the two previous numbers in the sequence, for example: `0, 1, 1, 2, 3, 5, 8, 13 ...`. Write an expression that assumes a positive integer variable `num` and evaluates to the corresponding Fibonacci number--if `num = 7`, the expression should `console.log` 8.

---

## Calendar

Given a starting day of the month (numbered 0-6, so that if the first of a month falls on a Tuesday you will get a 2) and the number of days in that month, write an expression that will create a string that represents that calendar month. For example, given `var numDays = 31; var startsOn = 3`, your expression should generate something like:

```
          1  2  3  4 
 5  6  7  8  9 10 11 
12 13 14 15 16 17 18 
19 20 21 22 23 24 25 
26 27 28 29 30 31 
```

---

### Summary


Summarize the following ideas in your own words:

-	if-statements
-	branching
-   booleans
-	truthiness
-   short-circuiting
-   while loops
-   for loops

After you're done, share your answers within your group and discuss them.
