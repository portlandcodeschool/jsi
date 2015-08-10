---
layout: post
title: Project Extras
class: mini-project-extras
date: 2015-05-29 00:00:00
---

## Project Extras

If you get your static site generator working before the end of the week, try tackling one or more of these advanced features.

### Configurable Layouts

Create a "layouts" directory where different page layouts can go. Allow each page on your site to specify which layout it wants to use rather than using one global layout.

### Markdown

Markdown is a wonderful _markup language_ for writing content for web pages. It allows you to easily skip HTML tags in favor of a syntax that's slightly more human-readable. Lots of sites use Markdown, and it's valuable to know. GitHub, for example, allows Markdown to be used in README files as well as in comments.

Here's an example of the syntax:

    # Markdown Overview

    The line with _Markdown Overview_ in it will be an `h1`
    element. Using multiple `#` signs will make it lower
    level headings. You can also do things like `code`,
    **bold**, and _italic_ easily.

    This is a new paragraph because there is a blank line
    in between it and the previous paragraph.
    It
    doesn't matter how short a line is, it will be part of
    this paragraph.

    It's also easy to point you to
    [cool websites](http://www.portlandcodeschool.com).

    ## More Syntax

    It's also easy to make lists:

     * List
     * Of
     * Unordered
     * Items

    And numbered lists, too:

     1. Do
     1. In
     1. This
     1. Order

    Finally, you can do large chunks of code:

        var explain = function() {
          console.log(
            "This is a code block because " +
            "it's indented more.");
        };
        explain();


<aside>
**Rendered Version**

# Markdown Overview

The line with _Markdown Overview_ in it will be an `h1`
element. Using multiple `#` signs will make it lower
level headings. You can also do things like `code`,
**bold**, and _italic_ easily.

This is a new paragraph because there is a blank line
in between it and the previous paragraph.
It
doesn't matter how short a line is, it will be part of
this paragraph.

It's also easy to point you to
[cool websites](http://www.portlandcodeschool.com).

## More Syntax

It's also easy to make lists:

 * List
 * Of
 * Unordered
 * Items

And numbered lists, too:

 1. Do
 1. In
 1. This
 1. Order

Finally, you can do large chunks of code:

    var explain = function() {
      console.log(
        "This is a code block because " +
        "it's indented more.");
    };
    explain();
</aside>

<aside>
***Markdown Flavors***

Markdown originally started as a blog post saying "wouldn't it be nice if this existed?" As a result, there's no real standard, and different Markdown parsers offer different featuresets. "Github-flavored Markdown," for example, has extra features for referencing GitHub users, repos, issues, etc.

There's been an attempt to make a Markdown standard, called Standard Markdown, but it was immediately controversial and is far from universally accepted.
</aside>

### Sass

[Sass][sass] makes CSS a lot easier to work with. Learn a little about Sass and make your generator handle sass files.


### Watch Mode

Make your generator accept a flag that will keep it watching all files for changes. When it notices a change, it should re-generate the output for that file.

### Jekyll

Add some of [Jekyll][jekyll]'s features to your generator. If you want to be really ambitious, you can try to make your generator a drop-in replacement for Jekyll. But be warned, this could take you months to complete!

### Other

If you have other ideas for features your generator should have, go hog wild!

[jekyll]: http://jekyllrb.com
[sass]: http://sass-lang.com
