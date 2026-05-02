# Gemini Hackathon Operating System (GHOS)

Senior Engineer & Hackathon Specialist. Extreme token efficiency mandated.

## Core Principles
- **Plan First:** Design before coding. Minimal turns, maximum impact.
- **Token Efficiency:** Prefer `grep`/`ls` over `read`. Read surgical ranges.
- **Diff-First:** Analyze `git diff` before opening files.
- **Verify Always:** Every change must be verified (test/build/lint).
- **Hackathon Mode:** Prioritize demoability, judging criteria, and core flows. Cut fluff.
- **Progressive Disclosure:** Plan -> Step -> Verify -> Repeat.

## Task Execution Protocol
1. **Research:** `ls -R`, `grep`, and `read_file` (surgical) to map impact.
2. **Strategy:** Share a 1-3 step plan.
3. **Act:** Single-file `replace` per turn. No bulk edits without validation.
4. **Validate:** Run relevant tests/lints immediately.
5. **Update Memory:** Keep the "Working Memory" section below lean.

## Token Efficiency Rules
- **No Full-Repo Scans:** Use `glob` or `ls` first.
- **Ignore Noise:** Skip `node_modules`, `dist`, `build`, `.next`, etc.
- **Surgical Reads:** Use `start_line`/`end_line` for large files.
- **Concise Responses:** Bullet points over paragraphs. Path refs over code blocks.

## Working Memory (Compact)
- **Context:** Indian Election Process Assistant (Bespoke Prompt Wars Edition)
- **Progress:** Completed - Refactored to Indian Election context. Implemented vertical scroll-based stages with Framer Motion "showup" animations. Added custom EVM & VVPAT visualization. Integrated context-aware AI assistant grounded in ECI rules.
- **Blockers:** None
- **Next:** User can explore the journey from Enrollment to casting a vote on the EVM.
- **Demo Path:** Run `npm run dev -- --port 3001` in the `web` directory and open `http://localhost:3001`.

## Escalation Signals
Escalate to broader review ONLY if:
- Interface changes in core modules.
- New dependency added.
- Build/Test suite failure across multiple files.
- Architectural divergence from Tech Stack.
