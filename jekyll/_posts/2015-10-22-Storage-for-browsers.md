layout: post
title: Storage solutions for browsers
description: Overview of solutions for storing data persistently in browsers
date: 2015-10-22
author: Jonas Colmsjo
tags: ['post', 'javascript', 'browsers']

This is a short summary of the solutions for persistent storage that I've found.
I've included simple examples of how they would be used. I prefer solutions
that support IndexedDb and that have a straightforward mapping in data model.

pouchdb
=======

A couched for browsers. Seams to be the most widespread storage solution for
browsers. Storage in IndexedDb is not straight forward. Interacting directly
with IndexedDb probably not a good idea.


    var db = new PouchDB('kittens');

    db.info().then(function (info) {
      console.log(info);
    });

    var doc = {
      "_id": "mittens",
      "name": "Mittens",
      "occupation": "kitten",
      "age": 3,
      "hobbies": [
        "playing with balls of yarn",
        "chasing laser pointers",
        "lookin' hella cute"
      ]
    };
    db.put(doc);

    db.get('mittens').then(function (doc) {
      console.log(doc);
    });

    // updates require the full document incl. _rev
    db.get('mittens').then(function (doc) {
      // update their age
      doc.age = 4;
      // put them back
      return db.put(doc);
    }).then(function () {
      // fetch mittens again
      return db.get('mittens');
    }).then(function (doc) {
      console.log(doc);
    });


alasql
======

New and inmature solution. Found bugs when using IndexedDb as backend.
Re-visit in a while and check for progress. Many open issues in github though.


    // data in array
    var data = [{a:1,b:10}, {a:2,b:20}, {a:1,b:30}];
    var res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[data]);
    console.log(res);

    // data in indexeddb
    var cityData = [{city:"Redmond", population:57530},
            {city:"Atlanta",population:447841},
            {city:"San Fracisco", population:837442}];

    alasql('CREATE INDEXEDDB DATABASE IF NOT EXISTS geo');

    alasql('CREATE INDEXEDDB DATABASE IF NOT EXISTS geo;\
            ATTACH INDEXEDDB DATABASE geo; \
            USE geo; \
            DROP TABLE IF EXISTS cities; \
            CREATE TABLE cities; \
            SELECT * INTO cities FROM ?', [cityData], function(){
            alasql('SELECT COLUMN * FROM cities WHERE population > 100000 ORDER BY city DESC',
               [],function(res){
                    console.log('Big cities: ', res.join(','));
            });
        });


NeDB
=====

Mongo type of Api for browsers. No support for IndexedDb.


    // Create an in-memory only datastore
    var db = new Nedb();
    db.insert({ planet: 'Earth' });
    db.insert({ planet: 'Mars' });

    db.find({}, function (err, docs) {
        console.log(docs);
    });

    // Create a localStorage datastore
    var db = new Nedb({filename: 'filename'});
    db.insert({ planet: 'Earth' });
    db.insert({ planet: 'Mars' });

    db.find({}, function (err, docs) {
        console.log(docs);
    });


dexie.org
=========

Simple wrapper on IndexedDb. Not sure how widely used this is.

    var db = new Dexie("FriendDatabase");

    db.version(1).stores({
        friends: "++id,name,age"
    });

    db.open();

    db.friends.add({name: "Josephine", age: 21}).then(function(){

    });

    db.friends.where("age").between(20, 30).each(function(friend) {
            console.log("Found young friend: " + JSON.stringify(friend));
        });


YDN-DB
======

Not using indexedDb on Safari. Straightforward model for storage in indexeddb
(testing with Firefox).

    var db = new ydn.db.Storage('yen-db');

    db.put('store-name', {message: 'Hello world!'}, 'id1');

    db.get('store-name', 'id1').always(function(record) {
      console.log(record);
    });



localForage
============

Simple key value store that Mozilla is behind.


    var obj = { value: "hello world" };
    localforage.setItem('key', obj, function(err, result) { console.log(result.value); });
    localforage.getItem('key', function(err, value) { console.log(value) });


TaffyDB
=======

In-memory JavaScript database with support for persistence in localStorage. Has
functions for filtering, joining etc.


    var friends = TAFFY([
    {"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active"},
    {"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active"},
    {"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active"},
    {"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active"}
    ]);

    friends({city:"Seattle, WA"}).first();

    friends.store("taffy");

    // reload page
    var friends = TAFFY();
    friends.store("taffy");
    friends({city:"Seattle, WA"}).first();


Summary
=======

The best candidates seams to be PochDb Ydn-db. The drawback with PouchDb is that
it is a CouchDb in the browser and the storage model is driven from this. I
prefer a simple mapping from documents/JSON to the database I do not need
the versioning that Pouch has built in. Ydn-db do not use IndexedDb on Safari,
but otherwise this seams like a good candidate. Dexie could also be a candidate
even though I'm not sure how widely spread it is.
