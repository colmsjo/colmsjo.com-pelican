layout: post
title: docker-nodejs
description: Docker container with NodeJS managed my nvm
date: 2015-06-18
author: Jonas Colmsjo
tags: ['post','NodeJS']


Minimal docker container with NodeJS:


    #
    # docker build -t watchmen --rm --no-cache=true .
    #
    # docker run -t -i -p 8081:80 --restart="on-failure:10" --name watchmen -h watchmen watchmen /bin/bash --rcfile /root/.profile

    FROM ubuntu:trusty
    MAINTAINER Jonas Colmsjö "jonas@gizur.com"

    RUN apt-get update
    RUN apt-get install -y curl git nano redis-server

    RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash

    RUN /bin/bash -c ". /root/.profile; nvm install v0.12.4"
    RUN /bin/bash -c ". /root/.profile; nvm alias default v0.12.4"
