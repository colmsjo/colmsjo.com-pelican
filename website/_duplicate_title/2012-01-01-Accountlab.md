layout: post
description: Accountlab
title: Accountlab
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']

Yet another post





[[Main_Page]] > [[IT resources]]

* https://netenberg.com/accountlabplus.php#accountlabplus.html

DID NOT MANAGE TO GET IT WORKING!

  wget http://downloads.sourceforge.net/project/accountlabplus/accountlab_plus.tgz?r=&ts=1303234049&use_mirror=sunet
  tar -xzpf accountlab_plus.tgz
  mv accountlab_plus /var/www/html/
  chmod 666 /var/www/html/accountlab_plus/elements/default/sysvar/db.php
  chown -R apache.apache accountlab_plus/

  http://.../accountlab_plus/install.php
