---
layout: post
title: Backbone with a Server
class: backbone3
date: 2015-06-24
---

This is the third part of the full tutorial [here][backbone-repo].

## Server Side Project: Counter With Server

### Outline

In this section, we're going to show how to connect our first counter example with a simple Node server. By the end of this section we'll have shown

-   how to use Backbone to save models to a server,
-   how to set the url route **used** by Backbone to communicate with the server,
-   how to use synchronization methods for models such as `save` and `destroy`.

### Lesson and Code

   First, let's put together our client side application and then go ahead and show how to write a simple server to go along with it. Our HTML isn't going to change, other than linking to a different file:

file: counterServe.html

```HTML
    <!doctype html>
    <html>
      <head>
        <title>A Counter Example</title>
        <script type="text/javascript" src="js/jquery-2.1.4.js"></script>
        <script type="text/javascript" src="js/underscore.js"></script>
        <script type="text/javascript" src="js/backbone.js"></script>
        <script type="text/javascript" src="counterServe.js"></script>
      </head>
      <body>
        <div id="counterdiv"></div>
      </body>
    </html>
```

and we're going to **mostly** use the same Backbone code as our cleaned-up counter example.

file: counterServe.js

```JavaScript
    $(document).ready( function () {
    
        var Counter = Backbone.Model.extend({
            defaults : {"value" : 0},
            urlRoot : "/counter"
        });
    
        var counterModel1 = new Counter({id : 1});
    
        Counter.prototype.inc = function () {
            var val = this.get("value");
            this.set("value", val+1);
            this.save();
        }      
    
        counterModel1.fetch();
```

the first real change is that we need to set the URL structure that's we're going to use for communicating with the server. In this case, we're going to use `/counter` as the basic route, so we set `urlRoot` to be `/counter`. When Backbone communicates with the server, it will send a message to `route/to/server/counter/id` where `id` is the value of the id of the counter. You might note that we hadn't **used** an ID before now, but by default Backbone needs an `id` to communicate with the server so we include it as a parameter when we create our model.

The view is entirely unchanged from our previous code, since we've localized all the interaction with the server into the model.

```JavaScript
        var CounterView = Backbone.View.extend({
            render: function () {
                var val = this.model.get("value");
                var btn = '<button>Increment</button>';
                this.$el.html('<p>'+val+'</p>' + btn);
            },
            initialize: function () {
                this.model.on("change", this.render, this);
            },
            events : {
                'click button' : 'increment'
            },
            increment : function () {
                this.model.inc();
            }
        });
    
        var counterView1 = new CounterView({model : counterModel1});
    
        counterView1.render();
    
        $("#counterdiv").append(counterView1.$el);
    
    });
```

and we'll also set up a simple Express server to serve up the the HTML statically and then have a couple of simple routes for handling the get and put from the client side. We've already decided what routes we should be listening on: `/counter/1` is going to be the URL uses to talk to the server. 

This server is fairly simple. We 

-   set up the server application by calling `express()`
-   initialize a variable that will store the counter, setting it to 0
-   set up the needed middleware for
    -   automatically parsing the request into JSON
    -   serving up the local directory statically
-   set up the routes for Backbone's use
    -   a **get** request to `/counter/1` will send back an object that has the value of the counter
    -   a **put** request to `/counter/1` will extract the value of the counter from the request and store it in the local variable

file: counterServer.js

```JavaScript
    var express = require('express');
    var bodyParser = require('body-parser');
    
    var app = express();
    
    var counter1 = 0;
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(__dirname));
    
    app.get('/counter/1', function (req, res) {
        console.log("counter has been requested");
        res.send(JSON.stringify({value : counter1}));
    });
    
    app.put('/counter/1', function (req, res) {
        console.log(req.body);
        counter1 = req.body.value;
        res.end();
    });
    
    app.listen(3000, function () {
        console.log("server started");
    });
```

In order to actually run this code, we need to make sure that the appropriate libraries are installed, so run the following shell commands to get your local directory set up with the Node libraries needed. 

```bash
    npm install express &&
    npm install body-parser
```

Then, go ahead and start the server with 

```bash
    node counterServer.js
```

