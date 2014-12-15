---
layout: post
title: Making Objects
class: oo
date: 2015-01-16
---

It's been a long time coming. We're ready to discuss objects in detail! Many
languages and courses discuss this very early in the course. JavaScript is a
bit different because how your interaction with objects thus actually provides
a lot of functionality without adding too much complexity and jargon. But now
it's time to dive in.

## Containers For Related Functionality

Remember how objects let us group things together? We made a person that had
a `firstName` and `lastName`. Well this got us pretty far, but let's take
things a little further, try to build something a little bigger.

Let's pretend that we're building an application that models a tennis practice.
What's that involve? A bunch of objects!

- People
- Court
- Tennis Balls
- Tennis Raquets
- Ball basket
- Ball machine

That list could probably go on forever. We're going to explore the person and
the ball machine.

{% highlight javascript %}
var person = {
  name: 'Whitney',
  age: 11
};
var ballMachine = {
  capacity: 100,
  speed: {
    max: 80,
    min: 20
  },
  delay: {
    max: 60,
    min: 1
  }
};
{% endhighlight %}

Please don't run that ball machine shooting balls at 80mph every second!

Now let's start a drill. We'll need to run the ball machine, and the person
will have to try to hit the ball back by running over to wherever it lands and
hitting it.

Ok, that shouldn't be so hard to model:

{% highlight javascript %}
/**
 * Run a ball machine.
 * @param {object} ballMachine - The ball machine to run.
 * @param {object} settings - Settings on which to run. You can include
 * `speed` and `delay` which must be within the thresholds of the
 * machine.
 * @param {function} cb - Called when each ball is fired.
 */
var run = function(ballMachine, settings, cb) {
  // implementation eventually does something like
  cb({ speed: 40, direction: '5deg' });
};
{% endhighlight %}

Now we just need to be able to make the person run to hit the ball:

{% highlight javascript %}
/**
 * Make a person run to a location.
 * @param {object} person - The person to make run.
 * @param {object} location - Where you want the person to run.
 * @param {function} cb - Called when the person arrives at the location.
 */
var run = function(person, location, cb) {
  // implementation eventually does something like
  cb({ location: location });
}
{% endhighlight %}

Well, we can't have two functions named `run`. So we have to make things more
verbose. Let's call them `runBallMachine` and `personRun`. Or we could just
rename them entirely. We could `start` the ball machine and still have the
person `run`. But then what if we eventually had a lesson that we wanted to
`start`? What if instead we could just associate the functions with the
objects that they represent? A person can `run` and a ball machine can `run`
too!

## Objects

We're going to break things up now, so that we can group functions together in
and use them with objects the same way that we did before with properties. This
grouping that we're doing is actually a _separation of concerns_.

Here's what we want:

{% highlight javascript %}
ballMachine.run(function(info) {
  var speed = info.speed;
  var direction = info.direction;

  var location;
  // figure out where the person needs to go based
  // on the current location of the person and the
  // expected final destination of the ball that
  // was just fired.

  person.run(location)
});
{% endhighlight %}

This should look familiar. We've done this already with `array.forEach`,
`array.map`, `string.toUpperCase`, `string.toLowerCase`, `date.getYear`, etc.

Now we're going to learn how to make that work for our own objects.

### Creating Objects

Remember how we created a date?

{% highlight javascript %}
var date = new Date();
{% endhighlight %}

That was different from arrays, strings, and other objects. We did those like
so:

{% highlight javascript %}
var array = [];
var string = "";
var object = {};
{% endhighlight %}

But guess what? You can create each of those through the use of `new` as well.

{% highlight javascript %}
var array = new Array();
var string = new String();
var object = new Object();
{% endhighlight %}

So how can we make our own type that works with `new`?

{% highlight javascript %}
var person = new Person();
{% endhighlight %}

The answer is surprisingly simple (and mind-bendingly confusing). It's a function.

{% highlight javascript %}
var Person = function() {
};
var person = new Person();
{% endhighlight %}

At this point, this just looks like a weird way of calling a function. There's
more going on behind the scenes, though. We'll get to that soon.

#### Quick Status Check

* Update `Person` to accept `firstName` and `lastName` as arguments
* Pass those arguments when you create the object for `person`

### Jargon

So now we have `Person` and `person`. They're both logical names, but we don't
have a language to discuss them distinctly.

`Person` is a _class_. Classes are the foundation of _object oriented
programming_. `person` is an _instance_. When we create an _instance_ of a
class, that's called _instantiation_. When you instantiate an object, its
_constructor_ is called. The constructor in this case is the `Person` function.
As we'll see _classes_ will give us a dedicated area in which we can add
procedures that are specific to that kind of object.

We're going to start using this jargon right away. You'll likely forget some of
these terms since your brain has been working so hard. Feel free to interrupt
and ask to clarify when the jargon is keeping you from understanding.

<aside>
**Case Convention**

You'll notice that all classes use names that start with an uppercase letter.
This is not required, but this convention helps us quickly distinguish between
names that represent classes and instances.
</aside>

### Adding Methods

We'll now extend our `Person` class so that instances can call `run`.

{% highlight javascript %}
Person.prototype.run = function() {
  console.log('I can run!');
};
var person = new Person();
person.run();
{% endhighlight %}

What? `prototype`? What's that? Simplest answer: just go with it for right now.
Accept it and don't let your brain tell you that it needs to know. Just know
that now your instance can now call the `run` method.

If you need a better way to think about it:

<section class="conceptual-code">

