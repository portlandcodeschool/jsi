---
layout: post
title: Backbone Collections
class: backbone2
date: 2015-06-23
---

This is the second part of the full tutorial [here][backbone-repo].

## Collections Project: Text Lists

### Outline

In this project, we're going to again create a *client side only* application that
-   displays a list of items
-   contains a text field and a submit button that will add the entered text to the list

What we're going to cover in this section is:
-   How to create a Backbone *collection* of models
-   How to create view for a collection
-   How to make the collection's view delegate to individual views
-   How to use the collection specific events to keep the view in-sync

### Lesson and Code

When you're dealing with sites like twitter, or instagram, or anything of that ilk there tend to be **collections** of things. You're reading a *list* of tweets, looking at a *list* of search results, examining a *list* of photos that match a tag, checking a *list* of followers etc. 

In other words, there's a lot of "list-like" things in the data that we're seeing constantly online. This is such a common pattern that Backbone has, built-in, a *Collection* class that allows you to have "lists" of models that can listen for special list-specific events such as adding or removing from the list. 

The basic way that Backbone *collections* work is that you associate to each collection the kind of **model** that it's a list of. You still have individual views for each model, though, and we leave the bulk of the work for handling the display and manipulation of data to the **individual** model/view pairs. We'll also have a view for the **collection**, that will handle how the list is displayed. To this end, we're going to proceed by

1.  writing our base html
2.  defining the model and view for our text data
3.  define the collection for the text data model
    -   this part will be rather simple and bare bones in comparison to the view
4.  define the *view* for our collection
    -   the view will include the framework for displaying the list
    -   the view will also include the button that adds a new element to the collection
        -   this will trigger the `add` event for the collection

We're going to start our application very similar to how our previous project started: with some very simple HTML. 

```HTML
    <!doctype html>
    <html>
      <head>
        <title>Text in Lists</title>
        <script type="text/javascript" src="js/jquery-2.1.4.js"></script>
        <script type="text/javascript" src="js/underscore.js"></script>
        <script type="text/javascript" src="js/backbone.js"></script>
        <script type="text/javascript" src="textlist.js"></script>
      </head>
      <body>
        <div id="listdiv"></div>
      </body>
    </html>
```

Next, we'll start with our basic model of a piece of text. It'll have a "replace" method that will replace the text inside it. Its individual view is going to be an input with the default text of the input set to the value of the model and a "clear" button that will set the text of the model to the empty string ~" "~ . This part is basically the same as our previous project, except that we're going to use a different **kind** of event, `keypress`, for setting the value of the text of the model. In particular, if the key pressed in the input field is the "enter" key, then we call the `replace` operator of the view, which will in turn call the `replace` method of the model.

```JavaScript
    var TextModel = Backbone.Model.extend({
        defaults : {"value" : ""},
        replace : function (str) {
          this.set("value", str);
        }
    });
    
    var TextView = Backbone.View.extend({
        render: function () {
            var textVal = this.model.get("value");
            var btn = '<button>Clear</button>';
            var input = '<input type="text" value="' + textVal + '" />';
            this.$el.html(textVal+"<br><div>" + input + btn + "</div>");
        },
        initialize: function () {
            this.model.on("change", this.render, this);
            // last argument 'this' ensures that render's
            // 'this' means the view, not the model
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
Next, we actually define the collection. This is pretty similar to all the other Backbone classes that we extend, just with the special attribute `model` that we need to match up to the kind of model we want to store in this collection.

```JavaScript
    var TextCollection = Backbone.Collection.extend({
        model : TextModel
    });
```
After this, we need to make our view for the **collection** and write our event handlers for the collection. This is going to be the bulk of our moving parts for this program. The view for the collection will display all of our individual views as well have a button that will add a new "blank" text field into our page (with the default text "Enter something here"). 

```JavaScript
    var TextCollectionView = Backbone.View.extend({
        render : function () {
            var btn = '<button id="addbutton">Add Text</button>';
            var div = '<div id="text-list"></div>';
            this.$el.html(div + btn);
        },
        initialize : function () {
            this.listenTo(this.collection, 'add', this.addView);
        },
        events : {
            "click #addbutton" : "addModel"
        },
        addModel : function () {
            this.collection.add({});
            // collection adds a model, fires add event, then listener calls this.addView(model)
        },
        addView : function (newModel) {
            newModel.set("value","Enter something here...");
            var view = new TextView({model : newModel});
            view.render();
            this.$("#text-list").append(view.$el);
        },
    });
