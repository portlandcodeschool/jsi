---
layout: post
title: Angular Blog
class: angular
date: 2015-02-25
---

## Angular Blog

For the rest of the week, we'll work on creating a dynamic blog using Angular, Express, and a database.

Your blog should have some straightforward features:

* You can log in as the blog author.
* As a logged-in author, you can create a new post.
 * Once you submit a post, it's saved in a database (PostgreSQL, Mongo, Orchestrate).
 * Consider using a markup language like [Markdown][markdown-npm] or [Textile][textile-npm] for post formatting.
* As a logged-in author, you can edit existing posts.
* As a viewer, you can view all posts.
* As a viewer, you can view a single post.

You should use Angular to manage the presentation. Concentrate on making the user interface really pleasant--for example, when authoring a post, use data binding to provide a live preview of the post.

[markdown-npm]: https://www.npmjs.com/package/marked
[textile-npm]: https://www.npmjs.com/package/textile-js
