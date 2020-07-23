layout: post
description: Opennebula
title: Opennebula
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']

Yet another post





[[Main_Page]] > [[Gizur server admin]]

#= Installation =

* http://www.opennebula.org/documentation:rel1.4:notes
* Express - http://dev.opennebula.org/projects/opennebula-express/wiki

#== First try ==

<pre>
yum install ruby ruby-devel ruby-docs ruby-ri ruby-irb ruby-rdoc

wget http://download.fedora.redhat.com/pub/epel/5/i386/epel-release-5-3.noarch.rpm
yum --nogpgcheck localinstall epel-release-5-3.noarch.rpm
yum install rubygems

gem install nokogiri rake xmlparser

wget http://prdownloads.sourceforge.net/scons/scons-1.2.0-1.noarch.rpm
yum --nogpgcheck localinstall scons-1.2.0-1.noarch.rpm

wget http://centos.karan.org/el5/extras/testing/i386/RPMS/xmlrpc-c-1.06.18-1.el5.kb.i386.rpm
wget http://centos.karan.org/el5/extras/testing/i386/RPMS/xmlrpc-c-devel-1.06.18-1.el5.kb.i386.rpm
yum localinstall xmlrpc-c-1.06.18-1.el5.kb.i386.rpm xmlrpc-c-devel-1.06.18-1.el5.kb.i386.rpm

wget http://www.sqlite.org/sqlite-amalgamation-3.6.17.tar.gz
tar xvzf sqlite-amalgamation-3.6.17.tar.gz
cd sqlite-3.6.17/
yum install gcc
./configure
make
make install

scons sqlite=<path where you installed sqlite>
</pre>


#== Second try ==

<pre>
wget http://dev.opennebula.org/attachments/download/165/opennebula-express-1.0.tar.gz
tar xvzf opennebula-express-1.0.tar.gz
cd opennebula-express
./install
</pre>

<pre>
[root@hubert opennebula-express]# ./install.sh
Select deployment type (press '0' to exit):
1) Ubuntu 10.04 - KVM - NFS
2) Ubuntu 10.04 - KVM - SSH
3) CentOS 5.4 - Xen - NFS
4) CentOS 5.4 - Xen - SSH
4

Review your configuration:

- OS: CentOS 5.4
- Hypervisor: XEN
- Transfer Maneger: SSH
- NFS configuration
        no NFS configuration

Proceed? (y/n) y
- Installing frontend dependencies
- Installing gems
- Creating user oneadmin
- Downloading and installing binary package
- Processing configuration files
- Writing ONE_AUTH file
- Starting OpenNebula
- Creating SSH Keys

Success!
Generated install script for the nodes: node-install.sh.
Execute node-install.sh in your nodes to configure it as an OpenNebula
worker node.

- Configure bridge manually

Don't forget to configure your bridges in your nodes, so you can
pass them to OpenNebula. To do so use:

'brctl addbr br0' # creates bridge br0
'brctl addif br0 eth0' # add interface eth0 to bridge br0

and configure the IP of your bridge interface.
[root@hubert opennebula-express]#


</pre>