```

There's a few pieces here that we should explain in a bit more detail. First, we're using the more convenient function `listenTo` this time, which in this case means that `this.collection` is now listening on the `add` event and, when it fires, will run `this.addView` with the new model as an argument.  Also, `listenTo` calls the event handler **in the context of the view, not the collection**, so that `this` means the view. Basically, this just lets us avoid including the extra `this` parameter like in our individual model. Calling `addView` takes the newly added model, creates a view for it, renders it, then adds it to the list of views. We use `events` to listen for when the button is clicked and then we run `addModel`. In turn, `addModel` will call the `add` method of the collection. The importance of `add` is that it will simultaneously make a new model and add it to the collection, triggering the `add` event that we're already listening for. 

<aside>
Collections also have a *create* method, which works just like *add* but also persists the new model to a server if there is one.
</aside>

Note that we don't have to say **anything** in the view for the collection about how the view of the individual model works. We just call that individual view's render function and allow it to take care of everything. 

Finally, we go ahead and run the code we need to initialize the whole application:

```JavaScript
    var textCollection = new TextCollection();
    
    var textCollectionView = new TextCollectionView({ collection : textCollection});
    
    textCollectionView.render();
    
    $("#listdiv").append(textCollectionView.$el);
```

### Exercises

#### Delete Button

In this exercise, we're going to add a "delete" button that will erase the bottom element of the list of elements. To do that, you're going to need to 
-   add a delete button to the view of the **collection**;
-   add a event handler that listens for the "remove" event for the collection and refreshes the list, removing the corresponding view from the DOM.
    There's more than one way you could do this, but a simple way might be to use CSS pseudo-selectors to select only the last div in the collection

#### Edited Count

In this exercise, you're going to add a new piece of data to the **base** model: the number of times that it's been edited. Every time the field is edited, it should increment this number. In this case, "edited" means **either** cleared or you've pressed enter while in the input field. You'll need to also modify the view for the base model. 
Question: will you need to modify the view for the collection?

1.  Extra Credit

    To be a little more challenging, make sure that the number-of-times-incremented only increases if the text has actually changed.

## Bonus Topics

### Initialization Objects

Subclasses of Backbone objects (`CounterView` for example) can receive initialization arguments when instances are made by calling the constructor, as follows:
```Javascript
var view = CounterView({model:somemodel});
```

But only certain property names are installed automatically (e.g. 'model', 'collection', 'id').  Custom properties must be manually extracted in the initialize` method, as the follow demo shows:

```Javascript
var MyView = Backbone.View.extend({
    props: function() {
        return Object.keys(this).join(' ');
    }
});

// Subclasses (inherit props):
var MyView2 = MyView.extend({
    initialize: function(opts) {
        // grab particular options
        if (opts)
            this.special = opts.special;
            this.a = opts.a; //...
    }
});

var MyView3 = MyView.extend({
    initialize: function(opts) {
        // grab all options
        _.extend(this,opts); //means merge, not subclass
    }
});

var opts = {a:'a',b:'b',id:'id',model:'mod',special:'yay'};

var view0 = new MyView();
var view1 = new MyView(opts);
var view2 = new MyView2(opts);
var view3 = new MyView3(opts);

view0.props();
view1.props();
view2.props();
view3.props();
```

### Templates

Backbone view often use pre-compiled templates to render their HTML.
Here's a basic demo of two different template formats:

```Javascript
useMustacheTemplates(); //causes templates to use {{}} format

var data = {verb:'jump', subj:'life', adj:'short', obj:'chair'};

var ERBView = Backbone.View.extend({
    template: _.template('The <%=subj%> <%=verb%>s the <%=adj%> <%=obj%>'),
    render: function() {
        this.$el.html(this.template(data));
        $(document.body).append(this.$el);
    }
})


var MustacheView = Backbone.View.extend({
    template: _.template('The \{\{subj\}\} \{\{verb\}\}s the \{\{adj\}\} \{\{obj\}\}'),
    render: function() {
        this.$el.html(this.template(data));
        $(document.body).append(this.$el);
    }
})

var erbView, mustView;
$(function() {
    erbView = new ERBView();
    mustView = new MustacheView();
})

function useMustacheTemplates() {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };
}
```

[backbone-repo]: https://github.com/portlandcodeschool/backbone-tutorials

