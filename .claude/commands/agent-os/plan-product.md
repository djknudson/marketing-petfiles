# Plan Product

Establish foundational product documentation through an interactive conversation. Creates mission, roadmap, and tech stack files in `agent-os/product/`.

## Important Guidelines

- **Always use AskUserQuestion tool** when asking the user anything
- **Keep it lightweight** — gather enough to create useful docs without over-documenting
- **One question at a time** — don't overwhelm with multiple questions

## Process

### Step 1: Check for Existing Product Docs

Check if `agent-os/product/` exists and contains `mission.md`, `roadmap.md`, `tech-stack.md`.

If files exist, ask: Start fresh, update specific files, or cancel.

### Step 2: Gather Product Vision (for mission.md)

Ask sequentially:
1. What problem does this product solve?
2. Who is this product for?
3. What makes your solution unique?

### Step 3: Gather Roadmap (for roadmap.md)

Ask sequentially:
1. What are the must-have features for launch (MVP)?
2. What features are planned for after launch?

### Step 4: Establish Tech Stack (for tech-stack.md)

Check if `agent-os/standards/global/tech-stack.md` exists first. If so, ask if this project uses the same stack. Otherwise ask about frontend, backend, database, and other tools.

### Step 5: Generate Files

Create `agent-os/product/` with `mission.md`, `roadmap.md`, `tech-stack.md`.

### Step 6: Confirm Completion

Report created files and suggest review.

## Output Location

`agent-os/product/mission.md`, `agent-os/product/roadmap.md`, `agent-os/product/tech-stack.md`
