---
layout: post
title: Security
class: special topics
date: 2015-07-01
---

## Security

The security of a program is critical, especially when it's connected to the Internet. Not only must you defend your own assets, you have an obligation to your users to safeguard any information they give you. If you store credit card information, you must keep it safe from thieves. Real names and locations may be sought by abusive exes or oppressive governments. Even an email address has value to spammers and phishers.

You must consider security at every step of development. Just as a chain is only as strong as its weakest link, a single flaw in your code's security logic can be all it takes to to create a successful exploit, no matter how correct the rest is. Even minor flaws, abused together, can lead to a major exploit. The fundamental principle in security is _defense in depth_: confirm at every stage that what's going on makes sense in context, like a bureaucrat who demands every form filled out in triplicate, signed, witnessed, and sealed.

Of course, like a demanding bureaucrat, carefully-secured code can be frustrating to work with. Faced with a frustrating interface, users may look for ways to work around it, compromising security for the sake of expedience. A classic example is password-complexity rules: the IT department demands that every password contain lowercase and uppercase letters, numbers, and nonalphanumeric characters, and that they be rotated every 30 days. Unable to remember these cryptic passwords, users write them on a sticky note and put it on their monitor, where any burglar or pizza guy can see them.

Balancing the need for careful security with users' impatience and carelessness is a difficult art form. It gets even harder when you add [social engineering][smbc-soceng] to the mix. There aren't any hard-and-fast rules, but in general, keep in mind that people will usually do whatever's easiest. Try to make sure the easiest thing is also the secure thing.

There are far too many aspects of security to cover in one day (or one month). Today we'll go over code injection, one of the most common security flaws, and password hashing, one of the most important ways to protect your users.

## SQL Injection

![Bobby Tables](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)

The single most common security flaw in web applications is _SQL Injection_. Consider this code:

```JavaScript
router.post('/login', function(request, response) {
  database.query("select * from users where username = '"
                 + request.body.username + "'", function(error, result) {
    // check password and log the user in
  });
});
```

This code has a SQL injection vulnerability. If someone types `'; drop table users; --'` into the username field, the full query sent to the database will be:

```SQL
select * from users where username = ''; drop table users; --'
```

