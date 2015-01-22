---
layout: post
title: Persistence
class: persistence
date: 2015-02-02
---

Today we're going to learn about persistence using _SQL_ (pronounced _sequel_ or <nobr>_S-Q-L_</nobr>), [Bookshelf.js][bookshelf] and [PostgreSQL][postgres] (pronounced <nobr>_post-gres-q-l_</nobr>, <nobr>_post-gre-sequel_</nobr> or <nobr>_post-gres_</nobr>).

There's a ton of information here, but much of it is really just repeating the same ideas both in native SQL and in an abstraction layer that allows us to work mostly in JavaScript.

## SQL

SQL stands for Structured Query Language; it is the common language for working with relational databases. SQL has been standardized, but it's very difficult to ensure that all SQL queries works with every database management systems (DBMS).

## Install PostgreSQL

{% highlight bash %}
brew install postgresql
{% endhighlight %}

Once installed, read the on-screen instructions. You should only have to configure `launchd` via `launchctl`, but these things change from time to time.

Once installed, you'll have a tool called `psql` that you can use to connect to the PostgreSQL database server running on your computer.

## Databases

Once connected, let's create a database called `test` that we can work with. Try to figure this one out on your own.

### Tables

In order to store data in the database, you'll want to create some tables. One of the easiest ways to think of a table is as a big spreadsheet. There are a bunch of pre-defined columns in a table, and you can add rows of data to it. Each column has a pre-defined type (because SQL is a _statically-typed_ language). There're a lot of options when creating tables; you can see them with `\h create table`.

Postgresql defines a bunch of types for you; the most important are:

* `integer` - a standard integer.
* `double precision` - a floating-point number
* `decimal` - a fixed-precision number, suitable for currency amounts
* `timestamp [with/without] timezone` - a date and time
* `date` - a date with no time of day
* `time` - a time of day with no date
* `interval` - a length of time
* `boolean` - a boolean value
* `text` - a chunk of text; a string

