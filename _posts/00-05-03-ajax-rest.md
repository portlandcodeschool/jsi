---
layout: post
title: AJAX &amp; REST
class: ajax+rest
date: 2015-02-04
---

## AJAX

In order to understand AJAX, it's best to understand a little history about
where it came from.


### History

Let's talk about the history of the web.

* What companies have changed the web?
* What have been the turning points of the web?
* What specific products have had an influence?
* How did websites used to work?


### Definition

AJAX stands for Asynchronous JavaScript and XML.

Let's break that down:

* _JavaScript_  
  Well this one's obvious. We're working in JavaScript.
* _XML_  
  This refers to retrieving XML from somewhere. So at this point, we're
  retrieving XML with JavaScript. In fact, this is a lie. We'll be using AJAX
  to retrieve JSON. No one says AJAJ, though.
* _Asynchronous_  
  We learned about asynchronous coding before when we discussed I/O in Node.
  This is the exact same idea. We know that we need to use asynchronous
  techniques when doing things that could take a long time.

As you can probably tell, the definition doesn't paint the whole picture.
This happens pretty frequently with _buzzwords_ in technology.

AJAX is a buzzword that arose during the _web 2.0_ revolution describing
techniques used to allow web pages to interact with a server, doing work on the
user's behalf without the web browser navigating to a new page.

AJAX incorporates:

* Avoiding page reloads and favoring dynamic content changes
* Asynchronous HTTP requests created in web browsers via JavaScript
* Applications remaining usable during asynchronous network operations
* Processing of data, usually XML, JSON, HTML, or plain text to update content


### Usage

How do you do this? Well you can use the built in [`XMLHttpRequest`][mdn-xhr] or
jQuery's [`$.ajax`][jq-ajax]. Guess which one most people choose?

<aside>
**Asynchronous**

Actually, `XMLHttpRequest` supports synchronous requests. So the term AJAX is
pretty much a complete lie. But you should never ever ever ever ever make
synchronous requests. Ever. Got it? Good.

**Internet Explorer**

Old versions of IE didn't support `XMLHttpRequest`, so another feature,
`ActiveXObject`, was used to provide AJAX support.
</aside>


### Challenge

* Choose a JSON file on the internet ([any file is fine][jsi-gamelib-package])
* Make an AJAX request for that file
* Log the result
* Log a more specific property from the result

_Hint:_ jQuery will not be able to automatically determine the data type for
certain files, so it may not change the JSON into an object automatically.

<aside>
**Content Types**

HTTP requests and responses have the ability to define a content type. jQuery
uses that content type to determine how to process the response. Sometimes the
content type will something you can control, sometimes it won't. We can discuss
_HTTP Content-Type header_ and _MIME types_ more if you'd like.
</aside>

### `$.ajax`

Let's look at a few different ways that you can handle the result of this
method.


## REST

Reading a definition of what Representation State Transfer (REST) is will make
your head spin. It's wordy and technical and all that jazz. In fact, you'll
probably find multiple definitions.

REST was originally meant something slightly different. Some programmers
started using it to describe APIs they were creating, and it caught on. Now we
have many RESTful services, and the differences are overlooked. Not that it
matters. You just won't really understand the definition of REST.

* URIs represent resources/objects/nouns
* Multiple data formats available: JSON, XML
* HTTP verbs to interact with resources
  - POST - Create
  - GET - Read
  - PUT - Update
  - DELETE - Delete

Here are a few examples of RESTful requests:

    POST   /api/photos
    GET    /api/photos/23
    PUT    /api/photos/23
    DELETE /api/photos/23


For now the important thing to realize is that you may need to change the verb
you're using to get an API to work.

Eventually, you'll build your own APIs and you'll need to distinguish different
requests as you define how users will interact with your API.

<aside>
**HTTP Verbs**

The HTTP specification actually states how POST, GET, PUT, and DELETE should
interact with resources. There's little consequence to not using the verbs
correctly. In fact, it's been difficult to build services that use them in the
past. So we've seen the verbs ignored and/or abused. To some extent REST is
simply a buzzword that's gotten us to re-focus on these definitions. Proposals
for additions to the HTTP spec are still being worked out, so things are still
being explored and changing.

**CRUD**

[CRUD][crud] is a term used to discuss actions that can be taken when working
with data that is persisted. We'll come back to this when discussing databases
and persistence.
</aside>


### APIs

Many services these days are offering REST APIs. The quality of documentation
will vary. Also, there will be certain APIs that require API keys in order to
use them. API keys just allow the service to track/limit your usage of the API
according to their rules.

### Challenge

Create a grid that displays the most interesting photos on Flickr.

_Hint:_ You'll have to use JSONP instead of JSON.

**Advanced:** When the user scrolls to the bottom of the page, automatically
load more images from Flickr.

<aside>
**JSONP**

JSONP allows web applications to make requests to other servers without running
into cross-domain security issues that arise with JSON.
</aside>

[crud]: http://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[jq-ajax]: http://api.jquery.com/jQuery.ajax/
[mdn-xhr]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[jsi-gamelib-package]: https://raw.githubusercontent.com/wbyoung/jsi-gamelib/master/package.json
