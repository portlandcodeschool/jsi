---
layout: post
title: Knex and Bookshelf
class: bookshelf
date: 2015-06-01 12:00:01
---

<aside> The following is excerpted from the original _Persistence_ lesson which includes Bookshelf.  The corresponding section of the revised _Persistence_ lesson has purged all references to Bookshelf, so they are preserved here.
</aside>

## Bookshelf.js & Knex.js

[Bookshelf.js][bookshelf] is an _object relational mapper_ or _ORM_. It allows us to work with objects in JavaScript instead of writing SQL queries manually. [Knex.js][knex] is the _query builder_ off of which Bookshelf.js is built. A query builder allows us (and Bookshelf.js) to build queries from JavaScript expressions that can be converted to any supported DBMS.

So using these tools, we can theoretically write code that would work with any of the SQL databases without having to worry about differences between them. In practice, since the differences are subtle, the best practice is to choose one database for a project, and use it for production and for the entire development team.

<aside>
**So I Don't Need to Know SQL?**

While we'll focus on Bookshelf.js and Knex.js, you absolutely need to continue to develop your skills with SQL. Unlike programming languages that completely abstract away the lower level interaction with assembly language, ORM tools do not completely abstract away SQL. They just make the most common tasks more expressive and digestible.
</aside>

To install, we'll use all three of these modules we've discussed, plus _Bluebird_, a _promise_ library. You'll see promises in action in just a second!

{% highlight bash %}
npm install --save bookshelf knex pg bluebird
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
</aside>

Then modify the `knexfile.js` file so that it contains:

{% highlight javascript %}
client: 'postgres',
connection: {
  host     : process.env.APP_DB_HOST     || '127.0.0.1',
  user     : process.env.APP_DB_USER     || '',
  password : process.env.APP_DB_PASSWORD || '',
  database : process.env.APP_DB_NAME     || 'jsi-bookshelf'
}
{% endhighlight %}

Finally, we can create a migration:

{% highlight bash %}
`npm bin`/knex migrate:make countries
{% endhighlight %}

Once ready, we can fill out our `20140510084914_countries.js`. Yours is named differently? It better be. Using timestamps allows Knex.js to know the order in which to apply migrations. It also avoids the possibility of two developers creating a migration with the same name (which would cause merge conflicts in our version control system).

Migrations allow us to collaborate better. Without this we would have to alter the database _schema_ to match the changes that another developer made. Doing this manually is error prone, so most communities have built automation tools to aid with this process.

So here's a [migration][knex-schema]:

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

Now we need to learn how to use Bookshelf.js to interact with the database.

### Modeling

We need to define the objects that we want to work with. This may seem tedious at this point, but we get to skip over any attributes and just define which model the table works with.

{% highlight javascript %}
var env = process.env.NODE_ENV || 'development';
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

var Country = bookshelf.Model.extend({
  tableName: 'countries'
});
{% endhighlight %}

### Insert

Now we can create and save objects via `new` or `forge`:

{% highlight javascript %}
// new Country({ name: 'Canada' }).save().... also works
Country.forge({ name: 'Canada' }).save().then(function(country) {
  console.log('created a country %j', country.toJSON());
})
.done();
{% endhighlight %}

### Queries

Querying is pretty easy via:

{% highlight javascript %}
Country.where({ name: 'Canada' }).fetchAll().then(function(result) {
  console.log(result.toJSON());
})
.done();
{% endhighlight %}

## Bookshelf Challenges

Go explore [the documentation][bookshelf] and figure out how to create
one-to-one and one-to-many relationships. Figure out how to create objects in these relationships and query for them. Also make sure you can delete and update objects of each type of relationship.

### Simple Usage

- Define a migration
- Create an object
- Read an object
- Update an object
- Delete an object
- Search through objects for something specific

### One-to-Many

- Define two tables in a migration
- Create an object on the _one_ end of the relationship
- Create a few of the other type
- Search for a model on the _one_ side based on a condition for something from the _many_ side
- Search for all models on the _many_ side that match a specific condition individually and are associated with a particular instance on the _one_ side
- Delete specific objects on the _many_ side
- Delete all objects on the _many_ side & the object on the _one_ side within a transaction

### Many-to-Many

- Define the required three tables in a migration
- Create a bunch of objects that relate
- Write queries to access them through their relationships

[bookshelf]: http://bookshelfjs.org
[postgres]: http://www.postgresql.org
[postgres-datatype-docs]: http://www.postgresql.org/docs/9.4/static/datatype.html
[knex]: http://knexjs.org
[knex-schema]: http://knexjs.org/#Schema
[atwood-join]: http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/
