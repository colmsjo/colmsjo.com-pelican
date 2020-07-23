layout: post
description: Rackspace
title: Rackspace
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']

Yet another post





[[Cloud Solutions]]


#= Copy server from one account to another =

* http://joshprewitt.com/2011/03/31/building-a-rackspace-cloud-server-from-cloud-files-manually/

<pre>
# On new server
cp -a /etc /etc.bak

yum install curl

# curl -D - -H "X-Auth-User: YourUserName" -H "X-Auth-Key: YourAPIKey" https://auth.api.rackspacecloud.com/v1.0
curl -D - -H "X-Auth-User: colmsjo" -H "X-Auth-Key: 75adf8a6ef1729a6777d4dab477be317" https://auth.api.rackspacecloud.com/v1.0
HTTP/1.1 204 No Content
Server: Apache/2.2.13 (Red Hat)
vary: X-Auth-Token,X-Auth-Key,X-Storage-User,X-Storage-Pass
X-Storage-Url: https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_c73dc259-2aac-4c10-9194-7b93f498bf75
Cache-Control: s-maxage=15641
Content-Type: text/xml
Date: Sat, 05 Nov 2011 20:16:10 GMT
X-Auth-Token: 1ed6d955-e6aa-4004-95d0-452a82190fa2
X-Server-Management-Url: https://servers.api.rackspacecloud.com/v1.0/545339
X-Storage-Token: 1ed6d955-e6aa-4004-95d0-452a82190fa2
Connection: Keep-Alive
X-CDN-Management-Url: https://cdn2.clouddrive.com/v1/MossoCloudFS_c73dc259-2aac-4c10-9194-7b93f498bf75
Content-Length: 0

# We care about X-Storage-URL (That is where the image files are stored) and X-Storage-Token (This is your authentication token that lets
# you actually download stuff). Now let’s see a list of all of the image files in the account. Replace your Storage Token and your URL below. Don’t forget the /cloudservers at the end of the URL.

# curl -H "X-Storage-Token: 63ea9670-c80f-402d-9657-1234567890" https://storage101.dfw1.clouddrive.com/v1/MossoCloudFS_6f597497-4986-44ea-9081-1234567890/cloudservers
curl -H "X-Storage-Token: 1ed6d955-e6aa-4004-95d0-452a82190fa2" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_c73dc259-2aac-4c10-9194-7b93f498bf75/cloudservers
centos5mediawikiknowledgetreevtigercrmwordpressv22_20110314_202518_cloudserver678985.tar.gz.0
centos5mediawikiknowledgetreevtigercrmwordpressv22_20110314_202518_cloudserver678985.yml
centos5webminddclients3cmd_20110307_144249_cloudserver665453.tar.gz.0
centos5webminddclients3cmd_20110307_144249_cloudserver665453.yml
daily_20110329_001634_cloudserver665453.tar.gz.0
daily_20110329_001634_cloudserver665453.yml
daily_20110414_001712_cloudserver665453.tar.gz.0
daily_20110414_001712_cloudserver665453.yml
daily_20110502_001700_cloudserver665453.tar.gz.0
daily_20110502_001700_cloudserver665453.yml
daily_20110507_001659_cloudserver665453.tar.gz.0
daily_20110507_001659_cloudserver665453.yml
daily_20110507_002158_cloudserver775950.tar.gz.0
daily_20110507_002158_cloudserver775950.yml
daily_20110509_001653_cloudserver665453.tar.gz.0
daily_20110509_001653_cloudserver665453.yml
daily_20110509_002113_cloudserver775950.tar.gz.0
daily_20110509_002113_cloudserver775950.yml
daily_20110510_001650_cloudserver665453.tar.gz.0
daily_20110510_001650_cloudserver665453.yml
daily_20110510_002041_cloudserver775950.tar.gz.0
daily_20110510_002041_cloudserver775950.yml
daily_20110511_001738_cloudserver665453.tar.gz.0
daily_20110511_001738_cloudserver665453.yml
daily_20110511_002135_cloudserver775950.tar.gz.0
daily_20110511_002135_cloudserver775950.yml
daily_20110521_001655_cloudserver665453.tar.gz.0
daily_20110610_001841_cloudserver665453.tar.gz.0
daily_20111105_001735_cloudserver665453.tar.gz.0
daily_20111105_001735_cloudserver665453.tar.gz.1
daily_20111105_001735_cloudserver665453.yml
gizurguide_20110419_122357_cloudserver669398.tar.gz.0
gizurguide_20110419_122357_cloudserver669398.yml
openerp110423_20110423_054611_cloudserver775950.tar.gz.0
openerp110423_20110423_054611_cloudserver775950.yml
openerpalldemoubuntu_20110327_180227_cloudserver712516.tar.gz.0
openerpalldemoubuntu_20110327_180227_cloudserver712516.yml
weekly_20110501_002313_cloudserver775950.tar.gz.0
weekly_20110501_002313_cloudserver775950.yml
weekly_20110508_002134_cloudserver775950.tar.gz.0
weekly_20110508_002134_cloudserver775950.yml
weekly_20111030_001732_cloudserver665453.tar.gz.0
weekly_20111030_001732_cloudserver665453.tar.gz.1
weekly_20111030_001732_cloudserver665453.yml


