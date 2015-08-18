/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

var leech = {
  color:'black',
  noise:'slurp',
  talk: function() {
    alert(this.noise.toUpperCase() + '!')
  }
}
leech.talk()

var cat = {};
cat.noise = 'meow';

cat.talk = function() {
  return this.noise;
}
cat.talk()

var rect2 = {
    width:2,
    height:3,
    area: function() {
        return this.width * this.height;
    }
};
var vol = { rect2:rect2,
           fruit:'banana'
          }
answer = rect2.area();



function test() {
  console.log(this);
}
test()




var rect2 = {
    width:2,
    height:3,
    area: function() {
        return this.width * this.height;
    }
};
answer = rect2.area();
var square1 = {
    width:1,
    height:1,
    area: rect2.area // share rect2's method
}
answer = square1.area();

function area() {
    return this.width * this.height;
}
var rhombus1 = {width:1, height:1, area:area};
var rhombus2 = {width:2, height:2, area:area};
answer = rhombus1.area();
/*
1
*/
answer = rhombus2.area();

/*
4
*/

function talk() {
  alert(this.noise.toUpperCase() + '!');
}

var orangutan = {
  hair:'orange',
  noise:'ook',
  talk: talk
}

var cat = {
  noise:'meow',
  talk: talk
}

var dog = {
  woof: function() {
    alert('woof');
  },
  bark: function () {
    alert('bark');
  },
}

cat.talk()
orangutan.talk()

talk.call(orangutan);
talk.call(cat);


function talk(noiseName) {
  if (noiseName === undefined) {
    noiseName = 'noise'
  }
  alert(this[noiseName].toUpperCase() + '!');
}
var cat = {
  noise:'meow',
  purr:'rrrrrrrrrr',
  talk: talk
}

var dog = {
  woof:'woof',
  bark:'arf'
}

talk.call(dog,'bark');
cat.talk('purr')
talk.call(cat,'purr')
cat.talk()

talk.call(dog); //error