{% highlight javascript %}
Person.instanceMethods.run = function() {
  console.log('I can run!');
};
{% endhighlight %}

</section>


<aside>
**Prototype**

Seriously, don't worry about it right now. If you really need to know, come
back to this blurb in the future.

When you're ready for it, what you'll want to research is prototypal
inheritance. Don't start looking into it until you've really mastered
inheritance. I'm talking like 3 months down the line.

The reason this can be so confusing is because JavaScript doesn't easily expose
the same paradigm that most developers have come to know very well, object
oriented design. It's possible to create an object oriented system with
JavaScript, though. So it's really just confusing because we're making
JavaScript do something that's not convenient in the language. When you combine
that with the history of poor documentation on JavaScript, things get ugly.

If you read all the way through this and are still curious, you're an adult.
Make an informed choice. We'll always be here to answer questions! :)
</aside>

### Functions vs Methods

Up until now, you may have noticed both the use of function and method. We've
completely skipped over the distinction until now.

Methods are functions that are defined on objects. Functions are functions.
This distinction allows us to easily understand when you need to write
`obj.something()` vs `something()`.

We've only been writing functions up until now. We've been using methods (like
the ones discussed in [the objects section](#objects)). Now we'll be defining
methods as well.


### Data

Right now our people can't do anything. They don't even have names. We need
to associate data with them. Before, we did that via properties. And we will
again.

{% highlight javascript %}
var person = new Person();
person.firstName = "Whitney";
person.lastName = "Young";
console.log('%s %s', person.firstName, person.lastName);
{% endhighlight %}

That still works just fine. But what if you want to set the first and last name
in the constructor?

<section class="conceptual-code">
{% highlight javascript %}
var Person = function(firstName, lastName) {
  person.firstName = "Whitney";
  person.lastName = "Young";
};
{% endhighlight %}
</section>

In the code above, `person` is not defined. We need a way of accessing the
_current instance_ that's being worked with. Whenever you create an object or
call a method on it, the code is being invoke on behalf of that object. So that
code has every right to know which object that is.

We use the keyword `this` to refer to the object on which the method is
invoked.

#### Status Check

- Fix the code above.
- Create a new person.
- Log the person's first and last name.
- Add a `fullName` method and log that.


### Encapsulation

Sometimes we want properties to be accessible by people who use instances of
our classes. Sometimes we don't. Usually we don't. Protecting the properties
so that people using the class can't access them is called _encapsulation_.

This is often done to make later alterations to a class easier. For instance,
image the following:

{% highlight javascript %}
var Person = function(name) {
  this.name = name;
};
var person = new Person("Whitney Young");
console.log(person.name);
person.name = "Whit Young";
console.log(person.name);
{% endhighlight %}

If someone later decides that they want to allow first and last names, they
may change the code:

{% highlight javascript %}
var Person = function(firstName, lastName) {
  // we used to accept just one argument, name, so
  // be backwards compatible with that.
  if (arguments.length === 1) {
    var names = arguments[0].split(' ');
    firstName = names[0];
    lastName = names[1];
  }
  this.firstName = firstName;
  this.lastName = lastName;
  this.name = [firstName, lastName].join(' ');
};
var person = new Person("Whitney Young");
console.log(person.name);
console.log(person.firstName);
console.log(person.lastName);
person.name = "Whit Young";
console.log(person.name);
console.log(person.firstName);
console.log(person.lastName);
{% endhighlight %}

Allowing someone to access these properties manually caused our name property
to end up in a bad state.

If we had instead started with:

{% highlight javascript %}
var Person = function(name) {
  this._name = name;
};
Person.prototype.name = function() {
  return this._name;
}
Person.prototype.setName = function(name) {
  this._name = name;
}
var person = new Person("Whitney Young");
console.log(person.name());
person.setName("Whit Young");
console.log(person.name());
{% endhighlight %}

We can add first and last names without consequence:

{% highlight javascript %}
var Person = function(firstName, lastName) {
  // we used to accept just one argument, name, so
  // be backwards compatible with that.
  if (arguments.length === 1) {
    this.setName(arguments[0]);
  }
  else {
    this._firstName = firstName;
    this._lastName = lastName;
    this._name = [firstName, lastName].join(' ');
  }
};
Person.prototype.name = function() {
  return this._name;
}
Person.prototype.setName = function(name) {
  var names = name.split(' ');
  this._firstName = names[0];
  this._lastName = names[1];
  this._name = name;
}
Person.prototype.firstName = function() {
  return this._firstName;
}
Person.prototype.setFirstName = function(firstName) {
  this._firstName = firstName;
  this._name = [this._firstName, this._lastName].join(' ');
}
Person.prototype.lastName = function() {
  return this._lastName;
}
Person.prototype.setLastName = function(lastName) {
  this._lastName = lastName;
  this._name = [this._firstName, this._lastName].join(' ');
}
var person = new Person("Whitney Young");
console.log(person.name());
console.log(person.firstName());
console.log(person.lastName());
person.setName("Whit Young");
console.log(person.name());
console.log(person.firstName());
console.log(person.lastName());
{% endhighlight %}

In general, it's better to add _getter_ and _setter_ methods than to allow
access to private data.

<aside>
**Private Data Convention**

There is no formal way in JavaScript to protect the data of an object (that
statement is only partially true). Therefore, we use an underscore before the
property name to indicate to all other programmers that they shouldn't access
it.

In fact, JavaScript can fully encapsulate data via closures. It just can't do
so for the properties of an object.
</aside>
