---
layout: post
title: One-Time Codes
class: onetime codes
date: 2015-02-10
---

Today we'll learn about one-time codes, an important concept in website security.

I've mentioned before that while it's possible to write a regular expression to validate an email address, it's not really worthwhile: even if the user types a correctly-formatted address, that doesn't prove that they've typed an address that exists, or that they own. If I enter "alorenny@polandcrodskool.com", for example, or "bill.gates@microsoft.com", I haven't actually entered my email address.

So how do you verify a user's email address? The standard way is to generate some secret, send an email to the address they entered, then have them tell you the secret. In this case, the secret is a _one-time code_.

## One-Time Codes

A one-time code, also called a _nonce_, is some randomly-generated piece of data that's discarded after it's used once. A good way to generate a one-time code is with a `uuid` (universally unique identifier). In JavaScript you can use the [`node-uuid`][node-uuid] package:

{%highlight JavaScript %}
// after running `npm install node-uuid`...
var uuid = require('node-uuid');

var nonce = uuid.v4(); // => '55cfeb9c-0a64-4300-9ad4-6540d865939a', for example.
{%endhighlight%}

Having generated the nonce, you can use it to verify the user's email address:

{%highlight JavaScript %}
// imagine we're in the midst of creating a new user...
var nonce = uuid.v4();
var mailBody = createVerificationEmail(nonce);
sendMail(user.email, mailBody, function() {
    redisClient.set(nonce, user.id, function() {
        // report to the user that their account has been created, and
        // they should check their email for a verification link
    });
});
{%endhighlight%}

createVerificationEmail is an imaginary function that makes an email body containing some link like `http://my.site/verify_email/aa3de659-1340-4848-ae7e-6ec283b97b3a`. When the user clicks that link, you can have a handler that verifies their email:

{%highlight JavaScript %}
router.get('/verify_email/:nonce', function(request, response) {
    redisClient.get(request.params.nonce, function(userId) {
        redisClient.del(request.params.nonce, function() {
            if (userId) {
                new User({id: userId}).fetch(function(user) {
                    user.set('verifiedAt', new Date().toISOString());
                    // now log the user in, etc.
                })
            } else {
                response.render('index', {error: "That verification code is invalid!"});
            }
        });
    });
});
{%endhighlight%}

### Exercise: verification email

Either in your microblog or a new project, make a page where new users can enter their email. When they sign up, send them a verification email with a one-time code. Some resources you'll want to use:

* [Nodemailer][nodemailer] is an npm module for sending email.
* [Sendgrid][sendgrid] has an API that lets you send small amounts of mail for free.

## Password verification

Sometimes, users forget their passwords. There are a few ways to help them out in this situation. You can use "security questions," but you shouldn't. You can email them their password, which is problematic for its own reasons. The right way, as you might have guessed, is to use a one-time code. Since you know the user owns the email address they've registered, you can send a nonce to that address to let them change their password.

<aside>
***Authentication Factors***

In general, there are three ways for someone to prove they are who they say they are: Something they know, something they are, or something they have.

* Something they know: basically, this is a password. It's something that only the person trying to authenticate themselves would know. Security questions try to be this, but in practice they tend to be things that lots of people know.
* Something they are: this is something that's difficult to separate from a person, like their fingerprints or retinas.
* Something they have: the most common example of this is a physical key, like for a door or a padlock. In a password-reset email, the email account is acting as something you have.

Systems where security is especially important may use two or more authentication factors&mdash;think of a secret vault that only opens with a keycard, a code you type in, and a retinal scan.
</aside>

### Exercise: password verification mails

Implement a page where users who've forgotten their password can request a reset code, and a page where they can redeem it.

[node-uuid]: https://www.npmjs.com/package/node-uuid
[nodemailer]: https://www.npmjs.com/package/nodemailer
[sendgrid]: https://sendgrid.com/
