---
layout: post
title: Express And Jade
class: express
date: 2015-01-21
---

Yesterday we used JavaScript on the page to create a blog post. That's kinda sideways, though. More commonly, you'll have your server create a page with the content already in it, and serve that page to the user. Today we'll learn about using the Express.js framework and the Jade templating language to do that.

<aside>
**Watch out!**

Starting today we'll be working with some JavaScript that runs on the page and some that runs in the server. You'll need to keep an eye on which context you're working in. Make sure you don't try to write browser interactions in server-side JS, or server interactions in browser-side JS!
</aside>

Express is a _framework_ for serving webpages. It provides functions for routing (associating URLs with pages), rendering (turning templates into HTML), and error handling.

Jade is a _templating language_ for HTML. Writing raw HTML is tedious and time-consuming, so there are various templating languages that make various aspects of it easier. Jade has _significant whitespace_, which means that the level to which you indent something is meaningful. So in Jade, this:

{%highlight jade%}
.highlight
    Jade is a templating engine.
    It has significant whitespace.
{%endhighlight%}

is different from this:

{%highlight jade%}
.highlight
    Jade is a templating engine.
It has significant whitespace.
{%endhighlight%}

The first example creates a `div` with class `highlight` and puts the two lines of text in it. In the second example, the second line of text is outside the `div`.

This is similar to the type of indentation we try to do in JavaScript anyway:

{%highlight javascript%}
function foo() {
    if (bar) {
        baz();
    } else {
        quux();
    }
}
{%endhighlight%}

The difference is that in JavaScript, the indentation is a guideline to help people reading the code, whereas in Jade it's meaningful to the software that interprets your template.

### Exercise

Update `views/index.jade` so that it includes a couple of blog posts. Visit [localhost:3000](http://localhost:3000) and see if your posts look right.

## Includes

Having a page with all your posts jammed into it is ok as a starting place, but for a grown-up blog we probably want to be able to link to individual posts. One way to do that would be to copy all your posts into the index and an individual page, but that would get old fast. A better option is to use _includes_, which pull one template into another.

## Routes

_Routing_ is how Express gets from a path, like `/posts/my-first-blog-post`, to a `view function`, which eventually returns a response. If you check out `routes/index.js`, you'll see a call to `router.get`:

{%highlight javascript%}
router.get('/', function(request, response) {
  response.render('index', { title: 'My Blog!' });
});
{%endhighlight%}

The `get` function takes a path (here `/`) and a callback. The callback will be called when that path is requested; it should return a rendered page. In this case it renders the `index` template.

### Exercise

Create a route and a view for each of your blog posts. Update the index route so that it includes each post's template, and make the posts' titles link to the individual posts.

## Variables in Templates and Routes

So, our templates have cleaned things up somewhat, but it's still pretty painful to make a new post. You have to write a template that contains the post, make a route for that post, and include the post in the index. What if there were another way?

### Another way

You can put variables in the paths to your routes. This allows us to make a single route that handles any valid post:

{%highlight javascript%}
var posts = require('./posts');

router.param('post_name', function(request, response, next, post_name){
    //note: we'll define posts.find in a minute
    posts.find(post_name, function(post) {
        if(post) {
            request.post = post;
            next();
        } else {
            return next(new Error('no such post as ' + post_name + '!'))
        }
    });
});
router.get('/post/:post_name', function(request, response) {
    response.render('post', {post: request.post});
});
{%endhighlight%}

Now it's possible to make a single `post.jade` view that shows your rendered post:

{%highlight jade%}
extends layout

block content
    article
        != post
{%endhighlight%}

Finally, we need to define a function for finding posts:

{%highlight javascript%}
// posts.js
var fs = require('fs');
var jade = require('jade');

var find = function(post_name, cb) {
    fs.readdir('./posts/', function(err, files) {
        if (files.indexOf(post_name + '.jade') !== -1) {
            fs.readFile('./posts/' + post_name + '.jade', function(err, data) {
                cb(jade.compile(data));
            })
        } else {
            cb(null);
        }
    })
}

module.exports.find = find;
{%endhighlight%}

### Exercise

* Add the posts.js file above
* Update your blog so that each post has its own url.
* Update your index page so it finds all the posts and displays them.
