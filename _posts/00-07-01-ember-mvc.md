---
layout: post
title: Ember &amp; MVC
class: ember+mvc
date: 2015-02-17
---

[Ember][ember] is a front-end JavaScript framework for building web
applications. They describe it as:

> A framework for creating ambitious web applications.

We'll briefly touch on some of the terminology & foundational concepts used to
architect Ember, and then we'll move right into learning it.

## Model View Controller (MVC)

![MVC][mvc] MVC is a very popular architecture pattern used by many frameworks to separate
concerns in the application.

Typically, you'll see MVC based frameworks conform to these ideas:

- **Models** are objects, pure and simple. Most of the time they're able to be
  persisted in some way, for instance to a database.

- **Views** are what the user sees. In desktop applications, views contain the
  necessary code to draw to the screen. In web applications, views are
  typically chunks of HTML. Views use a given model (or collection of models)
  to present information to the user.

- **Controllers** accept requests from the user and typically contain
  application specific logic. They access and manipulate models on behalf of
  the user, and are also typically responsible for the creation of views and
  will sometimes manipulate a view's appearance. They will frequently simply
  provide a model which the view will then use to determine what data to
  display.


Additionally, many interactive MVC frameworks provide _data binding_ and
_observation_ of changes to models. This means that when a controller changes
a property on a model, it doesn't need to notify the view of the change. The
view will simply observe that the change happened, and update what it's
displaying. Likewise, when a user makes a change to the data presented within
a view, the view will automatically change the property stored in the model.

## Ember

Remember how naming is really important? Ember has everything all mixed up!

In reality, Embers names make complete sense. They don't really tout themselves
as an MVC framework, but in many ways they are. Just remember as you move
around in the future that the names you learn here may be used differently
elsewhere. This isn't unique to Ember. You'll see <q>true</q> MVC frameworks
just as frequently as those that use slightly different names.

Ember has the following, and only _models_ means the same as typical MVC:

- Models
- Templates
- Routes
- Controllers
- Components
- Views


## One Big Challenge

Over the next week and a half, your challenge is to learn Ember.

No one should work alone at this.

Before getting started, let's discuss a bit about the learning experiences
we've been through so far:

- Discuss methodologies that have worked well from the previous materials we've
  covered.
- Discuss methodologies that have not worked well in learning new concepts.
- When did you learn the fastest?
- When did you learn the slowest?

As you begin to tackle this large task, here are a few suggestions:

- Create a roadmap, plan, and goals.
- Ensure that everyone in your group is on the same page before moving on to
  the next step.
- You can use any resource you want to further your understanding. Nothing is
  off-limits.
- Ask other groups for help if you think they've encountered similar problems.
  Try trading team members for a quick knowledge-swap to speed things along.
- You are limited to the week and a half time frame. You must be able to build
  applications using Ember at the end of this time period.


We will have regular breaks each day to discuss what we've been trying and what
their next steps will be. During this time, you should present what you've
learned, what's currently challenging you, and what you're next goals are.


[ember]: http://emberjs.com
[mvc]: http://upload.wikimedia.org/wikipedia/commons/a/a0/MVC-Process.svg
