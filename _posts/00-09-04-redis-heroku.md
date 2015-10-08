---
layout: post
title: Redis and Heroku
class: redis
date: 2015-10-08 00:00:00
---

Today we'll learn about [Redis][redis], a key-value store useful as a cache and for certain other purposes.

## Key-Value Stores

A _key-value store_ operates sort of like a JavaScript object: it associates some _key_, typically a string, with some _value_, which may be a string or a more complex data structure. In Redis, keys are always strings, and values are one of a few Redis datatypes: a String, a List, a Hash, or a Set (actually, there are a few others, but we won't worry about them).

* _Strings_ in Redis are very similar to the strings you've worked with in JavaScript.
* _Lists_ in Redis are very similar to JavaScript arrays.
* _Hashes_ in Redis are a mapping from strings to strings. This is much like an Object in JavaScript, except that you can't nest it deeply. Values can only be strings.
* _Sets_ are a useful mathematical construct: an unordered collection of values that either are or are not present.

## Using Redis as a Cache

One of the most common ways to use Redis is as a _caching layer_. Rather than bogging your database down with dozens or thousands of requests for the same records, you can cache frequently-requested data in Redis. Since Redis is a significantly simpler system than PostgreSQL, it can respond to simple requests for data much more quickly.

The other thing that makes Redis good for caching is that you can set a _TTL_ (Time To Live) on keys. The nature of cached data is to become outdated, so by setting a TTL you can limit that risk. You can add a TTL to a Redis key using the `expire` command, or with a couple extra arguments to `set`:

{%highlight JavaScript %}
// the TTL is given in seconds
client.set("some key", "some val", function() {
    client.expire("some key", "10", function() {
        // do something now that the key has been set
    })
});
client.set("some key", "some val", "ex", "10", function() {
    // do something now that the key has been set
});
{%endhighlight%}

### Exercise: Cache some data in your microblog

* Install Redis with `brew install redis`
* Before you can use Redis with node, you'll need to start the server from your terminal: `redis-server`
* Install the [redis node module][node-redis] with `npm install --save redis`
* Update one of your pages so that:
 1. If the needed data is in the cache, the page is rendered from the cache.
 2. If the necessary data is _not_ cached, it's fetched from the database and added to the cache before rendering the page.
* I suggest the "latest tweets from this user" page as a good candidate for caching, if you have one.

## Cache Invalidation

<p data-pullquote="There are only two hard things in Computer Science: cache invalidation and naming things. &ndash;Phil Karlton"></p>

Once you start caching things, you'll quickly see a problem: adding new data to the database doesn't necessarily add new data to the cache. For example, if you're looking at a "latest tweets from this user" page, you won't see their very latest tweets until the cached data's TTL expires. The cache has become _stale_.

As Phil Karlton noted, it's *very hard* to write software that hits the cache when the cache is right, and skips the cache when the cache is wrong. There are a few approaches for getting close (again, using the "latest tweets" example):

* Invalidate the cache for a user whenever they tweet. This avoids a stale cache, but throws out a lot of mostly-valid data.
* Update the cache whenever you update the database. Again, this avoids a stale cache, but ends up caching data that may not be requested often enough to merit it.
* Set a fairly short TTL and just live with occasional stale cache hits. This can be ok for high-traffic sites with a lot of fluctuation, but can also mean a lot of cache misses that could've been correct hits.

### Exercise: cache invalidation

Choose one of the approaches above and implement it for your microblog.

## Other Redis Features

Redis is useful as more than just a cache. For example, suppose you wanted to limit the rate at which people can attempt to log in, to prevent them brute-forcing other users' passwords. You can accomplish that with the Redis `incr` command:

{%highlight JavaScript %}
// in the login handler...
router.post('/login', function(request, response) {
    // create a rate-limit key based on the username and the current
    // clock-minute. Note that this is a little different from "in the
    // last 60 seconds".
    var username = request.body.username,
        currentMinute = new Date().getMinutes(),
        rateLimitKey = username + ':' + currentMinute;

    // increment the number of login attempts. If this is the first
    // attempt, there won't be a key, so `incr` will set it to 0.
    redisClient.incr(rateLimitKey, function(attempts) {
        // If there've been too many attempts, lock the user out.
        if (attempts >= MAX_ATTEMPTS) {
            response.render('login',
                {error: 'Rate limit exceeded; please wait to try again'});
        } else {
            // set an expiration on the login-attempt key, so that an
            // attempt at 4:05 doesn't hang around to foil an attempt
            // at 5:05
            redisClient.expire(rateLimitKey, '60', function() {
                // check username and password here; do the login
            })
        }
    });
});
{%endhighlight%}

## Heroku

Today we're going to publish something very basic to [Heroku][heroku]. We'll optionally set up a domain name via [Namecheap][namecheap] to work with the site.

### Exercise: Get started with Heroku

Follow the [Getting Started With Node.js guide][heroku-nodejs] in Heroku's documentation.  As a quick walkthrough, try the steps below (summarized from [the setup instructions][heroku-setup]).


- First, download and install the [Heroku toolbelt][heroku-toolbelt].

- Then in your terminal:
{%highlight bash%}
    heroku login
    heroku keys
{% endhighlight %}

- Set up a sample repo:
{%highlight bash%}
    cd [somewhere above new repo]
    git clone https://github.com/heroku/node-js-getting-started.git
    cd node-js-getting-started/
    sudo npm install
    git config --list
{% endhighlight %}

- Check the apps listed in Heroku dashboard

- Link repo to a new heroku app:
{%highlight bash%}
    heroku create
    git config --list
    heroku status
    heroku apps --help
    heroku apps
    heroku apps:rename <myname>-helloworld
    heroku apps
{% endhighlight %}

- Send to heroku:
{%highlight bash%}
    git push heroku master
{% endhighlight %}

- Test it on heroku:
{%highlight bash%}
    heroku open
{% endhighlight %}

- Destroy the remote app:
{%highlight bash%}
    heroku apps:destroy -app <myname>-helloworld
    git config --list
{% endhighlight %}

- Test it again (visit old URL)
{%highlight bash%}
    heroku open
    heroku apps
    git config --list
{% endhighlight %}

- In the Dashboard, make a temporary app (<myname>-helloworld).

- Relink repo to new heroku app:
{%highlight bash%}
    heroku git:remote -a <myname>-helloworld
    heroku open
    git config --list
{% endhighlight %}

- Deploy again:
{%highlight bash%}
    git push heroku master
    heroku open
{% endhighlight %}
    

Follow those steps when you're ready to deploy your current project repo:
{%highlight bash%}
    cd <project>
    <create or copy Procfile>
    git add Procfile
    git commit...
    heroku git:remote -a <capstone-app>
    git push heroku master
{% endhighlight %}

### Adapting your code for Heroku

If you're in the habit of running your NodeJS-based servers locally, you'll probably need to make a few small changes to get them running on Heroku.

#### Port numbers

#### Config files with private keys

### Exercise: create a Heroku app for your portfolio site

Using what you've learned from the "getting started" guide, create and deploy a Heroku app for another Node or Express application you've built in class.

### Optional exercise: Custom Domain Name

Create an account with [Namecheap][namecheap] (or another registrar of your choice). Pick and buy a reasonably-priced domain name for your site. You can be stodgy like me and go for your-name.com, or get something a little more fun.

Once you've purchased a domain name, you need to make a CNAME record that points to your weird heroku url (e.g. warm-ice-73259.heroku.com).

Finally, tell Heroku about the domain. (Until you do, Heroku will respond with "no such app"). You can do it from the command line with `heroku domains:add DOMAIN`, or in the "Domains" section of the Heroku web interface.

[heroku]: https://www.heroku.com/
[heroku-nodejs]: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
[heroku-setup]: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
[heroku-toolbelt]: https://devcenter.heroku.com/toolbelt-downloads

[namecheap]: https://www.namecheap.com/



[redis]: http://redis.io/commands/incr
[node-redis]: https://www.npmjs.com/package/redis
