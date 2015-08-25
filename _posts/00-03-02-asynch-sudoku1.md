---
layout: post
title: Node, NPM, Modules, and Async callbacks (Sudoku part 1)
class: node
date: 2015-08-25 00:00:00
---

## Modules

### Creating Modules

Modules are created by placing code in a separate file. You can put whatever code you want to in that file, but you can _expose_ values and objects that you want to through the object `module.exports`. In Node.js, all modules start with an empty `module.exports` object, so you can add properties directly to that.

{% highlight javascript %}
/**
 * @file output-functions.js
 */

module.exports.say = function(message) {
  console.log(message);
};
{% endhighlight %}

Alternatively, you can directly assign the `module.exports` object.

{% highlight javascript %}
/**
 * @file output-functions.js
 */

module.exports = {
  say: function(message) {
    console.log(message);
  }
};
{% endhighlight %}

These two ways of exposing the `say` function are identical.

#### Quick Status Check

- Create a new module that exports the `say` function in one of the ways above.
- Expose a new function from this module called `sayHello` that simply logs `"hello world"`.
- Expose a new property from this module called `version` that indicates the version of this module's code (call it 0.1.0 for now).
- Try switching to the other method of populating `module.exports`.

### Using Modules

In order to use a module, you use `require` to access the values that it has exposed. You pass `require` one argument, a string that allows it to find the module. For now we're going to be using a relative path, but we'll later see other uses.

{% highlight javascript %}
/**
 * @file app.js
 */

var outputFns = require('./output-functions');
var fruits = ['kiwi', 'strawberry', 'banana'];

fruits.forEach(outputFns.say);
{% endhighlight %}


<aside>
<h4>Isn't this just complicating things more?</h4>

At this point, it may feel forced to be splitting up our code into two files. We're trying to develop some good habits early, though. Soon you'll be writing hundreds (and even thousands) of lines of code. Learning when and how to modularize your code base is an extremely important skill to develop.

This is where programming becomes more of an art than a science. There's no formula or recipe to follow to know how to break up large code bases. There are common patterns that people follow, and we'll discuss those, but many projects do things differently. Practice and observation will improve your ability to figure out good places to modularize.
</aside>

<!--
## Documenting Code

What does this function do?

{% highlight javascript %}
module.exports.map = function(array, fn) {
  // `map` function definition
};
{% endhighlight %}

Well, maybe if I saw it used, it would make more sense, right?

{% highlight javascript %}
console.log(arrayFunctions.map([1,2,4,5,6,7], function(a) {
  return a * a;
}));
{% endhighlight %}

