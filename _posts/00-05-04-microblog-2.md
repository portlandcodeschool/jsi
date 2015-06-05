---
layout: post
title: Microblog 2
class: microblog
date: 2015-06-04
---

Today we'll add features to the microblog from yesterday.

There are lots of features you could work on:

* Users can subscribe to other users, and will only see messages from users they follow
* Users can have a profile page that shows some information about them as well as their message history
* Users can see a list of who subscribes to them, and a list of their subscriptions
* Users can favorite each others' messages

You definitely won't have time to do all of these, so pick a couple that look interesting and take a shot. Let's look at how some of these would work:

### Subscribing to other users

Users will want to be able to subscribe to more than one person, and they'll want to be able to have more than one subscriber. Thus, your database will need to express a "many-to-many" relationship. Here's the users table suggestion from yesterday:

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

A "subscriptions" table that expresses a many-to-many relationship could look like this:

```
      Column      |  Type   | Modifiers
------------------+---------+-----------
 subscriber_id    | integer | not null
 subscribed_to_id | integer | not null
Foreign-key constraints:
    "subscriptions_subscribed_to_id_fkey" FOREIGN KEY (subscribed_to_id) REFERENCES users(id)
    "subscriptions_subscriber_id_fkey" FOREIGN KEY (subscriber_id) REFERENCES users(id)
```

Each record in this table represents one instance of a user subscribing to another user. The "not null" constraints ensure you won't have situation where a user is following a nothing, or being followed by a howling void. The foreign key constraints ensure that nobody is following or followed by a user who doesn't exist.

On the JavaScript side, there will be a couple of changes to be made. You'll need a POST request handler for creating subscription records:

* Use the currently-logged-in user's id as the subscriber_id
* The POST body will need to include the id of the user to be subscribed to
* The request handler will need to validate that the target user exists
* It will also need to check whether a subscription already exists for those two users, and do nothing if so
* Finally, it will create the subscription and respond in some way that lets the user know it succeeded

The code that shows messages will need to change as well. Instead of (essentially) `select * from messages order by posted_at`, it'll need to generate a query that looks something like this:

```SQL
select
    messages.body,
    messages.posted_at,
    users.username
from messages
    inner join users
        on messages.user_id = users.id
where
    messages.user_id in (
        select subscriptions.subscribed_to_user_id
        from subscriptions
        where subscriptions.subscriber_id = $logged_in_user_id
    )
order by messages.posted_at
```

### Profile Pages

A profile page displays some information about a user. It might include things like a "real name," an email address, and a short bio. You'll need a request handler for displaying a user's profile page. You'll also need two more: one for displaying an "edit profile" screen, and one for receiving POSTs to update the logged-in user's profile. The handlers might look like:

```JavaScript
router.get('/profile/:username', function(request, response) {
    var database = app.get('database');

    database('users').
    where({username: request.params['username']}).
    then(function(records) {
        response.render('profile.jade', {user: records[0]});
    });
});

router.get('/profile', function(request, response) {
    response.render('edit_profile.jade');
});

router.post('/profile', function(request, response) {
    var database = app.get('database');
    database('users').
    where({username: request.cookie['username']}).
    update({
        bio: request.body['bio'],
        email_address: request.body['email'],
        name: request.body['name'],
    }).then(function() {
        response.render('edit_profile.jade', {statusMessage: 'success!'})
    });
    });
});
```

You'll need a database migration to add the appropriate columns to your database, and jade files for the view- and edit-profile pages.

Finally, remember to have links to the view-profile page somewhere! The most natural place might be when displaying a message: have the user's username a link to their profile (`<a href="/profile/barney">barney</a>`)

### Seeing Subscriber Information

(Naturally, this feature will require doing the "subscribe to other users" feature first.)

There are a couple of places you could display information about subscriber counts. You could put a sidebar on the main page, so the currently-logged-in user can see "You subscribe to 20 people, and have 15 subscribers." If you've done a profile page, you could also display "Betty subscribes to 15 people, and has 20 subscribers."

You'll need to use the [aggregate function](http://www.postgresql.org/docs/9.4/static/functions-aggregate.html) `count` to generate these numbers.

Once you're showing the total subscriber counts, it seems sensible to also show a list of who those users are. You could have two pages, one for "subscribes to this user" and one for "this user subscribes to," or have a single page with both lists. The request handler for a single-page approach would look somewhat like this:

