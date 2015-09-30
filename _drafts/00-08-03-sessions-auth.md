---
layout: post
title: Postgres, part 1
class: persistence
date: 2015-09-30 00:00:00
---

Over the past couple of days, we've looked at using Orchestrate to persist data, keeping it safe and intact even if the server needs to restart. Orchestrate is a great tool, and quite user-friendly, particularly coming from JavaScript since it's basically just `key: value` storage with some extra methods built in. For the rest of the week, we'll be changing the focus of our persistence exercises to be on SQL.

## SQL Overview

Structured Query Language is a designed for working with relational databases. It was created over 40 years ago--aeons in internet time--and as such is a tested, tried, and true technology. Like a spoken language, though, over all that time, some dialects have come into being. The type of SQL that we'll be working with this week is PostgreSQL, a free and open-source database system "only" 20 or so years old.

##A word about data security

People have been thinking about how to keep digital data safe from bugs and crashes for decades (if not longer!), and have come up with four key principles for ensuring that your data sticks around and doesn't change unless you want it to:

- *Atomicity:* Any given data transaction should be a single, indivisible, atomic chunk: a transaction should either happen or not happen, rather than some parts happening and other parts not happening.

- *Consistency:* Data in the system must always be in a valid state; it should not be possible to alter the data, even temporarily, in such a way as to cause an invalid state.

- *Isolation:* In-progress data transactions shouldn't be visible to other transactions--only completed transactions should be visible.

- *Durability:* Once a change has been made, it should stay made--even if the power goes off or some other catastrophic problem comes up.

These four principles taken together are referred to as ACID. Postgres, like most other SQL systems, is an ACID-compliant database management system. While there are some ACID-compliant non-relational database systems out there, the vast majority, including MongoDB and Orchestrate, are not--they sacrifice some security for performance gains and ease of use. This is one of the reasons that SQL is still the dominant database technology 40 years after its creation.

## Installing Postgress

Linux users should be able to install postgres with whichever package manager their system uses fairly painlessly.

For Mac users (assuming you have Homebrew installed):

{% highlight bash %}
brew install postgresql
{% endhighlight %}

Once installed, read the on-screen instructions. You should only have to configure `launchd` via `launchctl`, but these things change from time to time.

After that's all squared away, you'll have a tool called `psql` that you can use to connect to the PostgreSQL database server running on your computer.

For Windows users, you'll have to [download an installer](http://www.enterprisedb.com/products-services-training/pgdownload#windows) and run it. That will install a number of files on your system, including a tool called pgAdmin III. This is a graphical interface with the Postgres database. In the not-unlikely event that `psql` does not work for you, you'll be able to interact with your Postgres database through pgAdmin III.

## Creating a Database

The best way to learn something is to play around with it, so the first thing we're going to do is set up a new database to play around in. From the command line, you can use `createdb <name>` to create a database for Postgres to manage; from pgAdmin III, you can select the database server from the far left directory tree, then select Edit > New Object > New Database from the taskbar at the top.

Once you've got a new database created, you can open it up for editing with `psql <name>` from the terminal. From pgAdmin, you can simply select the database you want and then click on the magnifying glass icon on the toolbar with the tooltip "Execute arbitrary SQL queries".

### The Structure of a Database

In SQL systems, databases are made of tables. The most straightforward analogy for a table is a spreadsheet: think rows and columns, and you're pretty much there. You can add either rows or columns to your tables, and delete them as well. One important thing to note is that columns are typed: if a column takes integers, that's all that you can put into it. This makes it pretty important to have a clear idea of what kinds of values you're dealing with before you start building your database.

Postgresql defines a bunch of types for you; the most important are:

- `integer` - a standard integer.
- `double precision` - a floating-point number
- `decimal` - a fixed-precision number, suitable for currency amounts
- `timestamp [with/without] timezone` - a date and time
- `date` - a date with no time of day
- `time` - a time of day with no date
- `interval` - a length of time
- `boolean` - a boolean value
- `text` - a chunk of text; a string

Within your database, you'll first need to make a table. If we're making a database that stores information about (among other things) users of our site, we can do that like so:

{% highlight sql %}
create table site_user (
  id serial primary key,
  name text,
  password text);
{% endhighlight %}

To take apart the above, what we've done is tell Postgres to create a table named `site_user`. As tempting as it is to just call the table `user`, that is a reserved word for Postgres, so it can't be used without putting it in "" all the time--hence `site_user`. Within the parentheses, we are defining the columns of the table. For starters, we have three: `id`, `name`, and `password`. After the name of each column, we specify the type and any special rules for that column. `name` and `password` are simple text columns, while `id` is a bit special: it's an auto-incrementing value that is both unique and not `null`.

Make sure you include that final semicolon! Unlike JavaScript, which will most of the time be able to work around laziness and figure out where semicolons should be, they are 100% required in SQL to indicate line endings--if you leave one out, Postgress will just assume that you haven't finished your line yet, and will wait for you to finish up before executing anything.

