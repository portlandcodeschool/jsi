---
layout: post
title: Sessions
class: sessions
date: 2015-02-03
---

Allowing users to sign up and log into your website is a complicated process. It's gotten more complicated recently for developers as many sites are allowing people to log in using Google, Twitter, Facebook, etc.

## Problems

HTTP wasn't designed to deliver custom content on a per-user basis. It was designed to allow hundreds of thousands of requests to be made to a server without overloading the server.

What's that mean?

It means HTTP is [_stateless_][stateless]. Each request is independent of any others. If I make a request to a web server, the web server will handle the HTTP request and give me a response. It will immediately forget that ever happened. When I make another request, it will handle that as well, but won't have any knowledge of prior requests.

Clearly, there must be a way to work around this, or there'd be no way to ever log into a website.

## Solutions

There are a few things we can use to our advantage to remember users as they continue to make requests to our web applications. We'll be solving these problems at the application level, above HTTP. We'll use features of HTTP to achieve this, but it wouldn't be possible without the application handling some of the work.

### HTTP Headers

We haven't really discussed HTTP in detail up until now. The best way to understand HTTP is to see it in action, so let's do just that.

Run the _netcat_ tool:

{%highlight bash%}
  nc -l 9000
{%endhighlight%}

Now open your browser and go to `http://localhost:9000/`. Your browser is making an HTTP request to your computer on port `9000` and will continue to wait for a response for a while. The command you ran is actually just listening on port `9000` for anything that comes in. If you go look at it, you can see the request that your web browser issued.

Let's respond.

Type whatever you want to followed by a newline, then `control+D` (control, not command). `control+D` sends the end-of-file character, which tells `nc` you're finished with this transmission. Try responding with some HTML and see what happens.

A proper response is specifically formatted. This is what node's `http` module does when you create a server. Let's give a proper response now. You could type this in manually, but we'll do it a little differently to avoid quite as much copying and pasting.

Create a new directory to work in, and `cd` to it. Create a file called `index.html` with some HTML in it. Also create a file, `index.headers` with the following content (make sure you have two blank lines at the bottom of your file):

```
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
```

Now run `cat index.headers index.html` and make sure there's at least one blank line between your headers and your HTML. Once you've got that, run `cat index.headers index.html | nc -l 9000` and access your page in the browser.

Use Chrome's developer tools to view the HTTP response headers. Try adding a custom HTTP header to `index.response`. What happens if you change the content type so it's XML instead of HTML?

<aside>
**HTTP Keep-Alive**

Run `nc -kl 9000`, which keeps netcat running after sending a response. Play around with sending responses to your browser this way.

HTTP Keep-Alive allows a browser to keep a connection to a server and issue multiple HTTP requests over one TCP connection. This optimization improves performance.
</aside>

### Exercise: Differing content-types

Use _netcat_ to respond to an HTTP request and display an image to the browser.

### Cookies

Cookies are little bits of data that are stored by web browsers. Any time a request is made to a server, the browser will look for any cookies it stored that are associated with that server and send the cookie data along with the request.

Either the client or the server can set cookies.

 - Clients set cookies via JavaScript
 - Servers set cookies via HTTP headers
 - Browsers transmit cookies via HTTP headers

Your server side application can use cookies to track users over multiple requests.

<aside>
**HTTP Only Cookies**

HTTP only cookies cannot be read by JavaScript. They're transmitted to the, browser, the browser stores them, and will send them back in future requests to the server, but the browser will not make them available to your client side JavaScript.

This helps prevent cookie theft and session hijacking via cross site scripting ("XSS") attacks.

Most browsers support this feature, but older browsers did not have it. On these older browsers, HTTP only cookies will still be accessible to JavaScript.

**Secure Cookies**

It's possible for servers to send _secure_ cookies. Most of the time, that doesn't mean that they can't be read by users on the client end. Even if you look at them and you don't think they seem readable, they could simply be encoded (base64 is a common choice here).

Never store sensitive data in cookies. If you need to store sensitive data that and associate it with someone using your site, use database-backed sessions and store the data on the server.
</aside>

### Exercise: log-into-able website

Create an application that uses cookies on the client- and server-sides. Your client-side page should be served by the server (rather than loaded via the `file://` protocol).

The server side should:

 - Log cookies for all incoming requests
 - Create a cookie, `last-request-time`
 - Log a message like `last access by user: 10s ago`

