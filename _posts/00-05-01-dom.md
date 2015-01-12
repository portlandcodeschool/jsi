---
layout: post
title: Front End
class: dom
date: 2015-02-02
---

# Note: this page was written for a previous term, and has been moved earlier in the course this term.

Today we're going start working with JavaScript in the browser, where it first
became popularized as a language.

We'll discuss:

* Including JavaScript on web pages
* Manipulating and reacting to events in the [DOM][mdn-dom]
* [Chrome Developer Tools][chrome-devtools]


## Accessing & Altering the DOM

Frequently used methods:

* [`document.createElement`][mdn-createElement]
* [`document.getElementById`][mdn-getElementById]
* [`document.getElementsByClassName`][mdn-getElementsByClassName]
* [`document.getElementsByTagName`][mdn-getElementsByTagName]
* [`document.body`][mdn-document.body]
* [`node.appendChild`][mdn-appendChild]
* [`node.insertBefore`][mdn-insertBefore]
* [`node.removeChild`][mdn-removeChild]
* [`node.replaceChild`][mdn-replaceChild]
* [`node.nextSibling`][mdn-nextSibling]
* [`node.parentNode`][mdn-parentNode]
* [`node.previousSibling`][mdn-previousSibling]
* [`node.childNodes`][mdn-childNodes]
* [`node.textContent`][mdn-textContent]
* [`element.getAttribute`][mdn-getAttribute]
* [`element.setAttribute`][mdn-setAttribute]


### Challenge

Using Chrome's developer tools to check your work, recreate the following HTML
structure via JavaScript:

{% highlight html %}
<html>
  <head>
    <title>My JavaScript Blog</title>
  </head>
  <body>
    <h1>My JavaScript Blog</h1>
    <article>
      <h1>My Second Blog Post</h1>
      <p>This is a blog post about really awesome stuff I've done in JavaScript.</p>
    </article>
    <article>
      <h1>My First Blog Post</h1>
      <p>This is the first blog post I've ever written.</p>
    </article>
  </body>
  <script type="text/javascript" src="script.js"></script>
</html>
{% endhighlight %}

Starting from:

{% highlight html %}
<html>
  <head>
  </head>
  <body>
    <h1>My JavaScript Blog</h1>
    <article>
      <p>This is the first blog post I've ever written.</p>
    </article>
  </body>
  <script type="text/javascript" src="script.js"></script>
</html>
{% endhighlight %}

## DOM Events

Let's actually do something when the user interacts with elements on the page.

You can observe events on DOM objects with
[`addEventListener`][mdn-addEventListener]. Here are common
[events][mdn-events] that we can handle:

* [`blur`][mdn-blur]
* [`change`][mdn-change]
* [`click`][mdn-click]
* [`dblclick`][mdn-dblclick]
* [`input`][mdn-input]
* [`keydown`][mdn-keydown]
* [`keypress`][mdn-keypress]
* [`keyup`][mdn-keyup]
* [`load`][mdn-load]
* [`mousedown`][mdn-mousedown]
* [`mouseenter`][mdn-mouseenter]
* [`mouseleave`][mdn-mouseleave]
* [`mousemove`][mdn-mousemove]
* [`mouseout`][mdn-mouseout]
* [`mouseover`][mdn-mouseover]
* [`mouseup`][mdn-mouseup]
* [`resize`][mdn-resize]
* [`scroll`][mdn-scroll]
* [`touchcancel`][mdn-touchcancel]
* [`touchend`][mdn-touchend]
* [`touchenter`][mdn-touchenter]
* [`touchleave`][mdn-touchleave]
* [`touchmove`][mdn-touchmove]
* [`touchstart`][mdn-touchstart]

### Challenge #1

Make it so that when you click an article title, it toggles the visibility of
the paragraphs within the article.

_Hint:_ Think about how you would normally change whether an item is visible or
not. Try to make your JavaScript replicate the changes you would normally make.


### Challenge #2

