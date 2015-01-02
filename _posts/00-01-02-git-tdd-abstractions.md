---
layout: post
title: Git, TDD & Abstractions
class: git+tdd+abstractions
date: 2015-01-07
---

This lesson will expand on some of the ideas we touched on while discussing functions, but first we're going to add Git and Test Driven Development to our workflow.

## Git & GitHub

Here's a typical workflow with GitHub:

1. Create a fork (GitHub)
1. Clone the fork (`git`)
1. Create a branch (`git`)
1. Review changes (`git`)
1. Commit changes (`git`)
1. Push changes (`git`)
1. Create pull request (GitHub)

As you can see, we start and end on GitHub, but much of the time you'll be using `git` on your computer. Let's take a look at this workflow.

{% highlight bash %}
git clone git@github.com:github_username/repo_name.git
cd repo_name

git checkout -b branch-name master

# do some work

git status
git diff

git add .
git commit -m 'My commit message.'

git push origin branch-name
{% endhighlight %}

Let's practice using Git and GitHub with [the JSI Members repository][github-jsi-members].

### Creating your own fork

Fork the project on GitHub, in your browser. Then, in a terminal:

{% highlight bash %}
git push git@github.com:my_github_username/repo_name.git branch-name

git remote add mine git@github.com:my_github_username/repo_name.git
git push mine branch-name

git push --set-upstream mine branch-name
{% endhighlight %}


### Merging & Conflicts

When collaborating, you'll sometimes end up editing the same code as someone else. The best way to understand this is to experience it in action.

Assuming you still are on a branch, the following will be pretty close do what you'll want to do:

1. Fetch and merge changes from upstream (`pull`)
1. Manually merge any conflicting files
1. Review changes
1. Commit
1. Push

{% highlight bash %}
git pull origin master

git diff --ours
git diff --theirs
git add path/to/file/that/was/merged
git commit -m 'Merged changes from wherever.'
git push origin branch-name
{% endhighlight %}

[This answer on StackOverflow][so-git-merge] may also provide some guidance if you get stuck merging.

<aside>
<h4>Whitespace</h4>

Whitespace (that is, line breaks, spaces, and tabs) can cause headaches when merging changes. You should make sure when you commit changes that you (or your text editor) hasn't changed whitespace in parts of the code that you didn't intend to edit.

Also, it's a good idea to ensure that every file ends with a line break (newline). Why? Many (command line) tools don't work quite as nicely when you don't have that final newline. Git, for instance, will show you a weird representation of changes that affect the addition/removal of content at the end of a file if you don't have a trailing newline.
</aside>

### Updating Course Contents

Now that you know the typical Git workflow, you can actually make changes to [this course][github-jsi] if you find any mistakes.

### Always Use Version Control

Yes, this gets its own section. You know the basics of how to use `git`. You'll keep getting better as you use it, and it won't slow you down. What will slow you down is when you lose work you've done or get your code into a weird state.

Along the same lines, you should commit code frequently. How frequently? It's difficult to commit too frequently, but easy to not commit frequently enough. One line commits are okay. You'll find them all over GitHub. Your commit should probably change something. Once a day is too infrequently.

Generally, you'll want to commit _working code_, but there are times when it may make sense to commit things that don't run. If, for instance, you want to share progress with someone else, you may want to commit something that's broken. It's generally a good idea to do this on a branch and share that branch with someone else.

## Test Driven Development

Let's use TDD to write an interest calculator.

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
<h4>npm install` and `npm test</h4>

We're skipping over a few details here on how things are set up. Don't worry, we'll be discussing this shortly when we introduce modules.
</aside>

## Challenges

- Write a function that takes an array of people as an argument and updates each of their ages to be one year older. Make sure you write tests before you write the function--this is how TDD is done!
- Test and write a new function `each` that takes an array and a callback as an argument and runs the callback for each element of the array.
- Create a new version of the interest rate calculator that calculates the amount of interest you've paid with fluctuating interest rates. For example, you may call `calculateInterest(1000, [0.041, 0.042, 0.38, 0.41], 1)` to calculate the interest on $1000 over 1 year with 4 compounding periods. Note that the formula for this is different.

[so-git-merge]: http://stackoverflow.com/a/3407920/98069
[github-jsi]: https://github.com/portlandcodeschool/jsi
[github-jsi-members]: https://github.com/portlandcodeschool/jsi-members
[github-jsi-gravity]: https://github.com/portlandcodeschool/jsi-gravity
[github-jsi-gravity-readme]: https://github.com/portlandcodeschool/jsi-gravity/blob/master/README.md
[npm]: https://www.npmjs.org
[jasmine]: https://jasmine.github.io/2.1/introduction.html
