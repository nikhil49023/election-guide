# GHOS: Gemini Hackathon Operating System

This directory contains a pre-configured Gemini CLI environment optimized for hackathons.

## Quick Start
1. **Copy:** Move all files/folders in this directory to your project root.
2. **Configure:** Edit `GEMINI.md` "Working Memory" to reflect your current project.
3. **Execute:** Follow `workflows/task-loop.md` for all development.

## Efficiency Tip
Always use `prompts/review-diff.md` instead of asking Gemini to "review the project". This saves thousands of tokens per session.

## Support
Use the `agents/` markdown files to prompt Gemini for specific roles:
- `build-council`: What should we build?
- `reviewer`: Is this code safe?
- `debugger`: Why is it broken?
- `ship`: Help me submit!
