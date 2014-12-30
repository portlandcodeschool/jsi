---
layout: notes
title: Sessions Notes
class: sessions
date: 2014-10-21 00:00:00
---

## Class Flow

- Walk through the basic concepts of authentication
- Have them look at the `node-basic-auth-examples` project and read the code.
  After they do this, have each group present the questions that they asked
  themselves through the process of reading the code, and how they answered
  them. Which questions were they unable to find answers to?
- If time allows, try to have them implement authentication via cookies. If
  it's feeling crunched, just go through the `node-basic-auth-examples` project
  and discuss the code.  
  I'd imagine it would take about a half day to do a guided walkthrough of
  setting up authentication. Shortcuts could include:

  * Just support sessions, not login
  * Just support signup & login
  * Skip writing tests
  * Don't persist users (would that be faster)?


## Stateless

Before explaining stateless, choose a student. Tell them they're going to
remember things for you. Reassure them that it'll be easy, just letters and
numbers (of course, it won't be). No paper or computer to write things down.

 - Remember A is #
 - What is A?
 - Remember B is #
 - What is B?
 - What is A?
 - Etc.

Full list:

 - A: 1
 - B: 2
 - J: 3
 - I: 24
 - R: 92
 - E: 15
 - U: 123
 - M: 423
 - Q: 1


## Reference

Just in case any of this comes up, here are some notes.

Typical OAuth 2.0 API scenario:

    https://oauth2server.com/auth?response_type=code&
      client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos

    POST https://api.oauth2server.com/token
      grant_type=authorization_code&
      code=AUTH_CODE_HERE&
      redirect_uri=REDIRECT_URI&
      client_id=CLIENT_ID&
      client_secret=CLIENT_SECRET

    {
        "access_token":"RsT5OjbzRn430zqMLgV3Ia"
    }
    or

    {
        "error":"invalid_request"
    }

    curl -H "Authorization: Bearer RsT5OjbzRn430zqMLgV3Ia" \
    https://api.oauth2server.com/1/me

From the OAuth 2.0 spec, a _bearer token_ is:

> A security token with the property that any party in possession of
> the token (a "bearer") can use the token in any way that any other
> party in possession of it can.  Using a bearer token does not
> require a bearer to prove possession of cryptographic key material
> (proof-of-possession).
