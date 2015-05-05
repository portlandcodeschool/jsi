---
layout: post
title: Fundamentals
class: fundamentals
date: 2015-05-05 00:00:01
---

This class will cover some of the fundamentals of JavaScript. We will discuss conditionals, objects, arrays and functions. We'll also make a lot of mistakes so we can learn to recover from them!

Since we're just starting off, let's take baby steps to build up our programming chops. First, we'll learn about variables.

## Variables

A variable is a name that you can tell the JavaScript interpreter to associate with some value. You might remember variables in algebra, where you'd see expressions like `4x + 3`. Variables in programming are similar; they represent some value that you don't know up front--its exact meaning may _vary_ over time. Unlike in algebra, in programming we generally avoid giving variables single-letter names. Instead, variables names should be one or more words. In JavaScript you can declare a variable using the keyword `var`, and assign a value to it using the `=` operator:

{% highlight javascript %}
var bottlesOfBeerOnTheWall = 99;
{% endhighlight %}

### Exercise: storing and using variables

Create a file called `variables.js.` Inside it, create several variables that contain facts about your partner. For example, you might create one called `name` that shows their name. Try to come up with at least four variables. Next, use `console.log` to display those facts on the screen:

{% highlight javascript %}
console.log(name);
{% endhighlight %}

## Loops

Suppose you wanted to make a program that sang "99 Bottles Of Beer On The Wall." You could just write the whole thing out:

{% highlight javascript %}
console.log("99 bottles of beer on the wall, 99 bottles of beer, take one down, pass it around, 98 bottles of beer on the wall!");
console.log("98 bottles of beer on the wall, 98 bottles of beer, take one down, pass it around, 97 bottles of beer on the wall!");
console.log("97 bottles of beer on the wall, 97 bottles of beer, take one down, pass it around, 96 bottles of beer on the wall!");
console.log("96 bottles of beer on the wall, 96 bottles of beer, take one down, pass it around, 95 bottles of beer on the wall!");
console.log("95 bottles of beer on the wall, 95 bottles of beer, take one down, pass it around, 94 bottles of beer on the wall!");
...
{% endhighlight %}

I think we can all agree writing out the whole thing would be infuriatingly tedious. Isn't computer programming supposed to _reduce_ the amount of work we do? Yes it is. That's why almost every programming language offers at least one way to do things in a loop. For example:

{% highlight javascript %}
var bottlesOfBeer = 99;
while (bottlesOfBeer > 1) {
    console.log(bottlesOfBeer + " bottles of beer on the wall, " + bottlesOfBeer + " bottles of beer, take one down, pass it around, " + (bottlesOfBeer - 1) + "bottles of beer on the wall!");
    bottlesOfBeer = bottlesOfBeer - 1;
}
console.log("1 bottle of beer on the wall, 1 bottle of beer, take one down, pass it around, no more bottles of beer on the wall!");
{% endhighlight %}

### Exercise: for-loops

