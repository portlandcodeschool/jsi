---
layout: post
title: Fundamentals
class: fundamentals
date: 2015-01-05
---

This class will cover some of the fundamentals of JavaScript. We will discuss
conditionals, objects, arrays and functions. We'll also make a lot of mistakes
so we can learn that it's not quite so bad.

Since we're just starting off, let's take baby steps to build up our programming
chops. First, we'll learn to speak. Then we'll learn to count.


## Objects

For quick reference, here's an example of creating and using objects:

{% highlight javascript %}
var person = {
  name: "Whitney",
  age: 4,
  favoriteColor: "blue",
  hobby: "cooking"
};
person.age = 12;
person['favoriteColor'] = "orange";
console.log(person.name);
{% endhighlight %}

We'll be exploring objects in a lot more detail in the future, but for now we'll
start using them to get comfortable with the syntax.

## Code Quality

Are you typing everything right? Are you sure you didn't make any typos?

Most JavaScript programmers aren't really sure that they got it all right, so
we use programs to verify that everything looks okay. Try it out. Don't be
surprised if you have a few mistakes already. :)

{% highlight bash %}
npm install -g jshint
jshint myfile.js
{% endhighlight %}


## Learning to Speak

### Functions

Functions are chunks of code that can be reused. Functions are just
expressions just like `2 + 2` or `"hello world"`.
A function expression looks like: `function() { /* code */ }`.
Usually, you'll assign functions to variables to use them. Here's a basic function
that takes no _arguments_ that we've named `greet` by assigning
it to a variable:

{% highlight javascript %}
var greet = function() {
  console.log("Whitney says \"Hello!\"");
};
{% endhighlight %}

We can then have this chunk of code run anywhere by _calling_ the function.
This is done by adding `()` after the name we gave it:

{% highlight javascript %}
greet();
{% endhighlight %}

Functions can also be thought of as the building blocks of programs.
Soon we'll start combining functions to make cool things happen.


### Arguments

Since greeting is something that many people can do, we can make
our function more general by providing it with some information.

Here are some examples:

{% highlight javascript %}
var greet = function(personName) {
  console.log(personName + " says 'Hello!'");
};
var personName = "Whitney";
greet(personName);
greet("Sara");
{% endhighlight %}


You could also pass objects to functions:

{% highlight javascript %}
var greet = function(person) {
  console.log(person.name + " says 'Hello!'");
};
var person = { name: "Whitney" };
greet(person);
greet({ name: "Sara" });
{% endhighlight %}


### Return values

Functions can also produce a result. We'll only touch on this briefly today, but
it will be an important concept that we start using very soon.

{% highlight javascript %}
var person = {
  firstName: "Whitney",
  lastName: "Young"
};

var fullName = function(person) {
  return person.fristName + " " + person.lastName;
};

console.log(fullName(person));
{% endhighlight %}


<aside>
**Confused by parenthesis?**

When you're new to functions, the syntax can feel confusing, specifically the
parenthesis. You use them both when you're defining your function, but also when
calling the function. This really boils down to the syntax of programming languages.
Generally it's best just to accept it and move on.

If you're still having trouble, and you're not in the mood to just accept it, this
may help: the parenthesis don't mean just one thing. When parenthesis come after the
keyword `function`, they are being used to define arguments. When they come after a
variable name, they mean call the function. So `function(a, b, c)` means define the
arguments `a`, `b`, and `c` for a new function. But `learnJavaScript(x, y, z)` means
that you want to call the function that's been assigned to `learnJavaScript` with
whatever values are in `x`, `y`, and `z`.
</aside>


### Challenges

- Write a function that takes two arguments, both numbers, and logs the sum. For instance,
  `sum(7, 5)` should log `The sum of 7 and 5 is 12`.
- Write a function that subtracts two numbers. For instance, `difference(7, 5)` should log
  `The difference between 7 and 5 is 2`.
- Write a function that takes two people objects and logs a message about them meeting
  each other for the first time. For instance, `introduce(john, sara)` would log something
  like `John met Sara and said the color is green is awesome`.
- Create variations of your sum and difference functions that return a results instead of
  logging
- Bonus: Change `difference` so that it never returns negative numbers. For instance,
  both `difference(5, 7)` and `difference(7, 5)` should return `2`.


### Stepping Through Execution

Often it's helpful to walk through pieces of code step by step, the same way
the computer is working through it. You'll find that you can sometimes better
understand what's happening this way, and also may discover solutions to
problems in your code.

There are two nifty utilities that try to make this process more visual:

- [SlowmoJS][slowmojs]
- [metajs][metajs]


## Learning to Count

Let's go back to the early days of childhood. At some point we learned to count. Many of us
decided after we learned, that we'd continue counting until we couldn't go any higher. It
was fun. We're going to try to re-create that fun time counting with a program.

<aside class="objective">
**Learning to Count Objective**
Build a program where once you instruct the computer to begin counting, it will continue
counting (forever) just like a young child.
</aside>

Let's start with a very basic function:

{% highlight javascript %}
var sayNumber = function(n) {
  console.log("Whitney says '" + n.toString() + "'");
};
{% endhighlight %}

Now we can speak numbers:

{% highlight javascript %}
sayNumber(0);
sayNumber(1);
sayNumber(2);
{% endhighlight %}

