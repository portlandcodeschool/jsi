---
layout: post
title: Tests
date: 2015-06-17
---

Today we're going to work on automated testing. As programs grow complex, verifying by hand that they work correctly gets harder and harder. Automated tests allow you to verify your code quickly and thoroughly  every time you make a change.

There is a lot of zealotry and fundamentalism out there regarding tests. Some of those positions are:

* Every change requires a new test
* A test suite should run in less than ten seconds (or even less than one second)
* Always write tests first, i.e. before you write the code you're going to test

These are laudable goals to keep in mind, but as with anything, you have to leaven them with a bit of pragmatism.

## Jasmine

[Jasmine](https://github.com/jasmine/jasmine-npm) is a Node module to help with testing. It provides a test runner and logger, as well as functions to help write tests (Jasmine calls them "specs," as in "specifications"). A jasmine test looks like this:

```JavaScript
describe("addOne", function() {
  it("should add one to its first argument", function() {
    expect(addOne(2)).toEqual(3);
  });

  it("returns null when given null", function() {
    expect(addOne(null)).toBe(null);
  })
});
```

There are 3 things to pay particular attention to here: `describe`, `it`, and `expect`.

* `describe` is a function that declares a group of related tests. It takes a string and a callback, and runs its callback when Jasmine runs.
* `it` is a function that declares an individual test. It behaves almost identically to `describe`.
* `expect` is a function that takes some value and returns an _expectation_. An expectation is an object that wraps a value and offers various assertion methods like `toEqual` and `toBe`. An assertion will cause a test to fail if the assertion doesn't succeed.


## Test-Driven Development

_Test-Driven Development_, or TDD, is the practice of writing tests before the implementation. It takes some time to get into the right mindset, but once you have it, it can help you think about how you want to interact with the function you're writing. It's like writing an outline before diving into the nitty-gritty of an essay. First you define how the function should behave in various circumstances, then you use that description as a guide to writing the function.

### Exercise: use TDD to write an interest calculator

<aside class="objective">
<h4>Interest Calculator Objective</h4>
Write an continuous compounding interest calculator following the test driven development workflow. The function should return just the interest accrued, not the total amount owed.
</aside>

Start with a test:

{% highlight javascript %}
describe('calculateInterest()', function() {
  it('fill me in', function() {
    // fill me in
  });
});
{% endhighlight %}

Let's come up with some more tests. Remember:

 - Test expected usage
 - Test corner cases


### Challenge

Fork the repository [here][github-jsi-gravity], follow the directions in the [README][github-jsi-gravity-readme], use TDD to create a solution, then create a pull request with the solution.

The project uses [npm][npm] to install [Jasmine][jasmine], so when you first clone it, you should run `npm install`. You should run the tests you write with `npm test` instead of using `node`.

<aside>
<h4>`npm install` and `npm test`</h4>

We're skipping over a few details here on how things are set up. Don't worry, we'll be discussing this shortly when we introduce modules.
</aside>

## Challenges

- Write a function that takes an array of people as an argument and updates each of their ages to be one year older. Make sure you write tests before you write the function--this is how TDD is done!
- Test and write a new function `each` that takes an array and a callback as an argument and runs the callback for each element of the array.
- Create a new version of the interest rate calculator that calculates the amount of interest you've paid with fluctuating interest rates. For example, you may call `calculateInterest(1000, [0.041, 0.042, 0.38, 0.41], 1)` to calculate the interest on $1000 over 1 year with 4 compounding periods. Note that the formula for this is different.

[github-jsi]: https://github.com/portlandcodeschool/jsi
[github-jsi-gravity]: https://github.com/portlandcodeschool/jsi-gravity
[github-jsi-gravity-readme]: https://github.com/portlandcodeschool/jsi-gravity/blob/master/README.md
