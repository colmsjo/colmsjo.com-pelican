layout: post
title: Reactive programming
description: Streams for eveything (almost)
date: 2015-05-30
author: Jonas Colmsjo
tags: ['post','JavaScript', 'rx']


Introduction

Reactive programming is a concept for managing asynchronous events and streams.
The streams are transformed from one stream into antoher using functions that
are composed. The stream are immutable, i.e. cannot be changed.

Here is a small example:


    var input = document.getElementById('input');
    var input2 = document.getElementById('input2');
    var results = document.getElementById('results');

    Observable.fromEvent(input, 'keyup')
      .merge(Observable.fromEvent(input2, 'keyup'))
      .map(function(evt) {
        return evt.target.value;
      })
      .map(function(str) {
        results.value = str
      });


Keyboard events/streams from two input fields are merged into one stream.
This stream is then used to update a result field.

code

Here is a small Observable implementation.


    <html>

    <body>

      <input type='text' value='enter something' id='input' />
      <input type='text' value='enter something else' id='input2' />
      <br/>
      <input type='text' value='result' id='results' />


      <script>
        // Observable.fromEvent(input, 'keyup').merge(fromEvent(input2, 'keyup')).map(fn)
        //
        // event -> observable.notify  -> observable3.notify -> fn
        // event -> observable2.notify ->


        var Observable = function(operation, arg) {
          this.operation_ = operation;
          if (operation === 'map') this.fn_ = arg;
          if (operation === 'merge') this.mergeWith_ = arg;
          this.observers_ = [];
        };

        Observable.prototype.register = function(observer) {
          this.observers_.push(observer);
        };

        Observable.prototype.notify = function(evt) {
          if (this.operation_ === 'map') {
            var tmpEvt = this.fn_(evt);
            evt = tmpEvt ? tmpEvt : evt;
          }

          this.observers_.forEach(function(o) {
            o.notify(evt);
          });
        };

        Observable.prototype.listen = function(element, event) {
          element.addEventListener(event, this.notify.bind(this));
        };

        Observable.fromEvent = function(element, event) {
          var observable = new Observable();
          observable.listen(element, event);
          return observable;
        };

        Observable.prototype.map = function(fn) {
          var observable2 = new Observable('map', fn);
          this.register(observable2);

          return observable2;
        };

        Observable.prototype.merge = function(observable2) {
          var observable3 = new Observable('merge', observable2);

          this.register(observable3);
          observable2.register(observable3);

          return observable3;
        };

        var init = function(evt) {
          console.log('init');

          var input = document.getElementById('input');
          var input2 = document.getElementById('input2');
          var results = document.getElementById('results');

          Observable.fromEvent(input, 'keyup')
            .merge(Observable.fromEvent(input2, 'keyup'))
            .map(function(evt) {
              return evt.target.value;
            })
            .map(function(str) {
              results.value = str
            });
        };

        document.addEventListener('DOMContentLoaded', init);
      </script>
    </body>

    </html>


Resources

 * [RxJS](https://github.com/Reactive-Extensions/RxJS)
 * [Another introduction](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
 * [Hot vs cold observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables)
