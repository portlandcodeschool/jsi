---
layout: post
title: RESTful APIs and Servers
class: servers
date: 2015-09-14 00:00:00
---

#Recap of the Treehouse project

<!---
Last week, we started exploring the world of APIs, using first vanilla JavaScript and `new XMLHttpRequest` and then jQuery's `$.ajax` and `$.get` methods to get data from Somewhere Else with AJAX requests. We used all of these methods without really talking too much about what was going on under the hood, and worked with a pretty simple API that would give you the information you asked for, but not a lot more. Today, we'll work on expanding that understanding to enable us to work with all kinds of remote data with RESTful APIs, which will allow us to change and delete information in addition to just requesting it. We'll also learn more about the division between the client and the server, and start looking into how to create servers of our own.
-->

Last week, we got our first glimpse of clients and servers working together with the Treehouse API. We saw how we could use first vanilla JavaScript (with `new XMLHttpRequest`) and then jQuery (with the `$.ajax` and `$.get` methods) to send requests from the browser to a computer Somewhere Else and get a meaningful resonse. For the rest of this week, we'll be building on these techniques to enable more complex interactions between computers, both with more sophisticated API requests and with servers of our own that can respond to browsers and to API requests from other clients.

#Project of the Week: Twitter!

Well, not really. Not completely, anyway. You will be building a microblog service--somewhere that people can post messages for other people to read. The messages will be stored on your server--we'll go over databases in a couple of weeks; feel free to revisit this project then with upgrades in mind!. You'll be using jQuery and/or vanilla JavaScript on the client to make your site dynamic, and an Express server (more on those later) to drive the whole thing. If this seems a little light on details, never fear: tomorrow you'll get the full specification for the project.

#The Client/Server model

Most of our online life today happens in the client/server model: One computer provides resources to a number of others. The computer providing the resources is the server; the computers requesting them are the clients. There are other models--peer-to-peer, for example, but client/server is the dominant one today, and it's the one we'll be looking at.

##Netcat

The best way to understand clients and servers is to play around with them, so the first thing we'll look at today is a tool called <i>netcat</i>. This allows you to do a number of things, among them create an incredibly simple server. We'll do that now with:

{%highlight bash%}
  nc -l 9000
{%endhighlight%}

The `9000` in there is the <b>port</b> that the server is responding to. Ports do not refer to actual hardware plugs; they're a purely logical construct--a way for the server to organize and keep track of multiple kinds of requests. The standard port for HTTP requests is port 80. Some other ports have different defaults, but there are plenty left unclaimed--they are numbered up to 65535. The rest of the command simply tells your computer to start listening (the `-l`) for a connection.

In order to connect to your new server, you'll have to open your web browser and point it to your computer at port 9000 by entering `localhost:9000` into your address bar. When you do that, you should see a bunch of information about the connection come up in your terminal. At this point, the browser will wait for a response for a whlie, and eventually time out. Before that happens, we can give the browser some data. Try entering in some HTML to see what happens. When you're done, you can use control-d (not command-d) to tell the client you're all done sending information.

<aside>
**HTTP Keep-Alive**

Run `nc -kl 9000`, which keeps netcat running after sending a response. Play around with sending responses to your browser this way.

HTTP Keep-Alive allows a browser to keep a connection to a server and issue multiple HTTP requests over one TCP connection. This optimization improves performance.
</aside>

A proper response is specifically formatted. This is what node's `http` module does when you create a server. Let's give a proper response now. You could type this in manually, but we'll do it a little differently to avoid quite as much copying and pasting.

Create a new directory to work in, and `cd` to it. Create a file called `index.html` with some HTML in it. Also create a file, `index.headers` with the following content (make sure you have two blank lines at the bottom of your file):

```
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
```

Now run `cat index.headers index.html` and make sure there's at least one blank line between your headers and your HTML. Once you've got that, run `cat index.headers index.html | nc -l 9000` and access your page in the browser.

Use Chrome's developer tools to view the HTTP response headers by navigating to the Network tab--you may have to reload the page while you have the network tab open to see them. Try adding a custom HTTP header to `index.headers`. What happens if you change the content type so it's XML instead of HTML?

##A full-featured server: Express

While netcat is a fun little basic server to play around with, it doesn't give us the kind of functionality we really want--we can only respond to one kind of thing, and we can't really do much other than keep giving one static file. The modern web is a fluid, dynamic place, and there's a lot more that we can do in the server (and even more in the browser, as we'll see next week with BackBone) to enable that fluidity. One of the most common libraries for building servers in Node.js is called Express.