The client side should:

- Have an input that allows the user to enter their favorite color
- When the user enters their favorite color, store it in a cookie, `favorite-color`, remove the input and display the favorite color as well as an edit button.
- Subsequent access to the page should not show the input if the favorite color is already known.

## Security

Security is a serious concern when dealing with authentication. As a web developer, you should arm yourself with as much security knowledge as you can. We'll get to more later, but for now we'll hit some basics.

### SSL/TLS

Requests sent via HTTP are not secure. Everything is transmitted over plain text, so people sharing your wi-fi router, or with access to any of the network devices through which your data passes, can read the data being sent.

Try this:

{% highlight bash %}
$ nc -l 9000
{% endhighlight %}

Now login here (don't use a real password):

<form class="auth" action="http://localhost:9000" method="post">
<input name="username" placeholder="Username">
<input name="password" placeholder="Password">
<button type="submit">Login</button>
</form>

Go back to your terminal and see what shows up. See what happens when
you <a id="secure-form" href="#">make it secure</a>.

<script>
$(function() {
  $('a#secure-form').click(function() {
    $('form.auth').attr('action', 'https://localhost:9000');
    $('form.auth button').text('Secure Login');
    $(this).remove();
    return false;
  });
});
</script>

Attackers can eavesdrop on HTTP traffic that isn't secured by SSL/TLS. We musn't transmit passwords, authentication tokens, credit card numbers, bank account information, or other secrets over a connection that isn't secure.


<aside>
We'll touch on security a little more in the future, but be aware that you won't get everything right if you try to implement crypto on your own. It's a very specialized domain, and a single error can break the whole thing. You want to trust the modules that others have built, been peer reviewed, and been vetted over time.
</aside>


## Middleware

Much of what we've discussed is very easy to do with Express. Express is built to easily include _middleware_, pre-packaged modules that can run before (or after) your application code and reduce the work you need to do. Here are some useful middleware modules:

- [`cookie-parser`][middleware-cookie-parser] for basic cookie handling
- [`express-session`][middleware-session] for sessions persisted server side
- [`cookie-session`][middleware-cookie-session] for sessions persisted in cookies

## Putting it All Together

Once you understand cookies and the security issues behind authentication, you can start to build up an authentication, authorization, and user management system.

The [`node-basic-auth-examples`][node-basic-auth-examples] project [demonstrates][node-basic-auth-heroku] cookie-based authentication as well as token-based authentication via HTTP headers.

### Exercise: save users in the database

Update the authentication example to save users in the database. Users should be able to create accounts and log in and out.

## Definitions

_Authentication_ is what we think of as the login process. Usually we authenticate with a web applications by providing a username and password.

_Authorization_ is the process of determining what a user is a allowed to do. Can the currently authenticated user create posts? Can they delete users?

## More

Cookies are a good way to handle associating an authenticated user with a request, but they only work when a browser is in place.

APIs typically use tokens to determine the user who's making the request and _authorize_ that they have access to access the requested resource or perform the requested action. These tokens are usually returned by the API after the initial authentication, then passed via a HTTP header for all subsequent requests that require authorization.

### OAuth

OAuth is a popular standard for authentication that's widely used. It's usually the system that you use when you log into a site using your Google, Twitter, Facebook, or whatever account.

It also supports scenarios for API authorization. Applications that wish to make use of many modern APIs authenticate via OAuth, then pass authorization tokens for each API call.

Google does a pretty good job documenting OAuth for [authentication (login)][google-oauth-login] and [authorization (API access)][google-oauth].

### Exercise: Passport

[Passport][passport] is a Node.js module that allows you to easily support many different authentication strategies (including pretty much every popular social media site you could imagine).

Update your site so users can create accounts and log in using their social media accounts.

[stateless]: http://en.wikipedia.org/wiki/Stateless_protocol
[node-basic-auth-examples]: https://github.com/wbyoung/node-basic-auth-examples
[node-basic-auth-heroku]: http://node-basic-auth-examples.herokuapp.com
[middleware-cookie-parser]: https://github.com/expressjs/cookie-parser
[middleware-session]: https://github.com/expressjs/session
[middleware-cookie-session]: https://github.com/expressjs/cookie-session
[google-oauth]: https://developers.google.com/accounts/docs/OAuth2
[google-oauth-login]: https://developers.google.com/accounts/docs/OAuth2Login
[passport]: http://passportjs.org
