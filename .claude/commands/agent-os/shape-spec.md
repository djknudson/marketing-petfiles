# Shape Spec

Gather context and structure planning for significant work. **Run this command while in plan mode.**

## Important Guidelines

- **Always use AskUserQuestion tool** when asking the user anything
- **Offer suggestions** — Present options the user can confirm, adjust, or correct
- **Keep it lightweight** — This is shaping, not exhaustive documentation

## Prerequisites

This command **must be run in plan mode**. If not in plan mode, stop and tell the user.

## Process

### Step 1: Clarify What We're Building

Ask the user to describe the feature or change. Follow up with 1-2 clarifying questions if scope is unclear.

### Step 2: Gather Visuals

Ask for mockups, wireframes, screenshots, or examples. Note for inclusion in spec folder.

### Step 3: Identify Reference Implementations

Ask if there's similar code in the codebase to reference. Read and analyze if provided.

### Step 4: Check Product Context

If `agent-os/product/` exists, read key files and ask about alignment with product goals.

### Step 5: Surface Relevant Standards

Read `agent-os/standards/index.yml` and suggest relevant standards via AskUserQuestion.

### Step 6: Generate Spec Folder Name

Format: `YYYY-MM-DD-HHMM-{feature-slug}/` in `agent-os/specs/`

### Step 7: Structure the Plan

Task 1 is always "Save spec documentation". Present structure for user confirmation.

Spec folder contains:
- `plan.md` — The full plan
- `shape.md` — Shaping decisions and context
- `standards.md` — Which standards apply
- `references.md` — Pointers to similar code
- `visuals/` — Mockups/screenshots if any

### Step 8: Complete the Plan

Build out implementation tasks based on feature scope, references, and standards.

### Step 9: Ready for Execution

Confirm plan is ready. Task 1 saves spec docs, then implementation tasks proceed.

## Output

Spec folder at `agent-os/specs/{YYYY-MM-DD-HHMM-feature-slug}/`
