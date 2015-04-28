---
layout: post
title: Welcome
class: welcome
date: 2015-05-05 00:00:00
---

Welcome to PCS!

Each class will have its own page and may have one or more sets of slides. Think of the class pages as actionable material that you'll be doing. The slides are supplements, to guide discussion.

I've tried to organize this site so things are easy for you to find and reference. You'll find the classes listed on the [home page]({{ site.baseurl }}/). You'll also find a [reference page]({{ site.baseurl }}/reference/) that collects all the links for the course.

## Setting Up Your Computer

Before we can really start digging in, you'll need some tools.

### Install Atom

Install [Atom](https://atom.io/). Atom is a text editor built in Node.js that a lot of people have found accessible and fast. If you prefer another editor, go ahead and use it instead.

### Install Homebrew

Homebrew is a _package manager_ for OSX. It's a program that installs other programs, which is typically much more convenient than downloading and installing them by hand.

{% highlight bash %}
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
{% endhighlight %}

### Install Useful Command Line Tools

```bash
brew install git node tree colordiff
```

### Configure Git

{% highlight bash %}
git config --global user.name "My Name"
git config --global user.email me@example.com
git config --global core.editor "subl -w"
git config --global core.excludesfile '~/.gitignore_global'
git config --global push.default current
git config --global diff.renames true
git config --global color.ui true
echo ".DS_Store" >> ~/.gitignore_global
{% endhighlight %}

### Improve your Terminal

```Bash
atom ~/.bash_profile
```

Add the following lines to that file:

{% highlight bash %}
export PS1="\[$(tput bold)\]\[$(tput setaf 5)\]\u\[$(tput sgr0)\]:\[$(tput bold)\]\[$(tput setaf 2)\]\h\[$(tput sgr0)\]:\[$(tput bold)\]\[$(tput setaf 4)\]\w\[$(tput sgr0)\]\n$ \[$(tput sgr0)\]"
export PATH="$HOME/bin:/usr/local/bin:/usr/local/sbin:$PATH"
export CLICOLOR=1
export LSCOLORS=ExFxCxDxBxegedabagacad
export PAGER="less"
export EDITOR="atom --wait"
{% endhighlight %}

Someone, please interrupt and ask the following question:
<q>Can you please explain tab completion?</q>

<aside>
  <strong>
    This is the first side content on this site. These sections will frequently explain the details of things that
    aren't important to understand in order to continue. It's for when you're curious, but don't get caught up on
    them.
  </strong>
  What does this do? It sets up `bash`, the main program that runs inside of `Terminal.app`, to handle a few things differently:
  <ul>
    <li>PS1 &ndash; sets the prompt to a nice set of colors and info. There's <a href="https://www.kirsle.net/wizards/ps1.html">a helpful customization tool</a> if you want to edit your prompt.</li>
    <li>PATH &ndash; Tells `bash` where to look for programs.</li>
    <li>CLICOLOR &ndash; Use colors more frequently (for instance when doing `ls`).</li>
    <li>LSCOLORS $ndash; The particular color theme `ls` should use. <a href="http://www.norbauer.com/rails-consulting/notes/ls-colors-and-terminal-app.html">Read more about this arcane incantation</a>, if you like.</li>
    <li>PAGER &ndash; Some apps may use this when showing multiple pages of content. It's the pager in the sense of "the thing that splits long content into pages," not "the thing that notifies you."</li>
    <li>EDITOR &ndash; Some apps (such as `git`) use this when they need you to edit files.</li>
  </ul>

  `~/.bash_profile` is only checked when you start a new shell session. To apply new changes, either open a new terminal window/tab or run `source ~/.bash_profile`.
</aside>
