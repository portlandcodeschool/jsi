---
layout: post
title: User Input & Serialization
class: serialization
date: 2015-01-12
---

## User Input

Sometimes, you'll want to build a command line app that asks the user a
question.

Node makes this a little complicated, but it's not too difficult. Here's some
code taken directly from [Node's `readline` documentation][node-readline].

{% highlight javascript %}
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What do you think of node.js? ", function(answer) {
  // TODO: Log the answer in a database
  console.log("Thank you for your valuable feedback:", answer);

  rl.close();
});
{% endhighlight %}

The most cryptic part of this example code is `process.stdin` and
`process.stdout`. These are the _standard input_ and _standard output_ of your
app. The standard input is the input that the user provides to your app, and
the standard output is the information you provide back to the user (often by
using `console.log`).

Any questions?

#### Quick Status Check

Write a simple command line app that prompts the user for one number,
then prompts for a second, then reports the sum.


## Serialization

Serialization is the process of converting data &mdash; objects, strings,
numbers, booleans, etc. into a format that can be _persisted_, or stored
somehow. Usually the first step will be converting that data into a _stream_ of
bytes (which is pretty much the same as a string). We'll be storing serialized
data in files.

The reverse, deserialization, simply converts that stream of data back into
usable objects.

### Formats

There's an endless number of formats into which you can serialize data. Some
popular ones available to most programming languages are:

* JSON
* XML
* YAML

We're going to focus on JSON which was designed with JavaScript in mind and has
exploded in popularity.

### JSON

JSON stands for JavaScript Object Notation. The format of the serialized data
is nearly identical to the code you'd write in JavaScript. Actually, it is
valid JavaScript. This makes it really easy for web browsers to convert back
into objects since they already know how to _parse_ JavaScript.

{% highlight javascript %}
var object = [
  { firstName: "Whitney", lastName: "Young" },
  { firstName: "Cris", lastName: "Kelly" }
];
JSON.stringify(object)
{% endhighlight %}

The result is the following string:  
`'[{"firstName":"Whitney","lastName":"Young"},{"firstName":"Cris","lastName":"Kelly"}]'`

That's nearly exactly what we typed in! Now, though, it's a string. So we can
save it to a file.

<aside>
**XML Example**

There's no strict rule to how XML should be structured in order to represent
objects. You can basically create whatever structure you want, and it can be
different for each application. The above object could be written out as the
following XML document:

    <?xml version="1.0" encoding="UTF-8"?>
    <root>
      <people>
        <person firstName="Whitney" lastName="Young" />
        <person firstName="Cris" lastName="Kelly" />
      </people>
    </root>

XML's flexibility also makes it a little more annoying to work with. `people`
could have been called anything, for instance `array`. We could have skipped
the `root` element in the example above.

An application that receives an XML file like this needs to account for the
exact structure of the XML and generally manipulates it through an XML
library. With JSON, there can still be structural differences, but you're
generally working with built in types (strings, arrays,
objects/hashes/dictionaries, booleans, and numbers) which makes accessing and
manipulating the data easier.
</aside>

Reading JSON from a file couldn't be easier in Node. If you name a file with
a JSON extension, `information.json`, you can simply `require` the file, so
`require('path/to/informaiton')` or `require('path/to/informaiton.json')`.

#### Quick Status Check

Write an app that reads the following file and logs the message.

_message.json_
{% highlight json %}
{
  "message": "This message is stored in the JSON file."
}
{% endhighlight %}

{% highlight bash %}
$ ./show-message message.json
This message is stored in the JSON file.
{% endhighlight %}

## Adventure Game

Now that we can read files and accept user input, we can build something pretty
fun.

This game will be a simple game to try to find a treasure by navigating a bunch
of rooms. This is basically a maze, but the player plays blind, only knowing
which direction they can go.

You can give this game whatever spin you want to: castles, dungeons, space
ships, etc. Try to have fun with it!

<aside class="objective">
Here's an example of how your game might work:

    $ ./adventure-game game1.json
    You are standing in a room. There are three doors.
    One is to the north, one is to the east, one is to the west.
    Which direction do you want to go? west

    You are standing in a room. There are two doors.
    One is to the north, one is to the east.
    Which direction do you want to go? north

    You are standing in a room. There are two doors.
    One is to the north, one is to the south.
    Which direction do you want to go? north

    You are standing in a room. There are two doors.
    One is to the north, one is to the south.
    Which direction do you want to go? north

    You are standing in a room. There are two doors.
    One is to the east, one is to the south.
    Which direction do you want to go? east

    You are standing in a room. There are two doors.
    One is to the east, one is to the west.
    Which direction do you want to go? east

    You are standing in a room. There are two doors.
    One is to the east, one is to the west.
    Which direction do you want to go? east

    You found the treasure!
</aside>

The above game was played on the following map. The input file that produced
this map can be found along with a library that does some game related stuff in
the [JSI Game Library][github-jsi-game-library].

    +---------+---------+---------+---------+
    |         |         |         |         |
    |    H         I         J         K    |
    |         |         |         |         |
    +---   ---+---------+---------+---------+
    |         |                              
    |    G    |                              
    |         |                              
    +---   ---+---------+---------+          
    |         |         |         |          
    |    D    |    E         F    |          
    |         |         |         |          
    +---   ---+---   ---+---------+          
    |         |         |         |          
    |    A         B         C    |          
    |         |         |         |          
    +---------+--  ^  --+---------+          

The game library can be installed with:

    npm install --save git+ssh://git@github.com:portlandcodeschool/jsi-gamelib.git

### Challenges

- Create another map or extend the existing map.

- Consider using [prompt][prompt] or [chalk][chalk] to spice up your game.

- Make your game more interesting by adding things to the rooms. For instance,

  > You're in a room with a cactus. Not much is going on.

  > You're in a room with a fire breathing dragon! You better leave quickly.
  > He looks hungry!

- Fix any [issues][github-jsi-game-library-issues] you find in the JSI Game
  Library.

- **Advanced:** Allow things to be picked up and used in order to get through
  certain rooms. For instance,

  > You're in a room with a fire breathing dragon, but you brought a cactus
  > with you. You throw the cactus at the dragon. He gets scared and hides.
  > The door to the north is now accessible.

  This will require some thought as to how you'll want to change the structure
  of the game file in order to allow carrying and applying items in different
  circumstances.


[node-readline]: http://nodejs.org/api/readline.html
[github-jsi-game-library]: https://github.com/portlandcodeschool/jsi-gamelib
[github-jsi-game-library-issues]: https://github.com/portlandcodeschool/jsi-gamelib/issues
[prompt]: https://github.com/flatiron/prompt
[chalk]: https://github.com/sindresorhus/chalk
