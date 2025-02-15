---
title: Blog Post
description: Update from blog post article
layout: blog.njk
pagination:
  data: collections.posts
  size: 4
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
permalink: "blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---
