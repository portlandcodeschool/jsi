---
layout: post
title: Websockets!
class: misc
date: 2015-10-05 00:00:00
---

All of our client/server interaction to this point has revolved around REST-style requests and responses. This works great for things like navigating around web pages, persisting Backbone collections, and getting information in the database to the client, but what about things like chat systems? It would be really cool to have some sort of always-open two-way communication so that we didn't have to keep sending AJAX requests to the server to see if anything has changed. As you've probably guessed by now, there is such a way:

## Getting started with Websockets

Websockets are a new protocol that sit on top of HTTP and allow that kind of always-open two-way communication that we're talking about. Like virtually everything else in Node, we'll be using an NPM module to make use of them on the server side. This one is called `socket.io`. We'll start this demo (which is built using parts scavenged from the [socket.io docs](http://socket.io/get-started/chat/)) with a fresh directory. In it, you'll want three files: a `package.json`, one javascript file, and one html file. The `.package.json` should look like this:

```js
{
  "name": "socket-chat-example",
  "version": "0.0.1",
  "description": "my first socket.io app",
  "dependencies": {
    "express": "^4.13.3",
    "socket.io": "^1.3.7"
  }
}
```

The javascript file (mine is called `app.js`) should start out like this:

```js
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

and the html file (mine is `index.html`) should look like this:

```html
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
  </body>
</html>
```

That starts gives us a starting point that doesn't really do much: it's got a nicely styled form (thanks to the folks at socket.io!), and a super-basic Express server that serves it up, but that's about it. In order to actually use that `socket.io` module that we put in the `package.json`, we're going to have to include some more code. We'll start with the client, which needs to know how to talk to the server with sockets just as much as the server needs to know how to talk to the client. We'll just add some `script` tags to the html, just before the `</body>`:

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```

The `socket.io.js` file that we're grabbing gives us an object in the global scope called `io`, which is a function. We can run that to open a websocket connection to the server.

The server needs to be able to communicate as well, so that's the next place to change stuff:

```js
var io = require('socket.io')(http);
```

needs to go in with the rest of our initial requires, and then after the `GET` route, we can include:

```js
io.on('connection', function(socket){
  console.log('a user connected');
});
```

This seems a little like middleware, but it's not, really--since websockets are a different protocol, they don't really interact with the request and response objects the way that routes do; this line is essentially setting up a different kind of listener--something that's listening for a websocket connection. `connection` is an event that is built in to socket.io. There are a couple others (as you might expect). For example, we can change the above code to be:

```js
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
```

And now we can listen for both connects and disconnects. Note here that the `socket` gets the listener for the disconnect, rather than the `io` object. With both of these console log statements going, we can now see whenever anyone connects or disconnects. 

So far so good, but nothing is really any different from standard routes yet. The real magic of websockets comes when we start adding our own events to the mix. To do this, we're going to add in some jQuery and then some custom code to the `scripts` section of the html page:

```html
<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
</script>
```

So, once again we're creating the `io` object, but this time we're doing something with it: we're telling it to emit an event of type `'chat message'` that contains the text in the input field. We then clear out the value of the input field so that the user can type something else, and then we retun `false`. That last bit is important--it keeps the connection open rather than disconnecting it.

Just like with connects and disconnects, the server can listen for our `chat message` events. We can replace our current `io` listener on the server with:

```js
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
```

Now whenever anyone connected to the server enters something into the input field, we'll get a `console.log` telling us what they said. Because websockets are two-way communication, the server can emit events just like the client can. We can change our `io` listener to this:

```js
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
```

The client can then listen for that `chat message` event with the following code at the bottom of the `<script>` tag:

```js
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
```

Here, we're only sending along the message, but you could send along any other parameters you're interested in with the `emit` event, and they would get passed along to the socket listener's callback.

And believe it or not, that's it--a working (if basic) chat server! There are of course more bits that you can tinker with--using `broadcast.emit` instead of just `emit` to send events to everyone but the person who triggered it, for example. Try your hand at any (or all!) of the following:

- Broadcast a message to connected users when someone connects or disconnects
- Add support for nicknames
- Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
- Add “{user} is typing” functionality
- Show who’s online
- Add private messaging

Or feel free to modify any of your existing projects to work with websockets instead of REST-style server calls. The microblog and the issue tracker are both excellent candidates!