An alternative to the `while` statement above is the `for` statement. Look up `for` on [MDN](https://developer.mozilla.org/en-US/). In a new file called `bottlesOfBeer.js`, rewrite the while-loop above as a for-loop.

## Functions

Let's pause for a moment to think about how those loops let us _reuse code_. Code reuse is a fundamental aspect of computer programming. If you had to write out every possible branch of code by hand, large programs would be utterly unmanageable. The features offered by various programming languages are basically all different ways to reuse code, which brings us to functions!

Functions are the most important tool JavaScript offers for code reuse. Just as the code in the while-loop behaved a little differently as the value of `bottlesOfbeer` changed, a function is a chunk of code whose behavior is defined by its _arguments_. We've already used the function `console.log` to display text on the screen. Notice how some of its behavior (displaying text on the screen) is the same each time you call it, but the details (exactly what text it displays) are different depending on its arguments (the value or values in parentheses after the name of the function). `console.log` is provided by Node.js, but we can write our own functions, as well. For example, if we wanted to calculate the kinetic energy of a moving object:

{% highlight javascript %}
var kineticEnergy = function(mass, velocity) {
  return mass * Math.pow(velocity, 2);
};
{% endhighlight %}

### Exercise: refactoring

_Refactoring_ is the process of taking working code and reorganizing it so it accomplishes the same goals in a better (easier to read, more performant, or otherwise more appropriate) way. One of the most common ways to refactor code is to take some code and extract it into a function. Usually you'd do this with code that's duplicated in 2 or more places, but try extracting the body of the loop into a function `singAboutBottles`, so all the loop body says is `console.log(singAboutBottles(bottlesOfBeer));`.

## Objects

We've seen how to assign numbers and strings (ordered groupings of letters and other characters) to variables. However, a single string or number by itself isn't enough information for all but the most trivial tasks. Usually, you'll have several pieces of data that all go together. In JavaScript, we accomplish that with _objects_. An Object is an unordered collection of keys and values. Here's a simple example of creating an object:

{% highlight javascript %}
var andrew = {
  name: "Andrew",
  age: 30,
  favoriteColor: "green",
  hobby: "woodworking"
};
{% endhighlight %}

You can access the values in an object using two types of syntax: dot-notation or bracket notation.

{% highlight javascript %}
console.log(person.name); // dot notation
console.log(person['age']); // bracket notation
{% endhighlight %}

<aside>
  <h4>Comments</h4>

  The example above introduces <em>comments</em>. A comment is a piece of code that doesn't do anything when executed. It's intended for explanatory notes to other people who might be reading your code. In JavaScript, a <code>//</code> starts a <em>line comment</em> that ends at the end of the line, while <code>/*</code> starts a <em>block comment</em> that doesn't end until a <code>*/</code> (which might be many lines later). We'll discuss good commenting practice later.
</aside>

### Exercise: stick your partner in an object

Let's go back to `variables.js`. Rather than storing each fact about your partner in an individual variable, create a single object that has those facts as key/value pairs. Then update the calls to `console.log` so that they pull that information off of the object.

## Arrays

An array is a special type of object that keeps its values in order, using integers for keys. You can declare arrays using square brackets, separating each value with a comma.

{% highlight javascript %}
var authors = [
  "Margaret Atwood",
  "Jane Austen",
  "Bill Bryson",
  "Roald Dahl",
  "Tom Holt",
  "Terry Pratchett",
  "J.K. Rowling"
];
{% endhighlight %}

Since arrays' values are ordered, you can use a loop to show all these authors in alphabetical order:

{% highlight javascript %}
for (var i = 0; i < authors.length; i++) {
  console.log(authors[i]);
}
{% endhighlight %}

However, since arrays are objects, they can have _methods_, which are attributes whose values are functions. Arrays provide a method called `forEach`, which takes another function, called a _callback_, as an argument. `forEach` will call its callback once for each element in the array, passing the value and index of that element as arguments. Using `forEach` looks like this:

{% highlight javascript %}
authors.forEach(function(author){
  console.log(author);
});
{% endhighlight %}

Don't worry if callbacks seem a little confusing; that's normal. You'll have many opportunities to start getting a handle on them.

### Exercise: binders full of students

Collect facts about your partner, yourself, and other students around you. Make an array of objects, where each object contains various facts about a person. Now change your code so that it loops through the array (using `while`, `for`, or `forEach`) and display all the facts about them.

What happens if you've collected different sets of facts about different people?

## Conditionals

So far, the programs we've written will always do the same thing every time they're run. That's ok if you only have one thing you want to do, but it's not gonna get us very far. That's why JavaScript offers conditional statements that operate on _boolean_ values. Booleans (commonly abbreviated "bool") are the simple option of true or false. Using the statements `if`, `else if`, and `else`, the logical operators "and" (`&&`), "or" (`||`), and "not" (`!`), plus the various comparison operators, we can form logical conditions that let our program decide what it should do. The comparison operators in JavaScript are:

* "equals," which is spelled `===`
* "does not equal," which is spelled `!==`
* "greater than," spelled `>`
* "greater than or equal to," spelled `>=`
* "less than," spelled `<`
* "less than or equal to," spelled `<=`

<aside>
  <h4>Danger Zone</h4>

  JavaScript's design is flawed in various ways. Two of the most prominent have to do with conditional statements.

  <ul>
    <li>JavaScript has another way of spelling "equals," <code>==</code>. The way <code>==</code> works in JavaScript is broken! We'll discuss it in greater depth later, but for now, just remember to always use <code>===</code> rather than <code>==</code>.</li>
    <li>JavaScript allows you to use non-boolean values in conditional statements. This is a feature commonly called "truthiness," and like <code>==</code>, it is broken in JavaScript. When using a conditional statement, always make sure you're examining boolean values--either a plain boolean or the result of a comparison operator like <code>===</code>.</li>
  </ul>

  JavaScript also has <em>bitwise operators</em>, which are spelled <code>|</code> (or), <code>&</code> (and), and <code>^</code> (xor). We probably won't discuss them in this class. Be sure to use the <em>logical operators</em> or your program will behave strangely.

</aside>

Using conditionals, we could write a function that decides whether someone is a JavaScript teacher:

{% highlight javascript %}
var isTeacher = function(name) {
  if (name === "Dan") {
    return true;
  } else if (name === "Andrew") {
    return true;
  } else {
    return false;
  }
}
{% endhighlight %}

### Exercise: using conditionals and booleans

1. Rewrite the code above so the function has only an `if` and an `else` statement (no `else if`).
1. Rewrite it again, so it's a single line with a `return` statement!
1. In the "binders full of students" exercise, your program probably claimed that some people's hometown was undefined. That's not really true, though. Update your program so it only tells you a fact about someone if you know that fact about them.

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

### Challenges

- Write a function that takes two arguments, both numbers, and returns some text describing the sum. For instance, `sum(7, 5)` should return `"The sum of 7 and 5 is 12"`.
- Write a function that subtracts two numbers. For instance, `difference(7, 5)` should return `"The difference between 7 and 5 is 2"`.
- Write a function that takes two people objects and logs a message about them meeting each other for the first time. For instance, `introduce(john, sara)` would return something like `"John met Sara and said the color is green is awesome"`.
- Change `difference` so that it never returns negative numbers. For instance, both `difference(5, 7)` and `difference(7, 5)` should return `2`.
- Think of a domain name for a portfolio site.
- Think of a web application you'd like to build.

[slowmojs]: http://toolness.github.io/slowmo-js/
[metajs]: http://int3.github.io/metajs/
