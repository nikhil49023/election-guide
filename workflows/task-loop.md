# Workflow: Task Loop

The standard execution cycle for GHOS.

1. **Select Task:** From `GEMINI.md` Working Memory.
2. **Plan (1 turn):** Use `prompts/plan-feature.md`.
3. **Execute (N turns):** Surgical edits with `replace`.
4. **Verify (1 turn):** Build/Test/Lint.
5. **Update Memory:** Mark as done, update Next.