and navigate your browser to `localhost:3000/counterServe.html` see the application. To test and make sure the synchronization with the server is working, try refreshing the page. You should see the value of the counter be restored to what it had been before the refresh. 

### Exercises

#### Sync Events

Every time `save` or `fetch` is called, a `sync` event is triggered for the model. Given this fact, go ahead and test this event out by adding 

-   a new `<p>` element to the view
-   an event handler to the view that will update the text of this element every time a sync event is called

1.  Extra Credit

    You'll note that as described, this field doesn't actually **persist** across refreshes of the page. In order to make it actually persist for the life of the server, we'll need to add a **new** view and model. The basic procedure is:
    -   define a new model for the refresh data
        -   define the URL root for the refresh model
    -   define a view for the refresh data
    -   have the refresh-model listen for the `sync` event on the counter model and update itself
    
    As with the other exercises in this section, test things out by refreshing the page and making sure that the data doesn't change.

#### Decrement Button

A simple exercise to try is to add a decrement button to the view and a decrement operation to the model that synchronizes up with the server correctly. Test your code by refreshing the page.

#### Concatenating Text Fields

This exercise is a repeat of the Concatenating Text Fields of the first section, but this time you need to 

-   choose a url path for the data
-   add the appropriate `save` and `fetch` calls to the model to synchronize with the server
-   write a small server based on our example that will serve up our page and listen for Backbone's requests

## Server Side Project: Collections

### Outline

Next, as a short section we'll be covering how to synchronize Backbone collections with the server. To this end, we'll convert the previous text-fields examples to communicate with a small Express server much like we did in the previous section. 

### Lesson and Code

As usual, the first piece is our HTML which isn't going to change except for the filename:

file: textlistServe.html

```HTML
    <!doctype html>
    <html>
      <head>
        <title>Text in Lists</title>
        <script type="text/javascript" src="js/jquery-2.1.4.js"></script>
        <script type="text/javascript" src="js/underscore.js"></script>
        <script type="text/javascript" src="js/backbone.js"></script>
        <script type="text/javascript" src="textlistServe.js"></script>
      </head>
      <body>
        <div id="listdiv"></div>
      </body>
    </html>
```

Now we come to the client-side application. In the first place, we have our basic model and view. This model and view is going to be mostly similar to what we've seen before. The main change that we make is that we call `.save` in the `replace` function of the model and call `fetch` in our initialization.

file: textlistServe.js

```JavaScript
    var TextModel = Backbone.Model.extend({
        defaults : {"value" : ""},
        initialize : function () {
            this.fetch();
        },    
        replace : function (str) {
            this.set("value", str);
            this.save();
        }
    });
    
    var TextView = Backbone.View.extend({
        render: function () {
            var textVal = this.model.get("value");
            var btn = '<button>Clear</button>';
            var input = '<input type="text" value="' + textVal + '" />';
            this.$el.html("<div>" + input + btn + "</div>");
        },
        initialize: function () {
            this.model.on("change", this.render, this);
        },
        events : {
            "click button" : "clear",
            "keypress input" : "updateOnEnter"
        },
        replace : function () {
            var str = this.$el.find("input").val();
            this.model.replace(str);
        },
        clear: function () {
            this.model.replace("");
        },
        updateOnEnter: function (e){
            if(e.keyCode == 13) {
                this.replace();
            }
        }
    });
```

The more significant changes come in our collection. First, note that we set the url **in the collection** rather than in the individual models, now. In fact, our `urlRoot` property from the last section is only to be used if we're planning to not use our models as part of a collection. 

```JavaScript
    var TextCollection = Backbone.Collection.extend({
        model : TextModel,
        url : "/texts",
        initialize: function () {
            this.fetch();
        }
    });
```

For the view, we make a rather important change in the `addCollection` call: we need to now set the **ID** of each model. To simplify things, we're going to just assign all of our IDs on the client side, using a simple counter to keep each of the IDs unique by incrementing them. 

