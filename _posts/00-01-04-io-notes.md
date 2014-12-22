---
layout: notes
title: Callbacks &amp; I/O Notes
class: io
date: 2014-09-09 00:00:00
---

## Class Flow

- Start right into callbacks
- Implement the functions for baking a cake while the students help gude the
  implementations (see below for full solutions).
- Explain the two bad options for cake baking.
- Have students do some of the challenges. There are solutions below to each
  of the challenges.  
  Present the JavaScript that's wrong below for the `setReminder` challenge.
  Introduce Lo-Dash through this example, but also ask students to share what's
  wrong with the code.


## Callbacks

### Baking A Cake

This example illustrates that we have two bad options.

1. We set the timer then take the cake out immediately. We never actually
   notice when the timer goes off.
1. We can do nothing while the cake bakes. We 'sleep' during that time and
   aren't productive.

The take one gets to the point of illustrating the two bad options. Take two
tries to clearly illustrate callbacks by making separate functions instead of
anonymous functions as arguments, but you should move the code around to show
what the anonymous function version looks like. The slides will show that.


#### Code Take 1

{% highlight javascript %}
var sleep = require('sleep').sleep;

var preheatOven = function(temp) {
  console.log('Preheating the oven to %s.', temp);
};

var mix = function(ingredients) {
  var formatted = ingredients;
  if (ingredients.length > 1) {
    formatted = ingredients.slice(0); // copy
    formatted[ingredients.length - 1] =
      'and ' + formatted[ingredients.length - 1];
  }
  console.log('Mixing %s.', formatted.join(', '));
  return { mixture: ingredients };
};

var pour = function(cookware, liquid) {
  console.log('Pouring %j into %j.', liquid, cookware);
  return { cookware: cookware, containing: liquid };
};

var ovenAddItem = function(item) {
  console.log('Putting %j in the oven.', item);
};

var ovenSetTimer = function(duration) {
  console.log('Setting oven timer to %s', duration);
  console.log('We will wait %ss to simulate %s.', parseInt(duration), duration);
  sleep(parseInt(duration));
  console.log('The timer is going off!');
};

var ovenRemoveItem = function(item) {
  console.log('Removing %j from the oven.', item);
};

var decorate = function(item, decoration) {
  console.log('Decorating %j with %j', item, decoration);
};

// prep work
preheatOven('350deg');

// make the cake batter
var batter = mix(['flour', 'eggs', 'butter']);
var pan = {
  type: 'pan',
  diameter: '9in',
  shape: 'round'
};
var cake = pour(pan, batter);

// bake the cake
ovenAddItem(cake);
ovenSetTimer('30min');
ovenRemoveItem(cake);

// frost the cake
var frosting = mix(['sugar', 'butter', 'cocoa powder']);
decorate(cake, frosting);
{% endhighlight %}

#### Code Take 2

{% highlight javascript %}
var preheatOven = function(temp) {
  console.log('Preheating the oven to %s.', temp);
};

var mix = function(ingredients) {
  var formatted;
  if (ingredients.length <= 1) { formatted = ingredients[0]; }
  else {
    formatted = ingredients.slice(0, ingredients.length - 1).join(', ') + ' and ' + ingredients[ingredients.length - 1];
  }
  console.log('Mixing %s.', formatted);
  return { mixture: ingredients };
};

var pour = function(cookware, liquid) {
  console.log('Pouring %j into %j.', liquid, cookware);
  return { cookware: cookware, containing: liquid };
};

var ovenAddItem = function(item) {
  console.log('Putting %j in the oven.', item);
};

var ovenSetTimer = function(duration, callback) {
  console.log('Setting oven timer to %s', duration);
  console.log('We will wait %ss to simulate %s.', parseInt(duration), duration);
  setTimeout(function() {
    console.log('The timer is going off!');
    callback();
  }, parseInt(duration) * 1000);
};

var ovenRemoveItem = function(item) {
  console.log('Removing %j from the oven.', item);
};

var decorate = function(item, decoration) {
  console.log('Decorating %j with %j', item, decoration);
};

// prep work
preheatOven('350deg');

// make the cake batter
var batter = mix(['flour', 'eggs', 'butter']);
var pan = {
  type: 'pan',
  diameter: '9in',
  shape: 'round'
};
var cake = pour(pan, batter);
var frosting = null;

var whenTimerGoesOff = function() {
  ovenRemoveItem(cake);
  decorate(cake, frosting);
};

var beforeTimerGoesOff = function() {
  // frost the cake
  frosting =  mix(['sugar', 'butter', 'cocoa powder']);
};

// bake the cake
ovenAddItem(cake);
ovenSetTimer('30min', whenTimerGoesOff);
beforeTimerGoesOff();
{% endhighlight %}

#### Test Driven Code

This also includes a test for making the callback optional.

