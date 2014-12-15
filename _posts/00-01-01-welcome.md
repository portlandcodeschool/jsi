---
layout: post
title: Welcome
class: welcome
date: 2015-01-05
---

Welcome to PCS!

Each class will have its own page and may have one or more sets of slides. Think
of the class pages as actionable material that you'll be doing. The slides are
more to guide discussion.

I've tried to organize this site so things are easy for you to find and reference when
you need to. You'll find the classes and slides listed on the [home page]({{ site.baseurl }}/).
You'll also find a [reference page]({{ site.baseurl }}/reference/) that collects all the links
for the course.

Today we'll start with slides and then come back to this page.

## Setting Up Your Computer

It's quite annoying, and you don't have to do it frequently, but learning how
to install the tools you use will help you significantly going forward.

### Install SublimeText

Install the [latest SublimeText](http://www.sublimetext.com/3).

Create a link to the `subl` command:

{% highlight bash %}
mkdir -p /usr/local/bin
ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl
{% endhighlight %}


### Install Homebrew

{% highlight bash %}
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
{% endhighlight %}

### Install Git and Node

{% highlight bash %}
brew install git node
{% endhighlight %}

### Configure Git

{% highlight bash %}
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st 'status -s'
git config --global core.editor "subl -w"
git config --global core.excludesfile '~/.gitignore_global'
git config --global push.default simple
git config --global diff.renames true
git config --global color.ui true
echo ".DS_Store" >> ~/.gitignore_global
{% endhighlight %}


### Improve your Terminal

{% highlight bash %}
subl ~/.bash_profile
{% endhighlight %}

Add the following:

{% highlight bash %}
export PS1="\e[1;35m\u\e[0;39m:\e[1;32m\H\e[0;39m:\e[1;36m\w\e[0;39m\n\\$ "
export PATH="/usr/local/bin:/usr/local/sbin:$PATH"
export CLICOLOR=1
export LSCOLORS=ExFxCxDxBxegedabagacad
export PAGER="less"
export EDITOR="/usr/local/bin/subl -w"
{% endhighlight %}

Someone, please interrupt and ask the following question:  
<q>Can you please explain tab completion?</q>

<aside>
  <strong>
    This is the first side content on this site. These sections will frequently explain the details of things that
    aren't important to understand in order to continue. It's for when you're curious, but don't get caught up on
    them.
  </strong>
  What does this do? It sets up `bash`, the main program that runs inside of `Termainal.app`, to handle a few things differently:
  <ul>
    <li>PS1 &ndash; Improves the standard prompt you see</li>
    <li>PATH &ndash; Tells `bash` to search for local applications first</li>
    <li>CLICOLOR &ndash; Use colors more frequently (for instance when doing `ls`)</li>
    <li>PAGER &ndash; Some apps may use this when showing multiple pages of content</li>
    <li>EDITOR &ndash; Some apps (such as `git`) use this when they need you to edit files</li>
  </ul>
</aside>


## Project

This project will start to get you familiar with the syntax of the language and
working in the Terminal. Work with a partner. Both of you should write your own
version, but neither should work ahead of the other. If you don't understand
something, speak up! Ideally, every group will have at least one question.

- Create variables with the following names and set their values with the
  corresponding values for yourself (feel free to get creative and add some
  more):
  - `name`
  - `age`
  - `birthday`
  - `hometown`
  - `hobby`
- Use `console.log` to show this information about yourself. For example, it
  may start out with `My name is Whitney and I was born in Baltimore, MD`.
- Make sure you use every variable that you defined.
- Tell us a little more about your past. Change the values of `age` and other
  variables, then `console.log` a little more. For example,
  `When I was 13 my hobby was lacrosse.` Each sentence should be printed on its
  own line.
- Change your code to only use one `console.log` statement, but still print on
  multiple lines. This will probably raise a question or two!


## Reference

[Arithmetic][mdn-arithmetic]  
[Assignment][mdn-assignment]  
[Comparison][mdn-comparison]  
[Logic][mdn-logic]  
[Strings][mdn-strings]  
[Impostor Syndrome][impostor]  


## For later

- Think of a domain name for a portfolio site
- Thing of a web application you'd like to build

[mdn-arithmetic]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators
[mdn-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators
[mdn-comparison]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators
[mdn-logic]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators
[mdn-strings]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/String_Operators
[impostor]: https://medium.com/tech-talk/bdae04e46ec5
