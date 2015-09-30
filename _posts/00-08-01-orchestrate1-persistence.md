---
layout: post
title: Persistence with Orchestrate
class: persistence
date: 2015-09-28 00:00:00
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
1. Install [the `orchestrate` Node module][orchestrate-npm] (`npm install --save orchestrate`).
1. Make a JS file that `require`s `orchestrate` and uses its API to create and delete some records. Check out the [api docs][orchestrate-docs] for more on how to work with the API through the Node client.


[orchestrate]: https://orchestrate.io/
[orchestrate-signup]: https://dashboard.orchestrate.io/users/register
[orchestrate-npm]: https://www.npmjs.com/package/orchestrate
[orchestrate-docs]: https://orchestrate.io/docs/key-value
[lucene]: https://lucene.apache.org/core/
[p-and-p]: https://github.com/JSI-2015-Q1/Pride-And-Prejudice
