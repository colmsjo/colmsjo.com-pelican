layout: post
title: Two-way data binding
description: A simple two-way data binding solution.
date: 2015-07-19
author: Jonas Colmsjo
tags: ['post','JavaScript', 'data binding']


Introduction

There are several libraries that provide data binding.
[knockout](http://knockoutjs.com) and [angular](https://angularjs.org)
are two examples.

It is actually simpler that you might think to roll this on your own.
Here is an example where JavaScript setters are used. All the user has to do
is to add the extra attribute `data-bind='property name'` to the DOM elements
you need,  call `createUIObject` and voilá an object with the specified properties
is created.

code

Example of two-way data binding:

    <!DOCTYPE html>
    <html>

    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>

    <body>
      <input id='nameId' value='Enter name' data-binding='name' />
      <br/>
      <input id='ageId' value='Enter age' data-binding='age' />
      <br/>
      <input id='genderId' value='Enter gender' data-binding='gender' />
      <br/>

      <input id='reset' type='button' value='reset' />
      <input id='print' type='button' value='print' />

      <hr/> Open the console to see the details.

      <script>
        // workaround since NodeList do not inherit Array (not for IE6/7/8)
        NodeList.prototype.forEach = Array.prototype.forEach;
        NamedNodeMap.prototype.forEach = Array.prototype.forEach;

        var elementsAndProperties = [];
        var createUIObject = function (node) {
          traverse(node);
          return create_(elementsAndProperties)
        };

        // elProps = [[element0, property0], [element1, property1],...]
        var create_ = function (elProps, obj) {
          var o = obj || {};

          elProps.forEach(function (elProp) {
            var element = elProp[0];
            var prop = elProp[1];
            Object.defineProperty(o, prop, {
              get: function () {
                return element.value;
              },
              set: function (val) {
                element.value = val;
              },
              enumerable: true,
              configurable: true
            });
          });

          return o;
        };

        var processNode = function (node) {
          if (node.attributes) {
            node.attributes.forEach(function (attr) {
              if (attr.name && attr.name === 'data-binding') {
                elementsAndProperties.push([node, attr.value]);
              }
            });
          }
        };

        var traverse = function (node) {
          if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'HTML') {
            processNode(node);
          }
          if (node.nodeName === 'SCRIPT') {
            return;
          }
          node.childNodes.forEach(traverse);
        };

        document.addEventListener('DOMContentLoaded', function (e) {
          var obj = createUIObject(document.documentElement);
          var reset = function () {
            obj.name = 'Enter name';
            obj.age = 'Enter age';
            obj.gender = 'Enter gender';
          };
          document.getElementById('reset').addEventListener('click', reset);
          document.getElementById('print').addEventListener('click', function () {
            console.log(obj.name);
            console.log(obj.age);
            console.log(obj.gender);
          });
        });
      </script>
    </body>

    </html>
