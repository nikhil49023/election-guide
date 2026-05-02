# Token-Efficient Review: The Graph-First Strategy

Naive code review reads the entire repository. This strategy reads only the **Impact Graph**.

## The Algorithm
1. **The Seed:** Start with `git diff`. These are the "hot" files.
2. **The Neighbors:** For each hot file, find its direct neighbors:
   - **Upstream:** What files import this file? (`grep -r "import.*filename"`)
   - **Downstream:** What files does this file import?
   - **Peers:** What files share a directory or config?
3. **The Filter:** Filter the neighbors by relevance. Ignore third-party libs and distant modules.
4. **The Inspect:** Only read the "hot" files and "filtered neighbors".
5. **The Escalation:** Broaden only if a "hot" file changes a shared interface or a global state (e.g., DB schema).

## Why This Saves Tokens
- **Space Complexity:** O(Changed Files + First-Degree Neighbors) instead of O(N_files).
- **Context Preservation:** Keeps the agent focused on the logic flow rather than the file structure.
- **Speed:** Faster diagnosis as the agent doesn't get "lost" in unrelated code.