<aside>
<h4>A Note on Syntax</h4>

It's pretty common to see SQL full of words in ALL CAPS. This is a convention dating back to the early days of the language, but it is not required--SQL is not case sensitive, so you can feel free to just use all lower case if you'd rather.

</aside>

Now that we've got a table, we can put some user data into it:

{% highlight sql %}
insert into site_user (name, password) values 
  ('shackleton', 'purr'),
  ('tom', 'correcthorsebatterystaple');
{% endhighlight %}

The code is actually fairly readable; you're inserting into a particular table (in this case, `site_user`), and you're giving it values for both `name` and `password`. After `values`, you simply list the information you want to add in the syntax that you told Postgres you were going to add them. 

When the time comes to look at the data in the database, we can do that with `select * from site_user;`. * is a wildcard, so this can be read as "select everything from the `site_user` table." It will display all the information in the table in a nicely formatted grid of rows and columns. If that's more information than we need, we can trim down what Postgres gives us--if we only want names, we can ask for just those instead of for everything: `select name from site_user;`.

We can further trim down the information we're given by using a `where` clause: `select name from site_user where id > 1;`

**Exercise:** Now that you've seen how to build a basic table for users, create a second table for tasks that includes columns for all the information your project's task manager contains. Continue with your `site_users` table as well; you can add to it like so:

{% highlight sql %}
alter table site_user add column email text;
{% endhighlight %}

If you want to update existing records, you can use `update` ... `set`, like so:

{% highlight sql %}
update site_user set email = 'capt_shackleton@cats.mil' where id = 1;
{% endhighlight %}

You can also remove entries from tables--doing so is formatted much like `select` is:

{% highlight sql %}
delete from site_user where name = 'tom';
{% endhighlight %}

## Relational Databases

At this point, we've got two separate databases that contain information we need: one holds a list of users, and one holds a list of tasks. We need to be able to relate these two tables to each other somehow. Fortunately, that's what SQL is all about: Each task has only one creator and only one assignee, but a user can create or be assigned any number of tasks. These are both "one to many" relationships. We can formalize those relationships like so:

{% highlight sql %}
create table task 
  (id serial primary key, 
   title text, 
   description text, 
   creator integer references site_user(id), 
   assignee integer references site_user(id));
{% endhighlight %}

For each task, we've created a column for the creator and the assignee, and set it to reference an `id` from the `site_user` table. With this in place, the only integers that you will be able to enter are integers that are also in the `id` field of a row in the `site_user` table.

### Many to Many Relationships

One to many relationships are reasonably straightforward, but how can we render a many to many relationship with simple flat databases like we've got? For example, say we wanted to include a "watch" function, so that a user could add any task to their watch list, even if they hadn't created it or were assigned to it. Users could watch any number of tasks, and tasks could be watched by any number of users. Simply adding columns like `watched_task_1`, `watched_task_2`, and so on won't really work, clearly.

The answer is to create a new table:

{% highlight sql %}
create table task_watcher
  (task_id integer references task(id),
   watcher_id integer references site_user(id));
{% endhighlight %}

Now we have a new table that holds data that relates our `site_user` table with our `task` table. Each row in the table tracks a single relationship, so if we want to add a new relationship, we just add a new row. If a user wants to watch a new task, we just create a new entry linking that user to that task, and we're done--because the values of `task_watcher` are references to the `id` values of the two tables, we know that they will always be referencing unique values that only correspond to one row in the other table.

## Joins!

With our data spread across multiple tables, how do we use it to get, for example, a list of all the users who are watching a particular task? To do this, we need to use join. This is a command that essentially builds a new table out of existing tables. To see how join works, we'll dial back the complexity and make some brand-new, super-simple tables:

{% highlight sql %}
create table mult3
  (id serial primary key,
   value integer,
   name text);
create table mult4
  (id serial primary key,
   value integer,
   name text);
create table mult5
  (id serial primary key,
   value integer,
   name text);
{% endhighlight %}

We'll populate these tables with some data that gives the names and values for multiples of certain numbers:

{% highlight sql %}
insert into mult3 (value, name) values
  (3, 'three'),
  (6, 'six'),
  (9, 'nine'),
  (12, 'twelve'),
  (15, 'fifteen');
insert into mult4 (value, name) values
  (4, 'four'),
  (8, 'eight'),
  (12, 'twelve'),
  (16, 'sixteen'),
  (20, 'twenty');
insert into mult5 (value, name) values
  (5, 'five'),
  (10, 'ten'),
  (15, 'fifteen'),
  (20, 'twenty'),
  (25, 'twenty-five');
{% endhighlight %}

The simplest sort of join to experiment with is a type of inner join called a *cross join*. You can write one like this:

{% highlight sql %}
select * from mult3, mult4;
{% endhighlight %}

