layout: post
title: Python notes
description: Some notes about the setup of python virtual environments, conda etc.
date: 2017-06-18
author: Jonas Colmsjo
tags: ['post', 'ai', 'development', 'python']

Setup
=====

Anaconda is a data science platform that is useful when developing AI stuff.
It includes a package manager with support for virtual environment called `conda`.
Using [miniconda](https://conda.io/miniconda.html) you install only the packages
needed. `conda` has support for both python2 and python3 using the `python=2|3`
flag (default python version is different between miniconda and miniconda3).

You probably want to be able to run any existing Python installations from
time to time, so answer **no** when the installer asks if the `PATH` should
be updated in `bash_profile`. I'm using these aliases instead:

    # Just type `useConda` to use on `conda` and `useDefault` to stop using `conda`
    alias useConda='export PATH="/Users/jonas/local/conda3/bin:$PATH"'
    alias useDefault='export PATH=${PATH/\/Users\/jonas\/local\/conda3\/bin:}'


My cheat sheet:

* Create a virtual environment using Python 2 and install the anaconda packages:
`conda create -n cenv anaconda python=2`
* Activate an environment: `source activate cenv`
* Deactivate an environment: `source deactivate cenv`
* Show some info about the conda installation: `conda info`

Keep in mind that environments are setup in the `conda` installtion folder (and not in the current
folder like `virtualenv`). So environments needs to have unique names.


Resources:

* [Managing environments](https://conda.io/docs/using/envs.html)
* [The conda cheat sheet](https://conda.io/docs/using/cheatsheet.html)
* [Conda docs](https://conda.io/docs/index.html)


Misc packages
=============

[PyGraphviz](https://pygraphviz.github.io/#)

Make sure java installed, for instance with `brew cask`: `brew cask install java`

[Graphviz](http://www.graphviz.org) needs to be installed. Install on OSX with
`brew`: `brew install graphviz --with-app --with-bindings --with-librsvg`


Then install with: `conda install -c pdrops pygraphviz=1.2`


[BioConda](https://bioconda.github.io/)

Includes bio informatics software. Contains a newer version of `pygraphviz`.
