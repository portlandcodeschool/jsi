---
layout: post
title: More Backbone Persistence!
class: backbone
date: 2015-09-25 00:00:00
---

## Model Persistence Exercise

Before we visit the last part of the tutorial, let's practice loading and saving individual models.  We can do it from scratch using ajax!

First, make sure you have a copy of three files, found in the [original repo][backbone-repo] but also listed below:

---
* modelServer.js

```javascript

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

var texts = [];

// Allow optional test data...
var testValues = ['Zero','One','Two','Three','Four','Five...data...things!']
var useTestValues = process.argv[2];// a number, optional extra argument when starting server
if (useTestValues)
	texts = testValues.slice(0,useTestValues);

function showData() {
	console.log('Data store is now: ', texts);
}


app.get('/texts/:id', function (req, res) {
    var id = req.params.id;
    console.log('Sending text #%s...',id);
    res.send({value : texts[id]});
});

/*
app.put('/texts/:id', function (req, res) {
	var id = req.params.id;
	console.log('Receiving text #%s...',id);
	texts[id] = req.body.value;
	showData();
	res.send({});
});

app.post('/texts', function (req, res) {
	console.log('Receiving new text...');
	var newid = texts.length;
	console.log('Assigning id of %s',newid);
	texts[newid] = req.body.value;
	showData();
	res.send({id:newid});
});

app.get('/texts', function (req, res) {
	console.log('Sending all texts...');
	showData();
	var textsAndIDs = texts.map(function (v, i) {
		return {id : i, value : v};
	});
	res.send(textsAndIDs);
});
*/

app.listen(3000);
showData();
```

---
* model.html

```html
<!doctype html>
<html>
  <head>
    <title>Persisent Model Demo</title>
    <script type="text/javascript" src="js/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="js/underscore.js"></script>
    <script type="text/javascript" src="js/backbone.js"></script>
    <script type="text/javascript" src="model.js"></script>
  </head>
  <body>
  </body>
</html>
```

---
* model.js

```javascript

var TextModel = Backbone.Model.extend({
    defaults : {"value" : ""},
    urlRoot: '/texts',
    //fetch: function() {},
    //save: function() {},
    initialize : function () {
        this.fetch();
    },    
    replace : function (str) {
        this.set("value", str);
        this.save();
    }
});


/*
var TextCollection = Backbone.Collection.extend({
    model : TextModel,
    url : "/texts",
    initialize: function () {
        this.fetch();
    }
});

var textCollection = new TextCollection();
*/

```

### Exercise

1. Notice that the server can be started with or without test data.
Starting it with `node modelServer.js` runs the server with no initial data.
Starting it with `node modelServer.js N` for some digit N will give the server a few test models to work with.

2. Start the server with `node modelServer.js 6`, direct your browser to `localhost:3000/model.html` and open the console.

3. Test out models' built-in `fetch()` method.  In the browser console, make a `new TextModel({})`.  You'll get a 404 error.  Can you explain why?

4. Next try `new TextModel({id:3})`.  What happens now and why?

5. Write your own version of `fetch()`!
Uncomment TextModel's fetch method and implement it using `$.get(...)`.

6. Now try using the model's built-in save method.  On your current model, try `model.replace('test')`.  You'll get a 404 error.  Why?

7. Uncomment the server's 'put' route and try again.

8. Write your own version of `save()`!
Uncomment TextModel's save method and implement it using a variant of `$.ajax(url,{method:'PUT'})`.  Ignore any models which don't have an id attribute.

9. Test your save() on a new model: `new TextModel({value:test, id:1})`.  Check the server log!  Then reload your browser page and try `new Model({id:1})`.  Did you model save and load correctly?

10.  Now try saving a model which has no id!  First uncomment the server's 'post' route.  Then modify your save() method to make an ajax POST request for a model with no id.

11.  Finally, uncomment the last server route and the client's TextCollection code.  What happens when you reload your browser page?

<!---
A possible solution for the `fetch()` and `save()` in 5,8,and 10 is [here]({{ site.baseurl }}/curriculum/samples/Sep23/model-fetch-save.js).
-->