This produces a new table that makes a row for every possible combination of the items in the two tables. That's a bunch of information (and far more if we add in mult5!). Fortunately, SQL is good at filtering data. To do so, we'll use an *equi-join*:

{% highlight sql %}
select * from mult3, mult4, mult5 where mult3.id = mult4.id and mult3.id = mult5.id;
{% endhighlight %}

Filtering with `where` on the `id` column lets us grab just one of each entry--the one where the ids all match. Filtering by `id` is something that you'll frequently see, but in this case it won't give us a lot of interesting information. Instead, let's filter on value:

{% highlight sql %}
select * from mult3, mult4 where mult3.value = mult4.value;
{% endhighlight %}

There's some useful information! We've just found all the database entries that we have that are multiples of both 3 and 4. If we're only interested in the name of the value, we can of course refine the query:

{% highlight sql %}
select mult3.name from mult3, mult4 where mult3.value = mult4.value;
{% endhighlight %}

What about the inverse--say we want to find all the multiples of 3 that *aren't* multiples of 4? For that, we can use an *outer join*:

{% highlight sql %}
select * from mult3 left join mult4 on mult3.value = mult4.value;
{% endhighlight %}

This seems to get us part way there. A left join is a type of outer join that produces a table that includes everything on the left, and only the things that match the query on the right--other values are left blank, just as we see here. This is a step in the right direction, but not quite exactly what we're looking for--we don't want to include the things that do have a value on the right. All we need to do to accomplish that is filter the data a little bit more:

{% highlight sql %}
select * from mult3 left join mult4 on mult3.value = mult4.value
  where mult4.value is null;
{% endhighlight %}

### Cautions on Joins

SQL in general and joins in particular are complex topics--you can spend entire college semesters studying them, and even have a career doing nothing but database administration. Going in depth into optimization of joins is well outside the scope of this course. One of the most important things that you can do to ensure that your joins aren't painfully slow is to be sure that you're always joining on an indexed column. Indexes basically speed up access time to rows, which can make joins substantially faster.

Don't let joins intimidate you, though! Resist the temptation to ignore them and do all your data processing on the server--the database is faster, and sending all that data to the server takes time and resources.

## Transactions

Transactions allow you to group together multiple commands and either _commit_ the entire group at once or _rollback_ everything if you've realized that something isn't quite right.

Transactions allow us to better ensure _consistency_ in our database. If we want to create a user at the time that they sign up, but we also need to make sure that they have an account created for them, we can do both of those together. If both succeed, we can commit the transaction. If either fails, we can roll it back.

Imagine the frustration a user could experience if we didn't use a transaction. The user tries to sign up. The user data gets created in the database, but for some reason, the account creation fails. Now the user tries to sign in. If you verify that the user has an account during sign-in, then you may end up telling them that they're not able to access their account (or some similar error). But the user just signed up! What?

{% highlight sql %}
create table businesses (
  id serial primary key,
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
  values ('Erin', 'Call', lastval());
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

###Explain

In Postgres, you can put `explain` before any query to see how the database will handle the query. This is a great tool for figuring out why a query is taking a long time (although it takes some time to learn to understand what Postgres is telling you). Another option is `explain analyze` which actually executes the query. Since the query is executed, you may wish to wrap this in a transaction (as it will actually insert/update/delete records).

{% highlight sql %}
begin;
explain analyze ...;
rollback;
{% endhighlight %}
</aside>

### Further reading

If you'd like to delve further into SQL, here's a collection of resources:

- The [Postgres documentation](http://www.postgresql.org/docs/) is always a good place to start.
- For more practice with the basics, [Learn SQL the Hard Way](http://sql.learncodethehardway.org/book/) is good, though sadly only half complete. Maybe that's the hard part?
- [Understanding SQL Joins](http://www.devshed.com/c/a/MySQL/Understanding-SQL-Joins/) is a great blog post all about joins.
- [A Visual Explanation of SQL Joins](http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/) is great if you're more visually minded, as is the post that it builds on (linked in the article).
- If you're not tired of Venn diagrams yet, check out [this CodeProject post](http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins).

<!---
Needs much more on joins; right now, it just throws them out there like they're immediately evident.

normalizing data
syntax error at `select people., cities. from people left join residences on people.id = residences.person_id left join cities on cities.id = residences.city_id;` from markdown; there should be stars!

Transactions

Migrations

pg

knex

create table first (id serial primary key, name varchar(255), value integer);
select * from first;

insert into first (name, value) values
('one', 1),
('two', 2),
('three', 3),
('four', 4),
('five', 5);

insert into second (name, value) values
('a', 'primary'),
('b', 'secondary'),
('c', 'tertiary'),
('d', 'quaternary'),
('five', 'quinary');

select * from first,second;
select * from first,second where first.id = second.id;
select * from first left join second on first.name = second.name;
-->
