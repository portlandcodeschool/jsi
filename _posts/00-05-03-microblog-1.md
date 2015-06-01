---
layout: post
title: Microblog
class: microblog
date: 2015-06-03
---

Today and tomorrow we'll work on building a simple microblog, or "Twitter clone." This will be a website where users can register, log in, and post messages. Other users can see all the messages being posted (don't worry about "followers" for now; it's somewhat complicated).

## The login/registration page

Before users can do anything on this site, they'll need to log in. Therefore, the first time someone visits they should see something like this:

![registration page]({{site.baseurl}}/images/00-05-03-microblog-login-page.png)

Based on this wireframe, you can make some inferences about what sort of table you'll need to store users. They'll need text columns for the username and password, to match the text fields on the login/registration forms. Both of those columns are required, since it makes no sense to have a user who lacks either of them. The username column should be unique, so that you don't end up with multiple users with the same username. Additionally, you'll want an autoincrementing "id" column for the primary key.

```
  Column  |  Type   |                     Modifiers
----------+---------+----------------------------------------------------
 id       | integer | not null default nextval('users_id_seq'::regclass)
 username | text    | not null
 password | text    | not null
 Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_username_key" UNIQUE CONSTRAINT, btree (username)
```

You'll need to write a migration that creates a table like the one above.

You can also infer that you'll need three request handlers for this page: one that responds to GET requests and renders this page, one that responds to POST requests and registers a new user, and one that responds to POST requests to log in an existing user.

### Registration

When a user fills out and submits the "register" form, their browser should POST to a request handler that will:

* Look in the database to see if there's already a user with that name
* If there is no user record by that name:
    * check to see if the passwords match.
    * If they do:
        * create a new one with the given username and password
        * send the user a cookie ir username or user id
        * render the "main page" (see below)
    * If the passwords do not match:
        * do not create a user in the database
        * Render the registration page again, with an error message saying the passwords don't match
* If that username is taken:
    * do not create a user in the database
    * Render the registration page again, with an error message saying to pick a different name

### Logging in

When a user fills out and submits the "login" form, their browser should POST to a request handler that will:

* Look in the database to see if there's any user by that name
* If there is such a user record:
    * Check to see if their password matches.
    * If it does:
        * Send the user a cookie indicating their username or user id
        * Render the "main page"
* If there's no such user, or the password doesn't match:
    * Render the login page again, with an error message saying that login failed.

Once users can register and log in, you can start building a page where they can view and post messages. It's probably a good idea to commit at this point, before you dive into the next step.

The main page should look something like so:

![main page]({{site.baseurl}}/images/00-05-03-microblog-main-page.png)

Once again, you can infer the structure of the messages table from the wireframe. It'll need to store the message itself, of course. It'll need to have a record of which user posted the message, and when the message was posted. Something like this:

```
  Column   |            Type             | Modifiers
-----------+-----------------------------+-----------
 user_id   | integer                     | not null
 body      | text                        | not null
 posted_at | timestamp without time zone | not null
Foreign-key constraints:
    "messages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

Again, you'll need to write a migration to create a table that looks like the description above.

There are two main features on this page: a form where you can write a new message, and a pane where you can see all the messages other people have posted.

### Writing a new message

The "new message" form should POST to a request handler that will:

* Check the user's cookie to see who's logged in, and finds their user id
* You can find their user id by either:
    * Having the user id right there in the cookie
    * Having the username in the cookie, and looking up the user record in the database by username
* Create a new message record:
    * The user_id should be the id of the currently-logged-in user
    * The body should be the message the user typed
    * The posted_at should be the current date and time
* Render the main page again, with the new message included.

### Viewing messages

This is the main page people will see when they visit the home page. It will need a GET request handler that will:

* Fetch all the messages people have posted
    * The messages should be ordered by the time they were created
    * You'll need to fetch the message body and posted_at from the messages table.
    * In order to display the user who posted the message, you'll need to join the messages table to the users table and fetch the username.
* Send the messages to the main page Jade template for rendering.

## Project layout

A working project layout will look something like this:

```
my_microblog
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── index.jade
    ├── login.jade
    └── layout.jade
```

The registration and login request handlers will go in users.js and eventually render login.jade. The handlers for viewing/posting a message will go in index.js and render index.jade.

In order to make your knex connections available in request handlers, you need to initialize knex somewhere. The best place to do it is in app.js. Import your knexfile and knex itself at the top of it:

```JavaScript
var knexConfig = require('./knexfile');
var knex = require('knex')(knexConfig);
```

Then attach it to the app using app.set:

```JavaScript
var app = express(); // this line should already exist
app.set('database', knex); // you'll need to add this line
```

Finally, in order to import the express app from route files, you'll need to set up a "circular import." `app.js` will import `routes/index.js`, and `routes/index.js` will import `app.js`. In order to make that work, you have to set up `module.exports` in `app.js` _in the middle of the file_, and move the `routes/` imports after that. `app.js` will end up looking like this:

```JavaScript
var knexConfig = require('./knexfile');
var knex = require('knex')(knexConfig);
/* Below are the standard require statements for an express application */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* end of standard Express require statements */

var app = express();
app.set('database', knex);
module.exports = app;

var routes = require('./routes/index');
var users = require('./routes/users');

/* And then the rest of the normal, generated app.js goes here */
```
