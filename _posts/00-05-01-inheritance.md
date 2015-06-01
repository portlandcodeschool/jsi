---
layout: post
title: Inheritance Review
class: inheritance
date: 2015-06-01 00:00:01
---

## Constructors, Prototypes, and Subclassing

### Exercise 1: Basics

-   First make a constructor named _Ctor_ for an object that has properties _a_ and _b_ and initializes them to 0 and 1 respectively.
-   Now, make two objects named _obj1_ and _obj2_ using _Ctor_.
-   Now make a new object _obj3_ this way:
{% highlight javascript%}
    var obj3 = {};
    Ctor.call(obj3);
{% endhighlight %}

    and check its properties.
-   Next, add a property _c_ to _obj1_ with a value of 2.  What will be the value of _obj2.c_?
-   Now, add a property _d_ with the value 3 to _obj1_'s "proto" (the object which helps out when _obj1_ can't do something by itself).  Remember that there are at least four ways of referring to that proto object.
-   What are the values of _obj1.d_, _obj2.d_, and _obj3.d_? Can you explain the results?

### Exercise 2: Modifying Prototypes

Consider this code:

{% highlight javascript%}
function A() {};
//set default values for instances of A:
A.prototype = {num:0, str:'default'};
var objA = new A();

function B() {};
// set default values for instances of B:
B.prototype.num = 0;
B.prototype.str = 'default';
var objB = new B();
{% endhighlight %}

There is a difference between the behaviors of `objA` and `objB`!  Explain.

### Exercise 3: Imaginary Menagerie

**a)** Implement a simple taxonomy of four related classes, using a constructor for each:

- _Animal_: every instance of an Animal should inherit a method called _move()_.  For basic animals, this just returns the string "walk".  This method will be overridden by subclasses of Animal.
- _Bird_: A subclass of Animal.  Every Bird instance should return "fly" instead of "walk" when asked to _move()_.  All Birds also inherit a property _hasWings_ which is true.
- _Fish_: Another subclass of Animal.  A Fish instance will "swim" instead of "walk".
- _Penguin_: A subclass of Bird.  Penguins cannot fly and they should move like Fish.

Every instance of Animal and its subclasses should also have a personal _name_ property which is not inherited.  It should be set only within the constructor Animal, and each subclass constructor should first call its superclass constructor as an initializer, all the way up to Animal.

You should see these behaviors:
{% highlight javascript%}
new Animal("Simba").move();// 'walk'
new Fish("Nemo").move();// 'swim'
new Bird("Lulu").move();// 'fly'
var pengo = new Penguin("Pengo");
pengo.name;     // "Pengo"
pengo.move();   //'swim'
pengo.hasWings; //true;
pengo instanceof Penguin; //true
pengo instanceof Bird; 	  //true
pengo instanceof Animal;  //true
{% endhighlight %}

**b)** Create a class _Egg_, whose instances have one method, _hatch(name)_, which returns a new instance (named _name_) of the same species which laid the egg.
Assume that every Animal can lay an egg with an instance method _layEgg()_ which creates a new Egg instance.
Try to solve this without subclassing Egg and without implementing _layEgg_ and _hatch_ more than once.

You should see this behavior:
{% highlight javascript%}
var pengo = new Penguin("Pengo");
var egg = pengo.layEgg();
egg.constructor === Egg; //true
var baby = egg.hatch("Penglet");
baby instanceof Penguin; //true

var nemo = new Fish("Nemo");
egg = nemo.layEgg();
egg.constructor === Egg; //true
baby = egg.hatch("Nemolet");
baby instanceof Fish; //true
{% endhighlight %}
