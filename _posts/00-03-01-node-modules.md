---
layout: post
title: Git, project management tools, and the terminal
class: node
date: 2015-08-24 00:00:00
---

#How to approach a project

When you're given a project to work on, the natural inclination is to dive right into writing the code--that's the fun part, after all! Resist that temptation, though: things will go much more smoothly for you and your team if you take the time to get organized and figure out how you're going to approach the problem you've been given.

The tools you use to come organize your ideas are up to you. We all have some favorite tools, and as you do more and more of this, you'll come up with your own set. Paper is a great place to start out if you're not working remotely--it's hard to beat the tactile nature of it, and by this point the uI has been pretty well hammered out.

Mind maps are really useful as well--there is free mind-mapping software available for every OS out there, and a bunch more available on the web. These are very helpful for figuring out the connections between various parts of your code.

- [Labyrinth](https://people.gnome.org/~dscorgie/downloads.html) is a great option for Linux; it's what I use.
- [Mindmup](http://www.mindmup.com) looks like a reasonable web-based mind mapper.

If your project has any kind of graphical components, it's a great idea to come up with a wireframe--these are basically sketches of what the page will look like. No fonts, no images, no colors--just outlines showing where all the different text boxes, buttons, form entry fields, and everything else will be. Doing this helps you ensure that you haven't forgotten any important bits of functionality, eg "oh, this shows a 'login' button. That means we need to be able to log people in!"

- [Moqups](http://www.moqups.com) is a fine free web-based wireframe sevice.

Once you have a good idea of what needs to be done, you can start to figure out who is doing what parts. How jobs get doled out is completely up to your group--the important part is to be sure that everyone has a good idea of what they should be doing, and of how their tasks will interact with the tasks of other people on the team.

#Working in the Terminal

There are GUI options for just about everything you'll want to do in coding, but it's always a good idea to be comfortable working in the terminal--the GUI you like may be different than the one your workplace uses, or you may be SSHing into a server that doesn't have a GUI available. If you're comfortable using the terminal, these won't be problems--and the more you use the terminal, the more you'll resent having to move your hand all the way over to your mouse! For starters, let's have a look at the commands on this handy [cheat sheet](http://www.git-tower.com/blog/command-line-cheat-sheet/).

#Git and GitHub

Version control probably the single most important part of getting your project organized. It ensures that there's a trustworthy record of your entire project history available to anyone who needs it, and it allows many people to work together on big projects without stepping on each other's toes and overwriting code. If you don't have Git installed, it's available [here](http://git-scm.com/). Windows users will want to pick up [Git Bash](https://git-for-windows.github.io/).

There is some configuration that you'll want to do with Git in order to make things run smoothly. For starters, we'll have to make sure line endings are being dealt with properly. For Linux and OS X users, you'll want to enter `git config --global core.autocrlf input`, while Windows users will want `git config --global core.autocrlf true`.

Next, you'll want to create a global `.gitignore` file. This is a file that tells Git not to bother with the files that you specify. You can have a separate `.gitignore` for each project, but setting up a good global `.gitignore` can make your life a lot easier. You can create that file with the command `touch ~/.gitignore_global`, and then tell Git about it with `git config --global core.excludesfile ~/.gitignore_global`. All you need to do after that is identify the files that you'll never want to have in a repository and list them in that file. There's a great starter `.gitignore` available [here](https://gist.github.com/octocat/9257657).

Finally, you can set Git up to automatically use your text editor of choice for things like commit messages and merge conflicts. Git will probably default to Vim; if that's not your cup of tea, you can use:

- atom: `git config --global core.editor "atom --wait"`
- sublime: `git config --global core.editor "subl -n -w"`

One of the many great things that GitHub brings to Git is a built-in Issue tracker. This is designed so that as users find bugs in your software, you can assign tickets to the various team members to assign who is working on what problems. This is handy enough on its own, but in conjunction with the Chrome plugin [ZenHub](https://www.zenhub.io/), it becomes a pretty serious project management tool--definitely worth picking up.

Git is what you use on your machine to manage your code. In order to work with a team, you'll need to store that code repository somewhere that everyone has access to. Much of the time, that remote repo will be stored somewhere on the internet. There are many places online that will let you store your repositories for free, but the most well-known of them is definitely GitHub. Once you've got a GitHub account, you can manage repositories. There is one bit of configuration that you'll find handy: set up your GitHub account to authenticate with SSH. This involves some fancy cryptography and a "key" that you store on your computer, but the upshot of it is that you don't have to enter your password all the time, which is definitely worth a potentially annoying setup. There are good instructions available [here](https://help.github.com/articles/generating-ssh-keys/)

##Git Workflow

![](http://portlandcodeschool.github.io/images/cog.png)

##Exercise: Merge conflicts!

One of the things that you will inevitably have to deal with when using Git is merge conflicts. These happen when you change the same code that someone else did, and Git can't figure out whose code to keep. In order to give you some exposure to these in a friendly setting, we've created a repo that you can fork and then clone to see how merge conflicts work.

#Project Of The Week

For the first week's project, you'll be:
