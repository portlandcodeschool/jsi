---
layout: post
title: Inheritance
class: inheritance
date: 2015-01-26
---

What happens when one object is like another? How can we re-use the code that's
similar between the two objects?

## Extending Classes

Creating a class by _extending_ all of the functionality of another class is
called _inheritance_ or _subclassing_. So when and how do we do this?

Let's say we have a class `Fruit`. We want to create two new classes `Apple`
and `Banana`. We'd be able to do things like:

{% highlight javascript %}
var banana = new Banana();

// banana properties
banana.edible(); //=> true
banana.compostable(); //=> true
banana.genus(); //=> 'musa'
banana.epicarp(); //=> 'peel'
banana.mesocarp(); //=> 'inner peel'
banana.endocarp(); //=> 'yummy banana'
banana.calories(); //=> 105
banana.color(); //=> 'yellow'

// banana methods
banana.peel();

// apple properties
var apple = new Apple();
apple.edible(); //=> true
apple.compostable(); //=> true
apple.genus(); //=> 'malus'
apple.epicarp(); //=> 'skin'
apple.mesocarp(); //=> 'yummy apple'
apple.endocarp(); //=> 'core'
apple.calories(); //=> 95
apple.color(); //=> 'red' (yes, in this world, all apples are red)

// apple methods
apple.core();
apple.slice();
{% endhighlight %}

There's a lot of things that are common properties for each of these two
fruits. We shouldn't have to re-define functionality that's shared between the
two. So we'll _extend_ `Fruit` to create `Apple` and `Banana`.

Let's look at how this is done in a few other languages first:

{% highlight ruby %}
# ruby
class Fruit < Object
end
class Apple < Fruit
end
class Banana < Fruit
end
{% endhighlight %}

{% highlight python %}
# python
class Fruit(object):
  pass # no implementation (yet)
class Apple(Fruit):
  pass
class Banana(Fruit):
  pass
{% endhighlight %}

{% highlight c++ %}
// c++
class Fruit {
};
class Apple : Fruit {
};
class Banana : Fruit {
};
{% endhighlight %}

{% highlight java %}
// java
public class Fruit {
}
public class Apple extends Fruit {
}
public class Banana extends Fruit {
}
{% endhighlight %}

{% highlight objective-c %}
// objective-c
@interface Fruit : NSObject
@end
@interface Apple : Fruit
@end
@interface Banana : Fruit
@end
{% endhighlight %}

Now that we've seen how simple it is in other languages, let's look at JavaScript:

{% highlight javascript %}
function Fruit() {}

function Apple() {}
function ApplePrototype() {}
ApplePrototype.prototype = Fruit.prototype;
Apple.prototype = new ApplePrototype();
Apple.prototype.constructor = Apple;

function Banana() {}
function BananaPrototype() {}
BananaPrototype.prototype = Fruit.prototype;
Banana.prototype = new BananaPrototype();
Banana.prototype.constructor = Banana;
{% endhighlight %}

Don't even try to understand this. It's a mess!

This is the technically correct way to write objects that inherit from others
in JavaScript. Until recently, there wasn't even a built in shorthand for this.
Some people wrote their own abstraction, `Object.create`:

{% highlight javascript %}
// Object.create Polyfill (MDN has a better version of this)
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
{% endhighlight %}

Again, don't worry about understanding that code. `Object.create` is built in
to Node. This is just to give you history/background. You'll see class
extension done in various different ways in JS.

Using this abstraction, we can do better, but it's still not wonderful in
JavaScript:

{% highlight javascript %}
function Fruit() {}

function Apple() {}
Apple.prototype = Object.create(Fruit.prototype);
Apple.prototype.constructor = Apple;

function Banana() {}
Banana.prototype = Object.create(Fruit.prototype);
Banana.prototype.constructor = Banana;
{% endhighlight %}

## Challenge

* Implement the following constructors/methods:

  * `Fruit`
  * `Fruit.prototype.edible`
  * `Fruit.prototype.compostable`
  * `Fruit.prototype.genus`
  * `Fruit.prototype.epicarp`
  * `Fruit.prototype.mesocarp`
  * `Fruit.prototype.endocarp`
  * `Fruit.prototype.calories`
  * `Fruit.prototype.setCalories`
  * `Fruit.prototype.color`
  * `Fruit.prototype.setColor`
  * `Apple`
  * `Apple.prototype.core` &rarr; log `'The red apple is being cored'`
  * `Apple.prototype.slice` &rarr; log `'The red apple is being peeled'`
  * `Banana`
  * `Banana.prototype.peel` &rarr; log `'The yellow banana is being peeled'`

## Overriding Methods & Calling Super

Sometimes you may create a subclass, implement a method, but use methods
defined on the class your extending (also called the _superclass_ or
_parent class_).

For instance, perhaps there's a method you want to implement,
`Fruit.prototype.prepareForEating` so that any fruit can be prepared to be
eaten. For an apple, nothing needs to be done. But a banana needs to be peeled.

Let's take a look:

{% highlight javascript %}
Fruit.prototype.prepareForEating = function() {
  // nothing needs to be done by default to prepare fruit
  // to be eaten.
};

Banana.prototype.prepareForEating = function() {
  // we need to peel the banana now
};

var apple = new Apple();
apple.prepareForEating();

var banana = new Banana();
banana.prepareForEating();
{% endhighlight %}

