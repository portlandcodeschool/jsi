var arr = [1,2,3]
undefined
typeof arr
"object"
var obj = {1:'one',2:'two'}
undefined
typeof obj
"object"
arr[0]
1
arr['0']
1
arr['0'] = 'test'
"test"
arr
Array [ "test", 2, 3 ]
arr
Array [ "test", 2, 3 ]
arr.banana
undefined
arr.banana = 'yellow'
"yellow"
arr
Array [ "test", 2, 3 ]
'banana' in arr
true
arr.banana
"yellow"
obj
Object { 1: "one", 2: "two" }
obj[1]
"one"
obj[0] = 'zero'
"zero"
obj
Object [ "zero", "one", "two" ]
arr.length
3
obj instanceof Array
false
arr
Array [ "test", 2, 3 ]
obj
Object [ "zero", "one", "two" ]
var obj2 = {2:'two'}
undefined
obj2
Object { 2: "two" }
obj2['1']='one'
"one"
obj2
Object { 1: "one", 2: "two" }
obj2['0']='zero'
"zero"
obj2
Object [ "zero", "one", "two" ]
obj2.length
undefined
obj2['banana']
undefined
obj2.length
undefined
obj2
Object [ "zero", "one", "two" ]
arr.banana
"yellow"
'banana' in arr
true
'banana' in obj2
false
obj2['banana'] = 'yes'
"yes"
'banana' in obj2
true
obj2
Object { 0: "zero", 1: "one", 2: "two", banana: "yes" }
obj2.pop
undefined
for (var index in arr) { console.log(index) }
undefined
0
1
2
banana
Object.keys(arr)
Array [ "0", "1", "2", "banana" ]
delete arr.banana
true
arr
Array [ "test", 2, 3 ]
Object.keys(arr)
Array [ "0", "1", "2" ]
for (var index in arr) { console.log(index) }
undefined
0
1
2
delete arr[1]
true
Object.keys(arr)
Array [ "0", "2" ]
arr
Array [ "test", <1 empty slot>, 3 ]
arr.length
3
q
ReferenceError: q is not defined
q+1
ReferenceError: q is not defined
var q;
undefined
q
undefined
obj
Object [ "zero", "one", "two" ]
obj['.'] = 'dot'
"dot"
obj
Object { 0: "zero", 1: "one", 2: "two", .: "dot" }
obj[''] = 'empty'
"empty"
obj
Object { 0: "zero", 1: "one", 2: "two", .: "dot", : "empty" }
Object.keys()obj)
SyntaxError: missing ; before statement
Object.keys(obj)
Array [ "0", "1", "2", ".", "" ]
obj['"'] = 'empty'
"empty"
Object.keys(obj)
Array [ "0", "1", "2", ".", "", """ ]
qqqq
ReferenceError: qqqq is not defined
qqqq = 7
7
qqqqq
ReferenceError: qqqqq is not defined
qqqq
7
var x = 9
undefined
delete x
true
x
ReferenceError: x is not defined
window
Window → about:blank
window.qqqq
7
var toot;
undefined
window.toot
undefined
'toot' in window
true
Math
Math { , 44 more… }
window.Math.floor(34.6)
34
"Math" in window
true
"floor" in Math
true
window
Window → about:blank
typeof null
"object"
var x = null;
undefined
typeof x
"object"
'null' in window
false
null in window
false
!null
true
!{}
false
var a = {}
undefined
var b = {}
undefined
a === b
false
a == b
false
a === b
false
var myRoom = {where:'PCS', tables:4};
undefined
var yourRoom = myRoom;
undefined
myRoom.tables--;

4
yourRoom.tables
3
var duck = {feet:2, noise:'quack'};
var nest = {mama:duck};
undefined
var ernie={}, bert={};
ernie.bff = bert; bert.bff = ernie;

Object { bff: Object }
delete ernie.bff
true
bert
Object { bff: Object }
var a={};
var b=a;
var c={a:a,b:b};
a.c = c;
var d=c.a;
delete c.a;
delete c.b;
a = null;
c = null;
null
b.c.x = 'test'
"test"
d.c.x
"test"
ernie
Object {  }