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
* Users can upload profile images, which show up next to their message
* Users can favorite each others' messages, and see how many times a message has been favorited

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
