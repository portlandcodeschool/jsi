---
layout: post
title: DNS and Networking
class: special topics
date: 2015-06-30
---

What happens when you type a URL, like `portlandcodeschool.com`, into your browser? There are quite a few steps between there and when you see a rendered page:

1. The browser makes a _DNS lookup_ to find out what IP address corresponds to the given hostname.
1. The browser creates a _TCP session_, a network connection to the relevant IP address.
1. The browser may set up an _SSL/TLS session_ with the server, to encrypt the communication.
1. The browser sends an _HTTP request_ to the server.
1. The server reads the HTTP request and decides what to do with it.
1. The server sends an _HTTP response_ to the browser.
1. The browser parses the HTTP response.
1. The browser evaluates the content of the HTTP response (which may be HTML, text, an image, etc) and shows it to the user.

Today we'll focus on that first step, the DNS lookup.

## DNS

The _Domain Name System_ is a distributed key/value store. We've seen key/value stores like Mongo before. The DNS system is globally distributed; all sorts of organizations and companies provide nameservers for various purposes. When someone talks about "registering a domain," they typically mean paying a registrar to manage a domain for them. The registrar acts as a middleman, telling the "root servers" that the hostname is taken and that they'll handle the DNS requests for that name. They add your domain to their webservers and point it where you tell them. The fee for this service can vary with the top-level domain, with silly TLDs like `.website` going for a few dollars while `.luxury` domains cost a couple hundred a year.

You can use the `dig` command-line tool to find out what server hosts a given domain. For example, here's `portlandcodeschool.com`:

```
$ dig portlandcodeschool.com

; <<>> DiG 9.8.3-P1 <<>> portlandcodeschool.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36092
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;portlandcodeschool.com.        IN  A

;; ANSWER SECTION:
portlandcodeschool.com. 59  IN  A   54.231.236.15

;; Query time: 34 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Mon Jun 22 14:54:45 2015
;; MSG SIZE  rcvd: 56
```

The important part is the `ANSWER SECTION`, which says the `A` record for portlandcodeschool.com points to `54.231.236.15`. DNS records can have different types. `A` and `AAAA` records indicate the main IP address (IPv4 and v6, respectively) of the servers that handle a domain. The other types of record you'll commonly use are `CNAME` (canonical name), which aliases one domain to another, `MX` (mail exchanger), which is used by email systems, and `TXT` (text), which is used for various types of information about a domain. A domain can have multiple records of the same type. For example, as of this writing, portlandcodeschool.com has 5 MX records:

```
$ dig portlandcodeschool.com MX

; <<>> DiG 9.8.3-P1 <<>> portlandcodeschool.com MX
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 58298
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;portlandcodeschool.com.        IN  MX

;; ANSWER SECTION:
portlandcodeschool.com. 299 IN  MX  1 aspmx.l.google.com.
portlandcodeschool.com. 299 IN  MX  10 aspmx2.googlemail.com.
portlandcodeschool.com. 299 IN  MX  10 aspmx3.googlemail.com.
portlandcodeschool.com. 299 IN  MX  5 alt1.aspmx.l.google.com.
portlandcodeschool.com. 299 IN  MX  5 alt2.aspmx.l.google.com.

;; Query time: 100 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Mon Jun 22 15:18:09 2015
;; MSG SIZE  rcvd: 170
```
