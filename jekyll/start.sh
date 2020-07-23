#!/bin/bash
locale-gen en_US en_US.UTF-8
dpkg-reconfigure locales
update-locale LANG=en_US.UTF-8
export LANG=en_US.UTF-8
cd /src
bundle exec jekyll serve
