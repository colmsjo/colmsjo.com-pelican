layout: post
title: OData notes
description: Some initial notes about odata
date: 2014-08-04
author: Jonas Colmsjo
tags: ['post','odata','HANA','summary']


Introduction
============

OData is a HTTP based RESTful protoful that is useful for mobile and web apps. It has been developed by 
Microsoft and is also used by SAP and others. OData i based around the Entity Data Model which is the
basis for realtional databases. It is easy to developed OData services using the tools that SAP,
Microsoft and others provide. All that is needed in most cases is a mapping between OData EDM and the
database structure. This can be as simple as exposing the tables and columns as OData entries and
properties.


Get started right away
======================

I've put together a docker container with everyhting you need to get started to play around with odata services.
It is based on a MySQL database. Have a look at [mysqlodata](https://github.com/colmsjo/mysqlodata).


Links
=====

Specifications and articles:

* [OData Specification](http://www.odata.org/documentation/odata-version-2-0/) - Start with the URI and JSON parts
* The OData standardization work has been taken over by [OASIS](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata)
* [OData in a nutshell](http://www.google.se/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CCEQFjAA&url=http%3A%2F%2Fwiki.scn.sap.com%2Fwiki%2Fdownload%2Fattachments%2F233739132%2F02_OData_In_A_Nutshell.pdf&ei=2FXfU_DEEMei4gTH4YC4AQ&usg=AFQjCNF04HNcGVk2ApNLGagEWs5rfSj9Bw&bvm=bv.72197243,d.bGE)
* [Entity Data Model](http://msdn.microsoft.com/en-us/library/ee382825.aspx)
* [EDMX files](http://msdn.microsoft.com/en-us/library/cc982042.aspx)
* [Article about OData](http://msdn.microsoft.com/en-us/library/ff478141.aspx)
* [Search for OData on MDSN blog](http://social.msdn.microsoft.com/Search/en-US?query=Odata&beta=0&rn=Interoperability+%40+Microsoft&rq=site:blogs.msdn.com/b/interoperability/&ac=4)
* [Search for OData on MS Codeplex](http://www.codeplex.com/site/search?query=odata&ac=4)

Libraries:

* [OData JS Library for browsers](http://datajs.codeplex.com/)
* [OData Producer library for PHP](https://github.com/MSOpenTech/odataphpprod)
* [OData Connector for MySQL](http://odatamysqlphpconnect.codeplex.com/)


Migration to OData services
===========================

I'm currently running many solutions on PHP/MySQL. I've trying to figure out a good way to migrate to the
odata protocol. JayData provides a OData server on MongoDB, see this [article](http://jaydata.org/blog/install-your-own-odata-server-with-nodejs-and-mongodb) for instructions on hwoto setup. My first though was to create a 
read replica in MongoDB of MySQL in order to provide OData read services. Here is a [docker setup with
MongoDB, MySQL and replication](https://github.com/colmsjo/mysqlmongorepl). I've also put together a simple
tool that [exports MySQL databases to CSV and JSON files](https://github.com/colmsjo/mysqldump2). This is
needed when running MySQL in Amazon RDS since export to CSV files isn't supported.

Then I found out that Microsoft has developed OData tools for PHP and MySQL. I'll check these out next.

* [OData for PHP/MySQL developers](http://blogs.msdn.com/b/interoperability/archive/2012/02/09/open-source-odata-tools-for-mysql-and-php-developers.aspx)
* [OData producer for PHP](http://blogs.msdn.com/b/interoperability/archive/2011/09/09/the-odata-producer-library-for-php-is-here.aspx)
* [Consume OData services from PHP](http://blogs.msdn.com/b/interoperability/archive/2010/03/16/odata-interoperability-with-net-java-php-iphone-and-more.aspx)




