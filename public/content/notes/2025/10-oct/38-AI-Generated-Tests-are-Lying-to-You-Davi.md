-----------------------
articleLink: https://davidadamojr.com/ai-generated-tests-are-lying-to-you/
articleTitle: AI-Generated Tests are Lying to You | David Adamo Jr.
createdOn: 2025-10-14T02:31:08.253Z
updatedOn: 2025-10-14T02:31:08.253Z
-----------------------

- Generate tests before you write the code. Treat the LLM like a collaborator in Test Driven Development (TDD). Give it your requirements, your assumptions, or your acceptance criteria. Ask: “Given this description, what test cases would you write?”
- Ask it for failure modes, not success paths. Don’t say “write tests for this function”. Say “how could this function break?” or “what edge cases might this logic miss?”.
- Use it for creativity, not confirmation. LLMs can help brainstorm boundary conditions, equivalence partitions, and fuzz inputs you might not think of, all of which expand coverage beyond what your code currently does.
- Measure test quality with mutation testing. Mutation testing frameworks (like MutPy or PIT) intentionally inject small bugs into your code to see whether your tests catch them. These buggy versions of your code are referred to as “mutants.” If the mutants survive, then your tests aren’t strong enough. Use AI to propose new tests that kill those mutants.
