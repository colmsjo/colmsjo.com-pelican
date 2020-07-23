layout: post
title: MySQL Admin Notes/Sheat cheet
description: Some commonly used SQL admin commands for MySQL
date: 2016-04-21
author: Jonas Colmsjo
tags: ['post', 'mysql', 'mariadb']

My MySQL Admin notes.

I have a docker image with MariaDB (the new version of MySQL)
[here](https://github.com/gizur/docker-mariadb)


Show users

Logon as root: `mysql -uroot -p`

```
use mysql
select host, user from user;
```


Create new schema/user

```
create database SCHEMA_NAME;
create user 'SCHEMA_NAME'@'localhost';
grant all privileges on SCHEMA_NAME.* to 'SCHEMA_NAME'@'localhost' with grant option;
set password for 'SCHEMA_NAME'@'localhost' = password('PASSWORD');
```

Test to login with the new schema: `mysql -uSCHEMA_NAME -pPASSWORD`

Allow to login from any host:
`GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'my-new-password' WITH GRANT OPTION;`

Grant file privileges: `grant file on *.* to 'jsiotpe'@'localhost';`. This is needed for
`load_file`.


Drop user

```
drop user 'SCHEMA_NAME'@'localhost';
drop database SCHEMA_NAME;
```

Make sure the users can't login anymore: `mysql -uSCHEMA_NAME -pPASSWORD`


Allow root to logon from other/any host

Show hostname using the Show users command above.

```
update user set host=’%’ where user=’root’ and host=’HOSTNAME’;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'my-new-password' WITH GRANT OPTION;
flush privileges;
```

`bind-address` in `my.cnf` also needs to be updated to `*` or the IP of the
host you want to connect from.



Enable query log

Assuming version 5.1 or higher.

```
SET GLOBAL general_log = 'ON';

show variables like 'general%';
```


Show grants


`SHOW GRANTS FOR 'USER'@'localhost';`


Resources

* [`mysqladmin` commands](http://www.tecmint.com/mysqladmin-commands-for-database-administration-in-linux/)
* [MySQL Cheat Sheet](http://lzone.de/cheat-sheet/MySQL)
* [query log](http://dev.mysql.com/doc/refman/5.7/en/query-log.html)
