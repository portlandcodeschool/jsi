#Testing your JavaScript

Tests are pieces of code that you write to tell you if the other code you've written is doing what you think it should. If you've written anything that automates input so that you can see if the output is correct--perhaps you automated a sequence of moves in your text adventure game?--you've already taken your first step down the road of testing.

Testing is important for a number of reasons: Having a good set of tests written up can make things much easier when you're writing your code, of course. But there are other reasons to be familiar with testing:

- A comprehensive suite of tests can function as documentation for your code; tests describe the expected functionality of code, and it's more likely that tests will be kept up to date than comments.
- Tests ensure that when you introduce changes after months of not looking at your code, you'll be able to quickly tell if you've broken anything important.
- Writing code with tests in mind will ensure that you write code than can be easily tested--code made up of many discrete functions that are each responsible for a single thing, which is one of the main principles of object-oriented programming.
- As a junior developer, one of the most common jobs for you to start out with is writing tests for code that doesn't currently have any. This is great for junior devs because it both teaches them the codebase they're working with and keeps them from breaking anything too valuable.

##Node's Assert Library

Testing works with *assertion libraries*, which are essentially just pre-baked ways of comparing an expected answer to an actual result. While vanilla javaScript doesn't have a built-in assertion library, Node does: the [Assert library] (https://nodejs.org/api/assert.html). As you might expect, it's pretty bare-bones, but it contains enough useful functions to take us a long way:

```js
var arr = [1,2,3],
    lastElem = arr.pop();

assert.equal(lastElem, 3, "expected " + lastElem + " to equal 3, but it didn't!" );
```

Note that when you try this, you won't see any feedback from Node unless the assertion fails. You're telling Node that you expect these two things to be equal, and if they are, it sees no reason to say anything. If you like, you can imagine Node stoically nodding its head in agreement.

`assert.equal` can do a lot for us, but it can't do everything. Have a look at some of the other methods available in Assert, and then write some tests for some of the other methods of Array. `push`, `length`, and `shift` are reasonable places to start. Note that you'll want to test both the return values and the side effects--if the method changes the array, you'll want to test that it made the changes correctly and also that it returned the right value.

##The Mocha testing framework

Tests written exclusively with Assert can do a lot of things, but they can get cumbersome to use, especially when you need to start testing asynchronous code. It also doesn't give you much in the way of feedback. To deal with this, we can use (Mocha)[http://mochajs.org/], a widely-used testing framework that can handle asynchronous code and promises, as well as giving us useful reports for how the tests went and allowing us to specify certain behaviors before or after the tests. The one thing that Mocha does not do is handle the actual tests themselves; it leaves that up to any assertion library you'd like to use, which means that if you want to, you can just use Node's built-in Assert library.

In order to use Mocha, you'll need to install it on your system. Since it's a module that we'll want to use repeatedly rather than one we'll want to use in one specific project, we'll install it globally: `sudo npm install -g mocha`. Once Mocha is installed, you can run it from anywhere on your system with the command `mocha`. When it runs, it will look for a subdirectory called `test` and run all the test files in that directory. This lets you keep your tests discrete from your code, rather than including them in the code that you're testing. Note that doing this will require modularizing your code so that it can be required by the test files.

While the assert code itself won't change, Mocha does need some code surrounding it to provide some structure for the tests. You'll also need to `require` both the assertion library you're using and the the file you're testing, which means that your code will have to be modularized so that it can be exported to the Mocha tests. A start on the tests might look something like this:

```js
var fakeArray = require('../array.js');
var assert = require('assert');

describe('My fake array object', function() {
  describe('The pop method', function() {

    before(function() {
      fakeArray[0] = 1;
      fakeArray[1] = 2;
      fakeArray[2] = 3;
      fakeArray.length = 3;
    });

    it('should return the final element', function() {
      assert.equal(fakeArray.pop(), 3);
    });
  });
});
```


###Writing and testing fake arrays

Copy the tests you wrote for arrays into their own file and put it in a subdirectory called `test`, then use the example above as a template to get the rest of your tests into a format that Mocha likes. Next, make sure that the code for your fake array is properly modularized so that it can be exported to the tests, then test it by running `mocha`.

##Better assertions with Chai

Node's Assert library works well enough, especially when we pair it with Mocha, but it could be more readable. To make our testing even better, we can choose to use a different assertion library. [Chai](http://chaijs.com/api/bdd/) offers a whole host of methods for testing, and enables three different flavors of assertions: one based on the standard "assert" style of testing, and two others that use "should" and "expect" respectively. We'll be using Chai's expect-style testing, so at the top of your file you'll have to include:

```js
var chai = require('chai');
var expect = chai.expect;
```


