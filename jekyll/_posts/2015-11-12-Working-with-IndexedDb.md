layout: post
title: Working with IndexedDb
description: Some notes about using IndexedDb in practice
date: 2015-11-12
author: Jonas Colmsjo
tags: ['post', 'javascript', 'browsers', 'indexeddb']

IndexedDb is a database architecture implemented by browsers that let you
store and retrieve objects that are indexed with a key. IndexedDb is
asynchronous and built on transactions. It is fairly complex to use to wrappers
on top of it come in handy. I've chosen
[YDN-DB](https://dev.yathit.com/ydn-db/index.html) for now, see the previous
post for the reasoning behind this choice.

IndexedDb is a key-value store with many object stores.
IndexedDb has functionality for sorting (using indexes) but there is no nothing
similar to joins that are found in relational databases. I'll implement a
join function for object stores here.

Preparations
============

Download ydn-db, install Bluebind and lodash with bower. Then create this
file and open it in the browser.

    <html>
    <body>

      Open the console.

      <script src="./ydn.db-is-core-e-qry-dev.js"></script>
      <script src="./bower_components/bluebird/js/browser/bluebird.min.js"></script>
      <script src="./bower_components/lodash/lodash.min.js"></script>

    </body>
    </html>


Join two arrays
===============

The code snippet below shows how two arrays can be joined:

    var a1 = [{id: '1001', etag:11, etagLS:1},
    {id: '1002', etag:22, etagLS:2},
    {id: '1004', etag:4,  etagLS:null},
    {id: '1088', etag:88, etagLS: 88}];

    var a2 = [{id: '1001', etagBE:1},
    {id: '1002', etagBE:3},
    {id: '1003', etagBE:3},
    {id: '1088', etagBE:99}];

    function join(a1, k1, i1, a2, k2, i2, outer) {
      if (i1 == a1.length)
        if(outer) return a2.slice(i2)
        else return [];

      if (i2 == a2.length)
        if(outer) return a1.slice(i1)
        else return [];

      var res = [];
      var o1 = a1[i1];
      var o2 = a2[i2];

      if (o1[k1] == o2[k2]) {
        res.push(_.merge(o1, o2));
        i1++;
        i2++;
      }
      else if(o1[k1] < o2[k2]) {
        if(outer) res.push(o1);
        i1++;
      }
      else if(o1[k1] > o2[k2]) {
        if(outer) res.push(o2);
        i2++;
      }
      else throw "Implementation error! Please report this bug.";

      return res.concat(join(a1, k1, i1, a2, k2, i2, outer));
    }

    join(a1, 'id', 0, a2, 'id', 0, true);
    join(a1, 'id', 0, a2, 'id', 0, false);


Joining two object stores - step 1
==================================

Now let's try to join two object stores into a new object store. I'm using a
sort-merge algorithm. The challenge is that rows in the object stores are fetched
in chunks, here called pages.

This code simulates the async responses from IndexedDb (it is replaced with
the real database below)

    log = console.log.bind(console);

    var arr1 = [{id: '1001', etag:11, etagLS:1},
      {id: '1002', etag:22, etagLS:2},
      {id: '1004', etag:4,  etagLS:null},
      {id: '1088', etag:88, etagLS: 88}];

    window.idx1 = 0;
    var nextA1Page = function() {
      return new Promise(function(fulfill, reject) {
        setTimeout(function(){
          fulfill(arr1.slice(window.idx1, window.idx1+2));
          window.idx1 += 2;
        }, 500);
      });
    };

    var arr2 = [{id: '1001', etagBE:1},
      {id: '1002', etagBE:3},
      {id: '1003', etagBE:3},
      {id: '1088', etagBE:99}];

    window.idx2 = 0;
    var nextA2Page = function() {
      return new Promise(function(fulfill, reject) {
        setTimeout(function(){
          fulfill(arr2.slice(window.idx2, window.idx2+2));
          window.idx2 += 2;
        }, 500);
      });
    };

Test the code like this:

    nextA1Page()
    .then(function(page) {
      log(page);
      return nextA1Page();
    })
    .then(function(page) {
      log(page);
      return nextA1Page();
    })
    .then(function(page) {
      log(page);
    });


Now reset the counters:

    window.idx1 = 0;
    window.idx2 = 0;

This is the join logic:

    var res = [];
    function joinPages(a1, k1, i1, a2, k2, i2, outer) {
      if (a1.length === 0) {
        if(outer) res.push(a2.slice(i2));
        return;
      }

      if (a2.length === 0) {
        if(outer) res.push(a1.slice(i1));
        return;
      }

      if (i1 == a1.length) {
        nextA1Page().then(function(page) {
          joinPages(page, k1, 0, a2, k2, i2, outer);
        });
      }

      if (i2 == a2.length) {
        nextA2Page().then(function(page) {
          joinPages(a1, k1, i1, page, k2, 0, outer);
        });    
      }

      var o1 = a1[i1];
      var o2 = a2[i2];

      if (o1[k1] == o2[k2]) {
        res.push(_.merge(o1, o2));
        i1++;
        i2++;
      }
      else if(o1[k1] < o2[k2]) {
        if(outer) res.push(o1);
        i1++;
      }
      else if(o1[k1] > o2[k2]) {
        if(outer) res.push(o2);
        i2++;
      }
      else throw "Implementation error! Please report this bug.";

      joinPages(a1, k1, i1, a2, k2, i2, outer);
    }

    nextA1Page().then(function(a1) {
      nextA2Page().then(function(a2){
        joinPages(a1, 'id', 0, a2, 'id', 0, true);
      });
    });

Now check what's in the `res` variable;


Joining two object stores - step 2
==================================

Now we'll do the join fetching data from IndexedDb and also storing the result
to IndexedDb.

    function createPager (storeName, pageSize) {
      if (!pageSize) pageSize = 100;
      return {
        idx: 0,
        nextPage: function(reset) {
          if (reset) idx = 0;
          return db.values(storeName, {}, pageSize, this.idx++ * pageSize);
        }
      };
    }

    function joinPages(a1, pager1, k1, i1,
                       a2, pager2, k2, i2,
                       resStore, outer) {
      if(!pager1.nextPage || !pager2.nextPage)
        throw "Internal Error! Pager functions must be supplied."

      if (a1.length === 0) {
        if(outer) addPageToIdb(resStore, a2.slice(i2));
        return;
      }

      if (a2.length === 0) {
        if(outer) addPageToIdb(resStore, a1.slice(i1));
        return;
      }

      if (i1 == a1.length) {
        pager1.nextPage().then(function(page) {
          joinPages(page, pager1, k1, 0,
                    a2, pager2, k2, i2,
                    resStore, outer);
        });
        return;
      }

      if (i2 == a2.length) {
        pager2.nextPage().then(function(page) {
          joinPages(a1, pager1, k1, i1,
                    page, pager2, k2, 0,
                    resStore, outer);
        });
        return;
      }

      var o1 = a1[i1];
      var o2 = a2[i2];

      if (o1[k1] == o2[k2]) {
        addToIdb(resStore, _.merge(o1, o2));
        i1++;
        i2++;
      }
      else if(o1[k1] < o2[k2]) {
        if(outer) addToIdb(resStore, o1);
        i1++;
      }
      else if(o1[k1] > o2[k2]) {
        if(outer) addToIdb(resStore, o2);
        i2++;
      }
      else throw "Internal error! Error comparing o1 and o2";

      joinPages(a1, pager1, k1, i1,
                a2, pager2, k2, i2,
                resStore, outer);
    }

    function join(store1, id1, store2, id2, resStore, outer) {
        var pager1 = createPager(store1);
        var pager2 = createPager(store2);

        pager1.nextPage().then(function(a1) {
          pager2.nextPage().then(function(a2){
            joinPages(a1, pager1, id1, 0,
                      a2, pager2, id2, 0,
                      resStore, outer);
          });
        });
    };

    var store1 = 'store1';
    var store2 = 'store2';
    var store3 = 'store3';

    var schema = { stores: [
      { name: store1, keyPath: 'id', autoIncrement: false },
      { name: store2, keyPath: 'id', autoIncrement: false },
      { name: store3, keyPath: 'id', autoIncrement: false },
    ]};

    var db = new ydn.db.Storage('JoinTest', schema);

    function addToIdb(storeName, row) {
      log(row);
      db.put(storeName, row);
    };

    function addPageToIdb(storeName, page) {
      log(storeName, page);
      page.forEach(function(row) {
        addToIdb(storeName, row);
      });
    };

    function createTestData1(storeName, attrName) {
      for(var i=0; i<1000; i++) {
        var o = {id: ''+(1000+i)};
        o[attrName] = 1010+i;
        db.put(storeName, o);        
      }
    };

    createTestData1(store1, 'firstName');
    createTestData1(store2, 'ssn');

    join(store1, 'id', store2, 'id', store3, true);

Now check what's in the `store3` object store. This can be seen in the developer
tools in most browsers.


Join logic implemented with Promises
====================================

The logic wrapped into a factory function and also using promises. Now it is
possible to use the join function like this:

    db.clear('store3');
    var start = window.performance.now();
    yh.join('store1', 'id', 'store2', 'id', 'store3', true).then(function(res){
      console.log('Execution time:', window.performance.now()-start);
      console.log(res);
      })

This is the implementation:

    H.createYdbHelper = function (db) {
      return {
        createPager: function (storeName, pageSize) {
          if (!pageSize) pageSize = 100;
          return {
            idx: 0,
            nextPage: function (reset) {
              if (reset) idx = 0;
              return db.values(storeName, {}, pageSize, this.idx++ * pageSize);
            }
          };
        },
        addToIdb: function (storeName, row) {
          return db.put(storeName, row);
        },
        addPageToIdb: function (storeName, page) {
          if (!page || !page.length) return Promise.resolve(true);

          return Promise.all(page.forEach(function (row) {
            return this.addToIdb(storeName, row);
          }));
        },
        joinPages: function(a1, pager1, k1, i1,
          a2, pager2, k2, i2,
          resStore, outer) {

          if (!pager1.nextPage || !pager2.nextPage)
            throw "Internal Error! Pager functions must be supplied."

          if (a1.length === 0) {
            if (outer)
              return this.addPageToIdb(resStore, a2.slice(i2));
          }

          if (a2.length === 0) {
            if (outer)
              return this.addPageToIdb(resStore, a1.slice(i1));
          }

          if (i1 == a1.length) {
            return pager1.nextPage().then(function (page) {
              return this.joinPages(page, pager1, k1, 0,
                a2, pager2, k2, i2,
                resStore, outer);
            }.bind(this));
          }

          if (i2 == a2.length) {
            return pager2.nextPage().then(function (page) {
              return this.joinPages(a1, pager1, k1, i1,
                page, pager2, k2, 0,
                resStore, outer);
            }.bind(this));
          }

          var o1 = a1[i1];
          var o2 = a2[i2];

          if (o1[k1] == o2[k2]) {
            this.addToIdb(resStore, _.merge(o1, o2));
            i1++;
            i2++;
          } else if (o1[k1] < o2[k2]) {
            if (outer) this.addToIdb(resStore, o1);
            i1++;
          } else if (o1[k1] > o2[k2]) {
            if (outer) this.addToIdb(resStore, o2);
            i2++;
          } else throw "Internal error! Error comparing o1 and o2";

          return this.joinPages(a1, pager1, k1, i1,
            a2, pager2, k2, i2,
            resStore, outer);
        },
        join: function (store1, id1, store2, id2, resStore, outer) {
          var pager1 = this.createPager(store1);
          var pager2 = this.createPager(store2);

          return pager1.nextPage().then(function (a1) {
            return pager2.nextPage().then(function (a2) {
              return this.joinPages(a1, pager1, id1, 0,
                                    a2, pager2, id2, 0,
                                    resStore, outer);
            }.bind(this));
          }.bind(this));
        }
      };
    };

It is probably possible to improve the performance significantly by implementing
the put part without YDN-DB.
