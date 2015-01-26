---
layout: post
title: jQuery
class: jquery
date: 2015-02-03
---

# Note: this page was written for a previous term, and probably doesn't reflect the actual class content for this day.

## Some Thoughts

### The DOM is annoying

The code we wrote while learning about the DOM was kind of annoying.
Re-creating a few simple HTML items was kind of a pain. It was overly verbose.
There are already a few obvious places where we'd repeat ourselves if we kept
writing JavaScript this way.

### Compatibility

Who has been to a website that didn't work in some browser? It's less common
these days, but used to be a far larger issue. Especially if you weren't using
IE on Windows.

Why does this happen, and how to we prevent having the same issues ourselves
while building websites?


## Front End Libraries

Front end libraries attempt to address both of these problems. There are lots
of them. jQuery, Dojo, MooTools, Prototype, YUI, Ext, and Script.aculo.us are
some.

Many of these tools came out around the same time. Over time, jQuery emerged as
the dominant player in the space. Others are still active, some have fizzled
out. Most JS developers starting new projects will include jQuery without
blinking an eye.

We're starting to see the emergence of tools like AngularJS, Ember, and
Backbone.js. These are called frameworks, and we'll dive into one of them,
Ember, soon.

<aside>
**Library vs. Framework**

Generally, a library is a set of related functionality. It exposes many
functions or classes that you can use. Lo-Dash and Underscore.js were examples
of libraries as well.

We haven't seen frameworks just yet, but they're coming. They expose
functionality as well, but also define a certain structure and methodology for
creating applications.
</aside>

When you're using features directly from the browser, you can check for
[HTML/CSS][caniuse] and [JavaScript][es5-compat] compatibility
([another option][qm-compat]) quickly rather than having to test in each
browser. Once you've implemented the feature, though, you'll still need to test
in each browser.


## jQuery

Rather than explaining anything about jQuery, we're going to jump right into
challenges.

### Challenge &mdash; Finding Tutorials

When you first approach a new tool on your own, you're going to have to find
good tutorials.

How to find good tutorials:

* Ask a fellow programmer for recommendations
* Look on project site for official tutorials or links
* Search for them

What makes a good tutorial:

* Popularity
* Good writing / video
* Many code examples
* Clear explanations of basic concepts
* Moves on to more advanced topics as well

Find two good tutorials for learning jQuery. Be prepared to defend your reason
for choosing what you did.


### Challenge &mdash; Understanding jQuery

Learn enough jQuery to repeat the two intro DOM examples. Speed doesn't count
during this phase. Understanding counts.

When you start to have a handle on some of the basics, explore the
[API][jq-api]. Learn the organization of the API so you can quickly come back
and find a feature that you've used before. Look for something that seems
interesting that you'd like to learn more about or try. If it looks easy, give
it a shot. If it looks hard, store it away as something to come back to when
you gain a little more understanding.


### Challenge &mdash; Plugins & Payments

Revisit the credit card payment example. If you haven't done it yet, start from
scratch. If you have, update your code to use jQuery.

Use the [`jquery.payment`][stripe-payment] jQuery plugin to improve your form
validation.

<aside>
**Plugins**

Plugins are small pieces of code that can be appended to another code base to
extend its functionality. They're specific enough that they don't belong in the
main library.

Most jQuery plugins will leverage jQuery heavily. They'll usually expose their
functionality via a method you can call on jQuery itself or on a specific
jQuery object. So either `$.myPluginFunction()` or
`$('ul').myPluginFunction()`.
</aside>


### Challenge &mdash; Code Reading

Read the [code for the `jquery.payment`][stripe-payment-src] plugin. Choose one
small piece and try to figure out how it works.

Note, this is an advanced challenge. The point here is to expose yourself to
something new. You will not achieve 100% understanding. If you need help or
guidance, please ask.

If you want to go in a different direction, try getting the plugin to build and
run the test suite.


### Advanced Challenge &mdash; Date Formatting

Write a small jQuery plugin that allows dates to be displayed in the local
timezone and can also be formatted. Ensure this plugin would allow users to
support displaying dates when JavaScript is disabled as well.

{% highlight javascript %}
$('span.date').localizeDates('relative');
$('span.date').localizeDates('long');
$('span.date').localizeDates('short');
$('span.date').localizeDates({ weekday: 'long', minute: 'numeric', hour: 'numeric' });
$.localizeDates('long'); // handle all [data-timestamp] elements on the page
{% endhighlight %}

If the server was running in the eastern timezone, it may respond with this
HTML:

{% highlight html %}
<span class="date" data-timestamp="1399553615090">May 8th 08:53 AM</span>
{% endhighlight %}

A viewer on the west coast would want to see that it's 5:53AM. If it was
currently 6AM on the west coast, the `relative` option would show,
`7 minutes ago` rather than the date/time. You'll want to consider
[`Intl.DateTimeFormat`][mdn-dateTimeFormat] among other options.


[caniuse]: http://caniuse.com
[es5-compat]: http://kangax.github.io/es5-compat-table/
[qm-compat]: http://www.quirksmode.org/compatibility.html

[stripe-payment]: https://github.com/stripe/jquery.payment
[stripe-payment-src]: https://github.com/stripe/jquery.payment/blob/master/src/jquery.payment.coffee
[jq-api]: http://api.jquery.com
[mdn-dateTimeFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
[mdn-toLocaleString]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
