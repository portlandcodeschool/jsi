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

Orchestrate.io stores all your data in its own database. You retrieve data by making HTTP requests to their web API.

### Exercise: Orchestrate.io

1. [Sign up for an account on orchestrate.io][orchestrate-signup]
1. Create an application at the Orchestrate dashboard.
1. Create a new node project (new folder, `npm init`, etc...)
1. Install [the `orchestrate.io` Node module][orchestrate-npm] (`npm install --save orchestrate.io`)
1. Make a JS file that `require`s `orchestrate.io` and uses its API to create and delete some records. Check out the [api docs][orchestrate-docs] for info on how to work with the API through the Node client.

[orchestrate]: https://orchestrate.io/
[orchestrate-signup]: https://dashboard.orchestrate.io/users/register
[orchestrate-npm]: https://www.npmjs.com/package/orchestrate.io
[orchestrate-docs]: https://orchestrate.io/docs/key-value