cd /

# As you can see above, there are several files associated with each image. All of the data is stored in the .tar.gz files. The .yml file is a configuration file that 
# for this article we don’t care about. You will see that some of the images have more than one .tar.gz file. This happens when the image is larger than 5GB 
# and it gets chunked into multiple objects in Cloud Files. We will assume that we are working with a chunked image because that will make it just a little bit harder.
#
# Let’s grab the delweb1ssl image. Grab the first chunk like this:
# curl -H "X-Storage-Token: 63ea9670-c80f-402d-9657-1234567890"  https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_c73dc259-2aac-4c10-9194-7b93f498bf75/cloudservers/delweb1ssl_20110326_054323_cloudserver710521.tar.gz.0 > dlimage.tar.gz.0

curl -H "X-Storage-Token: 1ed6d955-e6aa-4004-95d0-452a82190fa2" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_c73dc259-2aac-4c10-9194-7b93f498bf75/cloudservers/daily_20111105_001735_cloudserver665453.tar.gz.0 > centos_image.gz.0

curl -H "X-Storage-Token: 1ed6d955-e6aa-4004-95d0-452a82190fa2" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_c73dc259-2aac-4c10-9194-7b93f498bf75/cloudservers/daily_20111105_001735_cloudserver665453.tar.gz.1 > centos_image.gz.1


# Do this for all files

cat centos_image.* > myimage.tar.gz

rm -f centos_image.*

# More than likely, you will need the newest version of tar to have the –hard-dereference option available. 
wget http://joshprewitt.com/scripts/static_tar

chmod +x static_tar
./static_tar --strip-components=2 --hard-dereference -xpf myimage.tar.gz -C /

</pre>


Copy some etc files (not sure about what should be included):
<pre>
# test 1
cp /etc.image/passwd /etc.image/shadow /etc.image/group /etc/.
cp /etc.image/sysconfig/iptables /etc/sysconfig/iptables
reboot

# did not give much, only saving sysconfig
# next test
unalias cp
cp -a /etc.image/ /etc
cp -af /etc.bak/sysconfig/* /etc/sysconfig/
reboot

# did not give much, only saving sysconfig/networl-scripts
# next test
unalias cp
cp -a /etc.image/ /etc
cp -a /etc.bak/sysconfig/network-scripts/ /etc/sysconfig/network-scripts/
reboot

# one more test

unalias cp
cp -a /etc /etc.bak
cp -a /etc.image/* /etc/
cp -a /etc.bak/sysconfig/* /etc/sysconfig/
cp /etc.image/sysconfig/iptables /etc/sysconfig/
service iptables restart
reboot

</pre>
