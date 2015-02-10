---
layout: post
title: Orchestrate.io
class: orchestrate
date: 2015-02-13
---

## Orchestrate.io

Today we'll learn about [Orchestrate.io][orchestrate], a database-as-a-service.

<aside>
***Software as a Service***

_SAAS_ (not to be confused with SASS) is a model that's been growing rapidly over the last few years. Rather than maintain your own instance of a library or database, you can subscribe to a platform that manages all that for you. This has some tradeoffs: the people providing the service have time and motivation to learn about all the corner-cases and pitfalls of that problem-domain, but it'll be somewhat slower (and often more expensive) than something you host locally.
</aside>

## The Orchestrate API

Orchestrate.io stores all your data in its own database. You retrieve data by making HTTP requests to their web API. They offer a Node package to interact with their API without having to craft raw HTTP requests. It's fairly straightforward:

{%highlight javascript%}
db.put('users', 'kates-user-id', {
  "name": "Kate Robbins",
  "hometown": "Portland, OR",
  "twitter": "@katesfaketwitter"
})
.then(function (res) {
  console.log(res.statusCode);
})
.fail(function (err) {});
{%endhighlight%}

{%highlight javascript%}
db.get('users', 'kates-user-id')
.then(function (res) {
  console.log(res.body);
})
.fail(function (err) {});
{%endhighlight%}

### Exercise: Orchestrate.io

1. [Sign up for an account on orchestrate.io][orchestrate-signup].
1. Create an application at the Orchestrate dashboard.
1. Create a new node project (new folder, `npm init`, etc&hellip;).
1. Install [the `orchestrate.io` Node module][orchestrate-npm] (`npm install --save orchestrate.io`).
1. Make a JS file that `require`s `orchestrate.io` and uses its API to create and delete some records. Check out the [api docs][orchestrate-docs] for more on how to work with the API through the Node client.

## Using Orchestrate for search

Orchestrate is more than just a key-value store: it supports full-text search! You can do text searches on the command line with `grep` and the like, of course, but it gets slow as the amount of text grows. Indexed full-text searches (Orchestrate uses [Lucene][lucene]) are much faster.

Using the Orchestrate API for search looks a lot like simple query lookups. For example, to find all your users who're from the good Portland:

{%highlight javascript%}
db.search('users', 'value.hometown: "Portland" AND NOT "ME"')
.then(function (result) {
  console.log(result.body);
})
.fail(function (err) {});
{%endhighlight%}

### Exercise: Orchestrate full-text search

Grab [the contents of _Pride And Prejudice_][p-and-p] and load them into an Orchestrate database. Use Orchestrate's full-text search to answer these questions:

* Mr. Bennet suggests Mrs. Bennet speaks so much of her nerves that they're his "old friends." How often does she really mention them?
* Are there any chapters where Mary appears, but not Lydia? Vice-versa?
* Which chapters mention Catherine "Kitty" Bennet (not to be confused with Catherine de Bourgh)?

[orchestrate]: https://orchestrate.io/
[orchestrate-signup]: https://dashboard.orchestrate.io/users/register
[orchestrate-npm]: https://www.npmjs.com/package/orchestrate.io
[orchestrate-docs]: https://orchestrate.io/docs/key-value
[lucene]: https://lucene.apache.org/core/
[p-and-p]: https://github.com/JSI-2015-Q1/Pride-And-Prejudice
