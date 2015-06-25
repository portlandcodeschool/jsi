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
