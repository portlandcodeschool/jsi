---
layout: notes
title: User Input & Serialization Notes
class: serialization
date: 2014-09-10 00:00:00
---

## Class Flow

- Run through the user input example
- Discuss `stdin` and `stdout`. You can mention that they're streams which
  we'll come back to, but don't actually discuss streams.
- We're somewhat deliberately providing just the example code from Node and
  requesting that the students ask questions. Some example questions would be:
    * Can we see the documentation for `createInterface`, `question` and
      `close`?
    * What does `close` do? Or what happens if you don't use it?
    * Why is `createInterface` taking an object as its argument rather than
      just two parameters?
    * What other options can `createInterface` take?
    * Do `input` and `output` of `createInterface` default to `stdin` and
      `stdout`?
  They should ask something. Try to engage them. If not, go ahead and ask
  them some questions that might get them thinking of more.
- Discuss serialization briefly
- Start them making a game (note the info below)


## The Game

Note that the game library is intentionally broken. Hint at this, but don't
tell them. The point is to teach them a lesson - not all libraries work, so
approach them with caution.

### Fixing JSI Game Library

The iteration over `y` should be in reverse order to get the rows coming out
correctly. The first line below is the current value, the second is the
correct value.  
`for (var y = grid.min.y; y <= grid.max.y; y += 1) {`  
`for (var y = grid.max.y; y >= grid.min.y; y -= 1) {`  

Making it so that order doesn't matter means doing a better job connecting
rooms. You can do this by continuing to resolve rooms while rooms are
receiving locations:

{% highlight javascript %}
  var resolving = true;
  while (resolving) {
    resolving = false;
    game.rooms.forEach(function(room) {

      /* code removed for brevity */

      if (north && north.location) {
        room.location = copyPoint(north.location);
        room.location.y -= 1;
        resolving = true; // set to true for north/south/east/west branches
      }

      /* code removed for brevity */
    });
  }
{% endhighlight %}

The above fix is also required to make it work without an `"A"` room. Just set
the starting point to `0, 0` for the first item in the rooms list before
kicking off the process of resolving locations.

Supporting longer names and displaying the entrance means better handling the
room generation. This should be straight forward.