To get started with Express, the first thing we'll need is a clean directory--start off somewhere that makes sense in your filesystem, but make sure it's not in an existing Git repository. From here, we'll be following the steps in the [Express tutorial](http://expressjs.com/starter/installing.html). You'll want to follow the default suggestions here--in particular, naming your main file's name to `app.js`. Don't worry if there's anything you don't quite understand in all that--we'll go over it all together once everyone's done.

Once those steps are done, you'll need to create an app.js file. This is a pretty standard name for the main file in an Express server. The kinds of modules that go here are the ones that determine how your app works on the inside--what kind of error logging it does, for example, or how it accesses your database. Today, we'll be adding some other things that usually get broken out into other files, but tomorrow we'll start splitting things out as the project gets bigger. Inside your app.js file, you'll want the following code:

{%highlight javascript%}
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
{%endhighlight%}

This is about the simplest Express server you can make. To start it, just do `node app.js` from the terminal. You can see what it does by pointing your browser to `localhost:3000`. The `app.get` function is telling Express (which is refered to by the `app` object) to listen for a GET request at the home directory of the site. You can also listen for other HTML methods, like POST, PUT, and DELETE, and you can use different routes. For example:

{%highlight javascript%}
app.post('/login', function (req, res) {
  // Some code to log in a user
});
{%endhighlight%}

Now that we've seen how Express creates different routes with for different pages, sit down with your group and talk about what kinds of pages you'll need to have for your microblog project. Note that these different routes are evaluated in order, so if something higher up applies, that will get used, even if there's something more specific later.

Once you've got a good idea of what pages you'll need, start building them! You can make some Express routes to serve up the pages you need, then start building them out of plain HTML. Include any client-side JavaScript libraries you think you'll want (I'd suggest jQuery, for example). Get any forms constructed and wired up in a way that makes sense to you, with appropriate event listeners so that things happen when buttons are clicked. Feel free to play around with CSS and presentational JavaScript as well. You can mock up data to see how things will look on the page. It's probably fair to assume that you'll have access to at least the following:

- A variable that represents a user name
- an array containing a series of posts, each with an associated user name representing the person who made the post

<aside>
####About today's work

A lot of the individual files that you work on today will not be used in the final project. However, most of the code in them will be, so don't be discouraged if tomorrow we create new files that seem to do what the files you create today do--what you're doing today is making the blueprints for the project, and while the individual files may change, the code you write today will still be useful!
</aside>

<!---
You can use information that gets passed in by using a property of the request object, `req.params`. We could modify the above code to make use of that, like so:

{%highlight javascript%}
app.post('/login/:user', function (req, res) {
  // Some code to log in a user
  var username = req.params.user;
  console.log(username);
});
{%endhighlight%}

In the above code, the colon in `:user` marks that out as being a parameter that we want to hang onto. If I do a POST request to localhost:3000/login/tom, the "tom" will get stored as a parameter called `user`, which Express will make accessible at `req.params.user`. If you wanted to keep track of that information for a bit (for example, if rather than a user name it was a tweet that somebody had just made), you could store it on the server in a variable (perhaps in an array).

That approach works fine on our tiny little server, but pretty soon we're going to need to start splitting files apart. One of the first files to get split out of app.js tends to be the file that holds all the routes: as you can imagine, the list of routes for anything more than the simplest of sites can get pretty long. But if both the routes and the app are going to need access to the data, where can we store it so that the can both get to it? 

##App.locals

Express comes built in with a solution to our problem, in the form of `app.locals`. This is an object that is accessible from inside any route by accessing `req.app.locals`. Since it's an object, we can add any properties we want to it. If we set `app.locals.cats = "shackleton"` in our app.js file, all of our routes will be able to access `req.app.locals.cats` to get to `shackleton`.

##C is for Cookie!

Great, so we've grabbed onto some information the client passed along to the server. But now what do we do with it? And for that matter, how can we log people in at all, when all we can do is give people the html pages they ask for?

Well, there are a lot of answers to that question; like most things in JavaScript, there are a number of different ways to do things. But one of the easiest ways to deal with users is to set cookies. Cookies are bits of information that go in the header and get passed back and forth between the client and the server to keep track of bits of information, like how you got to a page, whether you're logged in, or what color socks you like to buy at Amazon.

- app.locals (done)
- Middleware
- Cookies (in progress)
- Client-side cookie library
- Handlebars templates
- REST
-->
