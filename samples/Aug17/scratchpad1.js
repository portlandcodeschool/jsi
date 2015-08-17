/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

var colors = ['red','blue','green']
colors[1+1]

var obj = {r:'red', b:'blue', g:'green'}

obj['b']
obj.b
obj['b'] = 'blueberry'
obj['z'] = 'zed'
obj.z = 'zoot'

var x='y',
	 y='x';
obj = {x:0, y:1}
obj.x
/*
0
*/

obj[x]
/*
1
*/
obj['x']
/*
0
*/


var duck = {noise:'quack', feet:1+1, canSwim:true};
var nest = {mama:duck};

var nest = {mama:{noise:'quack', feet:2, canSwim:true}};

var nest = {};
nest['mama'] = {noise:'quack', feet:1+1, canSwim:true};

var nest = {};
nest.mama = {noise:'quack', feet:1+1, canSwim:true};

var nest = {};
var nest = {mama:duck};

nest.mama = {};
nest.mama.noise = 'quack';
nest.mama.feet = 2;
nest.mama['canSwim'] = true;

// var.prop.prop.prop
// var[prop][prop][prop]

for (var i=0; __; __) {}

var key;
for (key in nest.mama) { console.log(nest.mama[key]) }
  
}

var key;
key = 'banana';
for (var key in duck) { 
  console.log(duck[key])
}

//========

var table = {dan: {sleep: 'minimal'}, coffee:{color:'brown'}}

function personIsAt(name,tableObj) {
  return name in tableObj
}

function peopleAt(tableObj) {
  var result = '';
  for (var name in tableObj) {
    result += name + '\n';
  }
  return result.slice(0,result.length-1);
}


function peopleAt(tableObj) {
  var result = [];
  for (var name in tableObj) {
    result.push(name);
  }
  return result.join('\n');
}


 function whoHasKey(tableObj,key) {
   for (var name in tableObj) {
     if (key in tableObj[name]) {
       return name;
     }
   }
 }

function whoHasVal(tableObj,val) {
    for (var name in tableObj) {
      for (var prop in tableObj[name]) {
        if (val === tableObj[name][prop]) {
          return name; 
        }
      }
    }   
}


