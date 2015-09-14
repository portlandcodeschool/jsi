---
layout: post
title: Testing in the Browser
class: client
date: 2015-09-04 00:00:00
---

We've written BDD-style tests in node, but sometimes we need to run tests in the browser as well.  Mocha can be run in your browser by including 6 ingredients in an HTML file:

1. The module you want to test
2. The mocha and chai libraries
3. An empty _div_ with an id of 'mocha' (to hold the test output)
4. A script which calls `mocha.setup('bdd')`
5. Any modules containing your tests
6. A script which calls `mocha.run()`

Below is an example HTML file for testing a module named `mycode.js` with a testing file called `mycode-test.js`.  You may need to adjust the path names depending on your directory structure.

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Browser tests</title>
  <!-- code/css to be tested: -->
  <script src="mycode.js"></script>
<!-- mocha+chai: -->
  <script src="../node_modules/mocha/mocha.js"></script>
  <script src="../node_modules/chai/chai.js"></script>
  <link rel="stylesheet" media="all" href="../node_modules/mocha/mocha.css">
</head>

<body>
<!-- partitions for output -->
  <div id="mocha"><p><a href=".">Index</a></p></div>
  <div id="other"></div>
<!-- set up mocha tests -->
<script>mocha.setup('bdd')</script>
<script src="test/mycode-test.js"></script>
<script>
  mocha.checkLeaks();
  mocha.run();
</script>
</body>
</html>
{% endhighlight %}

### Templates

GUI code often use pre-compiled templates to render repeated patterns of HTML.
Here's a basic demo of two different template formats:

{% highlight javascript %}
useMustacheTemplates(); //causes templates to use {{}} format

var data = {verb:'jump', subj:'cow', adj:'blue', obj:'moon'};

var ERBView = function() {
    this.$el = $('<div>');
    this.template = _.template('The <%=subj%> <%=verb%>s the <%=adj%> <%=obj%>');
    this.render = function() {
        this.$el.html(this.template(data)); // render some data-specific HTML
        $(document.body).append(this.$el);
    }
}


var MustacheView = function() {
    this.$el = $('<div>');
    this.template = _.template('The {{ "{{ subj " }}}} {{ "{{ verb " }}}}s the {{ "{{ adj " }}}} {{ "{{ obj " }}}}');
    this.render = function() {
        this.$el.html(this.template(data));
        $(document.body).append(this.$el);
    }
})

var erbView, mustView;
$(function() {
    erbView = new ERBView();
    mustView = new MustacheView();
})

function useMustacheTemplates() {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };
}
{% endhighlight %}

