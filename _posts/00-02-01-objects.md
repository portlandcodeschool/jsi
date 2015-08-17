---
layout: post
title: Objects and Properties
class: fundamentals
date: 2015-08-17 00:00:00
---


## Objects and Properties

1. Make an object representing yourself.  First declare a variable holding an empty object, then incrementally assign it 3 properties with keys and values of your choice.

2. Use "object literal notation" to make similar objects for each other person at your table, using a different variable for each.

3. Make an object for the entire table, stored in variable `table`, with a property for each person.  The property name should be the person's name, and its value should be the person's object.

4. Write four "chained" expressions, each referencing one property of each person at the table.  Each expression should start with variable `table` and contain no other variables, only property names.

## Looping over properties

5. Write a function `personIsAt(name,tableObj)` which returns a Boolean: `true` if a person named `name` is at table `tableObj`, otherwise `false`.

6. Write a function `peopleAt(tableObj)` which returns a string listing all the names of people at your table `tableObj`.  Separate each name with a newline ('\n').

7. Write a function `whoHasKey(tableObj,key)` to return the name of any person at your table (parameter `tableObj`) who has a key matching parameter `key`.

8. Write a function `whoHasVal(tableObj,val)` to return the name of any person at your table who has a property with value `val`.

9. *Bonus Challenge*: Modify your functions `whoHasKey` and `whoHasVal` to return a list of _all_ people matching the key or value, respectively.

## Arrays vs. Objects

Discuss with your team the difference between arrays and ordinary objects with respect to each of the following:

* How they're created

* How literal notation is used to include contents

* The _length_ property

* Built-in methods

## Properties vs. Variables

Discuss with your team the difference between variables and properties in each of the following behaviors:

* Where they're stored

* How they're created

* What happens if they're used before being created

* When and how they're destroyed

* How they appear in expressions

* Constraints on what they may be named

## JSON transmission

1. Use `JSON.stringify()` to convert your table object (and all its people) to a JSON string.  Then have one person per group post that string in a snippet on Slack.

2. Everyone: collect the JSON strings from all four groups and put them together into a single array, representing four tables.

3. Use your `whoHasVal(table,val)` function to find the name of someone _at another table_ who has a property with a value of your choice.

---


## References

1. How many objects remain after the following code runs?

```
var a={};
var b=a;
var c={a:a,b:b};
a.c = c;
var d=c.a;
delete c.a;
delete c.b;
a = null;
c = null;
```

## Circularity

1.  Draw the data structure built by the following code:
<pre>
var loop1;
var loop2;
loop1 = {link : loop2};
loop2 = {link : loop1};
loop1.link.link
</pre>

2.  Modify the code to produce two mutually-linked objects.

---


# Objects as Dictionaries

## Comparing and Copying Objects

1. Write a function `copy(obj)`, which duplicates an object (not just copying a reference to it).  You only need a _shallow_ copy, duplicating only the top level of properties.  That is, if `obj` contains another object _inner_, the duplicate may share a reference to _inner_ rather than copying all of _inner_ too.

2. Write another function to compare two objects:
`equal(objA,objB)` should return true only when `objA` and `objB` have exactly the same properties with the same values.  You only need _shallow_ equality: if `objA` and `objB` each have a property _inner_ referring to an object, check only that both _inner_ objects are identical (references to the same object); don't try to compare their properties.
Note that two empty objects should be considered equal (by this function, not by the `==` operator).

3. Write a third function:
`similar(objA,objB)` should return true only when `objA` and `objB` have exactly the same properties, regardless of their values.

## Combining Objects as Sets

We can interpret objects as _sets_ of properties, and merge those sets in various ways.  Write a function for each of the following merges:

1. *Union*: The union of objects A,B is a new object which contains all the properties found in either A or B.  If a property is found in both, the merged property gets the shared key and the value `(A[key] || B[key])`.
For example: the union of `{a:1,b:0}` and `{a:0,c:0}` is `{a:1,b:0,c:0}`.
<p>
Implement function `union(objA,objB)`.

