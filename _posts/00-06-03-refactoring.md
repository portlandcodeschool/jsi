---
layout: post
title: Refactoring
class: refactoring
date: 2015-02-11
---

By now you've written a good amount of code. You've probably ended up with a jumbly mess at times. Here's what happens when you leave it that way:

[![Comic](http://abstrusegoose.com/strips/you_down_wit_OPC-yeah_you_know_me.png)](http://abstrusegoose.com/432) <small>[via @britanytarvin](https://twitter.com/brittanytarvin/status/452838810141732865)</small>

This applies both to other people reading your code as well as when you come back to read your code a few weeks/months/years later.

## Why Do Programming Languages Exist?

Let's get a few things straight. Programmers don't think like computers. They don't solve problems like computers. No points are awarded for terseness of the code you write. You get points for clearly expressing your intent. You get extra points when you make it really easy for other people to understand.

Programming languages exist to allow clear expression of intent, to communicate ideas to to other human beings. They just so happen to drive computers as well. The computer doesn't care if you tell it `0010101110101010100101010110111`. But a human does.

Once your code works, you may not be finished writing it. You need to make sure it's clear.

## Refactoring

Refactoring is the process of reorganizing code so that it's more clear and/or less complex without changing how it works.

There are entire books written on refactoring. Wikipedia has a [decent page][refactoring] discussing refactoring. It goes into some techniques that you could apply.

The truth is, clearly-written code is an art form. You'll better understand how to write good code as you spend time reading other people's code. You'll learn from the good code you read. You'll learn from the bad. You'll learn from yourself when you go back to code you wrote a year ago (this will continue for as long as you're a programmer).

One of the best ways to tell if what you wrote is clear is to explain it to someone else. Pair programming helps with this a lot. Writing something on your own? Explain it to a stuffed animal. Seriously&mdash;just the process of putting an idea into words can make you consider it carefully enough to see any problems.

### More content coming soon...

[refactoring]: http://en.wikipedia.org/wiki/Code_refactoring
