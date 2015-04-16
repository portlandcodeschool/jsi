---
layout: post
title: Data Loading
class: dataloading
date: 2015-06-05
---

## Data Loading

A common task when working with databases is you'll get data in some form and need to load it into the database. If it wasn't previously managed by a computer, it may be messily formatted, have some stuff missing, etc. Today we'll learn about sanitizing and loading this data into a database.

### Exercise: ETL

The process of cleaning up and database-ifying some data is called _ETL_ (Extract, Transform, Load). [This repository][data-loader] contains several data files as well as a framework for defining transformations to clean up the data. Check out its README for information on how to use it, then write code to clean up its data files and load them into the database.

[data-loader]: https://github.com/JSI-2015-Q1/data-loader