Keep the current functionality of clicking the article title. Make it so that
if you click anywhere else on the article, it highlights the entire article.
It shouldn't highlight the article when you click the title, though.


### Challenge #3

Create a page that accepts payments. It should accept and validate:

* Email address
* Credit card number
* Credit card expiration
* Name on card
* Card verification code
* City
* State

There should be a submit button. When the submit button is pressed, it should
validate each field and somehow inform the user that there are problems.

All of these fields are required. Some of them should only accept certain
values as input. How can you use JavaScript to make a really good user
experience here? Want to make it really pretty? Go for it!


## Script Location

Generally, you'll want to
[put your scripts at the bottom of the body][yahoo-performance-scripts]. When
you don't, you'll need to ensure you wait for the DOM to be ready. This is good
practice regardless, and it's easy with jQuery, but for reference, here's how
you could do it without jQuery (this won't work in all browsers).

{% highlight javascript %}
(function(ready) {
  var loaded = function() {
    document.removeEventListener("DOMContentLoaded", loaded, false);
    ready();
  };
  if (document.readyState === "complete") { setTimeout(ready); }
  else { document.addEventListener("DOMContentLoaded", loaded, false); }
})(function() {

  // insert your code here

});
{% endhighlight %}


[mdn-dom]: https://developer.mozilla.org/en-US/docs/DOM
[chrome-devtools]: https://developers.google.com/chrome-developer-tools/
[yahoo-performance-scripts]: https://developer.yahoo.com/performance/rules.html#js_bottom

[mdn-getElementById]: https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementById
[mdn-getElementsByClassName]: https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementsByClassName
[mdn-getElementsByTagName]: https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementsByTagName
[mdn-createElement]: https://developer.mozilla.org/en-US/docs/Web/API/Document.createElement
[mdn-document.body]: https://developer.mozilla.org/en-US/docs/Web/API/document.body
[mdn-appendChild]: https://developer.mozilla.org/en-US/docs/Web/API/Node.appendChild
[mdn-insertBefore]: https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore
[mdn-removeChild]: https://developer.mozilla.org/en-US/docs/Web/API/Node.removeChild
[mdn-replaceChild]: https://developer.mozilla.org/en-US/docs/Web/API/Node.replaceChild
[mdn-nextSibling]: https://developer.mozilla.org/en-US/docs/Web/API/Node.nextSibling
[mdn-parentNode]: https://developer.mozilla.org/en-US/docs/Web/API/Node.parentNode
[mdn-previousSibling]: https://developer.mozilla.org/en-US/docs/Web/API/Node.previousSibling
[mdn-childNodes]: https://developer.mozilla.org/en-US/docs/Web/API/Node.childNodes
[mdn-textContent]: https://developer.mozilla.org/en-US/docs/Web/API/Node.textContent
[mdn-getAttribute]: https://developer.mozilla.org/en-US/docs/Web/API/element.getAttribute
[mdn-setAttribute]: https://developer.mozilla.org/en-US/docs/Web/API/element.setAttribute

[mdn-events]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events
[mdn-addEventListener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener
[mdn-blur]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/blur
[mdn-change]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/change
[mdn-click]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/click
[mdn-dblclick]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/dblclick
[mdn-input]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/input
[mdn-keydown]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keydown
[mdn-keypress]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keypress
[mdn-keyup]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keyup
[mdn-load]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/load_(ProgressEvent)
[mdn-mousedown]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mousedown
[mdn-mouseenter]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mouseenter
[mdn-mouseleave]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mouseleave
[mdn-mousemove]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mousemove
[mdn-mouseout]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mouseout
[mdn-mouseover]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mouseover
[mdn-mouseup]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/mouseup
[mdn-resize]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/resize
[mdn-scroll]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/scroll
[mdn-touchcancel]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchcancel
[mdn-touchend]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchend
[mdn-touchenter]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchenter
[mdn-touchleave]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchleave
[mdn-touchmove]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchmove
[mdn-touchstart]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchstart
