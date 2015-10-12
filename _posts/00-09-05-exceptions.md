---
layout: post
title: Exceptions
class: misc
date: 2015-10-09 00:00:00
---

```Javascript

var problem = false;

function C() {
	if (problem) throw "Doh!";
	console.log("exiting C normally");
}

function B() {
	C();
	console.log("exiting B normally");
}

function A() {
	B();
	console.log("exiting A normally");
}

function A2() {
	try { B() }
	catch(err) { console.log("had error '"+err+"', but now...")} //clears error
	console.log("exiting A2 normally");
}

function A3() {
	try { B() }
	finally { console.log("exiting A3") }//runs always, but any error remains
	console.log("normally");
}

function A4() {
	try { B() }
	catch(err) { console.log("had error '"+err+"', but now...")} //clears error
	finally {console.log("exiting A4") }//runs always
	console.log("normally");
}


try {
	A();
}
catch(err) { //won't run unless problem
	console.log(err);
}
```
