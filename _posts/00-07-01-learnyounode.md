---
layout: post
title: Node.js
class: learnyounode
date: 2015-06-15
---

Today we're going to start learning to use some of the features provided by Node.js. We've used modules to export code, and used Express to make Node's HTTP handling easier, but now we'll get right down to the bare bones.

## HTTP Servers

We've talked before about the request/response cycle:

1. A user types a URL (or clicks a link, submits a form, etc.), causing their browser to send a request to a server.
1. The server receives the request and decides what to do about it.
1. The server sends a response to the browser.
1. The browser reads the response and renders a page (or runs an AJAX response handler).

Today will focus on the middl two steps, where the server receives a request, decides what to do with it, and sends a response. We'll be using the [`http` module that's included in Node](https://nodejs.org/api/http.html).

The most important function in the `http` module is `createServer`. It returns a `Server` object that accepts event handlers for various circumstances, including `request`.

```JavaScript
var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  // do stuff...
});
```

Notice how closely this is related to the request/response cycle. Requests are events that happen to a webserver; it has no control over when they occur, only what it does when they do. Here we add an event listener for requests, saying "when a request happens, this is what I want the server to do: ..."

Here is a complete, but not useful, web server using the `http` library. It logs the requests it received, and responds to everything with `200 OK` and a simple "Hello World."

```JavaScript
var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  var body = "Hello World!";
  console.log(request.method + ' ' + request.url);
  console.log(JSON.stringify(request.headers));

  response.writeHead(200, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain'
  });
  response.write(body);
  response.end();
});

console.log("Now listening on port 9001");
server.listen(9001);
```

That's not very useful. How about a simple file-server? This code will serve any file (including itself!) that's in a directory with it:

```JavaScript
var fs = require('fs');
var path = require('path');
var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  // If there are any query parameters on the request, get rid of them.
  // This server doesn't use any such parameters.
  var filename = request.url.replace(/\?.*/, '');
  // fs.exists takes a filename and calls a callback with the result of
  // whether that filename exists.
  fs.exists(__dirname + filename, function(exists) {
    if (exists) {
      response.writeHead(200, {});

      // Here we read the file contents and send them to the response.
      var readStream = fs.createReadStream(__dirname + filename);
      readStream.on('data', function(data) {
        response.write(data);
      });

      readStream.on('end', function() {
        response.end();
      });
    } else {
      // that file didn't exist, so send back a 404 Not Found
      var body = '404 NOT FOUND';
      response.writeHead(404, {
        'Content-Length': body.length,
        'Content-Type': 'text/plain'
      });
      response.write(body);
      response.end();
    }
  });
});

console.log("Now listening on port 9001");
server.listen(9001);

```

### Exercise: A Single-Page Site

Use Node's `http` module to create a server with the following properties:

* When someone requests the root url `/`, look for a file `index.html` in the same directory as the server code, and respond with its contents.
* When someone requests any other path, check to see if a file with that path name exists in a `public` directory:
  * If the file exists, respond with HTTP 200 OK and its contents.
  * If the file does not exist, respond with HTTP 404 NOT FOUND.

Put references to a `layout.css` and a `page.js` in your `index.html`:

```HTML
<link rel="stylesheet" href="/layout.css">
...
<script src="/page.js"></script>
```

Make sure they load successfully!

### Exercise continued: Contact Book

Now that you have a server that responds to requests, let's make it into a simple contact book. You'll have a list of people and a bit of information about them. Each person is an object with a `name`, an `age`, and an `email` address. For example:

```JavaScript
{
  "name": "Bill Gates",
  "age": 59,
  "email": "bill@microsoft.com"
}
```

Add code to your request listener that checks what url and request method has been sent. Set up these endpoints:

* `GET /api/people` should return the list of people.
* `POST /api/people` should add a new person.
* `PUT /api/people/1` should update a person.
* `DELETE /api/people/1` should remove a person.

Responses should look something like this:

```
GET /api/people
[
  {
    "name": "Bill Gates",
    "age": 59,
    "email": "bill@microsoft.com",
    "id": 8
  },
  {
    "name": "Tim Cook",
    "age": 54,
    "email": "tim@apple.com",
    "id": 9
  }
]

POST /api/people
{
  "status": "ok",
  "id": 8
}

PUT /api/people/8
{
  "status": "ok"
}

DELETE /api/people/8
{
  "status": "ok"
}

```

Once you have a working API, you can make the page use it. index.html should end up looking like this:

![contact book]({{site.baseurl}}/images/00-07-01-contact-book.png)