```JavaScript
router.get('/users/:username/subscriptions', function(request, response) {
    var database = app.get('database');
    database('users').
    where({username: request.cookies.username}).
    then(function(records) {

        var currentUser = records[0];
        database('users').
        join('subscriptions', 'users.id', '=', 'subscriptions.subscribed_to_id').
        select('users.username').
        where({'subscribers.subscriber_id': currentUser.id}).
        then(function(subscribers) {
            database('users').
            join('subscriptions', 'users.id', '=', 'subscriptions.subscriber_id').
            select('users.username').
            where({'subscribers.subscribed_to_id': currentUser.id}).
            then(function(subscriptions) {
                response.render('subscriber_info.jade', {
                    userSubscribesTo: subscribers,
                    subscribeToUser: subscriptions
                });
            });
        });
    });
});
```

The routes for a two-page approach will each incorporate about half of this code.

### Favoriting Messages

Favorites (likes, stars, thumbs-up, kudos, etc) work a lot like subscriptions, in that a user can favorite many messages and a message can be favorited by many
, except instead of a relationship between two users, they're a relationship between a user and a message. The table for storing favorites will look very similar:

```
   Column   |  Type   | Modifiers
------------+---------+-----------
 user_id    | integer | not null
 message_id | integer | not null
Foreign-key constraints:
    "favorites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
    "favorites_message_id_fkey" FOREIGN KEY (message_id) REFERENCES messages(id)
```

This description thinks the `messages` table has an `id` column. The suggested structure from yesterday didn't include that, so you'll need to make a migration to add one.

From there, it works a lot like subscriptions. When displaying a message, include a link to add it as a favorite. Links always make GET requests, but this is really more of a POST sort of action. You can turn it into a POST with some JavaScript. Given markup like this:

```HTML
<a href="/message/12345/favorite" class="message-fave">Fave!</a>
```

You could use some jQuery like this to send a POST request instead:

```JavaScript
$('.message-fave').click(function(event) {
    event.preventDefault();
    var link = $(event.target);
    $.ajax(link.attr('href'), {
        method: 'POST',
        success: function(response) {
            // update the page to indicate success
        }
    });
});
```

You'll need a POST handler that receives the message-faving request, adds a record to the favorites table, and sends JSON back indicating success:

```JavaScript
router.post('/message/:message_id/favorite', function(request, response) {
    var database = app.get('database');
    database('users').
    where({username: request.cookies.username}).
    then(function(records){
        var user = records[0];
        database('favorites').insert({
            user_id: user.id,
            message_id: request.params['message_id']
        }).then(function() {
            response.json({'status': 'success!'})
        });
    });
});
```

If a user has already favorited a message, the next time they see it, they shouldn't see a link saying they can favorite it, they should see something saying they've already favorited it. Thus, when you display messages, the query is somewhat more complicated:

```SQL
select
    messages.body,
    messages.posted_at,
    favorites.message_id is not null as "has_favorited",
    users.username
from messages
    inner join users
        on messages.user_id = users.id
    left outer join favorites
        on messages.id = favorites.message_id
where
    favorites.user_id = $logged_in_user_id
order by messages.posted_at
```

The `left outer join` ensures we get all messages, regardless of whether there's a record in `favorites` for that message/user combination. Using an inner join would restrict the results to only the favorited messages.

The line about `message_id is not null` might look a bit unusual. When we join two tables, we effectively create a new table that has all of their columns together. With a left outer join, the values from the right-hand table that failed the join condition will all be null.

```
select * from users;
 id |  username | password
----+-----------+----------
  1 | barney    | yup
  2 | wilma     | rch

select * from messages;
 id | user_id |    body
----+---------+---------
  1 | 1       | gee fred
  2 | 1       | I'm getting a promotion!

select * from favorites;
user_id | message_id
--------+------------
 2      | 2

select * from messages
left outer join favorites
on messages.id = favorites.message_id
where favorites.user_id = 2;
 messages.id | messages.user_id |       messages.body      | favorites.user_id | favorites.message_id
-------------+------------------+--------------------------+-------------------+----------------------
 1           | 1                | gee fred                 | (null)            | (null)
 2           | 1                | I'm getting a promotion! | 2                 | 2

```

The upshot of all this is that we can check to see if a message has a favorite by left-joining messages to favorites and then checking whether some value from the favorites table is null.