The JavaScript code meant to send the user-input to the database as a value to be inspected. However, careless programming allowed an attacker to send their own SQL code, so in this example the `users` table gets dropped (Remember that `--` is the comment character in SQL, so the trailing `'` won't cause an error).

The solution is easily said, although it requires some attention: _Never_ use string concatenation with user input to build a SQL query. Ideally, you should use a query builder like Knex. If you must use raw SQL strings, keep user input in the parameters list:

```JavaScript
router.post('/login', function(request, response) {
  database.query("select * from users where username = $1",
                 [request.body.username], function(error, result) {
    // check password and log the user in
  });
});
```

## XSS (Cross-site Scripting)

XSS could also be called "Javascript injection." Just as SQL injection occurs when data that should've been a plain value gets used as SQL code, XSS occurs when data that should've been a plain value gets used as HTML or JavaScript code. Consider this code from an imaginary chat application:

```JavaScript
socket.on('message', function(message) {
    var div = document.createElement('div');
    div.innerHTML(message.body);
    document.getElementById('chat-pane').appendChild(div);
});
```

What if `message.body` contains `<script>alert('hello')</script>`? The script tags will be evaluated as HTML, and the `alert` will run in the user's browser. XSS exploits allow attackers a range of options, from annoying alerts to stealing session tokens. Always use `element.innerText` or `$(element).text` to add user input to an element:

```JavaScript
socket.on('message', function(message) {
    var div = document.createElement('div');
    div.innerText(message.body);
    document.getElementById('chat-pane').appendChild(div);
});
```

Templating systems like Jade are also a vector for XSS vulnerabilities. Consider this profile page:

```Jade
.profile-section
  != user.bio
```

If a malicious user puts `<script>` tags in their bio, they'll be served to the browser as HTML, and users who visit the malicious user's page will run that JS in their own session. Use the `=` operator to html-escape any user input:

```Jade
.profile-section
  = user.bio
```

## Password Hashing

Password hashing is an important way to protect your users. You should never store users' passwords in plaintext; instead you should use a _cryptographically-secure hashing algorithm_. A hashing algorithm takes some input, like a password, and applies mathematical transformations to it that ensure the original input can't be discovered by inspecting the output. Here is a simple hash algorithm:

```JavaScript
function simpleHash(input) {
    var hash = 0;

    for (var i = 0; i < input.length; i++) {
        hash = hash ^ input.charCodeAt(i);
    }

    return hash;
}
```

This hashing algorithm isn't very good, as it has a lot of _collisions_: inputs that hash to the same output. New and improved hashing algorithms are introduced every so often; the current winner is _SHA-256_.  But for demo purposes, you can use an older system, _MD-5_ which is available right in your terminal:

```bash
md5 -s password
#MD5 ("password") = 5f4dcc3b5aa765d61d8327deb882cf99
```
 If we try it with string only one character away, or with two characters transposed, we get a completely different result:
```bash
md5 -s pastword
MD5 ("pastword") = 6a15a9a75145971d8317560bb79bed6e
md5 -s passwrod
MD5 ("passwrod") = 919e682cac825d430a580e842ff0bbc4
```
Although _MD-5_ has flaws, it demonstrates the defining features of hashing: a given input always generates the same output hash, but the process is irreversible --- knowing the hash tells you _nothing_ about the input.

<!--
### Exercise: password hashing

Take one of your previous projects that allowed signing in (or use [the login sample code](https://github.com/portlandcodeschool-jsi/authme/), if you prefer). Update it so that when a user signs up or changes their password, the password is hashed using SHA-256. When a user signs in, hash the supplied password and compare it to the stored hash. Use [Node's `crypto` library][node-crypto], specifically the `createHash`, `Hash.update`, and `Hash.digest` functions.
-->

## Password salting

Actually, hashing passwords isn't enough. An attacker who gets access to your hashed passwords can create a _rainbow table_, a list of thousands or hundreds of thousands of common passwords and their hashes, and use it to look up a hash and determine its corresponding plaintext. To combat this, you should add a _salt_ to your passwords: a chunk of random text that's added to the password before hashing. The salt isn't secret, but it should be different for each user. This forces attackers to rebuild the rainbow table for each user--a computationally infeasible task.

### Demo: the `pwd` module

The NPM module `pwd` makes it easy to implement both hashing and salting.  Here is a simple demo, in which only one user record is stored in a "database" but that record includes the user's unique salt and password hash, which can be used subsequently for authentication.

```javascript
var pwd = require('pwd');

// The user's registration info:
var raw = {name:'user', password:'password'};
// What gets stored (salt and hash TBD):
var stored = {name:'user', salt:'', hash:''};

function register(raw) {
  // Create and store encrypted user record:
  pwd.hash(raw.password, function(err,salt,hash) {
    stored = {name:raw.name, salt:salt, hash:hash};
    console.log(stored); //==>
    // { name: 'user',
    //   salt: 'BcRp8aw2jxNO...',
    //   hash: '3Myz3F5mz3Hj...' }
  })
}

function authenticate(attempt) {
  pwd.hash(attempt.password, stored.salt, function(err,hash) {
    if (hash===stored.hash)
      console.log('Success!')
  })
}

register(raw);
// After delay, try authenticating:
setTimeout(function() {authenticate(raw)},  500);
```

### Exercise: password salting and hashing

Take one of your previous projects that allowed signing in (or use [the login sample code](https://github.com/portlandcodeschool-jsi/authme/), if you prefer). Update it so that when a user signs up or changes their password, the password is salted and hashed using `pwd`. When a user signs in, hash the supplied password and compare it to the stored hash.

<!--
### Exercise: password salting

Update your password hashing algorithm so it adds a salt:

* When a new password is created (on sign-up or change-password), generate 8 or so random characters and append them to the password before hashing.
* When storing the user's password, store the salt as well.
* When checking a user's password (on sign-in), read the salt from the user record and append it to the supplied password before hashing.
-->

[smbc-soceng]: http://www.smbc-comics.com/index.php?db=comics&id=2526
[node-crypto]: nodejs.org/api/crypto.html
[xkcd-sql-injection]: https://xkcd.com/327/
