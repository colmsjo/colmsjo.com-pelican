layout: post
title: Export/Import docker container and other docker cleanup activities
description: How to move containers between docker hosts/servers
date: 2018-11-03
author: Jonas Colmsjo
tags: 'docker', 'export', 'import'

# Import/export containers

Moving containers between hosts is simple:

```
docker export NAME | gzip > NAME.gz
# Copy the gz file to the other host - I'm using s3cmd and get external backup while doing it
zcat NAME.gz | docker import - NAME
```

It is probably a good idea to create a local copy of the configuration as well (just in case):

```
docker commit container-name new-image-name
docker run [...same arguments as the other one...] new-image-name
```


# Other cleanup

Check how much memory different processes and containers are using:

```
docker stats list_of_containers
# Run this in the host to see all processes or within a container to see process for the specific container
ps aux --sort --rss
```

`docker system df` show free disk space but is not available in older versions.
Another way is to do `docker commit container` and then `docker images` and
you'll see how much disk that is used. This way we also get a commit point that
new containers can be started from.

`top` and `free` will show general CPU and memory information (as usual).

Use this information to stop processes that consume system resources and aren't used.


# `screen`

`screen` is a good tool for running processes in the background when logged in
via ssh if you want to log off without interrupting the process. Detach
without stopping any processes with `ctrl-a d`.

reconnect with `screen -r`. It is also possible to have several windows.
Create a new window with `ctrl-a c` and switch between windows with `ctrl-a n`.


# Resources

* [Short article](https://www.techrepublic.com/article/how-to-exportimport-containers-with-docker/)
