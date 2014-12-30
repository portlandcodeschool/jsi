---
layout: notes
title: Inheritance Notes
class: inheritance
date: 2014-09-22 01:00:00
---

## Class Flow

* Discuss types and how one thing is really just a more specific version of
  another. That's when you subclass.
* Show language examples.
* Show JS example.
* Show `Object.create`. Note that this is shown for historical reasons. Explain
  that the JS community came up with this, and now it's part of the language.
* Show final JS inheritance.
* Continue through challenge and additional sections.


## Challenge

During the challenge, the students will be left to try to discover the idea
that they can set `this._genus` (and others) in `Apple` or `Banana` and that
will be used by the `Fruit.prototype.genus`. They'll also have the same thing
for `color`, but that will be a default value instead of a static value.

This will be a huge jump for some, but I think some people may just do the
right thing without guidance. We'll see. If people are totally lost, walk
through this together.

## Overriding Methods & Calling Super

At the end of this section, we give the student an opportunity to try to
discover that there's a problem when overriding and not calling the super
call implementation.

They may not figure this out, but we can show how this is broken by walking
through the code.

The two things broken is that the base class implementation of
`prepareForEating` is not called for `Banana` objects. Also, the
`prepareForEating` method on `Banana` does not return `true` or `false` like
the base class does.

{% highlight javascript %}
Banana.prototype.prepareForEating = function() {
  return Fruit.prototype.prepareForEating.apply(this, arguments);
}
{% endhighlight %}

What if we like eating rotten bananas and we don't care about what the base
class says?

{% highlight javascript %}
Banana.prototype.prepareForEating = function() {
  this.peel();

  var safe = true;
  if (this.hasMold()) { safe = false; }
  return safe;
}
{% endhighlight %}

### Object Oriented Design Challenge

The challenge will be a bit of a stretch just because sometimes it's really
hard to fit things into this design paradigm. That's kind of the point of
this exercise. Encourage them, but if it's really hard, do it as a group.

After the challenge in that section, ask the students to identify how they
came up with what should be a method, what should be an object, and how to
name them. Point out that objects are (usually) nouns. Methods are (usually)
verbs.
