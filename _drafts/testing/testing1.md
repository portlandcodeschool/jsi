#Testing your JavaScript

Tests are pieces of code that you write to tell you if the other code you've written is doing what you think it should. If you've written anything that automates input so that you can see if the output is correct--perhaps you automated a sequence of moves in your text adventure game?--you've already taken your first step down the road of testing.

Testing is important for a number of reasons: Having a good set of tests written up can make things much easier when you're writing your code, of course. But there are other reasons to be familiar with testing:

- A comprehensive suite of tests can function as documentation for your code; tests describe the expected functionality of code, and it's more likely that tests will be kept up to date than comments.
- Tests ensure that when you introduce changes after months of not looking at your code, you'll be able to quickly tell if you've broken anything important.
- Writing code with tests in mind will ensure that you write code than can be easily tested--code made up of many discrete functions that are each responsible for a single thing, which is one of the main principles of object-oriented programming.
- As a junior developer, one of the most common jobs for you to start out with is writing tests for code that doesn't currently have any. This is great for junior devs because it both teaches them the codebase they're working with and keeps them from breaking anything too valuable.

The best place to start with tests is to write up a set of behaviors that you expect to get from your code--for example, "Given an array containing the numbers 1, 2, and 3 (in that order), I expect that the `pop` method should remove the 3 from the array and return it." Once you've got your tests formulated in English, it's easy enough to move them to JavaScript.

###Edge Cases in Testing

Coming up with good tests can be hard, since you you're only checking a couple of representative cases. For example, if you were testing to see if all numbers are even and gave the test 42, 8098, and 32426353214, your tests would conclude that yes, all numbers are in fact even. A comprehensive list of all edge cases is not possible, for the same reason that tests have edge cases in the first place, but some common things to look for are:

- What happens when your code gets an input it doesn't expect, like a string instead of a number or an array instead of an object?
- What about booleans, `undefined`, `null`, and `NaN`?
- What happens when incrementing numbers roll over? (This is probably the most famous edge case ever, thanks to Y2K)
- What happens if functions are called without all the arguments?

Beyond those, take a close look at your data and try to construct cases that test every type of data you're dealing with.

##Node's Assert Library

Testing works with *assertion libraries*, which are essentially just pre-baked ways of comparing an expected answer to an actual result. While vanilla javaScript doesn't have a built-in assertion library, Node does: the [Assert library] (https://nodejs.org/api/assert.html). As you might expect, it's pretty bare-bones, but it contains enough useful functions to take us a long way:

```js
var arr = [1,2,3],
    lastElem = arr.pop();

assert.equal(lastElem, 3, "expected " + lastElem + " to equal 3, but it didn't!" );
```

Note that when you try this, you won't see any feedback from Node unless the assertion fails. You're telling Node that you expect these two things to be equal, and if they are, it sees no reason to say anything. If you like, you can imagine Node stoically nodding its head in agreement.

###Testing with Node's Assert library

`assert.equal` can do a lot for us, but it can't do everything. Have a look at some of the other methods available in Assert, and then write some tests for some of the other methods of Array. `push`, `length`, and `join` are reasonable places to start. Note that you'll want to test both the return values and the side effects--if the method changes the array, you'll want to test that it made the changes correctly and also that it returned the right value.

##The Mocha testing framework

Tests written exclusively with Assert can do a lot of things, but they can get cumbersome to use, especially when you need to start testing asynchronous code. It also doesn't give you much in the way of feedback. To deal with this, we can use [Mocha](http://mochajs.org/), a widely-used testing framework that can handle asynchronous code and promises, as well as giving us useful reports for how the tests went and allowing us to specify certain behaviors before or after the tests. The one thing that Mocha does not do is handle the actual tests themselves; it leaves that up to any assertion library you'd like to use, which means that if you want to, you can just use Node's built-in Assert library.

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

The big differences here are the `describe`, `it`, and `before` functions. `describe` and `it` go hand in hand throughout Mocha (and many other testing frameworks). `describe` takes a string to use as a header for a section of test results. `it` does something similar, but for a specific testing concern. `before` does something different: it lists code that should be run before you start on the tests. Mocha has other setup functions like this, such as `beforeEach`, `after`, and `afterEach`.

Note that you can nest your `describe` functions. There's also a synonym for `describe` called `context`, which you can use to make things clearer.


###Writing and testing fake arrays

Copy the tests you wrote for arrays into their own file and put it in a subdirectory called `test`, then use the example above as a template to get the rest of your tests into a format that Mocha likes. Next, make sure that the code for your fake array is properly modularized so that it can be exported to the tests, then test it by running `mocha`.

##Better assertions with Chai

Node's Assert library works well enough, especially when we pair it with Mocha, but it could be more readable. To make our testing even better, we can choose to use a different assertion library. [Chai](http://chaijs.com/api/bdd/) offers a whole host of methods for testing, and enables three different flavors of assertions: one based on the standard "assert" style of testing, and two others that use "should" and "expect" respectively. We'll be using Chai's expect-style testing, so at the top of your file you'll have to include:

```js
var chai = require('chai');
var expect = chai.expect;
```

"Expect" and "assert" do pretty similar things with some minor syntactic differences:

```js
assert.equal(fakeArray.pop(), 3);
```

does the same thing as:

```js
expect(fakeArray.pop()).to.equal(3);
```

The difference is primarily feel. By this point, you can see that the code that we are writing is looking more and more like the pseudocode descriptions we started with, which makes our tests that much easier to read through. The "expect" style includes some functions that don't actually do anything other than pass through the things that get passed to them, like the `to` method in the example above, which you could remove without any change to the test at all--it's there purely for readability. The syntax is a little different, as what you're testing (`fakeArray.pop()` in this case) comes immediately after the test invocation, and the specifics of the test (`equal(3)` here) don't come until the end, but the same information is there.

Chai's "expect" style assertions also include far more testing methods than simple equality: you can test if objects are instances of particular constructors, if functions throw particular errors, if functions affect particular properties, and more.

###Test- and Behavior-Driven Development

Like text editors and tabs vs. spaces, testing can attract some strong feelings. Test-Driven Development is a topic that a lot of people feel very strongly about. The principle behind TDD is that you should write your tests first--before any of your code. Once you've written all of your tests, you run them, and you watch your tests all fail. Then you write the minimum amount of code to get a test to pass, run the tests again, and so on. When all of your tests pass, you're done.

Behavior-Driven Development grew out of TDD. As you might expect from the name, it emphasizes the behavior of the code being tested. This demands that the focus of your tests be on the results that you get rather than how those results are obtained--if I'm using BDD to test `Array.map`, I only want to know that the returned array was generated with the callback function I passed in, not whether a `forEach` or a `for` loop was used. Check out [this post](http://programmers.stackexchange.com/questions/135218/what-is-the-difference-between-writing-test-cases-for-bdd-and-tdd) for more discussion.

In both TDD and BDD, readability of tests is very important--tests should be human-readable enough to hand them to a client, according to some.

Like tabs vs. spaces or text editors, the important thing is that you use what works for you. Check out TDD and BDD and find out why they're useful, then use what works.

###Writing Tests with Chai

First, translate your Mocha tests from the Node Assert library to Chai's Expect library and ensure they still work. Next, write some Chai tests for more Array methods. This time, try more complicated methods: `map`, `forEach`, and `filter`. Once you've got your tests passing, it's time to go back to `fakeArray` and start implementing those functions. When you're happy with both your tests and your functions, pass them around to other people to see if you can come up with cases that cause tests to fail, or cases that should cause tests to fail and don't.
