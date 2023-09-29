-----------------------
articleLink: https://eugeneyan.com/writing/llm-patterns/
articleTitle: Patterns for Building LLM-based Systems & Products
createdOn: 2023-09-25T18:33:24.918Z
updatedOn: 2023-09-25T18:33:24.918Z
-----------------------

TL;DR: Extensive document on many different techniques for building LLM projects. Best to refer back to it for specific information
as needed vs dumping all the notes in the world here.

With regard to embeddings, the seemingly popular approach is to use text-embedding-ada-002. Its benefits include ease of use via an 
API and not having to maintain our own embedding infra or self-host embedding models. Nonetheless, personal experience and anecdotes 
from others suggest there are better alternatives for retrieval.

The OG embedding approaches include Word2vec and fastText. FastText is an open-source, lightweight library that enables users to 
leverage pre-trained embeddings or train new embedding models. It comes with pre-trained embeddings for 157 languages and is extremely 
fast, even without a GPU. It’s my go-to for early-stage proof of concepts.

https://fasttext.cc/

To retrieve documents with low latency at scale, we use approximate nearest neighbors (ANN)