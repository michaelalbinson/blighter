-----------------------
articleLink: https://calv.info/agents-feb-2026
articleTitle: Coding Agents in Feb 2026
createdOn: 2026-03-27T22:46:49.274Z
updatedOn: 2026-03-27T22:46:49.274Z
-----------------------

things to keep in mind
- Your work needs to somehow be chunked - work that's too big causes AI to spin its wheels
- Compaction is a lossy technique - try to stay in a single context window
- Externalizing context into the filesystem - dump stuff into files and let agents decide to read them
- Stay in the 'smart' half of the context window - if possible, perf is better
- You don't know what you don't know
  - Your codebase's structure can help this, as can 'progressive disclosure' of parts of the architecture
-