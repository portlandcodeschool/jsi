---
layout: notes
title: Fixing Issues
class: issues
date: 2014-09-11 00:00:00
---

## Class Flow

This will pretty much be an extension of the previous day. We'll discuss the
debugger and they'll fix the issues. They can go back and enhance their game if
they still have time.

One of the main issues with jumping into someone else's code is understanding
what they did. Especially when there are no comments. This is pretty much the
case with the library. The `components` code will probably be especially
difficult to understand as it was written somewhat cryptically.

Remember to keep everyone doing TDD. This library doesn't have TDD set up. That
means they'll have to set it up themselves. Don't accept pull requests that
don't have tests.

If we're ahead of schedule, we can move on to the next lesson.

## Debugger

Add `debugger;` to code, then `node debug` instead of `node` on the file.
Use `help` if you forget commands. The interface is pretty similar to most
debuggers. The only thing that tripped me up is that `list` is a function, so
call `list(5)` to see what's going on. Also, `backtrace` gave a weird function
name at times. You'll want to show the difference between `next` and `step`.
Step will go into Node JS code, so you'll want to explain that as well as how
`out` works.

This will be the first time we've talked about stack traces, so you'll probably
get questions about that.

You can use this code to show the debugger:

{% highlight javascript %}
var createPerson = function(firstName, lastName) {
  var person = {};
  person.firstName = firstName;
  person.lastName = lastName;
  return person;
};

var speakTo = function(person) {
  console.log('Saying hello to %s', person.firstName);
};

var sayGoodbyeTo = function(person) {
  console.log('Saying goodbye to %s', person.firstName);
};

var runExample = function() {
  var person = createPerson("Whitney", "Young");
  speakTo(person);
  sayGoodbyeTo(person);
};

runExample();
{% endhighlight %}