You may be able to guess (especially if you've done some programming in other languages before), but you also may not be able to. Knowing the result may help as well, but it's still a lot of work to try to figure things out this way.

Even if you can guess from the code and the result, would you feel comfortable writing code that used this `map` function? What if someone else wrote it and decides to change how it works ever so slightly? They never told you how it works, so why can't they change it?

When you write modules or any code that someone else will be building off of, for that matter, you should document it.

An example:

{% highlight javascript %}
/**
 * Create a new array by applying `fn` to each element in `array`
 * and using each result as the items of the new array.
 *
 * @function
 * @param {array} array - Input array
 * @param {function} fn - Mapping function
 * @returns {array} A new array
 * @example
 *
 * // create an array of squares
 * map([1,2,3], function(n) {
 *   return n * n;
 * });
 * //=> [1, 4, 9]
 *
 * @example
 *
 * // make all words plural (simple logic)
 * var pluralize = function(word) {
 *   return word + 's';
 * }
 * map(['dog','cat'], pluralize);
 * //=> ['dogs', 'cats']
 *
 */
var map = function() {
  // map function definition
};
{% endhighlight %}

This specific format is used so that we can use [JSDoc][jsdoc] to create web pages that we can share with others. Even if you don't plan on publishing the documentation, it can't hurt to follow a rigid structure like this. It really makes you think about how your functions should work. Running this code through JSDoc makes it even easier to understand the function:

<iframe src="{{ site.baseurl }}/jsdoc-example/global.html" width="100%"></iframe>

A list of the parameter types in JavaScript that you can use to document your functions can be found in the [`typeof` documentation][mdn-typeof].
-->

## NPM

`npm` is Node's package manager. It's a command line tool that will allow us to easily install and manage different modules. Its [website][npm] is also useful for searching for modules. 

<aside>
<h4>Popularity</h4>

Note that popularity is a pretty good indicator of whether or not you should consider using a module. You should also check to see how many open &amp; closed issues a project has, as well as how long it's been since the project has been worked on.

<h4>Licenses</h4>

Most projects on npm are hosted on GitHub and are licensed under the MIT open source license. This may not always be the case. Be respectful of the license under which a project is released. Generally, you'll be safe to use projects off of npm without worrying about the license (the author published to npm after all). If you're looking at a project for ideas in your own project, though, you should look at the license before you take any ideas or code from it. If copying code, you almost always have to credit the author regardless of license.
</aside>

<!--
### Setting Up a Project

{% highlight bash %}
mkdir my-project
cd my-project
git init
echo "node_modules" > .gitignore
npm init
git add .
git commit -m 'Setting up project.'
{% endhighlight %}


Practice installing dependencies and building a package.json file!
On your command line, do the following:
> cd (whatever directory this file is in...)
> mkdir node_modules
> more package.json
> npm install moment --save
> more package.json
> ls node_modules

#### Installing Modules

{% highlight bash %}
mkdir node_modules
npm install
{% endhighlight %}

You'll note that in your project directory you have a folder called `node_modules` as well as a file called `package.json`. `npm` is using these to manage the modules you're working with. The `--save` option indicated that you wanted to save `commander` as an entry in your `package.json` file. Using the `package.json` file, `npm` can easily re-create the list of packages you've installed on other machines with a simple `npm install`. This makes collaboration (and deployment) much easier.
-->


### NPM demo

Fork [this repo](https://github.com/portlandcodeschool-jsi/sudoku-fall15
) to your group's organization.  Then have each person clone your fork (not the original).

Once you've cloned the repo, take a look at the file `package.json` and notice that two modules are listed in the "dependencies" section.



### Lodash and Underscore

[Lodash][lodash] is a general-purpose Javascript library which has includes several utilities which may be useful for our Sudoku project.
Lodash is a cousin of another library [Underscore][underscore] and can be used interchangeably with it for some frameworks (including Backbone).
Here's a [discussion](http://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore) of the differences between them.

Take a look at the Lodash documentation to find some function which sound useful.  You might begin with any of these: 'intersection', `union`, `difference`, `xor`, `unique`, `chunk`.

<!--
### Test Driven Development

Jasmine is designed to work well with callback-based, or _asynchronous_, functions. Every time you write a test with `it`, you can provide an additional argument to your function, usually called `done`. `done` is a function that you should call once everything has been completed. That means you can call it from your callback.

Let's clear out the definition of `oven.setTimer` and write a few tests, make sure that they fail, and work out the definition of `oven.setTimer` again.

{% highlight javascript %}
describe('oven.setTimer()', function() {
  it('calls the callback', function(done) {
    oven.setTimer('0s', done);
  });
});
{% endhighlight %}

### Challenges

Don't forget to use Git and TDD.

- Write a function, `setReminder(date, callback)` that will execute the callback at the given time. You'll need [`setTimeout`][node-settimeout] and [dates][mdn-dates]. There's also an [MDN page on `setTimeout`][mdn-settimeout].
- Create a stopwatch that counts to `10` using `setTimeout`.
- Create a stopwatch that counts to `10` using `setReminder`.
- Use [Lo-Dash][lodash], specifically [`_.range`][lodash-range], to create a stopwatch that counts to `10`. Try implementing this with both `setTimeout` directly and also with your `setReminder` function.
- **Advanced:** Make `setReminder` use strings instead of a date object, so you can type `tomorrow at 3pm` or `noon`. This is called _natural language processing_. Truly generic _natural language processing_ is very difficult to implement, so start by setting some rules about what sort of natural-language text your program will accept.
-->

## I/O

### Jargon

I/O is short for Input/output. This has meanings in both computer hardware and software. I/O in software generally refers to communication with hardware devices, mice, keyboards, monitors, hard drives, etc.

<aside>
Accessing files via the <em>file system</em> is one form of I/O. Because accessing files is probably the most common form of I/O, you will hear the term I/O used when someone is just referring to work they're doing with files.
</aside>

### Speed

I/O is slow. It may not feel that way to you, but to a computer it's _orders of magnitude_ slower than the code you've written so far. The difference is about the same as the difference between the speed at which a baby crawls and the speed of a fighter jet.

What does this mean to you?

It means we shouldn't wait for the I/O. We should continue doing whatever we can while I/O happens. We use callbacks!

### Reading Files

Here's how you [read a file][node-readfile]:

{% highlight javascript %}
var fs = require('fs');

fs.readFile('./path/to/file', { encoding: 'utf8' }, function(err, contents) {
  console.log(contents);
});
{% endhighlight %}

#### And now, a tangent!

_UTF-8_ is a string encoding. That certainly made it a lot clearer. Computers work with zeros and ones. You've certainly heard that before. These are called _bits_. Eight bits make up a _byte_. So one byte could be something like `01100001`. Strings are actually just sequences of characters, right? Well each character is backed by these zeros and ones somehow. Sometimes each character is represented by a single byte, and there's a one-to-one mapping between bytes and characters. The standardized mapping used to do this is called ASCII. The letter `a`, for instance, is represented by the byte `01100001`, and `b` by the byte `01100010` (if you've never counted in binary, that's just `01100001 + 00000001`). It works okay, but has limitations&mdash;in particular, it can only encode English text.

One byte is only able to represent 256 (2^8) different options. If you start mapping out all of the characters you need to represent all of the languages of the world (plus the emoji), you'll realize you run out pretty quickly. In fact ASCII only uses 7 bits per character. So it can only represent 128 characters. That's not a lot. The Unicode standard was introduced to address this limitation.

There are a few common _encodings_ used with Unicode. They are UTF-8, UTF-16, and UTF-32. Each of these specifies the number of bits that it uses by default. UTF-8 is 8 bits (or 1 byte). UTF-16 is 16 bits (or 2 bytes). UTF-32 is 32 bits (or 4 bytes). You can read up on them independently, but the main thing to know is that UTF-8 is the dominant encoding that supports all of the world's languages.

* UTF-8 is a variable-length encoding that's backwards-compatible with ASCII. What this means is that you can read ASCII-encoded files by pretending they're UTF-8. "Variable-length encoding" means that the number of bytes per character varies depending on the character being encoded. Variable-length encodings are somewhat slower to work with in certain circumstances.
* UTF-16 is variable-width as well (either 2 or 4 bytes), but incompatible with ASCII. Don't use it unless you have to.
* UTF-32 is fixed-width. That means every character is represented by 4 bytes. This results certain files being four times larger than UTF-8, but has the advantage that you know the 2,000th character starts at the 8,000th byte (`2000*4`). Unlike UTF-8 and UTF-16, you don't have to read the first 2,000 characters to know if any of them are represented by multiple bytes. This _random access_ to characters is only needed in specific applications.

Unicode characters are often represented in hexadecimal, so `a` in UTF-8 is `0x96`, `z` is `0x7a`, and &#128169; is `0xf09f92a9`.

Why does all of this matter? When you write code that receives user input, you either need to specify that the input must be a certain encoding or will need to consider the possibility that the input could be encoded with any encoding. These are the common encodings, but since the history of computers goes back pretty far, there are some older encodings, some failed encodings, and some platform-specific encodings that exist. If you've been using the Internet for a while, you've probably seen garbled text in emails or comments. This usually happens when someone sends text in one encoding, but your computer displays it in a different one, for one reason or another. This problem occurs much less often now that browsers have gotten much better about indicating the encoding they've sent.

Some other time, you can watch [this YouTube video](https://www.youtube.com/watch?v=MijmeoH9LT4) that explains UTF-8.

### Project

Write a program that takes two arguments, the paths to two different text files. The program should output all of the words that are used in both files.

<aside class="objective">
{% highlight bash %}
$ ./shared-words --help

  Usage: shared-words [options] <file1> <file2>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -n, --number   Report just the number of words
    -v, --verbose  Be more verbose,
                   report timing information

$ ./shared-words file1.txt file2.txt
programming
code
node
javascript

$ ./shared-words --number file1.txt file2.txt
4 words in common

$ ./shared-words -n -v words1.txt words2.txt
[time] read the files: 3ms
[time] word comparison: 9ms
435 words in common.
{% endhighlight %}
</aside>

## Benchmarking I/O

We talked about speed earlier, and we know that reading files can be slow. Let's analyze the performance of the code that we're writing now, though. How can we do this?

{% highlight javascript %}
var time = function(name) {
  var start = Date.now();
  return function() {
    console.log('[time] %s: %dms', name, Date.now() - start);
  };
};

var done = time('reading file');
fs.readFile('path/to/file', function(err, buffer) {
  done();
});
{% endhighlight %}

Analyze the performance of both reading the files as well as the code that figures out which words are shared. See which takes longer. Don't include the actual logging of shared words in how long it takes. Just the part that figures out which words are shared.

How long does your program take to compare the words [here][github-jsi-words]? It will depend on the speed of your computer, but it should be less than 100ms.

If you've got some extra time, add an option to write the files to a file instead of to the terminal.

#Project Of The Week: Sudoku Solver

For the first week's project, you'll be building an application that solves Sudoku puzzles.  More details will follow soon, but here's a broad outline.

This project will have 4 modules, each implementing a constructor:

* _DigitSet_: each instance of a DigitSet will represent a subset of 9 possible characters '1'-'9'.  Each set of digits should be unordered and have no duplicates; that is, each each possible digit is either present or absent from the set.  You'll need this to represent the partial knowledge available in each Sudoku square.

* _Grid_: each Grid instance will represent a 9x9 grid of squares, each holding a known digit or a set of possible digits.  Each square belongs to three different groups: a row, a column, and a 3x3 block.
<p>
This object will have methods for retrieving certain squares and groups, for getting and setting the possible digits in each square, and for importing and exporting the entire grid into other formats.

* _Viewer_: a viewer instance will be responsible for the display of a board, with various methods to represent its board as a string or, eventually, a browser graphic.

* _Solver_: a solver instance will be able to deduce the contents of uncertain squares and eventually solve the entire grid.

You will be responsible for writing the first three modules, _DigitSet_, _Grid_, and _Viewer_, according to a specification which will be compatible with a _Solver_.  On Tuesday, we'll explore precisely what a "module" is and how they work together in projects.

As part of your development process, you'll need to write tests which validate the behavior of your modules.  On Wednesday, we'll talk about writing test with Mocha and Chai, frameworks for testing and assertions.

On Thursday, we'll provide at least an initial version of a _Solver_ which should be able to solve the Sudoku puzzles encoded in your _Grid_ and use your _Viewer_ to display it.

### Glossary

* _square_ or _cell_: one of the 81 spaces holding a single digit

* _block_: one of the nine 3x3 grids of adjacent squares

* _row_: one of the nine 1x9 rows of squares

* _column_ or _col_: one of the nine 9x1 columns of squares

* _group_: a set of nine squares, either a row, column, or block.  Each square on the board will belong to three groups, one of each type.

* _token_: any Javascript value which is proprietary to your module but held temporarily by another module (e.g. the Solver).  Your token will be generated by one of your own methods and given back as an argument to other methods; only your module knows its format and interpretation.
A token may be a primitive (e.g. string or number) or any kind of object, including Arrays.

## Module APIs

### DigitSet constructor

* `new DigitSet()` --> digitSet instance
* `new DigitSet(digitArray)` --> digitSet instance
* `new DigitSet(singleDigit)` --> digitSet instance

### DigitSet instance methods

* `digitSet.size()` --> integer 0-9; how many digits are possible here
* `digitSet.set(arrayOfDigits)`
* `digitSet.add(digit)` --> undefined, modify original
* `digitSet.add(digitSet)` --> undefined, modify original
* `digitSet.eliminate(digit)` --> modify
* `digitSet.eliminate(digitSet)`
* `digitSet.toString()` --> string of digits in set
* `digitSet.toArray()` --> array of digits

* `digitSet.isUncertain()` --> boolean
* `digitSet.contains(digit)` --> boolean

### Grid constructor

* `new Grid(initString)` --> grid instance
* `new Grid()` --> grid instance


### Grid instance methods

* `grid.cells()` --> Array of all cell tokens
* `grid.cells(groupToken)` --> Array of cell tokens associated with groupToken
* `grid.groups()` --> Array of all group tokens
* `grid.groups(cellToken)` --> Array of all group tokens associated with cellToken

* `grid.getRow()` --> array of groupTokens (all rows)
* `grid.getCol()` --> array of groupTokens (all cols)
* `grid.getBlock()` --> array of groupTokens (all blocks)

* `grid.getRow(cellToken)` --> groupToken (row)
* `grid.getCol(cellToken)` --> groupToken (col)
* `grid.getBlock(cellToken)` --> groupToken (block)

* `grid.getPossible(cellToken)` --> digitSet
* `grid.setPossible(cellToken, digitSet)` --> ?

* `grid.neighborhood(cellToken)` --> digitSet of all known digits in same row, col, or block
              OR --> array of digitSets for all neighbors

* `grid.fromString(initString)` --> set up grid with known digits
* `grid.toString()` --> initString

* `grid.save()` --> savedState
* `grid.restore(savedState)`

* `grid.isInvalid()` --> return true if notices any problems, else false?

* `grid.remaining()` --> number (0-81) of uncertain cells

### Viewer constructor

* `new Viewer(grid)` --> viewer instance

### Viewer instance methods


* `viewer.showCertain()` --> string depicting 9x9 grid of digits known with certainty
/* use own game with game.toString(), then squrify that string */

* `viewer.updateView() --> decorate finished group?

* `viewer.showPossible()` --> richer display including partial info


* `viewer.showDebug()`

* `viewer.showHint(cellToken)` --> show number of possibilities at some cell

* `viewer.snapshot()` --> store snapshot
/* call grid.toString(), store that */

* `viewer.playback()` --> replay all shapshots
/* call series of viewer.showCertain() for each stored snapshot? */

* `viewer.startTimer()`
`viewer.checkTime()`

### solver methods

* `solver.deduce(cellToken)` --> new DigitSet ??

* `solver.logProgress()`



[node-readfile]: http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback
[node-settimeout]: http://nodejs.org/api/timers.html#timers_settimeout_callback_delay_arg
[mdn-dates]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[mdn-settimeout]: https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout

[lodash]: http://lodash.com
[lodash-range]: http://lodash.com/docs#range
[lodash-foreach]: http://lodash.com/docs#forEach
[underscore]: http://underscorejs.org

[big-o]: http://en.wikipedia.org/wiki/Big_O_notation
[big-o-beginner]: http://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/

[github-jsi-words]: https://github.com/portlandcodeschool/jsi-words
[jsdoc]: http://usejsdoc.org
[mdn-typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
[github-jsi-modules]: https://github.com/portlandcodeschool/jsi-modules
[shebang]: http://en.wikipedia.org/wiki/Shebang_(Unix)
[npm]: https://www.npmjs.org