There are a whole bunch of other types available, which you can read about in [Postgres's excellent documentation][postgres-datatype-docs].

{% highlight sql %}
create table businesses (
  name text,
  established timestamp with time zone
);

insert into businesses values
  ('ABC Corp', '2010-04-15');
insert into businesses values
  ('XYZ Inc.', to_timestamp(1338350400.000));
insert into businesses values
  ('Long Name Company Incorporated', '2014-12-22');
{% endhighlight %}

### Select

A `select` query retrieves data from a table.

{% highlight sql %}
select * from businesses;
select name, established from businesses;
select name, extract(epoch from established) from businesses;
{% endhighlight %}

### Where

The `where` clause lets you select only some rows:

{% highlight sql %}
select * from businesses where established >= '2011-01-01';
{% endhighlight %}

### Update

We can update records as well by specifying which ones:

{% highlight sql %}
update businesses set name = 'XYZ Incorporated' where name = 'XYZ Inc.';
{% endhighlight %}

### Delete

We can delete records as well:

{% highlight sql %}
delete from businesses where established < '2011-01-01';
{% endhighlight %}

## Relationships

SQL Databases are _relational_; they're good at tracking the relationships between records.

### One-to-Many

A one-to-many relationship is where one record _has many_ of another.
Businesses have many employees, hospitals have many doctors, countries have many cities, etc. When we're referring to the other side of the relationship we say that an employee _belongs to_ a company, a doctor belongs to a hospital, or a city belongs to a country.

{% highlight sql %}
create table countries (
  id serial primary key,
  name varchar(20),
  independence timestamp
);
create table cities (
  id serial primary key,
  name varchar(255),
  country_id integer references countries(id)
);
{% endhighlight %}

The most common way to create relationships is to give each table its own `id`. This column will uniquely identify each row in the table and will never change for a particular record. It will also be _indexed_ by the database to provide faster lookup for these relationships.

That `references countries(id)` is called a _foreign key constraint_. The database will prevent us from making mistakes, creating or deleting records with broken relationships.

<aside>
***Serial***

The `serial` type allows us to quickly state that this column will contain integers that automatically increment as values are inserted. Rather than inserting a specific value, we can simply skip that value and it'll get a new id.

`create table foo (id serial);` is syntactic sugar for `create sequence foo_id_seq; create table foo (id integer not null default nextval('foo_id_seq');`.
</aside>

{% highlight sql %}
insert into countries (name, independence)
  values ('USA', '1776-07-04');
insert into countries (name, independence)
  values ('Canada', '1867-07-01');
insert into countries (name, independence)
  values ('Mexico', '1821-09-28');
insert into countries (name, independence)
  values ('Argentina', '1816-07-09');
select lastval(); -- get the id that was produced for the last insert
select * from countries;
{% endhighlight %}

Now let's insert some related records:

{% highlight sql %}
insert into cities (name, country_id) values ('Portland', 1);
insert into cities (name, country_id) values ('Washington DC', 1);
insert into cities (name, country_id) values ('Montreal', 2);
insert into cities (name, country_id) values ('Ottawa', 2);
insert into cities (name, country_id) values ('D.F.', 3);
insert into cities (name, country_id) values ('Guadalajara', 3);
insert into cities (name, country_id) values ('Buenos Aires', 4);
insert into cities (name, country_id) values ('Mendoza', 4);
select * from cities;
{% endhighlight %}

Now let's find all of the cities and the country in which they're located:

{% highlight sql %}
select * from cities
left join countries
on cities.country_id = countries.id;

select cities.* from cities
left join countries
on cities.country_id = countries.id;

select cities.name, countries.name from cities
left join countries
on cities.country_id = countries.id;
{% endhighlight %}

Try both of these:

{% highlight sql %}
insert into cities (name, country_id) values ('London', 5);
delete from countries where name = 'USA';
{% endhighlight %}

<aside>
**Constraints**

Databases allow us to create other constraints allowing us to specify rules to keep our data in a _consistent_ state. We can ensure that a column contains unique values. We can specify that a few columns don't ever repeat the same combination of values. We can keep a column from containing null values.

**Joins**

For those of you who are curious about the options on how to select data across multiple tables, there are many `JOIN` options available. We're not going to dig into them now because Bookshelf.js (and most object relational mappers) will handle this automatically for us.

There's a great [visual overview][atwood-join] of different join types that you can read about, though. Note the comment from the author, Jeff Atwood, though:

> The commenters pointing out that the diagrams break down in case of multiple and or duplicate results, are absolutely right. I was actually thinking of joins along the primary key, which tends to be unique by definition, although the examples are not expressed that way.

Like the cartesian or cross product, anything that results in more rows than you originally started with absolutely breaks the whole venn diagram concept. So keep that in mind.
</aside>

### Many-to-Many

Many-to-many relationships are the hardest type of relationships. If we want to have people who are residents of cities, we could do that with a one-to-many relationship like we did above, but sometimes people split their time between multiple locations.

{% highlight sql %}
create table people (
  id serial primary key,
  name varchar(255));
insert into people (name)
  values ('Andrew'),
         ('David'),
         ('Jonathan');
{% endhighlight %}

Now we have cities and people, but we have no relationship between the two. We actually need to build a new table to hold the relationships. The table will simply contain two foreign keys, one to reference the city, and one to reference the person. It's easier with an example:

   id |   name
  ----+----------
    1 | Andrew
    2 | David
    3 | Jonathan

   id |     name
  ----+---------------
    1 | Portland
    2 | Washington DC
    3 | Montreal
    4 | Ottawa

How do we relate Andrew to Portland? That's `1` in the people and `1` in the cities. David to Ottawa? `2` in people and `4` in cities. Since Jonathan lives in Ottawa as well, we'll put `3` in people and `4` in cities. Jonathan also spends half the year in Washington DC, so we'll need a `3` in people and `2` in cities for that.

So we end up with a table of relations that looks like this. Since the database supports relationships so well, we'll be able to use this table to build up queries telling us who lives where.

   person_id | city_id
  -----------+---------
           1 |       1
           2 |       4
           3 |       4
           3 |       2

Creating this table is pretty straightforward:

{% highlight sql %}
create table residences (
  person_id int references people(id),
  city_id int references cities(id)
);
insert into residences values (1, 1), (2, 4), (3, 4), (3, 2);
{% endhighlight %}

Getting the data you want out of the three tables that we now have is only a little more complicated.

Cities in which a specific person lives:

{% highlight sql %}
select cities.*
from
  cities
  inner join residences on cities.id = residences.city_id
where
  residences.person_id = 3;
{% endhighlight %}

People who live in a specific city:

{% highlight sql %}
select people.*
from
  residences
  inner join people on people.id = residences.person_id
where
  residences.city_id = 4;
{% endhighlight %}

All people and the city in which they live (or no city at all):

{% highlight sql %}
select people.*, cities.*
from people
left join residences on people.id = residences.person_id
left join cities on cities.id = residences.city_id;
{% endhighlight %}

## Transactions

Transactions allows you to group together multiple commands and either _commit_ the entire group at once or _rollback_ everything if you've realized that something isn't quite right.

Transactions allow us to better ensure _consistency_ in our database. If we want to create a user at the time that they sign up, but we also need to make sure that they have an account created for them, we can do both of those together. If both succeed, we can commit the transaction. If either fails, we can roll it back.

Imagine the frustration a user could experience if we didn't use a transaction. The user tries to sign up. The user data gets created in the database, but for some reason, the account creation fails. Now the user tries to sign in. If you verify that the user has an account during sign-in, then you may end up telling them that they're not able to access their account (or some similar error). But the user just signed up! What?

{% highlight sql %}
create table businesses (
  name varchar(255),
  established timestamp
);
create table employees (
  first_name varchar(255),
  last_name varchar(255),
  business_id int references businesses(id)
);

begin;
insert into businesses (name, established)
  values ('ABC Corp', '2010-04-15');
insert into employees (first_name, last_name, business_id)
  values ('Andrew', 'Lorente', lastval());
select * from businesses;
select * from employees;
commit;
select * from businesses;
select * from employees;

begin;
insert into businesses (name, established)
  values ('XYZ Inc', '2010-04-15');
insert into employees (first_name, last_name, business_id)
  values ('John', 'Doe', lastval());
select * from businesses;
select * from employees;
rollback;
select * from businesses;
select * from employees;
{% endhighlight %}

## More SQL

There is a lot more that you can do with SQL, from stored procedures to custom data types. Some people go very in depth with SQL and handle improving query performance, scaling database infrastructure to support a lot of data, etc. If you're interested in how large companies handle this type of thing, spend a little time reading about how to improve performance or scale an app.

<aside>
**MySQL & Others**

MySQL is another popular open source database. Much of what you've learned will apply directly to using MySQL. There are slight differences in more specialized queries like `serial` which MySQL does via `int not null auto_increment`. Simple queries are generally compatible across DBMS systems, but more advanced queries do not directly translate. Focus on PostgreSQL for now, but don't be scared if a project that you start working on uses another SQL database.

**Explain**

In Postgres, you can put `explain` before any query to see how the database will handle the query. This is a great tool for figuring out why a query is taking a long time (although it takes some time to learn to understand what Postgres is telling you). Another option is `explain analyze` which actually executes the query. Since the query is executed, you may wish to wrap this in a transaction (as it will actually insert/update/delete records).

{% highlight sql %}
begin;
explain analyze ...;
rollback;
{% endhighlight %}
</aside>

## SQL Challenges

- Create a table that uses a date. Insert some data. Select all of the entries that occur between some date range.
- Create a one-to-many relationship between `articles` and their `comments`. Be able to select which article a comment is for, and all of the comments for an article.
- Create a many-to-many relationship between users and permissions. Be able to select the users that fall under a permission group. Also be able check to see if a user has a given permission. For instance, does the user with email `alorente@portlandcodeschool.com` have permission to `blog_article.create`? Who are all of the users who have permissions to `blog_article.destroy`?
- **Advanced:** Model a file system with files and directories. You should be able to get a directory's contents and the parent directory.
- **Advanced:** Model family relationships. Support people who have a `name` and a `sex`. You should be able to query for:
  - A person's mother
  - A person's father
  - A person's children
  - A person's siblings
  - A person's grandmothers & grandfathers
  - A person's maternal grandmother/grandfather
  - A person's grandchildren
  - Cousins, etc.

## A Quick Look at Node's PG module

So how do we write SQL from JavaScript? One way to do it is to connect to the SQL server and write the SQL queries by hand. Let's give it a try:

{% highlight bash %}
npm install pg
{% endhighlight %}


{% highlight javascript %}
// node index.js
var pg = require('pg');
var settings = "postgres://localhost/test"; // "postgres://username:password@localhost/database";
var id = process.argv[2];

if (process.argv.length <= 2) { return console.error('please provide an id to look up'); }

pg.connect(settings, function(err, client, done) {
  if (err) { return console.error('error fetching client from pool', err); }

  client.query('select * from people where id = $1::int', [id], function(err, result) {
    done();

    if (err) { return console.error('error running query', err); }
    console.log('%j', result.rows[0]);

    pg.end(); // completely finished with the database for this app
  });
});
{% endhighlight %}

## Bookshelf.js & Knex.js

[Bookshelf.js][bookshelf] is an _object relational mapper_ or _ORM_. It allows us to work with objects in JavaScript instead of writing SQL queries manually. [Knex.js][knex] is the _query builder_ off of which Bookshelf.js is built. A query builder allows us (and Bookshelf.js) to build queries from JavaScript expressions that can be converted to any supported DBMS.

So using these tools, we can theoretically write code that would work with any of the SQL databases without having to worry about differences between them. In practice, since the differences are subtle, the best practice is to choose one database for a project, and use it for production and for the entire development team.

<aside>
**So I Don't Need to Know SQL?**

While we'll focus on Bookshelf.js and Knex.js, you absolutely need to continue to develop your skills with SQL. Unlike programming languages that completely abstract away the lower level interaction with assembly language, ORM tools do not completely abstract away SQL. They just make the most common tasks more expressive and digestible.
</aside>

To install, we'll all three of these modules we've discussed, plus _Bluebird_, a _promise_ library. You'll see promises in action in just a second!

{% highlight bash %}
npm install --save bookshelf knex pg bluebird
{% endhighlight %}

### Migrations

Let's specify the creation of tables and relationships directly in JavaScript. To do so, run:

{% highlight bash %}
`npm bin`/knex init
{% endhighlight %}

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
[atwood-join]: http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/
