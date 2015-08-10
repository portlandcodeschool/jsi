---
layout: post
title: Expressions, Variables, and Primitives
class: fundamentals
date: 2015-08-10 00:00:01
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
