-----------------------
articleLink: https://kottke.org/23/06/how-nasa-writes-space-proof-code
articleTitle: How NASA Writes Space-Proof Code
createdOn: 2023-09-08T16:24:04.273Z
updatedOn: 2023-09-08T16:24:04.273Z
-----------------------

The rules focus on testability, readability, and predictability:

- Avoid complex flow constructs, such as goto and recursion.
- All loops must have fixed bounds. This prevents runaway code.
- Avoid heap memory allocation.
- Restrict functions to a single printed page.
- Use a minimum of two runtime assertions per function.
- Restrict the scope of data to the smallest possible.
- Check the return value of all non-void functions, or cast to void to indicate the return value is useless.
- Use the preprocessor sparingly.
- Limit pointer use to a single dereference, and do not use function pointers.
- Compile with all possible warnings active; all warnings should then be addressed before release of the software.

goal: ensure that developers are working in such a way that their code does the same thing every time, can be tested completely, and is therefore more reliable