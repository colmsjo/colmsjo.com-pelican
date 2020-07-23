layout: post
title: docker clusters
description: Running several docker hosts sharing a netwrok
date: 2016-02-28
author: Jonas Colmsjo
tags: ['post', 'docker', 'cluster']

It is now possible to share a network across several docker hosts. This way can containers
on different hosts easily communicate with each other.


```
# create a machine holding the keystore
docker-machine create -d virtualbox keystore

# start a container with consul
docker $(docker-machine config keystore) run -d \
    -p "8500:8500" \
    -h "consul" \
    progrium/consul -server -bootstrap

# check the IP of the new host
docker-machine ls

# test the consul key/value store
curl -X PUT -d 'test' http://[IP]:8500/v1/kv/web/key1
curl -v http://[IP]:8500/v1/kv/?recurse

# create a swarm master
docker-machine create \
-d virtualbox \
--swarm --swarm-master \
--swarm-discovery="consul://$(docker-machine ip keystore):8500" \
--engine-opt="cluster-store=consul://$(docker-machine ip keystore):8500" \
--engine-opt="cluster-advertise=eth1:2376" \
swarm0

# create a docker host
docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://$(docker-machine ip keystore):8500" \
    --engine-opt="cluster-store=consul://$(docker-machine ip keystore):8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
  host01

# create one more host
docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://$(docker-machine ip keystore):8500" \
    --engine-opt="cluster-store=consul://$(docker-machine ip keystore):8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
  host02
  
# point docker to the swarm master
eval $(docker-machine env --swarm swarm0)

# view info about the awarm
docker info

# view the networks
docker network ls

# create the overlay network
docker network create --driver overlay --subnet=10.0.9.0/24 net0

# check the networks again
docker network ls

# switch to host1
eval $(docker-machine env host1)
docker network ls

eval $(docker-machine env host2)
docker network ls

# point docker to swarm master
eval $(docker-machine env --swarm swarm0)
```


Test to create some containers


```
docker run -itd --name=web --net=net0 --env="constraint:node==swarm0" nginx

docker run -it --rm --net=net0 --env="constraint:node==swarm0" busybox wget -O- http://web
```


Resources

* [Docker Getting Started Guide](https://docs.docker.com/engine/userguide/networking/get-started-overlay/)
