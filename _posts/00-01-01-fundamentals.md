---
layout: post
title: Expressions, Variables, and Primitives
class: fundamentals
date: 2015-08-10 00:00:01
---

## Exercises

### Invent a new Operator

Imagine and describe an operator of your own design.  Decide the number, type, and pattern of its operands (inputs) and how the output is decided.  Draw a custom symbol for it!


### Evaluating Nested Expressions

Draw a parse tree for and trace the evaluation of the complex expression below:

```
var x;
((4+(-1))*(x=(5-1))/(7%x) == x)
```

### Experimenting with arithmetic

Experiment with the various arithmetic operations in Javascript. Try testing out the various arithmetic operations in Javascript. Make sure you calculate for yourself what you think the result of these expressions should be.

-   `10 + 30 / 2 / 5`
-   `30/0 + 0`
-   `30/0 * 0`
-   `10 + undefined`
-   `10 + "string"*0`

Did any of these suprise you? Did you see things you weren't expecting? 

What can you explain about the rules for the symbols `NaN` and `Infinity`? Can you predict the value of these?

-   `typeof Infinity`
-   `typeof NaN`
-   `Infinity + Infinity`
-   `NaN * Infinity`

Before you try any of these, discuss them and see if you can come to consensus on what should happen.

### Fun with Strings and Coercions

1. 

Experiment with string concatenation and how coercions convert between strings and numbers. Try the following expressions in your console only after discussing them and seeing if you can come to a consensus on what happens.

```
"3" + 4
"this" + "is" + "a" + "string"
+"30" + 5
+"stuff"
```

Do coercions like this seem useful or dangerous? Discuss and share your consensus with your group.

2.

Explain how this is possible:

```
var y;
y=x+1-1;  //10
typeof y; //number
y=x-1+1;  //1
typeof y; //number
```

3.

Now explain this:

```
var small=9;
var big=10
small < big;     //true
x+small < x+big; //false!
```

## Be the Interpreter!

Execute these programs by hand, on paper, keeping track of the variables and the current statement being evaluated.  When you're confident about the code's behavior, verify your prediction using the console, Scratchpad, or node.

1.

```
var x;
var y;
x = 10;
y = x;
y = y + 5;
console.log(x);
console.log(y);
```
Does modifying y thus modify x?

2.

```
var x = 20;
x = x + 5;
console.log(typeof x);
x = "a string";
console.log(typeof x);
console.log(typeof (x + undefined));
```

3.

```
var x = 10;
var y = x;
var z = y;
y = z + z;
x = 2*y;
z = "" + x;
console.log(z + z);
```

## More Practice

### Expressions with Unknown values

Predict the output of each of the following expressions, and explain the rules which determine that answer.  (_Hint: The rules for operator `==` are complicated, but do your best!_)

If the output depends on the value or type of variable `x`, identify the conditions (what `x` is) when the expression will output true (or false, if that's simpler).  Assume the cases are independent, and `x` is reset to an unknown value before each.
Just because `x` is unknown, don't assume that it equals `undefined`!  You should consider the expression's behavior _for any possible value of `x`._

Some of these are tricky!  Don't trust your first instinct.  


1. `"1" == 1`

2. `"1" === 1`

3. `x == 'x'`

4. `x == (x+'')`

5. `'' == ' '`

6. `x = true`

7. `var x; x == 'undefined'`

8. `'9'<'10'`

9. `typeof x + 1 === "number"`

10. `typeof x % 2 === "number"`

11. `typeof (x % 2) === "number"`

12. `x++ == ++x`

13. `++x == x++`

14. `"1"+x == 1+x`

15. `"0"+1 == 1`

16. `(typeof (x+1))===(typeof x)` 

17. `(x=(typeof (x+(typeof x))))==x`


### Fractional Improvement

Suppose you represent a fraction (_n/d_) with 2 integer variables: _n_ for the numerator and _d_ for the denominator.
If _n_ is greater than _d_, the fraction is "improper", but it can be rewritten as a proper fraction.  For example, "7/4" is improper, but it can be rewritten as "1 3/4", which is proper.

Assuming variables _n_ and _d_ are defined in advance (but you don't know their values), write a series of expressions to generate a string expressing the proper form of the fraction _n/d_.  For example, when _n===7_ and _d===4_, your resulting string should be "1 3/4".  You may assume both _n_ and _d_ are positive integers and _n_ > _d_, but otherwise you should be able to handle any values of _n_ and _d_.

1. Solve it first by making use of a function called _Math.floor_.

2. Now solve it without calling any functions, using merely operators.  (Hint: you'll need at least the modulo operator _%_.)

### Kinda Mean Numbers

Assume variables x, y, and z are numbers.

1. Write an expression for the mean (i.e. average) of x, y, and z.

2. Write a series of expressions to adjust each of x, y, and z halfway toward the mean of the three.
That is, reset the value of each variable to something new based on its previous value.


### Simple Geometry

Suppose you're encoding geometric shapes in a Cartesian (2D) coordinate system, and you represent a rectangle with four numeric variables:

- _l_ : horizontal position of left edge (relative to some origin);
- _r_ : horizontal position of right edge;
- _t_ : vertical position of top edge;
- _b_ : vertical position of bottom edge.

1. Write an expression for the rectangle's area.

2. Write an expression which is true if the rectangle is taller than it is wide, and false otherwise.

3. Write an expression for the circumference of the biggest circle which can fit inside the rectangle.  (_Hint: make use of the functions `Math.max()` and `Math.min()`._)

4. Write an expression for the area of the smallest circle which completely encloses (i.e. circumscribes) the rectangle.

5. Imagine subdividing your rectangle into 3 equal rows and 3 equal columns, which would create 9 smaller rectangles, identical in shape but varying by position.
Define four new variables describing the centermost small rectangle.
(_Hint: one of the many solutions is very similar to the solution of "Kinda Mean #2" above._)


##Summary

Write down, individually, your own summary of the following ideas:

-   what pieces go into making a webpage
-   server vs. client code
-   what a programming language does
- what an operator does
- how nested operators work
-   expressions vs. statements
-   what variables are
-   what a "type" is in programming
-   type coercions
- how string concatenation works

Then share them with the rest of your group and discuss your answers.


## For later

### Code Quality

Are you typing everything right? Are you sure you didn't make any typos?

Carefully going line-by-line and letter-by-letter to make sure you've typed everything just right is a giant pain, so we use programs to verify that everything looks okay. Try it out. Don't be surprised if you have a few mistakes already. :)

{% highlight bash %}
npm install -g jshint
jshint myfile.js
{% endhighlight %}

You can also install the [Atom-JSHint](https://atom.io/packages/atom-jshint) plugin for Atom to get obnoxious--err, I mean, _helpful_ jshint notes right in your editor.

### Stepping Through Execution

Often it's helpful to walk through pieces of code step by step, the same way the computer is working through it. You'll find that you can sometimes better understand what's happening this way, and also may discover solutions to problems in your code.

There are two nifty utilities that try to make this process more visual:

- [SlowmoJS][slowmojs]
- [metajs][metajs]


[slowmojs]: http://toolness.github.io/slowmo-js/
[metajs]: http://int3.github.io/metajs/
