---
layout: page.njk
title: "Articles"
description: "A collection of insightful articles."
---

## Featured Article

{% for article in collections.articles %}
{% if article.data.featured %}
### [{{ article.data.title }}]({{ article.url }})
> {{ article.data.description }}
{% endif %}
{% endfor %}

## Recent

{% for article in collections.articles %}
{% if not article.data.featured %}
### [{{ article.data.title }}]({{ article.url }})
> {{ article.data.description }}
{% endif %}
{% endfor %}

[Go back to homepage](/)
