---
layout: post
title: Express Generator, Templating, and Cookies 
class: servers
date: 2015-09-15 00:00:00
---

Yesterday, we looked at the client/server model in general and how it works. We then moved on to Express, and started working with a super-simple Express site as a basis for a project. As we got more and more involved with the project, we started to see that more functionality would be useful, so we started to learn about how middleware can help us with our projects. Middleware is really useful, but it's a little frustrating to have to install it in bits and pieces and get it all configured properly. It would also be nice if we could get the whole directory structure we need set up all at once. Unsurprisingly, others have had this same thought, which is why we have:

##Express Generator

To get started with Express Generator, you'll need to install it. Since this is a module we want access to everywhere in our system, rather than just in a single project, you'll install it with `npm install -g express-generator`. Once it's installed, you have access to a new terminal command: `express`. To use it, simply navigate to any directory in your terminal. We'll be using a few optional flags rather than just the default setup, so to create a new app called myApp, you would use `express myApp --hbs --git`. The basic command will set up the directory structure for your new server, including a package.json file with a list of commonly used middleware, a `public` directory, and an `app.js` file. The optional switches that we use create a .gitignore file and set the default template engine to be Handlebars (rather than Jade). All of this will happen inside a new subdirectory called (in this case) myApp that Express Generator creates inside the current directory--so don't make an empty directory and then run Express Generator in there, or you'll be two directories deep!

The first thing you'll have to do to get started with your shiny new app is to cd into the directory and then `npm install`, which will start installing the half-dozen or so modules that the folks who built Express Generator think are too good to code without. We'll walk through the differences in class between the basic Express file you were using yesterday and the file created by Express Generator.

<!---
Package.json:
- adds new start script
- adds new dependencies

bin/www:
- the basement. Starts a server with Node's http module, sets up some nicer error messages, requires app.js

app.js:
- lots of shiny middleware
- sets up views directory for handlebars
- turns on cookie parsing, body parsing, nicer logging
- sets up two different route handlers: index.js and users.js. The former is for standard routing, with router.get (or whatever). The latter can be used the same way, but treats as its root the `/users` subdir. Presumably this lets you keep all your user handling in one place; not really sure why it matters.
- sets up a route to capture anything unhandled by anything else and makes it throw a 404 error.
- sets up error reporting (can look at app.settings to see `env` and some other stuff)

public:
- a stylesheet! Also, some directories

routes:
- two route files, one for each handler in app.js

views:
- handlebar goodness
-->

##Handlebars templating

Yesterday, we went over how to send plain text responses with `res.send` and how to send static HTML documents with `res.sendfile`. Those might have been good enough for the Web of the late 90s, but it's not good enough for today. For really dynamic sites, we need the server to be able to easily generate completely different pages based on a few variables--and that's exactly what templating does.

There are many different kinds of templating available. We've seen the client-side templating that comes built in to lodash: it uses some <%= crazy %> escape characters to indicate variables that can get swapped out, MadLibs fashion. We also saw how we can set up different delimiters for templating to make things more readable (and easier to type), and as a prelude to today we did that in Handlebars style: \{\{ like this! \}\}. We'll carry on with that today.

Some templating languages, like Jade, have a completely different syntax that the server will turn into HTML. Jade in particular is notorious for its semantic whitespace, which means that a single wrong indent can break your page, and for being generally finicky. Handlebars has a much more low-key feel. Files are saved as .hbs files, but they look pretty much like .html files--in fact, the only difference is that they have variables enclosed in \{\{markers\}\} throughout. So you might have a line of code that looks like:

```html
<h3 class="welcome">Hello, \{\{username\}\}!</h3>
```

It's uncomplicated and readable. It's worth noting that Handlebars will escape out any special characters that appear in your variables: if you have `var title = "Jonathan Strange & Mr. Norrell"` and a template of `<li>\{\{title\}\}</li>`, that would show up in the HTML as `<li>Jonathan Strange &amp; Mr. Norrell</li>`, exactly as you would want it. If you need characters to be unescaped, you can use triple curlies in the template, like so: `<body>\{\{\{page_template\}\}\}</body>`. This would allow you to have a separate page template passed in as a variable to the Handlebars template.

That tells us how to define where the variables go in the template, but how do we use the templates, and how do we give them variables? Using templates with our generated app is straightforward--it's just like sending an HTML file, but instead of using `res.sendfile`, we use `res.render` (because we're rendering a template. We need to tell Express which template to use, and give it an object containing the names and values of all the variables we want to use, and that's it. Here's an example from the index.js file:

```js
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```

Handlebars has still more tricks to make our lives easier. It's a fairly common thing to put lists of things on a site, and those things may well be items that you have stored in a database or some other sort of logical structure on your server. Rather than having to make a blank template entry for each item in your collection, you can simply use `each` in your template. For example, given a route that renders a template called knots by passing in an object like this:

