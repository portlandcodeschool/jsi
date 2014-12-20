---
layout: post
title: Express
class: express
date: 2015-02-10
---

# Note: this page was written for a previous term, and probably doesn't reflect the actual class content for this day.

## DRY: Don't Repeat Yourself

Many developers feel that writing their own logic to handle some of the basics
for HTTP applications leads them to repeat a lot of code. Sometimes this
repetition is in a single app, sometimes it's just code they repeat across
multiple apps they build.

This inevitably leads to the creation of tools like [Express][expresss].

Let's quickly re-build some of what we did yesterday using Express to see
how it helps us out.


## Testing: Isolating Testable Components

By now, you've hopefully begun to appreciate how writing tests positively
affects your development process.

Another positive effect that TDD can have is _forcing_ us to write modular
code. In order to test specific components of larger applications in isolation,
we need to separate those components from one another. If they're not separate,
we can't test them in isolation.

This is an area where people take very different approaches. Sometimes you'll
find projects that have extensive test coverage on a very granular level. These
tests are usually called _unit_ tests as they're testing individual components.
The granularity and the extent to which the code base is _covered_ by those
tests can vary wildly, though. How small of a component do you care to test?
What advantages or disadvantages does that bring? These questions may not have
the same answers depending on the project, team, etc.

On the other side of things, we'd like to know that all of the individual
components that we've written actually work properly when they're put together.
These tests are usually called _integration tests_. Again, they'll vary a lot
depending on the situation. If you have an application that contains front-end
and back-end code, do you test those together? Do you write tests that actually
run in a browser simulating mouse clicks and keyboard typing? Do you test
individual pages or the path a user takes while using the application? Is it
sufficient to capture the result of multiple behaviors in a single test?

Let's take a look at how to test some pieces of an express application in
isolation and discuss the benefits and drawbacks. Here are some things we'd
like to be able to test in isolation:

- **Routing** At this point, it may seem silly, but an important part of your
  web application is handling requests for resources. Are we handling all of
  the edge cases properly? When we start adding new routes, do they interfere
  at all with other routes? It'd be nice to have tests that clearly define
  what resources are accessible.

- **Handlers** Testing the functions that each method calls in isolation will
  again allow us to focus our efforts on what those handlers actually do.
  We can concentrate specifically on the inputs that are required for each,
  handler, what data they return, and any side effects they may create in the
  system.

[The `jsi-express-testing-examples` project][github-jsi-express-testing]
explores this way of setting up your tests.


### Challenge

Finish implementing some of the pending tests in the
`jsi-express-testing-examples` project.


[expresss]: http://expressjs.com/
[github-jsi-express-testing]: https://github.com/portlandcodeschool/jsi-express-testing-examples
