layout: post
title: Functional combinators
description: Functional combinators in JavaScript
date: 2015-06-22
author: Jonas Colmsjo
tags: ['post','JavaScript', 'functional programming']


Introduction

JavasScript is a functional language so functions can therefore return new
functions. So called currying (from the mathematician Haskell Curry) is a
feature that some functional languages have. It is not exactly the same as
partial binding but I'll treat them as same for this post.

`Function.prototype.bind` can be use to partially bind initial arguments of a
function. Here is an exmaple:

    > var hi = console.log.bind(console, 'hi');
    undefined
    > hi('jonas');
    hi jonas


The partial generator `P` below makes it possible not only to bind initial
arguments.


curry.js

An example of using [`curry.js`](https://www.npmjs.com/package/curry) where
a specific argument needs to be placed last:


    function swap(fn, i1, i2) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        var t = args[i1];
        args[i1] = args[i2];
        args[i2] = t;
        return fn.apply(null, args);
      }
    }

    var write4 = curry.to(4, swap(fs.writeFile, 1, 3) );
    write4('outfile4.txt')(null)('utf8')('string 4 to write');
    console.log('check outfile4.txt');


compose

Compose makes it possible to do: `compose(f,g)(x)`
instead of: `f(g(x))`. This is for instance useful when working with 
promises.

This is the implementation of underscore:

    _.compose = function() {
      var args = arguments;
      var start = args.length - 1;
      return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
      };
    };


code

Some useful functional combinators:


    // Log result
    Helpers.L = function (fn) {
      return function () {
        var result = fn.apply(this, arguments);
        console.log(result);
        return result;
      }
    };

    // Run function once (from underscore)
    Helpers.O = function (func) {
      var ran = false, memo;
      return function() {
        if (ran) return memo;
        ran = true;
        memo = func.apply(this, arguments);
        func = null;
        return memo;
      };
    };

    // Compose two functions
    Helpers.C = function (fn1, fn2) {
      return function compose_ (something) {
        return fn1.call(this, fn2.call(this, something));
      }
    };

    // Partial generator
    // make fn a function where arguments can be partially applied
    // P(fn)([1,,3])([,2,undefined]) === fn([1,2,3])
    // It is not necessary to use an array as input when the first argument is left
    // unbound. Here is an example:
    //    var pretty = H.C(console.log, H.P(JSON.stringify)([,null,4]));
    //    pretty({one: 1, two: 'two', three: 3.14});
    // NOTE: the last element in an array must be specifically set to undefined
    Helpers.P = function (fn) {
      function combine(a1,a2) {
        var res = [];
        for(var i=0; i<a1.length; i++)
        res.push( a1[i] !== undefined ? a1[i] : a2[i] );
        return res;
      }

      function undef(a) {
        for(var i=0; i<a.length; i++)
        a[i] = a[i] !== undefined ? a[i] : undefined;
        return a;
      }

      return function invoke(args) {
        args = undef(args);
        if (args.indexOf(undefined) === -1) {
          return fn.apply(null,args);
        } else {
          return function(args2) {
            if (!(args2 instanceof Array)) {
              args2 = Array.prototype.slice.call(arguments);
            }
            args2 = undef(args2);
            return invoke(combine(args,args2));
          };
        }
      }
    };



    U = function(idx, length) {
      return function(v) {
        a = new Array(length);
        a[idx] = v;
        return a;
      }
    };

Resources

 * [curryjs](https://www.npmjs.com/package/curry)
 * [Crockford](http://www.crockford.com/javascript/www_svendtofte_com/code/curried_javascript/index.html)
 * [John Resig](http://ejohn.org/blog/partial-functions-in-javascript/)
 * [Function and method decorators](http://raganwald.com/2013/01/03/function_and_method_decorators.html)
