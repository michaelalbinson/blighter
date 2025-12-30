-----------------------
articleLink: https://minusx.ai/blog/decoding-claude-code/
articleTitle: Minusx | What makes Claude Code so damn good (and how to recreate that magic in your agent)!?
createdOn: 2025-10-14T00:29:59.816Z
updatedOn: 2025-10-14T00:29:59.816Z
-----------------------

1. Control Loop

    1.1 Keep one main loop (with max one branch) and one message history
    1.2 Use a smaller model for all sorts of things. All. The. Frickin. Time.

2. Prompts

    2.1 Use claude.md pattern to collaborate on and remember user preferences
    2.2 Use special XML Tags, Markdown, and lots of examples

3. Tools

    3.1 LLM search >>> RAG based search
    3.2 How to design good tools? (High vs Low level tools)
    3.3 Let your agent manage its own todo list

4. Steerability

    4.1 Tone and style
    4.2 "PLEASE THIS IS IMPORTANT" is unfortunately still state of the art
    4.3 Write the algorithm, with heuristics and examples
