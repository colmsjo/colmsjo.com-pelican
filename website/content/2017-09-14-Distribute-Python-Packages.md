layout: post
title: Distribute Python Packages
description:
date: 2017-09-14
author: Jonas Colmsjo
tags: ['post', python']

First attempt on distributing a Python package.

```
# Run outside virtualenv (deactivate if virtualenv is active)
python -m pip install setuptools wheel twine
```

Get the PyPA sample project: https://github.com/pypa/sampleproject

Create a source distribution: `python setup.py sdist`

Update `config.py`:

* Choose a Trove classifer as the topic from [this list](https://pypi.python.org/pypi?:action=list_classifiers)
* Read [install_requires vs Requirements files](https://packaging.python.org/en/latest/requirements.html)

Create a [PyPI account](https://pypi.python.org/pypi?%3Aaction=register_form)

Create a `.pypirc` file in the home folder (if you can live with having the password i cleartext in the home folder).

Upload the build: `twine upload dist/*`

Resources:

* [Packaging and Distributing Projects](https://packaging.python.org/tutorials/distributing-packages/#packaging-your-project)
* [Distributing Python Modules](https://docs.python.org/3/distributing/index.html)
* [Python Packaging User Guide](https://packaging.python.org)
* [PyPI - the Python Package Index](https://pypi.python.org/pypi)
