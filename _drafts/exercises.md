---
layout: page
title: Exercises
---

## Prologue: The JavaScript REPL

If you go to your command line and just run `node`, you'll get a prompt that's just a `>`. This is called the node _repl_ (which stands for read, evaluate, print, loop) (pronounced "repple"). Many modern languages provide a repl and it's a very handy tool for poking at your code and trying things out.

Suppose you have a file called `myCode.js` that provides some functions:

```JavaScript
// I am myCode.js

module.exports.addTwo = function(n) {
    return n + 2;
}

module.exports.halve = function(n) {
    return n / 2;
}

```

Now you can use the repl to poke at that code:

```
$ node
> var myCode = require('./myCode');
undefined
> myCode.halve(4);
2
> myCode.addTwo(8999);
9001
>
```

This can be a handy way to get JavaScript practice, without having to worry about integrating with other stuff like Jasmine.

**There is one caveat**, however: once you `require('./myCode')`, the repl won't pick up any changes to `myCode.js`. You'll need to either close and re-open the repl, or use `require.cache.myCode = undefined` and `require('./myCode.js')` to unload and reload your file.

## Exercises

### Exercise One

Create a function called `invert` that divides 1 by its input.

```
> invert(4)
0.25
> invert(0)
Infinity
```

### Exercise Two

Update your `invert` function so that dividing by zero gives zero.

```
> invert(0)
0
```

### Exercise Three

Create a function called `reverse` that receives an array and returns a new array that is the reverse of the given array.

```
> reverse([1, 2, 3])
[3, 2, 1]
> reverse(["a", "b", "c"])
["c", "b", "a"]
> reverse(["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"])
["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"]
```

### Exercise Four

Create a function called `inits` that takes an array and returns an array of arrays, the initial part of the input array in increasing length.

```
> inits([1])
[[], [1]]
> inits([1, 2])
[[], [1], [1, 2]]
> inits([1, 2, 3, 4])
[[], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4]]
```
