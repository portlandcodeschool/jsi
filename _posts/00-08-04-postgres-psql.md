---
layout: post
title: Postgres and PSQL
class: persistence
date: 2015-10-01 00:00:00
---

## SQL via Javascript: A Quick Look at Node's PG module

So how do we write SQL from JavaScript? One way to do it is to connect to the SQL server and write the SQL queries by hand. Let's give it a try:

{% highlight bash %}
npm install pg
{% endhighlight %}

{% highlight javascript%}
// node index.js
var pg = require('pg');
var settings = "postgres://localhost/test"; // "postgres://username:password@localhost/database";
var id = process.argv[2];

if (process.argv.length <= 2) { return console.error('please provide an id to look up'); }

var client = new pg.Client(settings);
client.connect(function(err) {
  if(err)
    return console.error('could not connect to postgres', err);

  client.query('select * from people where id = $1::int', [id], function(err, result) {
    if(err)
      return console.error('error running query', err);

    console.log('%j', result.rows[0]);

    client.end();
  });
});
{% endhighlight %}

<aside>
The code sample above will work fine for small-scale use, but if you're writing a server which handles many requests, you'll get faster responses if you take advantage of the `pg` module's _client-pooling_ feature.  The code is only slightly more complex:

{% highlight javascript %}
// node index.js
var pg = require('pg');
var settings = "postgres://localhost/test"; // "postgres://username:password@localhost/database";
var id = process.argv[2];

if (process.argv.length <= 2) { return console.error('please provide an id to look up'); }

pg.connect(settings, function(err, client, done) {
  if (err)
    return console.error('error fetching client from pool', err);

  client.query('select * from people where id = $1::int', [id], function(err, result) {
    done(); // done with this client; recycle it

    if (err)
      return console.error('error running query', err);

    console.log('%j', result.rows[0]);

    pg.end(); // completely finished with the database for this app
  });
});
{% endhighlight %}
</aside>

## Knex.js

[Knex.js][knex] is a _query builder_ which allows us to build queries from JavaScript expressions that can be converted to any supported DBMS.

Theoretically, it lets us write code that would work with any of the SQL databases without having to worry about differences between them. In practice, since the differences are subtle, the best practice is to choose one database for a project, and use it for production and for the entire development team.

To install, we'll use three modules: _pg_, _knex_, and _Bluebird_, a _promise_ library. You'll see promises in action in just a second!

{% highlight bash %}
npm install --save knex pg bluebird
{% endhighlight %}

### Migrations

Let's specify the creation of tables and relationships directly in JavaScript. To do so, run:

{% highlight bash %}
`npm bin`/knex init
{% endhighlight %}

<aside>
That command is a short way of saying
`./node_modules/.bin/knex init`
but it works from any directory.

Beware of directories with spaces in their name; the path replacement won't work if the path it returns contains a space.
If that happens, you can glue the whole path together by wrapping it in quotes like this:
{% highlight bash %}
"`npm bin`"/knex init
{% endhighlight %}
</aside>

Then modify the `knexfile.js` file so that the `development` section contains:

{% highlight javascript %}
client: 'postgres',
connection: {
  host     : process.env.APP_DB_HOST     || '127.0.0.1',
  user     : process.env.APP_DB_USER     || '',
  password : process.env.APP_DB_PASSWORD || '',
  database : process.env.APP_DB_NAME     || 'jsi-knex-db'
}
{% endhighlight %}

Finally, we can create a migration:

{% highlight bash %}
`npm bin`/knex migrate:make countries
{% endhighlight %}

Once ready, we can fill out our `20140510084914_countries.js`. Yours is named differently? It better be. Using timestamps allows Knex.js to know the order in which to apply migrations. It also avoids the possibility of two developers creating a migration with the same name (which would cause merge conflicts in our version control system).

Migrations allow us to collaborate better. Without this we would have to alter the database _schema_ to match the changes that another developer made. Doing this manually is error prone, so most communities have built automation tools to aid with this process.

Modify your file corresponding to `20140510084914_countries.js` to describe this two-way [migration][knex-schema]:

{% highlight javascript %}
'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('countries', function(table) {
    table.increments('id').primary();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('countries');
};
{% endhighlight %}

We can now migrate forward or backward:

{% highlight bash %}
`npm bin`/knex migrate:latest
`npm bin`/knex migrate:rollback
{% endhighlight %}

If you add `debug: true` to your `knexfile.js` `development` setting, you can even see the SQL queries that Knex.js is running.

<aside>
**Migration Tracking**

You may notice a new table added to your database called `knex_migrations`. This table tracks the migrations you've applied thus far, so it knows what's left to apply.
</aside>

### Challenge

Create another migration for the `cities` table. This should match up with the cities table that we created before.

## Basic Manipulation

Now we need to learn how to use Knex.js to interact with the database.
To set up Knex within a `node` file, include these lines:
{% highlight javascript %}
var env = process.env.NODE_ENV || 'development';
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
{% endhighlight %}

Now `knex` is an object capable of building and running SQL queries.


### Insert

Here's a basic example of adding data via `knex`:
{% highlight javascript %}
knex('countries').insert([{name: 'Xanadu'}]).then();
{% endhighlight %}


### Queries

Here's an example of a simple select query:

{% highlight javascript %}
knex('countries').select('*')
  .then(function(result) {
    console.log(result);
  });
{% endhighlight %}

Notice that `knex` returns a _promise_ object, and `then` handles the asynchronous outcome of the query.

<aside>
More examples coming soon; watch this space!
</aside>

[bookshelf]: http://bookshelfjs.org
[postgres]: http://www.postgresql.org
[postgres-datatype-docs]: http://www.postgresql.org/docs/9.4/static/datatype.html
[knex]: http://knexjs.org
[knex-schema]: http://knexjs.org/#Schema
[atwood-join]: http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/
