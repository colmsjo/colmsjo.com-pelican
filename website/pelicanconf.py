#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Jonas Colmsjö'
SITENAME = 'Work In Progress'
SITEURL = '/'

PATH = 'content'

TIMEZONE = 'Europe/Stockholm'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
#LINKS = (('Pelican', 'http://getpelican.com/'),
#         ('Python.org', 'http://python.org/'),
#         ('Jinja2', 'http://jinja.pocoo.org/'),
#         ('You can modify those links in your config file', '#'),)

# Social widget
#SOCIAL = (('You can add links in your config file', '#'),
#          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

#THEME='../my-themes/bootstrap3'
#THEME='../my-themes/yeti'
THEME='../buruma'

PLUGIN_PATHS = ['../pelican-plugins', ]
PLUGINS = ['i18n_subsites', ]
JINJA_ENVIRONMENT = {
    'extensions': ['jinja2.ext.i18n'],
}

HIDE_SITENAME = True

STATIC_PATHS = [
    'images',
    'extra',
]

EXTRA_PATH_METADATA = {
#    'extra/custom.css': {'path': 'custom.css'},
#    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/favicon.ico': {'path': 'favicon.ico'},
#    'extra/CNAME': {'path': 'CNAME'},
#    'extra/LICENSE': {'path': 'LICENSE'},
#    'extra/README': {'path': 'README'},
}

# Specific for attila
HEADER_COLOR = 'black'
DISPLAY_PAGES_ON_MENU = True



# Buruma settings
# ===============

#MENUITEMS_NAVBAR = (("About", "/pages/about.html"), ("About2", "/pages/about2.html"))
#MENUITEMS_NAVBAR_FEATURED = (("About", "/pages/about.html", "is-link"), ("About2", "/pages/about2.html", "is-info"))
WELCOME_HEADING = "Work In Progress"
FOOTER = "Jonas Colmsjö"
LICENSE = False
#LICENSE_NOTICE = ("License notice",)
#ABOUT_EXTRACT_STATUS = True
#ABOUT_EXTRACT = "This is the about extract"

# Not documented, see templates/base.html
THEME_LOGO = '/images/colmsjo-logo.png'
