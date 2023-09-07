## Blighter

Simple RSS feed aggregator with a local SQLite cache

Well... a little less simple these days. We can:
- pull articles from any number of RSS feeds
- add our own reading list items
- associate notes for either articles or reading list items which are saved to the filesystem
  - the goal of notes is to have human-readable notes that can be read + understood in and outside the webapp 
- track if an article/item has been read or not
- save articles/items for later perusal
- quick filtering through all your items

We also try to keep the way that we collect data sources fairly extensible so that
other sources can be easily added as needed.

Common facilities for writing/reading from the database and web client interface are provided here,
but the web client could theoretically be replaced as the APIs exposed via DataSourceCollector and
the express app are pretty straight-forward.

### Resources

- Find more blogs that may be of interest [here](https://github.com/praharshjain/engineering-blogs)
- [Getting RSS feeds from medium](https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-publications-and-topics)
- LLAMA 2 models:
  - [LLAMA_2_CHAT](https://huggingface.co/TheBloke/Llama-2-7b-Chat-GGUF/blob/main/llama-2-7b-chat.Q5_K_M.gguf)
  - [LLAMA_2_CODE](https://huggingface.co/TheBloke/CodeLlama-7B-Instruct-GGUF)


### TODOS:
- [X] Search (simple)
- [ ] Search (LLM-enabled)
- [ ] Delete unwanted feed + relevant items
- [x] Filters
  - [x] Read
  - [x] Unread
  - [x] All
- [X] Fix refresh button
- [ ] Grouping + tagging feeds by larger topics (e.g. engineering, general tech)
  - I think I even would go so far as to have this be a "project/theme-centric" construct so that you have a landing page
  of projects with related notes/articles... this is getting a bit trickier to implement from where this project started
- [ ] Hardening + resiliency (prevent errors from crashing the app)
- [X] Pagination/reducing endless-scroll stress on main page
- [X] Save article
- [X] Add notes for article
- [X] Mark articles read/unread
  - [X] Automatically mark article read when clicked
- [ ] pure note view
  - [ ] add notes that are not associated to an article
    - [ ] Add support for custom note titles, tagging
    - [ ] Note "workspaces" that write to separate dirs 
  - [ ] allow adding a header preamble ("note context") to the notes
  - 