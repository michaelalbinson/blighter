-----------------------
articleLink: https://til.simonwillison.net/django/building-a-blog-in-django
articleTitle: Building a blog in Django | Simon Willison’s TILs
createdOn: 2023-09-21T01:09:21.178Z
updatedOn: 2023-09-21T01:09:21.178Z
-----------------------

TL;DR: literally the building blocks of a blog app on django - could be worth a look if I ever want to tinker with
blog.albinson.ca

- essential function of a blog
  - Blog posts have a title, summary, body and publication date. Optional: author information, tags
  - Posts can be live or draft
  - The blog index page shows the most recent entries
  - Older entries are available via some kind of archive mechanism
  - The blog has an Atom feed
  - Entries have social media card metadata, to enhance links to them on Mastodon and Twitter
  - Markdown is a nice-to-have for editing the posts
