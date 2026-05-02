# Google Prompt Wars: Election Journey Roadmap

## Background & Motivation
To win Google Prompt Wars, we must prioritize clarity, navigation, and explainability over generic chatbot behavior. A plain Q&A bot is insufficient. We are transforming the application into a **Visual Civic Guide**: a dynamic, guided timeline with step-by-step explainer cards and animated 2D scenes. The AI assistant will act as a smart, context-aware sidekick anchored to the user's current step in the process.

## Product Concept
**"See where you are, what comes next, and what you need to do."**
Users land on a roadmap, select a role (e.g., "First-time Voter", "Candidate"), and navigate a visual timeline of the election process. The LLM handles natural language questions scoped strictly to the current active step, reducing hallucinations and improving utility.

## Core Architecture & Features

### 1. The Journey Map (Main UI)
- A horizontally scrollable interactive timeline component.
- Nodes represent phases: Registration -> Verification -> Polling Day -> Results.
- Selecting a node transitions the main Stage Area to that specific process, triggering a relevant 2D Framer Motion SVG animation.

### 2. Role-Based Flow
- A "Choose Your Role" initial screen.
- The timeline structure and required documents dynamically filter based on the selected role.

### 3. Context-Anchored Smart Assistant
- Instead of a full-screen chat, the assistant is a persistent side panel (or overlay).
- **Prompt Engineering Magic:** When the user clicks a node (e.g., "Registration"), the frontend updates the system prompt context: "You are assisting a [Role] with the [Registration] phase. Deadlines are [X]. Required documents are [Y]." This forces the LLM to provide highly grounded answers.

### 4. Interactive Explainer Cards & Readiness Checker
- Below the animation, display glassmorphic cards detailing "Why it matters", "Required Documents", and "Deadlines".
- A quick interactive checklist (e.g., "Do you have a valid ID?") that updates visual status chips (e.g., "Pending Verification", "Ready to Vote").

## Visual Language (Premium Glassmorphism + Flat Design)
- **Palette:** Trustworthy deep blues, teals, and saffron/gold accents.
- **Motion:** Framer Motion for path drawing (timeline connecting lines), scene transitions (storybook lateral movement), and microinteractions (hover states, expanding cards).
- **Illustrations:** Custom 2D SVGs that explain state (e.g., a document gaining a checkmark when the user clicks a readiness toggle).

## Implementation Steps
1. **Data Layer:** Create a JSON structure defining the roles, timeline steps, associated context for the LLM, and required documents.
2. **Component Restructure:**
   - `RolePicker.tsx`: Entry screen.
   - `JourneyMap.tsx`: The interactive timeline.
   - `ExplainerStage.tsx`: The main area displaying the 2D animation and glassmorphic detail cards.
   - `ContextAssistant.tsx`: The LLM chat panel, updated to receive the `activeStep` object as a prop to inject into the system prompt.
3. **Backend (`api/chat/route.ts`):** Modify to accept `role` and `activeStepContext` parameters to build a highly targeted system prompt.
4. **Integration:** Wire the components together in `page.tsx` using Framer Motion's `AnimatePresence` for smooth role and step transitions.

## Demo Strategy for Judging
- Start on the "Choose Your Role" screen. Select "First-time Voter".
- The Journey Map draws itself.
- Click "Registration". The ID animation plays.
- Use the Readiness Checker to mark an ID as missing. A warning chip appears.
- Ask the Assistant: "What if I lost my ID?" The assistant answers using the exact context of the Registration phase.
- Move to "Polling Day" to show the transition and new animation.
