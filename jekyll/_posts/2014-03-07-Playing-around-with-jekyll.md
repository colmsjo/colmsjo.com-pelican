title: Playing around with Jekyll
description: Testing to add some ruby code 
date: 2014-03-07
author: Jonas Colmsjö
layout: post
tags: ['post', 'jekyll']

Jekyll uses a templating language called liquid, take a look at this [crash course](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)


This code should generate a list of posts. You can also see the code for this post [here](https://raw.github.com/colmsjo/colmsjo.github.io/master/_posts/2014-03-07-Playing-around-with-jekyll.md)

{% raw %} 
~~~~~ ruby
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><BR>
      post.excerpt: {{ post.excerpt }}<br>
      post.tags: {{ post.tags }}<br>
      post.author: {{ post.author }}<br>
    </li>
  {% endfor %}
</ul>
~~~~~
{% endraw %}


And this is the list that was generated:

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><br>
      post.excerpt: {{ post.excerpt }}<br>
      post.tags: {{ post.tags }}<br>
      post.author: {{ post.author }}<br>
    </li>
  {% endfor %}
</ul>


***


Print list of tags:

{% raw %} 
~~~~~ ruby
<ul>
  {% for post in site.posts %}
    <li>
      title: {{ post.title }}<br>tags: 
      {% for tag in post.tags %}
        {{ tag }},
      {% endfor %}
    </li>
  {% endfor %}
</ul>
</ul>
~~~~~
{% endraw %}


<ul>
  {% for post in site.posts %}
    <li>
      title: {{ post.title }}<br>tags: 
      {% for tag in post.tags %}
        {{ tag }},
      {% endfor %}
    </li>
  {% endfor %}
</ul>



