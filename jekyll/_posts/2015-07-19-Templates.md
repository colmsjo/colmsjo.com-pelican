layout: post
title: Templates
description: A simple template solution that could be used for multi-lingual pages
date: 2015-07-19
author: Jonas Colmsjo
tags: ['post','JavaScript', 'templates']


Introduction

There are many libraries that provides templates. [
Mustache](https://github.com/janl/mustache.js) is one of the best known.

It is fairly easy to roll your own template solution. You just need to traverse
the DOM and replaces string with a specific prefix and suffix, for instance
`<<<` and `>>>` with some other string.

code

Example of template solution:

    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body gz-templ-prefix='<<<' gz-templ-suffix='>>>'>
      <h1>A nice header</h1>
      <p id='1'>First paragraph. Here is a
        <strong>bold</strong> word in the middle of everything.</p>
      <p id='2'>Second paragraph</p>
      <p>English: <<<TEXT1.EN>>> </p>
      <p>Swedish: <<<TEXT1.SE>>> </p>

      <hr/>
      Open the console for more details.

      <script>
        // workaround since NodeList do not inherit Array (not for IE6/7/8)
        NodeList.prototype.forEach = Array.prototype.forEach;
        NamedNodeMap.prototype.forEach = Array.prototype.forEach;

        // Template definitions (typically multi-lingual)
        // ==============================================

        var texts = {};
        texts['TEXT1.EN'] = 'This is the first text string';
        texts['TEXT1.SE'] = 'Det här är den första text strängen';

        // Template logic
        // ==============

        var moduleSelf = this;

        var templPrefix = '<<<';
        var templSuffix = '>>>';

        var transformText = function (text) {
          var re = RegExp(templPrefix + '.*' + templSuffix);
          var found = text.match(re);
          if (!found) {
            return text;
          }

          found.forEach(function (str) {
            // strip out the {{ and }}
            var index = str.substr(templPrefix.length,
              str.length - templPrefix.length -
              templSuffix.length);

            // do the reaplcement if there is one
            if (texts[index]) {
              text = text.replace(str, texts[index]);
            }

          })

          return text;
        };

        // Process one node in the DOM tree
        var processNode = function (node) {
          var str = 'Name: ' + node.nodeName + ', type: ' +
            node.nodeType;

          // process the text/value
          if (node.nodeValue) {
            str += ', value: ' + node.nodeValue;
            node.nodeValue = transformText(node.nodeValue);
          }

          // Process the children
          if (node.attributes) {
            node.attributes.forEach(function (attr) {
              if (attr.specified) {

                // The prefix and suffix for temapltes can be changed in the body
                if (node.nodeName === 'BODY' && attr.name === 'gz-templ-prefix') {
                  templPrefix = attr.value;
                }

                if (node.nodeName === 'BODY' && attr.name === 'gz-templ-suffix') {
                  templSuffix = attr.value;
                }

                str += ', name: ' + attr.name + ', value: ' + attr.value;
              }

            });
          }

          console.log(str);
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
          traverse(document.documentElement);
        });
      </script>
    </body>
    </html>
