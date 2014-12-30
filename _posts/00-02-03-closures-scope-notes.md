---
layout: notes
title: Closures &amp; Scope Notes
class: closures+scope
date: 2014-09-12 00:00:00
---

## Class Flow

* This will probably be a short class
* Walk through scope questions, asking different people for answers to each
  question. Show the code for each question & answer.
* Discuss the advanced closure examples.
* If finished early, play some sudoku in preparation for next week

## Closures

Solution to counter:

{% highlight javascript %}
var counter = function() {
  var n = arguments[0] || 0;
  return function() {
    var result = n;
    n += 1;
    return result;
  };
};

var counter = function() {
  var n = arguments[0] || 0;
  return {
    next: function() {
      var result = n;
      n += 1;
      return result;
    },
    reset: function() {
      n = arguments[0] || 0;
    }
  };
};
{% endhighlight %}