But this doesn't really achieve the goal. We can manually give instructions to count, but we want to
have the computer automatically continue for us once we start. Let's write a function to start counting:

{% highlight javascript %}
var startCounting = function() {
  sayNumber(0);
};
{% endhighlight %}

Now we can start counting:

{% highlight javascript %}
startCounting();
{% endhighlight %}

But at this point, we only say the number zero. So we haven't done much better. Let's add another function
to the mix to continue counting, and update our start counting function.

{% highlight javascript %}
var startCounting = function() {
  sayNumber(0);
  continueCounting(1);
};

var continueCounting = function(n) {
  // think about what continue counting means. it means
  // that we say a number, and then continue with the
  // next number, right? do we have all the functions
  // we need in order to say a number and continue counting?
  // also, what is the next number?
};
{% endhighlight %}

### Stopping

Well, we have to stop at some point, we can't go forever.

Let's try to stop at 10 for now. Before we do that, we need to add _conditionals_
to our JavaScript repertoire. These are pretty easy, let's take a look:

### Conditionals

{% highlight javascript %}
if (2 > 1) {
  console.log('JavaScript understands how to compare numbers.');
}

if (1 > 2) {
  console.log('JavaScript failed us, and pigs are probably flying as well!');
}
{% endhighlight %}

While we're at it, let's look at a few other things you can do with `if` statements.

{% highlight javascript %}
var name = "Whitney";
if (name === "Whitney") {
  console.log("Seems like a pretty cool guy, you should talk to him.");
}
else {
  console.log("I don't know that person. Don't talk to strangers.");
}
{% endhighlight %}

You can expand and use multiple else items:

{% highlight javascript %}
if (name === "Whitney") {
  console.log("Seems like a pretty cool guy, you should talk to him.");
}
else if (name === "Alex") {
  console.log("Oh, don't talk to him. I hate him.");
}
else {
  console.log("I don't know that person. Don't talk to strangers.");
}
{% endhighlight %}

#### Quick Status Check

- Write a function that takes a person's name as an argument, and logs
  a message if they are enrolled in this class. If they're not in the
  class, it should log a message stating that they're not.
- Bonus: who can get everyone's name right?

### Back to Stopping

Let's review our counting code again and make some changes so we only count to 10:

{% highlight javascript %}
var continueCounting = function(n) {
  // when do we want to continue?
};
{% endhighlight %}


<aside>
The original version of the counting functions that we wrote was supposed to continue on
it's own <q>forever</q>, but it instead crashed. We hit a limitation of the current version
of JavaScript. This will be addressed in ES6, and if you'd like to learn more about this,
ask in a week or two and we can discuss it more.
</aside>

### Challenge

Update the functions above so that they can be used for any person.
Hint: All of the functions will need to take another argument.

{% highlight javascript %}
startCounting({ name: "Whitney" });
{% endhighlight %}

Bonus: Make it so 3 year olds can count to 10, 4 year olds to 20,
and everyone else to 100 (adults get bored and stop).


## Collections of Things (Arrays)

I like fruit. Who doesn't like fruit? It's good for you and delicious.
Let's say I need an application to keep track of my fruit purchasing.
I'd like to be able to ask it what I need to purchase, then when I
go to the grocery store, I'd like to be able to tell it that I purchased
everything.

Where do I store this collection of fruit? In something called an array.
You use brackets `[]` to create arrays. Here's a basic array:

{% highlight javascript %}
var fruits = ['apples', 'oranges', 'bananas'];
{% endhighlight %}

Ok, how do I access items in this array? You access them by _index_.
An array of three items, like the one above, will have 3 slots in which
it's holding values. The indexes for these slots are `0`, `1`, and `2`.
_What? Why not 1, 2, and 3?_ In most programming languages, counting
starts at zero. We just get have to deal with it.

To access a slot, you use the brackets as well:

{% highlight javascript %}
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
{% endhighlight %}

<aside>
**Confused by brackets?**

Like before with arrays, we're seeing the brackets used during the definition
of an array and when using an array. Again, it's brackets in both places, but
they have different meanings. In this case, one use means _define_ and the other
means _access_.
</aside>

#### Tinker with Arrays

- Create an array with more/fewer items
- What happens when you access something in a slot that doesn't exist?
- How to you change one of the items in the array?
- Figure out how many items are in an array using the _length_ property
- What happens when you `console.log` an array?
- What else can you try?

### Back to Fruit Shopping

So we have an array, now let's work with it.

<aside class="objective">
**Keeping Track of Fruit**
Create a function that will print out fruits needs purchasing. The fruits
will be stored in an array. Create another function that will print out that
the fruits have been purchased.
</aside>

The goal is basically to call `startIndicatingFruitThatNeedsPurchasing`
with our array and get a result of:

{% highlight text %}
I need to purchase apples.
I need to purchase oranges.
I need to purchase bananas.
{% endhighlight %}

Let's model this off of how we counted. We'll follow the same basic
steps to build up to a our function that is able to indicate
fruit that needs purchasing.

We'll do this first part together.

### Challenges

- Create a `startIndicatingFruitPurchased` function.
- Think about and discuss where things are being repeated in the code

[slowmojs]: http://toolness.github.io/slowmo-js/
[metajs]: http://int3.github.io/metajs/
