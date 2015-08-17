obj
Object { r: "red", b: "blueberry", g: "green", z: "zoot" }
obj['b']
"blueberry"
obj['banana'.slice(0,1)]
"blueberry"
obj['b']
"blueberry"
obj.b
"blueberry"
colors
Array [ "red", "blue", "green" ]
colors.2
SyntaxError: missing ; before statement
duck
ReferenceError: duck is not defined
duck
Object { noise: "quack", feet: 2, canSwim: true }
duck.noise
"quack"
duck.color
undefined
duck.clothes = 0;
0
duck
Object { noise: "quack", feet: 2, canSwim: true, clothes: 0 }
if (duck.clothes) 'yes'
undefined
duck.blerg = undefined;
undefined
duck.blerg
undefined
duck.aflkubasf
undefined
'clothes' in duck
true
'blerg' in duck
true
'adflkjbadf' in duck
false
('fe'+'et') in duck
true
duck.true = 'yes'
"yes"
duck
Object { noise: "quack", feet: 2, canSwim: true, clothes: 0, blerg: undefined, true: "yes" }
'true' in duck
true
duck.true
"yes"
(1===1) in duck
true
noise Scratchpad/1:3:21
feet Scratchpad/1:3:21
canSwim Scratchpad/1:3:21
clothes Scratchpad/1:3:21
blerg Scratchpad/1:3:21
true Scratchpad/1:3:21
duck
Object { noise: "quack", feet: 2, canSwim: true, clothes: 0, blerg: undefined, true: "yes" }
quack Scratchpad/1:2:21
2 Scratchpad/1:2:21
true Scratchpad/1:2:21
0 Scratchpad/1:2:21
undefined Scratchpad/1:2:21
yes Scratchpad/1:2:21
table
Object { dan: Object, coffee: Object }
personIsAt('dan',table)
true
personIsAt('coffee',table)
true
personIsAt('erik',table)
false
peopleAt(table)
ReferenceError: peopleAt is not defined
peopleAt(table)
"dan
coffee
"
peopleAt(table)
"dan
coffee"
peopleAt(table)
"dan
coffee"
whoHasKey('color')
TypeError: invalid 'in' operand tableObj[name]
whoHasKey(table,'color')
"coffee"
whoHasKey(table,'sleep')
"dan"
whoHasVal(table,'brown')
"coffee"
whoHasVal(table,'minimal')
"dan"
