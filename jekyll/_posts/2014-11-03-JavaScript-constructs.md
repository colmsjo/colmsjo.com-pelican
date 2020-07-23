layout: post
title: JavaScript constructs
description: JavaScript inheritance, the bind function etc.
date: 2014-11-03
author: Jonas Colmsjo
tags: ['post','javascript','node']


Introduction
============

JavaScript is a language that supportes many programming paradigms, for instance
object-oriented, functional and imperative. It's syntax has some similarities with
Java which comes from the C programming language. It actually behaves more like a
functional programming language like Schema or Lisp. The Script part in the name is just
confusing since it is a very capable language. It is dynamically typed which
means that variables don't have to be assigned static types. Also, it is interpreted
and not compiled like for instance Java and C.

There has been a lot of confusion around how usefull JavaScript is. It is very capable
and now it has become the most widespread platform since all browsers are build around JavaScript,
or ECMAScript as is actually is named. It is also becoming strong on the server
side and Microsoft and SAP are for instance working with JavaScript on the server
side. There is also NodeJS which is a port of Google's V8 engine for server side
development. NodeJS asynchronous model makes it very suitable for performance
intensive applications.

If you haven't done it before, open the JavaScript console in your browser.
The menu paths differ between browsers but it is always theere, just google
if you can't find it.


Prototypes
==========

JavaScript uses prototype based inheritance. This means that each object has a
prototype. Whenever a property can't be find in an object is the prototype
searched, and then it's prototype, and so on. Object.create is one way
of setting up the prototype chain.

Example:

    p.c = 3.1415;
    console.log(o.a); // 1
    console.log(p.a); // 1
    o.hasOwnProperty('a'); // true
    p.hasOwnProperty('a'); // false

The other way of creating object is with functions which also are constructors:

    q.prototype = { print: function() { console.log(JSON.stringify(this)); } };
    var i = new q();
    i.print();

    // This won't work since o has no constructor
    o.prototype = { print: function() { console.log(JSON.stringify(this)); } };
    var j = new o();
    j.print();

Prototypes are used to share functions between objects:

    q_.prototype = q.prototype;
    var i_ = new q_();
    i_.print();

The proper way of inheriting q in q_ is like this:

    q_.prototype = Object.create(q.prototype);
    var i_ = new q_();
    i_.print();


Node's inherits function

Node has a convenience function for inheritance.

    var inherits = function (ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false
            }
        });
    };



Objects and properties
=====================

The common way working with properties is like this:

    o.prop = 'one';
    console.log(o.prop);

But JavaScript allows a lot of control of properties:

    var p = Object.defineProperties(o, {
      "property1": {
        configurable: false,
        enumerable: true,
        value: true,
        writable: true,
      },
      "property2": {
        value: "Hello",
        writable: false
      },
      "property3": {
        set: function(v) { this.v = v;},
        get: function() { return this.v;}
      }
    });


Private and privileges functions
================================

Private functions are not accessable to the outside world. Privileged functions
are accessable to public functions and the outside world.

    // class with private and privileged functions
    var f2 = function(text) {

        var _message = text;    // private variable
        this._message = text;   // privileged variable

        // this function is not accessable to public function
        var privateFunc = function() { console.log(_message); };

        // This function is accessable
        this.privilegedFunc = function() { privateFunc(); };
    };

    f2.prototype.publicFunc1 = function () {
      privateFunc();
    };

    f2.prototype.publicFunc2 = function () {
      this.privilegedFunc();
    };

    var i1 = new f2('Message to print');
    i1.publicFunc1(); // This don't work
    i1.publicFunc2(); // This works



Strange `this` behaviour in inner functions
===========================================

`this` don't refer to the object you'd expect when used in functions.

    var f = function() {};
    f.prototype.g = function() {
      var _that = this;
      _that.a     = 'A';
      this.b      = 'B';

      var printThis = function() { console.log(this.b); };
      var printThat = function() { console.log(_that.a); };

      console.log('THIS:');
      printThis();
      console.log('THAT:');
      printThat();
    };

    var i = new f();
    i.g();



`this` gotchas
==============

The value of `this` differs depending on how the function is called. Also
`this` refers to the global object in a baseless function like `f1` below.

    function f1() {
      console.log(this);
    }
    f1();
    var obj1 = { id: "Foo"};
    f1.call(obj1);


`bind()`
========

`bind`changes the value of `this`:

Example:

    this.x = 9;
    var module = {
      x: 81,
      getX: function() { return this.x; }
    };

    module.getX(); // 81

    var getX = module.getX;
    getX(); // 9, because in this case, "this" refers to the global object

    // Create a new function with 'this' bound to module
    var boundGetX = getX.bind(module);
    boundGetX(); // 81


Closures
========

A closure is a special kind of object that combines two things: a function,
and the environment in which that function was created.

Example:

    function makeFunc() {
      var name = "Mozilla";
      function displayName() {
        console.log(name);
      }
      return displayName;
    }

    var myFunc = makeFunc();
    myFunc();


Streams
=======

This an example of a custom stream:

    // Define custom stream class

    var Writable = require('stream').Writable;
    var util     = require('util');

    var myWritableStream = function() {
      // call stream.Writeable constructor
      Writable.call(this);
    };


    // inherit stream.Writeable
    myWritableStream.prototype = Object.create(Writable.prototype);

    // override the write function
    myWritableStream.prototype._write = function (chunk, encoding, done) {
      console.log(chunk.toString());
      done();
    };


    // Main

    console.log('piping stdin to stdout using my own writale stream...');

    var myStream = new myWritableStream();
    process.stdin.pipe(myStream);




Links
=====

Some good reading:

 * http://book.mixu.net/node/ch6.html
 * http://dmitrysoshnikov.com/ecmascript/chapter-7-1-oop-general-theory/
 * http://perfectionkills.com/understanding-delete/
 * http://www.2ality.com/2013/07/defending-constructors.html
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
 * http://book.mixu.net/node/ch4.html
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 * http://javascript.crockford.com/private.html
