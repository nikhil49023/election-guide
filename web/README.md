# Election Guide - Indian Election Process Assistant

## 1. Chosen Vertical

**Civic Tech / Public Information**

This project helps first-time and general voters understand the Indian election process with a visual, stage-by-stage guide based on Election Commission of India (ECI) rules and workflow.

## 2. Approach and Logic

The solution is built around a **journey model**:

1. Break the election process into clear user stages (enrollment, verification, polling-day flow, EVM/VVPAT voting, post-vote understanding).
2. Represent each stage as structured data (`journey-data`) with matching rule snippets (`eci-rules`) to keep content grounded.
3. Render stages as a vertically scrollable timeline with motion-led transitions so users can consume the process progressively.
4. Add a context-aware AI assistant that answers only within the election domain and falls back to offline grounded responses when no model key is available.

## 3. How the Solution Works

### Frontend Experience
- Built with **Next.js (App Router)** and React components for each experience block:
  - Role selection
  - Journey map
  - Explainer stages
  - EVM/VVPAT visual illustrations
  - Context assistant
- Framer Motion animations are used to reveal each stage as the user scrolls.

### Knowledge Grounding
- ECI-related information is encoded in local rule/data modules:
  - `src/lib/eci-rules.ts`
  - `src/lib/journey-data.ts`
- The chat API route (`src/app/api/chat/route.ts`) uses these sources to keep responses focused and relevant.

### Runtime Modes
- **Online mode:** Uses Gemini when API key is provided.
- **Offline mode:** Uses grounded local fallback content for demos and resilience.

## 4. Assumptions Made

1. The app is an educational assistant, not a legal replacement for official ECI notifications.
2. Users primarily need a simplified process walkthrough rather than exhaustive legal text.
3. A safe fallback is required so demos work without external API credentials.
4. English is the primary interface language for this version.

## 5. Engineering Quality Notes

### Readability
- Domain-focused naming is used across data and rules (`journey-data`, `eci-rules`, `activeStep`, `readinessCheck`).
- UI and logic are split by responsibility (components in `src/components`, rules/data in `src/lib`, API logic in `src/app/api/chat/route.ts`).
- Formatting is kept consistent with TypeScript + ESLint conventions.

### Maintainability
- Election journey content is data-driven, so updates mostly require editing structured data instead of component logic.
- ECI rules are centralized in one knowledge module, reducing duplication and keeping grounding logic consistent.
- API route includes explicit request-shape validation for core fields (`messages`) and clear fallback behavior.

### Documentation
- This README explains vertical, architecture, workflow, assumptions, setup, and deployment.
- Rule and journey sources are visible in code and linked in the knowledge base entries.

### Best Practices
- Uses TypeScript for safer interfaces and clearer contracts.
- Uses ESLint (`npm run lint`) to enforce code quality standards.
- Avoids hidden logic by keeping business context in typed data structures.

## 6. Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 7. Environment

Create `.env.local`:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
GEMINI_MODEL=gemma-4-26b-a4b-it
```

If missing, the app still works using grounded fallback responses.

## 8. Container Deployment

```bash
docker compose up --build
```

Or:

```bash
docker build -t election-guide .
docker run --env-file .env.local -p 3000:3000 election-guide
```

The app runs on port `3000` using Next.js standalone output.