The `prepareForEating` method on `Banana` _overrides_ the implementation of
`prepareForEating` on the _base class_, `Fruit`.

But eventually, we may come along and enhance what it means to prepare any
fruit for eating by altering the method on the base class.

{% highlight javascript %}
Fruit.prototype.prepareForEating = function() {
  var safe = true;
  if (this.isRotten()) { safe = false; }
  else if (this.hasMold()) { safe = false; }
  return safe;
};

var person = new Person();
var apple = new Apple();
if (apple.prepareForEating()) {
  person.eat(apple);
}

var banana = new Banana();
if (banana.prepareForEating()) {
  person.eat(banana);
}
{% endhighlight %}

This assumes that `Fruit.prototype.isRotten` and `Fruit.prototype.hasMold` are
methods that have been defined.

### Discussion

There are a few things wrong with this code now that we've extended the base
class implementation. What are these problems and how do we fix them? Don't
actually fix them just yet, but how would they be addressed? Work with the code
a little to try to understand what the problems are.

### Challenge

Model the classroom using object oriented design principles.

- Start with just a few objects.
- Can you use sub-classing for any of these objects?
- Try to figure out a method that would make sense for a subclass to override.
  Would you need to call super when you override those methods?


## Abuse of Inheritance

Let's say you have a class, `Page`. This class defines methods like:

* `Page.prototype.words()`
* `Page.prototype.margins()`
* `Page.prototype.font()`
* `Page.prototype.pageNumber()`

You now have a building block with which you can build some cool stuff.

So how about a newspaper article? We'll that's just a page, right?

{% highlight javascript %}
function Article() { Page.apply(this, arguments); }
Article.prototype = Object.create(Page.prototype);
Article.prototype.constructor = Article;
{% endhighlight %}

And a book is really just one really long page, right?

{% highlight javascript %}
function Book() { Page.apply(this, arguments); }
Book.prototype = Object.create(Page.prototype);
Book.prototype.constructor = Book;
{% endhighlight %}

_Wrong!_

Why is this wrong? Well because you're using the wrong tool for the job. Just
because you have a hammer does not make everything a nail.

### _Is a_ vs _has a_

A book certainly isn't just a page. It's a collection of many pages. It
_has many_ pages. You wouldn't go home and tell your mom that what you learned
in school today was that a book _is a_ page. You'd sound like a fool. But
a book does _have a_ page.

This is pretty simple, but the newspaper article gets a little more tricky.

A newspaper article could be a single page. It could span multiple pages. In
fact, it could be one of many articles on a page. When you really think about
it, though, it doesn't make sense for a page to _have an_ article. The page
object we already have is trying to represent a really basic bit of prose.
Perhaps it's a way of breaking up a long flow of text into multiple sections
based on how it fits within the confines of the margins. It's certainly not
representing complex newspaper layouts with articles, ads, etc.

Therefore, the following code better represents our article scenario:

{% highlight javascript %}
function Article() {
  this._pages = []; // an array of Page objects
}

function Layout() {
  this._articles = []; // an array of Article objects
  this._advertisements = []; // an array of Advertisement objects
  this._arrangment = {}; // something to represent arrangement of everything
}

function NewspaperPage() {
  this._layout; // a Layout object, how to lay out the page
  this._pageNumber; // page number
}
{% endhighlight %}

This example is slightly far-fetched. This is not _the right_ representation
of the relationship between these objects. There is no _right_ representation.
Depending on the application and how these objects will be used, you could come
up with hundreds of configurations.

It should help you understand, however, that there are cases in which
inheritance is not the right choice. Instead, you can build complex
relationships between objects by _composition_ as illustrated above.

Crafting the proper set of objects to represent objects in the real world can
quickly become complicated and confusing. Using objects to model abstract
processes and concepts is even more difficult. It's a skill you'll continue to
develop throughout your development career.


<aside>
**Object Oriented Design**

You'll hear this term a lot. Programmers use the term a lot. You need to know
it. Technically, its a design pattern that prescribes the use of objects to
model systems and create applications. In practice, it has many different
meanings. The nuance between the meaning will depend on the context and the
conversation.

Some people just mean defining an object here or there. Our `Person` example
would suffice. That was object oriented design.

Some people will use it and be talking about building complex applications
using object oriented principles and pushing those principles to the limits.
They'll potentially over-use inheritance and build classes with crazy names
that do funny things. They'll throw a bunch of other design patterns on top
&mdash; factories, abstract base classes, builders, bridges, adapters, etc.

This is not wrong. It's usually the language that dictates to what extent these
principles and patterns enter a programmers arsenal and vocabulary. Java and
C++ programmers tend to use these ideas far more heavily. The language
facilitates it, and the community embraces it. JavaScript doesn't need to rely
heavily on objects to get things done. Some frameworks use objects far more
than others, though. This is either to make them easier to use or to make them
more approachable.

Obviously, don't take this as gospel and repeat it everywhere. No one way of
approaching problems is right. JavaScript isn't better than C++. They're
different. Using object oriented principles to solve problems in JavaScript is
not wrong, it's just not required. Just solve the problem and write clear code.

Bottom line: you need to know about object oriented design, but the truth is,
you won't use it in JavaScript as much as you might think. And many programmers
over-use object oriented concepts (don't tell them that, though).
</aside>
