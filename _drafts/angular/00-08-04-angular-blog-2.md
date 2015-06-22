---
layout: post
title: Angular Blog, Continued
class: angular
date: 2015-06-25
---

Today we'll keep working on our Angular-based blog. A blog can have lots and lots of features! Three days isn't nearly enough time to cover all of them, so pick something you like and run with it:

## Comments!

* As a viewer, you can sign up and log in to comment.
* As a logged-in user, you can post comments on posts.
 * Once you submit a comment, it's saved in a database (PostgreSQL, Mongo, Orchestrate).
 * Consider using a markup language like [Markdown][markdown-npm] or [Textile][textile-npm] for comment formatting.
 * Comments should be sanitized to prevent XSS, etc.
* As the blog author, you can delete or censor comments.
* As the blog author, when you post comments, they show up with some sort of highlight to show you're The Boss Around Here.

## Tags!

* As the blog author, you can add tags to posts.
* As a viewer, you can see a list of available tags.
* As a viewer, you can see all the posts tagged with a given tag.
* As a viewer, you can see which tags a post has.

## Code Highlighting!

As a programmer, you're likely to want to include code in your blog posts. Add a feature where you can put a block of code inside a post, and it'll show up with syntax highlighting on the page. For example, if you're using Markdown, you might use a code fence:

{%raw%}
    ```JavaScript
    console.log("hello world!");
    ```
{%endraw%}

When the post is displayed on the page, it should be syntax-highlighted:

```JavaScript
console.log("hello world!");
```

[angular-highlightjs][angular-highlightjs] will probably be helpful here.

## Images!

Add a form on the new-post page where you can upload an image and add it to the post. There are a few ways you could implement this:

* Store images in the database:

<aside class="objective">An uploaded image's contents get stored in the database. There's a route like `'/image/:image_id'` that returns the image with an appropriate `Content-Type` header. When you include the image in a post, you do something like `<img src="/image/42" alt="Me And Julio Down By The Schoolyard">`.</aside>

* Store images on the filesystem:

<aside class="objective">An uploaded image gets saved somewhere like `public/images/uploads`. When you include the image in a post, you do something like `<img src="/images/uploads/me_and_julio.jpg" alt="Me And Julio Down By The Schoolyard">`.</aside>

There are other ways to handle it, as well. Each approach will have advantages and disadvantages, so let's talk about what you want to do.

## Something else!

Got a feature you particularly want? Go hog wild!


[markdown-npm]: https://www.npmjs.com/package/marked
[textile-npm]: https://www.npmjs.com/package/textile-js
[angular-highlightjs]: https://github.com/pc035860/angular-highlightjs
