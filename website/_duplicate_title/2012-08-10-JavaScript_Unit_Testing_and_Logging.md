layout: post
description: JavaScript Unit Testing and Logging
title: JavaScript Unit Testing and Logging
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']

There are tools for unit testing and logging in JavaScript





JavaScript Unit Testing and Logging
#=================================

All JavaScript exmaples will use a simple unit testing framework from John Resig's Ninja book. 

The unit testing framework has two functions:

1. assert(value, desc) - make sure that `value` is true and show the `desc` in either green or red based on the result
1. test(name, fn) - group asserts into tests executed together. `fn` is a function containg the tests to run and `name` is the description of the tests 


```
(function(){


	var results;
	
	this.assert = function assert( value, desc ) {
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild( document.createTextNode( desc ) );
		results.appendChild( li );
		if ( !value ) {
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	
	this.test = function test(name, fn) {
		results = document.getElementById("results");
		results = assert( true, name ).appendChild(
			document.createElement("ul") );
		fn();
	};

```


The logging function simple logs to the console or shows an alert if there is no console.


```
	
	// A simple logging statement that works in all browsers.
	this.log = function log() {
	  try {
	    console.log.apply( console, arguments );
	  } catch(e) {
	    try {
	      opera.postError.apply( opera, arguments );
	    } catch(e){
	      alert( Array.prototype.join.call( arguments, " " ) );
	    }
	  }
	}

})();
```
All examples going forward will use these functions.
