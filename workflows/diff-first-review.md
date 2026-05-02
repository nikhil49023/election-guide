# Workflow: Diff-First Review

Extreme token efficiency for code reviews.

1. **Get Diff:** `git diff` or `git show --stat`.
2. **Identify Core:** List changed files.
3. **Trace Impact:**
   - For each changed file, `grep` for imports/callers.
   - List impacted files/configs.
4. **Surgical Read:** Read only the changed lines and immediately surrounding context.
5. **Verify:** Run tests for changed + impacted files.
6. **Escalate:** Only if cross-cutting (e.g., config change, global API change).