```js
router.get('/knots', function(req, res, next) {
  res.render('knots', {knots: [
    {name: "sheepshank", image_url: "images/sheep.png"},
    {name: "round turn and two half-hitches", image_url: "images/rtt.jpg"},
    {name: "flying bowline", image_url: "showoff.gif"}
  ]});
});
```

you could set up that template like so:

```html
<div id="knot_gallery">
  \{\{#each knots\}\}
  <div class="knot">
    <img src="\{\{image_url\}\}" alt="\{\{name\}\}" />
    <p class="caption">\{\{name\}\}</p>
  </div>
  \{\{/each\}\}
</div>
```

There are plenty of other cool things you can do with Handlebars; that covers the basics. Feel free to play around with it more! [The docs](http://handlebarsjs.com/) are well worth a read.

##C is for Cookie!

Great, so we've grabbed onto some information the client passed along to the server. But now what do we do with it? And for that matter, how can we log people in at all, when all we can do is give people the html pages they ask for?

Well, there are a lot of answers to that question; like most things in JavaScript, there are a number of different ways to do things. But one of the easiest ways to deal with users is to set cookies. Cookies are bits of information that go in the header and get passed back and forth between the client and the server to keep track of bits of information, like how you got to a page, whether you're logged in, or what color socks you like to buy at Amazon. In order to make use of cookies on the server, you'll be using the cookieParser middleware that the Express Generator so thoughtfully installed. It allows you to set and remove cookies on the client from the server inside of routes, by accessing the response object:

```js
res.cookie('name', 'shackleton');
```

You can include a similar cookie inside any route you already have, as long as it takes place before the `res.render` (or other response-ending method). Once you've done that, open up Chrome's developer tools and go to the Resources tab. There's a section there for cookies, and you should see your new cookie listed. Once you start building a lot of projects, you'll probably build up quite a collection of cookies set from `localhost`; every time I remember to go back and clear them out, I seem to have a half dozen more or so.

In addition to setting cookies, you can check to see if there are cookies on the client. As you might have guessed, the format for that is `req.cookies`. Now that you have a cookie on your browser, you can modify a route (the same or a different one, it doesn't matter) with a simple `console.log(req.cookies);`. When you restart the server and go to the appropriate route, you should see your cookie logged out in the terminal.

You can also get and set cookies in the browser. It's not a lot of fun with vanilla JavaScript; fortunately, other people have wanted to do this in the past, and have made our collective lives easier.  One tidy little module that helps out quite a bit is called [js-cookie](https://github.com/js-cookie/js-cookie). You'll have to actually download it yourself and put it in your public directory, then put a link to the file in the appropriate section of your handlebars templates. Both js-cookie and cookie-parser have a lot of extra options for monkeying around with cookies (including setting cookies that will automaticaly expire after a while, so you don't need to keep clearing them out), but getting, setting, and deleting cookies will be the lion's share of what you need. Feel free to read the documentation if anything else strikes your fancy!

##Final Spec for the Microblog

- it should allow a user to log in at /login
  - if a user goes to / without being logged in, redirect them to /login
- redirect logged in users from /login to /
- set a cookie for a logged-in user in order to keep them logged in
- allow a user to make posts, without reloading the page
- display to a logged in user the list of all posts made by all users
- give a logged-in user the ability to log out and redirect them to the log-in page
- do not allow a non-logged-in user to see posts
- for each user, a logged-in user should have the ability to visit /user/NAME and see the list of all posts made by that user
- a logged-in user should have the ability to delete their own posts
- the main page should refresh periodically and display new posts

If you are done with those basic tasks, then some possible other additions to your website are:

- adding user profiles
  - the user profile should be editable only by the logged-in user
  - the user profile should be displayed along with the list of their posts
- implementing notifications and @s
  - add the ability to @ another user of the system
  - add a set of notifications for each user that displays all the messages that they’ve had @’ed at them
- implementing “repost”
  - to each post a user should see a button to repost
  - when a user clicks the button then a new post is made in the format
    - RP> original-user: original-text
    - the new post is, as usual, attached to their name
- make it not ugly
  - while you can make a prototype that uses no css or pretty formatting at all, this isn’t ideal; practice your design skills on your project

The basic structure of this project is that you will need to:

- modify the file routes/index.js to provide all the routes you need
  - to start with, try adding them one at a time and building the views as you go
  - there will be some logic that you need to use within the routes, such as checking to see if a user is logged in
- adding a set of views to views/, one for each page that the user will see
  - these views will also need to pass along javascript code for doing
    - event handling
    - cookie manipulation
    - ajax calls
- download several helpful Javascript libraries into public/javascripts/
  - [jQuery](http://code.jquery.com/jquery-2.1.4.min.js)
  - [js-cookie](https://github.com/js-cookie/js-cookie)
- initialize data for the application into app.js using app.locals.PROPERTY
  - you can access this in any route handlers using req.app.locals.PROPERTY
