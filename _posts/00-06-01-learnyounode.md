---
layout: post
title: Node.js
class: learnyounode
date: 2015-02-09
---

Today we're going to start learning to use some of the features provided by Node.js. We've used modules to export code, and used Express to make Node's HTTP handling easier, but now we'll get right down to the bare bones.

There's a great interactive tutorial from [nodeschool.io][nodeschool] called [`learnyounode`][learnyounode].

    npm install -g learnyounode
    learnyounode

You can skip around in this. Some of the exercises do build on previous ones, but don't get too caught up in some of the earlier exercises. You've already learned much of that material.

Make sure you do the HTTP file server exercise.

## HTTP Servers

Node provides everything you need to build applications that respond to HTTP requests. You've learned the basics, now write a server that can:

- Serve HTML, CSS, and JavaScript files out of a `public` directory.
- Serve `index.html` if a directory is requested.
- Return `404` errors when a page is not found.
- Make `/` redirect to `/home/`.
- Finally, add a JSON API for an address book.

The JSON API should expose the following resources:

- `GET /api/people` return a list of people.
- `POST /api/people` should add a new person.
- `GET /api/people/1` should return a specific person.
- `PUT /api/people/1` should update a person.
- `DELETE /api/people/1` should remove a person.

People should have a `firstName`, `lastName`, and `address`. For now, just store the people in a standard JavaScript structure. This means they'll be stored in memory, and every time you restart your server, your list of people will revert back to being empty (or a pre-set value). If you like, you can store them in a database instead.

Your directory structure should start like this:

    /server.js
    /public/index.html
    /public/js/application.js
    /public/css/application.css

[nodeschool]: http://nodeschool.io/
[learnyounode]: http://nodeschool.io/#learn-you-node