```JavaScript
    var idCount = 0;
    
    var TextCollectionView = Backbone.View.extend({
        render : function () {
            var btn = '<button id="addbutton">Add Text</button>';
            var div = '<div id="text-list"></div>';
            this.$el.html(div + btn);
        },
        initialize : function () {
            this.listenTo(this.collection, 'add', this.addOne);
        },
        events : {
            "click #addbutton" : "addCollection"
        },
        addOne : function (txt) {
            txt.set("value","Enter something here...");
            var view = new TextView({model : txt});
            view.render();
            this.$("#text-list").append(view.$el);
        },
        addCollection : function () {
            this.collection.create({id : idCount});
            idCount = idCount+1;
        }
    });
    
    var textCollection = new TextCollection();
    
    var textCollectionView = new TextCollectionView({ collection : textCollection});
    
    textCollectionView.render();
    
    $("#listdiv").append(textCollectionView.$el);
    
    });
```

Finally, we have the server for our application. We're skipping over the preample that's identical, and instead we'll concentrate on the routes. To note, we're storing all of our examples in 

Here, we're going to have three different main routes. 

1.  a `get` route to `/texts/:id`, this is called when we `fetch` from the **TextModel** and we need to return the JSON object that packs up the value property from the `texts` array on the server
2.  a `put` route to `/texts/:id`, which is called when we modify a TextModel
3.  a `get` route to `/texts` which is used to initialize the data for the TextCollection, where we pack up an array of objects to feed into the collection and send it

file: textlistServer.js

```JavaScript
    var texts = [];
    
    app.get('/texts/:id', function (req, res) {
        var id = req.params.id;
        res.send(JSON.stringify({value : texts[id]}));
    });
    
    app.put('/texts/:id', function (req, res) {
        var id = req.params.id;
        texts[id] = req.body.value;
        res.end();
    });
    
    app.get('/texts', function (req, res) {
        var textsAndIDs = texts.map(function (v, i) {
            return {id : i, value : v};
        });
        res.send(textsAndIDs);
    });
    
    app.listen(3000);
```

### Exercises

#### Deletion

Now, try to replicate the previous exericse for adding a delete button to the client-only text list project for having a **server** as well. You'll need to create a route for the delete call to remove the element from the server.

1.  Extra Credit

    Add a delete button to the view of the individual models that will allow you to remove that particular model from the collection. 

## Project Ideas

In our final section, we'll be covering a few ideas for small, self-contained Backbone projects.

### Grocery List App

A reasonable plan of action is to

-   define a model for a grocery list item. It should include a
    -   name
    -   price
    -   quantity
-   define a view for the grocery-list item model it should, at the minimum, have
    -   buttons to change the quantity
    -   an input field for the name of the item
    -   an input field for the price-per-item
-   define a collection for the grocery list model and a **view** for said collection
    -   the view should include a button that will add a new model to the collection
-   write a simple server that will keep all this data alive across refreshes of the page

#### Extra Credit

Include one more piece of data: a budget. You'll need to make another model and view for the budget. In this case, though, you'll actually want the view for the budget to include **another** field that's the amount you have **left** after subtracting all the current groceries.
You can either

-   have the remaining amount field recalculate when you click a button that's also in the budget's view
-   have the remaining amount field recalculate whenever you've edited the grocery list

### Sudoku Solver

If you've completed the sudoku solver project from [Portland Code School's](http://portlandcodeschool.github.io/jsi/2015/06/16/sudoku/) Javascript course, then you can absolutely use Backbone to provide a front-end to the sudoku solver.

Since in your previous efforts, a sudoku puzzle was represented as a sequence of numbers it would be rather natural to have a puzzle be represented by a collection of individual models for each square. Of course, that's not the only way we could do things. In terms of **logical** layout, you might want to have *rows* that are collections of squares, and a *puzzle* is a collection of rows. 

The basic outline of what you should do is:

-   define a model and view for an individual cell
-   define models and views for the entire puzzle
    -   with the intermmediate step of defining models and views for rows if that's how you're planning to do it
    -   add a button to the view that calls your solver on the server and then syncs the front end with the server

#### Extra Credit

If you want to make your sudoku implementation more thorough, you can make it more interactive in terms of allowing users to create a sudoku puzzle from scratch by editing the fields. In this case, you might want to start with a completely **blank** puzzle and make the individual cells be editable. 

### Anything You Want

Go ahead. You can actually try anything you'd like.

[backbone-repo]: https://github.com/portlandcodeschool/backbone-tutorials

