---
layout: post
title: Modules
class: modules
date: 2015-05-07
---

Today we'll continue to discuss abstractions. We'll create some common abstractions and group them together into _modules_. Finally, we'll focus on clearly expressing what functions do, by documenting code.

## Modules

### Creating Modules

Modules are created by placing code in a separate file. You can put whatever code you want to in that file, but you can _expose_ values and objects that you want to through the object `module.exports`. In Node.js, all modules start with an empty `module.exports` object, so you can add properties directly to that.

{% highlight javascript %}
/**
 * @file array-functions.js
 */

module.exports.each = function(array, fn) {
  // definition of the `each` function
};
{% endhighlight %}

Alternatively, you can directly assign the `module.exports` object.

{% highlight javascript %}
/**
 * @file array-functions.js
 */

module.exports = {
  each: function(array, fn) {
    // function definition
  }
};
{% endhighlight %}

These two ways of exposing the `each` function are identical.

#### Quick Status Check

- Create a new module that exports the `each` function that we wrote last class.
- Expose a new function from this module called `sayHello` that simply logs `"hello world"`. (You'll probably choose to delete this later.)
- Expose a new property from this module called `version` that indicates the version of this module's code (call it 0.1.0 for now).
- Try switching to the other method of populating `module.exports`.

### Using Modules

In order to use a module, you use `require` to access the values that it has exposed. You pass `require` one argument, a string that allows it to find the module. For now we're going to be using a relative path, but we'll later see other uses.

{% highlight javascript %}
/**
 * @file app.js
 */

var arrayFunctions = require('./array-functions');
var fruits = ['kiwi', 'strawberry', 'banana'];

arrayFunctions.each(fruits, function(fruit) {
  addFruitToSmoothie(fruit);
});
{% endhighlight %}


<aside>
<h4>Isn't this just complicating things more?</h4>

At this point, it may feel forced to be splitting up our code into two files. We're trying to develop some good habits early, though. Soon you'll be writing hundreds (and even thousands) of lines of code. Learning when and how to modularize your code base is an extremely important skill to develop.

This is where programming becomes more of an art than a science. There's no formula or recipe to follow to know how to break up large code bases. There are common patterns that people follow, and we'll discuss those, but many projects do things differently. Practice and observation will improve your ability to figure out good places to modularize.
</aside>


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

## Challenges

All of these challenges should be completed by writing code in a module. You should use test driven development and git as well. Issue a pull request for each challenge you complete on [this repo][github-jsi-modules].

- Implement a `map` function. Be sure to use test driven development.
- Alter the `each` function to give two arguments to the iteration function, the object (as was already done), and the index of the object. For instance:
  {% highlight javascript %}
each(['table', 'chair'], function(object, index) {
  console.log('The ' + object + ' is at index ' + index);
});
  {% endhighlight %}
- Implement a `times` function that simply calls a function a given number of times. For instance:
  {% highlight javascript %}
times(5, function(n) {
  console.log('This has been called ' + n + ' time(s).');
});
  {% endhighlight %}

## Command line programs

We've been using command line programs since day one. Now we're going to make one of our own.

First, let's take a look at how these programs commonly work. Run

{% highlight bash %}
npm install -g jasmine
jasmine -h
{% endhighlight %}

We just used two command line programs, `npm` and `jasmine`. Seeing the help for Jasmine should give you a pretty good idea of how command line programs typically work. Usually they take arguments and use those arguments to figure out what to do.

So what if we wanted to make a weather program?

    Usage: weather [options] [location]

    Options:

      -h, --help          output usage information
      -V, --version       output the version number
      -c, --celsius       show temperature in celsius
      -f, --fahrenheit    show temperature in fahrenheit

So our program needs to be able to handle displaying help, displaying the version, outputting in Celsius, and outputting in Fahrenheit. It also needs to allow a location to be specified. Let's get to work.

{% highlight javascript %}
// weather.js, run with node weather.js

console.log(process.argv);
{% endhighlight %}

We're on the right track, but when we run `jasmine`, we don't have to run `node`, we simply run `jasmine`. Let's get that working:

{% highlight bash %}
mv weather.js weather
chmod +x weather
{% endhighlight %}

{% highlight bash %}
#!/usr/bin/env node

console.log(process.argv);
{% endhighlight %}

{% highlight bash %}
./weather
{% endhighlight %}

So what's all that? We made an _executable_ file without a JavaScript extension. We added a [_shebang_][shebang] at the top of the file. The shebang indicates to the system what interpreter to use to run the program. We're telling it to use `node`. Finally, we can now run our program via `./weather`. We can't simply run `weather` because the computer doesn't usually search the current working directory for programs to execute, so we instruct it to run by specifying a relative path.

<aside>
<h4>Shebang</h4>

Shebang is short for "hash bang," since "!" is often pronounced "bang." The shebang is actually ignored by the Node interpreter when it's run. So you can also run `node weather` and it will work. The `#!` is the actual shebang. The remaining part is the program to run instead of executing the file directly. In this case, we're using the `env` command to look up the `node` that the user prefers. To really understand how this all works, you could consider doing the advanced project below, reimplementing `which`.
</aside>

Here's how we could handle arguments:

{% highlight javascript %}
var celsius = false;
var fahrenheit = false;
var location = null;

each(process.argv.slice(2), function(arg) {
  switch (arg) {
    case '-h':
    case '--help':
      console.log("Here's some help...");
      process.exit(0);
      break;
    case '-V':
    case '--version':
      console.log('weather 0.1.0');
      process.exit(0);
      break;
    case '-f':
    case '--fahrenheit':
      fahrenheit = true;
      break;
    case '-c':
    case '--celsius':
      celsius = true;
      break;
    default:
      location = arg;
      break;
  }
});

if (!celsius && !fahrenheit) {
  fahrenheit = true;
}

if (!location) {
  location = 'Portland, OR';
}

console.log('The weather in %s is hopefully sunny.', location);
if (fahrenheit) {
  console.log('The temperature is 70 fahrenheit.');
}
if (celsius) {
  console.log('The temperature is 21 Celsius.')
}
{% endhighlight %}

Well that's a lot of code, it doesn't handle everything perfectly, and I'm certain that someone else out there has solved this same problem&hellip;

Is there a module for this?

## NPM

`npm` is Node's package manager. It's a command line tool that will allow us to easily install and manage different modules. Its [website][npm] is also useful for searching for modules. Let's look for a _command line_ module.

And guess what? There [is one][commander]!

Now let's use it.

<aside>
<h4>Popularity</h4>

Note that popularity is a pretty good indicator of whether or not you should consider using a module. You should also check to see how many open &amp; closed issues a project has, as well as how long it's been since the project has been worked on.

<h4>Licenses</h4>

Most projects on npm are hosted on GitHub and are licensed under the MIT open source license. This may not always be the case. Be respectful of the license under which a project is released. Generally, you'll be safe to use projects off of npm without worrying about the license (the author published to npm after all). If you're looking at a project for ideas in your own project, though, you should look at the license before you take any ideas or code from it. If copying code, you almost always have to credit the author regardless of license.
</aside>

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

#### Installing Modules

{% highlight bash %}
npm install --save commander
{% endhighlight %}

You'll note that in your project directory you have a folder called `node_modules` as well as a file called `package.json`. `npm` is using these to manage the modules you're working with. The `--save` option indicated that you wanted to save `commander` as an entry in your `package.json` file. Using the `package.json` file, `npm` can easily re-create the list of packages you've installed on other machines with a simple `npm install`. This makes collaboration (and deployment) much easier.

Now let's update our weather program to use Commander.js instead of the custom code that we wrote.

<aside>
<h4>Red Flag: Code Duplication</h4>

We've duplicated the version number now in both the npm information as well as in the `weather.js` file. Duplication leads to problems down the line as you'll likely forget to make changes to every place that uses that duplicate piece of information. We'll later learn how we can avoid this duplication.
</aside>

## Projects

These projects are intentionally vague. You'll have to discuss how the user will interact with your program and arguments they will pass to your program to make it do what they want. Don't forget to continue to use TDD. Also, you should set up a repository on GitHub for this small project to allow easy collaboration while pair programming.

- Write a calculator
- Write a program where the player needs to find their way through a maze
- **Advanced:** Write your own version of the `which` command. This challenge will require you to learn a little about how Unix indicates that files are _executable_ as well as _environment variables_ and what the _user's path_ means. Read `man which` for details on how this program works.

[jsdoc]: http://usejsdoc.org
[mdn-typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
[github-jsi-modules]: https://github.com/portlandcodeschool/jsi-modules
[shebang]: http://en.wikipedia.org/wiki/Shebang_(Unix)
[npm]: https://www.npmjs.org
[commander]: https://www.npmjs.org/package/commander