{% highlight javascript %}
describe('ovenSetTimer()', function() {
  it('calls the callback', function(done) {
    ovenSetTimer('0s', done);
  });
  it('works with no callback', function(done) {
    ovenSetTimer('0s');
    setTimeout(done, 0);
  });
});
{% endhighlight %}


### Challenges

{% highlight javascript %}
var setReminder = function(date, callback) {
  setTimeout(callback, date.getTime() - Date.now());
};
{% endhighlight %}

{% highlight javascript %}
var start = Date.now();
_.each(_.range(10), function(i) {
  setReminder(new Date(start + i * 1000), function() {
    console.log(i + 1);
  });
});
{% endhighlight %}

{% highlight javascript %}
_.each(_.range(10), function(i) {
  setTimeout(function() {
    console.log(i + 1);
  }, i * 1000);
});
{% endhighlight %}

Also, for students who tried the stopwatch with `setReminder`, ask them to
identify what's wrong with this code:

{% highlight javascript %}
_.each(_.range(2000), function(i) {
  setReminder(new Date(Date.now() + i * 1000), function() {
    console.log(i + 1);
  });
});
{% endhighlight %}

The problem is that numbers later in the list will not be scheduled relative to
the first number. They're scheduled relative to the time that the code executes
that iteration of the loop. It took my computer scheduling about 200,000 items
before this caused a skew of roughly 1 second.

Natural language processing:

{% highlight javascript %}
var chrono = require('chrono-node');
var setReminder = function(date, callback) {
  if (!(date instanceof Date)) {
    date = chrono.parseDate(date);
  }
  setTimeout(callback, date.getTime() - Date.now());
};
setReminder('3:10pm', function() { console.log('done!'); });
{% endhighlight %}

## I/O

### Challenge Solution

{% highlight javascript %}
#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <file1> <file2>')
  .option('-n, --number', 'Report just the number of words')
  .option('-v, --verbose', 'Be more verbose, report timing information')
  .parse(process.argv);


if (program.args.length != 2) {
  program.help();
}

var time = function(name) {
  var start = Date.now();
  return function() {
    if (program.verbose) {
      console.log('[time] %s: %dms', name, Date.now() - start);
    }
  };
};

var sharedWords = function(contents1, contents2) {
  var words1 = contents1.split(' ');
  var words2 = contents2.split(' ');

  var knownWords = {};
  words1.forEach(function(word) {
    knownWords[word] = true;
  });

  var sharedWords = [];
  words2.forEach(function(word) {
    if (knownWords[word]) {
      sharedWords.push(word);
      delete knownWords[word]; // only report word once
    }
  });
  return sharedWords;
};

var sharedWordsBigOOfNSquared = function(contents1, contents2) {
  var words1 = contents1.split(' ');
  var words2 = contents2.split(' ');
  var sharedWords = [];

  words1.forEach(function(word1) {
    var reported = false;
    sharedWords.every(function(reportedWord) {
      if (word1 == reportedWord) {
        reported = true;
        return false;
      }
      return true;
    });
    if (!reported) {
      words2.every(function(word2) {
        if (word1 == word2) {
          sharedWords.push(word1);
          return false;
        }
        return true;
      });
    }
  });

  return sharedWords;
};

var file1 = {
  path: program.args[0],
  contents: null
};

var file2 = {
  path: program.args[1],
  contents: null
};

var doneReading = time('read the files');
var compareIfBothFilesRead = function() {
  if (file1.contents && file2.contents) {
    doneReading();

    var done = time('word comparison');
    var shared = sharedWords(file1.contents, file2.contents);
    done();

    if (program.number) { console.log('%d words in common.', shared.length); }
    else {
      shared.forEach(function(word) {
        console.log(word);
      });
    }
  }
};

fs.readFile(file1.path, { encoding: 'utf8' }, function(err, contents) {
  file1.contents = contents;
  compareIfBothFilesRead();
});

fs.readFile(file2.path, { encoding: 'utf8' }, function(err, contents) {
  file2.contents = contents;
  compareIfBothFilesRead();
});
{% endhighlight %}

### Challenge Inputs

This code was used to create rather large text files for the compare words
problem. 10,000 words were created in each of two files.

{% highlight javascript %}
var fs = require('fs');

var wordCount = parseInt(process.argv[2]);

if (process.argv.length != 3) {
  console.log('useage: create-words number');
  process.exit(1);
}

fs.readFile('/usr/share/dict/words', { encoding: 'utf8' }, function(err, contents) {
  var lines = contents.split('\n');
  for (var i = 0; i < wordCount; i++) {
    var word = lines[Math.floor(Math.random() * lines.length)].trim();
    process.stdout.write(word);
    process.stdout.write(' ');
  }
  process.stdout.write('\n');
});
{% endhighlight %}
