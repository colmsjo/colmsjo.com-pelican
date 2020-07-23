title: Couchdb and JavaScript Spreadsheets
description: Couchdb and JavaScript Spreadsheets
date: 2014-01-21
author: Jonas Colmsjo
layout: post
tags: ['post', 'swedish']


Tänke se om det finns något enkelt sätt att bygga prototyper med couchdb och tabeller i 
JavaScript.

Koppla spreadsheet till Couchdb:

 * t.ex. använda [handsontable](http://handsontable.com/demo/datasources.html)
 * [datatables](http://datatables.net/blog/Extended_data_source_options_with_DataTables)
 * jtable verkar inte fungera med couchdb


Handsontable exmaple

    var objectData = [
      {id: 1, name: "Ted Right", address: ""},
      {id: 2, name: "Frank Honest", address: ""},
      {id: 3, name: "Joan Well", address: ""}
    ];

    var $container = $("#example3");
    $container.handsontable({
      data: objectData,
      startRows: 5,
      startCols: 3,
      colHeaders: true,
      minSpareRows: 1
    })


Datatables


	[
	    { "cell1": "row 1, cell 1",
	      "cell2": "row 1, cell 2",
	      "cell3": "row 1, cell 3"
	    },
	    { "cell1": "row 2, cell 1",
	      "cell2": "row 2, cell 2",
	      "cell3": "row 2, cell 3"
	    }
	]



Handsontable vs. Datatable

Handsontable fungerar bäst med couch eftersom objekt funkar och arrayer inte krävs.


Pouchdb


Spara dokument i pouch:


	var db = new PouchDB('dbname');
	
	db.put({
	 _id: 'dave@gmail.com',
	 name: 'David',
	 age: 66
	});



Design av dokumentstruktur

Couchdb (och pouchdb) dokument har två obligatoriska attribut: `_id` och `_rev`.

Handsontable array i ett JSON dokument:


	{
		_id : "whatever",
		_rev : "set_by_the_server?",
		table: [
		  {id: 1, name: "Ted Right", address: ""},
		  {id: 2, name: "Frank Honest", address: ""},
		  {id: 3, name: "Joan Well", address: ""}
		]
	}


Possible structure: `localhost:5984:/database/sheet/table`. Security is managed on the database level.
Tables are organized in sheets.

Example `/first_table_db/first_sheet`:

	{
		_id: "table1",
		table: [
			{id: 1, name "John", address: "P/O 1"},
			{id: 2, name "Doe",  address: "P/O 2"}
		]
	}

Ett couchdb-dokument per tabell? Kan bli problem med stora tabeller. Kan dock ha flera tabeller på ett blad så
det borde inte vara något problem.


Couchdb security model

Database admins and members are defined in the security object of a database. This security object, located under `/db_name/_security`:

	{
	  "admins" : {
	     "names" : ["joe", "phil"],
	     "roles" : ["boss"]
	   },
	   "members" : {
	     "names" : ["dave"],
	     "roles" : ["producer", "consumer"]
	   }
	}

The authentication database is a system database called `:_users`

	{
	  "_id"          : "org.couchdb.user:joe",
	  "type"         : "user",
	  "name"         : "joe",
	  "roles"        : ["erlanger"],
	  "password_sha" : "fe95df1ca59a9b567bdca5cbaf8412abd6e06121",
	  "salt"         : "4e170ffeb6f34daecfd814dfb4001a73"
	}
