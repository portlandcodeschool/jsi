I'd like to cover:

DNS really fast

SQLi

XSS/JSi

minification/bundling

## DNS really fast

DNS, the Domain Name System, provides the mapping between a hostname like `portlandcodeschool.com` and the IP address of a server, like `54.231.237.70`. Getting your own domain name requires registering with the owner of a top-level domain (like `.com`). Typically you'll do this through a registrar like [Namecheap](https://www.namecheap.com/) or [Gandi](https://www.gandi.net/). They'll collect a fee to register the domain, and host nameservers that associate your domain with your servers. The most common record types you'll publish are `A`/`AAAA`, `CNAME`, and `MX`.

* `A` and `AAAA` records point a domain name to a particular IP address. An `A` record points to an IPv4 address and an `AAAA` record points to an IPv6 address.
* `CNAME` records point one domain name to another. This is what you'll commonly use when hosting projects on heroku: instead of telling people to visit valiant-stream-2345.heroku.com, you'll use a `CNAME` to point yourdomain.com to the Heroku hostname, and end-users won't ever have to see the weird Heroku url. The browser will look up `yourdomain.com`, find the `CNAME` pointing to valiant-stream-2345.heroku.com, look up its `A` or `AAAA` record, and start communicating with that IP address.
* `MX` records are a lot like `CNAME`s in that they point to another domain name, but they're specifically for mail servers. When you send mail to `someone@portlandcodeschool.com`, your mail client will look up `portlandcodeschool.com`, find a list of mail servers run by Google, look up one of their `A`/`AAAA` records, and send email to that IP address.

You can use the `dig` command-line program to find out about a hostname's DNS records. `dig HOSTNAME` will find out the A record for HOSTNAME, while `dig HOSTNAME RECORD_TYPE` will find the specified record type. For example:

```
$ dig portlandcodeschool.com

; <<>> DiG 9.8.3-P1 <<>> portlandcodeschool.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 37142
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;portlandcodeschool.com.        IN  A

;; ANSWER SECTION:
portlandcodeschool.com. 59  IN  A   54.231.235.23

;; Query time: 74 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Thu Jun 25 13:42:20 2015
;; MSG S

$ dig portlandcodeschool.com MX

; <<>> DiG 9.8.3-P1 <<>> portlandcodeschool.com MX
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 19560
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;portlandcodeschool.com.        IN  MX

;; ANSWER SECTION:
portlandcodeschool.com. 299 IN  MX  1 aspmx.l.google.com.
portlandcodeschool.com. 299 IN  MX  10 aspmx2.googlemail.com.
portlandcodeschool.com. 299 IN  MX  10 aspmx3.googlemail.com.
portlandcodeschool.com. 299 IN  MX  5 alt1.aspmx.l.google.com.
portlandcodeschool.com. 299 IN  MX  5 alt2.aspmx.l.google.com.

;; Query time: 30 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Thu Jun 25 13:28:36 2015
;; MSG SIZE  rcvd: 170
```

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
  database.query("select * from users where username = $1", [request.body.username], function(error, result) {
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
