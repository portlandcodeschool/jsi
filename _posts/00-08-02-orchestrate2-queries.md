---
layout: post
title: Orchestrate with Queries
class: persistence
date: 2015-09-29 00:00:00
---


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
[orchestrate-npm]: https://www.npmjs.com/package/orchestrate
[orchestrate-docs]: https://orchestrate.io/docs/key-value
[lucene]: https://lucene.apache.org/core/
[p-and-p]: https://github.com/JSI-2015-Q1/Pride-And-Prejudice
