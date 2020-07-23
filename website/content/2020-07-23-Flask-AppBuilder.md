Title: First run with Flask AppBuilder
Date: 2020-07-23
Category: Python
Tags: python, flask, fab
Slug: fab1
Authors: Jonas Colmsjö
Summary: Checking out Flask AppBuilder

Flask AppBuilder (FAB) is a rapid development env based on Flask which should make
it easy to develop CRUD apps. I had a database model that I wanted to get a better
UI for so I tested FAB for this. Here are some learnings while working with this.

I used [this](https://flask-appbuilder.readthedocs.io/en/latest/quickhowto.html)
introduction while building the model. I also use [sqlacodegen](https://pypi.org/project/sqlacodegen/)
to generate the models (some manual changes are necessary, but it still saves time).

## FAB seams to need an id column as the primary key

The primary key column is not shown in the UI. FAB seams to assume that a id column
is used that isn't shown. I had to add a id column to the table and use this as
the primary key instead (not optimal...).
