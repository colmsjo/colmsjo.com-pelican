layout: post
title: Testing out SAP HANA
description: Testing out SAP HANA
date: 2014-07-13
author: Jonas Colmsjo
tags: ['post', 'HANA', 'summary']


Introduction
============

Some HANA links:

+ [HANA intro](http://www.slideshare.net/SAPCommunityNetwork/architecture-and-technology-in-sap-hana)
+ [Tutorial](http://scn.sap.com/community/developer-center/cloud-platform/blog/2013/10/17/8-easy-steps-to-develop-an-xs-application-on-the-sap-hana-cloud-platform)
+ [Help](https://help.hana.ondemand.com/help/frameset.htm?e9137493bb57101492c6858c8d6b0b62.html)
+ [Academy](http://www.saphana.com/docs/DOC-2897)
+ [Data loads](http://scn.sap.com/community/hana-in-memory/blog/2013/04/08/best-practices-for-sap-hana-data-loads)
+ [HANA XS](http://scn.sap.com/community/developer-center/hana/blog/2012/11/29/sap-hana-extended-application-services)
+ [Web IDE vs. Studio](http://scn.sap.com/docs/DOC-51906)
+ [NodeJS and HANA](http://scn.sap.com/community/developer-center/hana/blog/2013/12/05/nodejs-dashboard-for-sap-hana)
+ [HANA CLI tools](http://scn.sap.com/community/hana-in-memory/blog/2013/05/27/andy-silvey--sap-hana-command-line-tools-and-sql-reference-examples-for-netweaver-basis-administrators)

Also check out River, it is a new development language. It is not publicly available at the time of writing but there is a early adoption program and possible to get a trail account for 7 days. See [scn.sap.com](http://scn.sap.com/docs/DOC-47903) and [sap-river.com](http://sap-river.com/)


Options for running HANA in the cloud

A trail account can be created here: hanatrial.ondemand.com

SAP provides HANA in the cloud themselves (starting at 4.500-6.000/month depending on version), see [hcp.sap.com](http://hcp.sap.com/).

There is also a starter edition with community support ($539/month), [here](http://marketplace.saphana.com/Lines-of-Business/Information-Technology/SAP-HANA-Cloud-Platform%2C-starter-edition/p/1805)

[HANA on Amazon](http://aws.amazon.com/sap/saphana):

+ HANA One costs $3/hour ($2.200/month)
+ Developer account http://cal.sap.com
 + m2.4xlarge costs $0.0642/Hour ($48/month)
 + hs1.8xlarge costs $4.600/Hour

The HANA developer account is by far the cheapest option. Let’s try that one out.

HANA One and Developer Edition are technically the same. HANA One requires significantly more hardware though and is therefore more costöy to run. The main difference is otherwise the license, [see this post for more details](http://www.saphana.com/community/blogs/blog/2012/11/05/get-your-own-piece-of-sap-hana-one)

You can also run on your own hardware if you are a SAP-customer (see SAP HANA Platform edition).


SAP HANA Platform edition

+ [Supported OS:es](https://service.sap.com/pam). Look for HANA Platform EDIT (a SAP s-user is needed)
 + HANA is only supported for SuSE 11 (which is rather old by now)

+ [Master Guide](http://help.sap.com/saphelp_hanaplatform/helpdata/en/d4/3377c2bb57101489ebe2e6a1813cfc/frameset.htm)


Howto setup HANA One instance on AWS

1. Launch in EC2 console (search for HANA One in the marketplace)
2. Check the IP and access in a browser (accept security exception)
+ http://www.saphana.com/docs/DOC-3109
3. Set the password using your AWS access key and secret


Howto setup HANA developer edition

[Goto](http://cal.sap.com) and follow the instructions. A EC2 server will be  launched with everything you need.


HANA Studio installation

[See for the details](https://help.hana.ondemand.com/help/frameset.htm?b0e351ada628458cb8906f55bcac4755.html)

Hana Studio (Eclipse Kepler) - need to install Hana Studio once Eclipse is [installed](http://eclipse.org/downloads/packages/eclipse-standard-432/keplersr2)

+ Then do Help > Install new software > https://tools.hana.ondemand.com/kepler

A [HANA Client](https://hanadeveditionsapicl.hana.ondemand.com/hanadevedition/) is also good to have (not available for Mac):


Development on mac

There is no HANA client for Mac. One alternative is to run the client on linux in a [VM](http://scn.sap.com/people/eric.du/blog/2013/05/16/solution-for-mac-users-who-want-to-run-hana-studio)

Another workaround: [cloud service that makes it possible to use Github](http://dshell.saphana.com/)


Tutorial

[I followed this tutorial](https://help.hana.ondemand.com/help/frameset.htm?3762b229a4074fc59ac6a9ee7404f8c9.html)

My app ended up here: http://79.125.55.249:8000/hello/

I had to reboot the HANA server once in cal.sap.com, Eclipse lost the connection and could not reconnect.

[Another tutorial](http://www.saphana.com/docs/DOC-3017)


More advanced stuff
===================


Login to the HANA server


	# SSH into the HANA (Suse) server
	ssh -i ~/path/to/keypair.pem root@<IP>

	# assuming the the system is named HDB
	su - hdbadm

	# List all hosts
	./exe/sapcontrol -nr 0 -function GetSystemInstanceList


Commands:

 * hdbsql
 * hdbupdrep - update repository

See the 'SAP HANA LCM Tools Reference Guide’ for the details.


Web development IDE

[Howto setup](http://scn.sap.com/community/developer-center/hana/blog/2013/11/27/hana-xs-development-with-the-new-web-ide) (not installed by default):



Run docker on the AWS HANA server

docker provides a good way to compartmentalize different technologies. This provides a way to run other technologies on the HANA server. I’ll se if I can use this when migrating old applications to HANA. Running HANA servers is rather costly and this is a way to keep the total cost manageable.

[Instructions for installation of docker on SuSE](https://docs.docker.com/installation/openSUSE/)


	# check SuSE version
	cat /etc/SuSE-release
	SUSE Linux Enterprise Server 11 (x86_64)
	VERSION = 11
	PATCHLEVEL = 2

	# Version 11.4 is the lowest supported level I could find
	sudo zypper ar -f http://download.opensuse.org/repositories/Virtualization/openSUSE_11.4/




