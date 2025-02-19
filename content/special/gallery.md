---
title: Gallery Page
description: Image Gallery page Description
layout: gallery.njk
pagination:
  data: collections.galleries
  size: 12
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
 - item5
 - item6
permalink: "gallery/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