2. *Intersection*: The intersection of objects A,B is a new object which contains only those properties found in BOTH A and B.  The value of each intersecting property is `(A[key] && B[key])`.
For example, the intersection of `{a:1,b:0}` and `{a:0,c:0}` is `{a:0}`.
<p>
Implement function `intersect(objA,objB)`.

3. *Subtraction*: The subtraction of B from A, aka "A minus B", is an object which contains all the properties of A which are NOT in B.  Note that this merge is usually not symmetric: _A minus B_ doesn't equal _B minus A_ (except in one case, which you should identify!)
For example, `{a:1,b:0}` minus `{a:0,c:0}` is `{b:0}`, and the reverse subtraction is `{c:0}`.
<p>
Implement function `subtract(objA,objB)`.

Each function should return a new object, or _undefined_ if either of their arguments is not an object.



## Data Structure Example: Chores!

Below is a toy data-structure which uses "dictionary" objects to represent a relationship between two sets: which family members are responsible for which household chores.

The information in the data structure can be depicted as a grid:

```
     | mom   dad   sally billy
-----+------------------------
wash | X                 X
dry  |       X     X     X
cook |       X     X
mop  | X     X
```


Each row and column of the grid is encoded as a "dictionary" object, whose keys are the names of the objects in that row or column,
and whose values are the objects with those names.

Here is some code which builds the objects:

```
// people
var mom  = {name:'mom',  jobs:{}},
	dad  = {name:'dad',  jobs:{}},
	billy= {name:'billy',jobs:{}},
	sally= {name:'sally',jobs:{}};

// chores
var wash=	{job:'wash',who:{}},
	dry =	{job:'dry', who:{}},
	mop =	{job:'mop', who:{}},
	cook=	{job:'cook',who:{}};

var people = {
	mom:mom,
	dad:dad,
	billy:billy,
	sally:sally
};

var jobs = {
	mop:mop,
	cook:cook,
	wash:wash,
	dry:dry
};

wash.who = {mom:mom,billy:billy};
dry.who  = {dad:dad,billy:billy,sally:sally};
cook.who = {dad:dad,sally:sally};
mop.who  = {dad:dad,mom:mom};

mom.jobs  = {wash:wash,mop:mop};
dad.jobs  = {dry:dry,cook:cook,mop:mop};
sally.jobs= {dry:dry,cook:cook};
billy.jobs= {wash:wash,dry:dry};
```

In all of the challenges below, your code should remain as generic as possible, able to work with *any* similar table of people and jobs.  Therefore your code should not contain any reference to particular people or particular jobs.  You may refer to the variables `people` and `jobs` but not the variables for individual person and chore objects (`mom`, `dry`, etc).


1. As well as you can, in collaboration with your team, sketch all the objects involved in the structure and the connections between them.  

2. Write a function `hasJob(personName,jobName)` returning true or false.
Here's an example of how it would be used:
<pre>
hasJob('mom','mop') --> true
hasJob('mom','dry') --> false
</pre>

3. Now write a variant, `hasJob(personObj,jobObj)`, which receives objects instead of strings:
<pre>
hasJob(mom,mop) --> true
hasJob(mom,dry) --> false
</pre>

4. Write a function `peopleDoing(job)` which returns an array of people-objects. Allow parameter `job` to be either an object or a job name.
<pre>
peopleDoing(mop)  // --> [mom, dad]
peopleDoing('mop')// --> [mom, dad]
</pre>

5. Write a function `jobsDoneBy(person)` which returns an array of job-objects.  Allow parameter `person` to be either an object or a person's name.
<pre>
jobsDoneBy(mom)  // --> [wash, mop] or [mop, wash]
jobsDoneBy('mom')// --> [wash, mop] or [mop, wash]
</pre>

