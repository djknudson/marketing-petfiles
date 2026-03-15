# Inject Standards

Inject relevant standards into the current context, formatted appropriately for the situation.

## Usage Modes

### Auto-Suggest Mode (no arguments)
```
/inject-standards
```
Analyzes context and suggests relevant standards.

### Explicit Mode (with arguments)
```
/inject-standards api                           # All standards in api/
/inject-standards api/response-format           # Single file
/inject-standards api/response-format api/auth  # Multiple files
```
Directly injects specified standards without suggestions.

## Process

### Step 1: Detect Context Scenario

Three scenarios:

1. **Conversation** — Regular chat, implementing code
2. **Creating a Skill** — Building a `.claude/skills/` file
3. **Shaping/Planning** — In plan mode, building a spec

If unclear, use AskUserQuestion to confirm.

### Step 2: Read the Index (Auto-Suggest Mode)

Read `agent-os/standards/index.yml` for available standards.

### Step 3: Analyze Work Context

Understand what the user is working on from conversation context.

### Step 4: Match and Suggest

Match index descriptions against context. Present 2-5 relevant suggestions via AskUserQuestion.

### Step 5: Inject Based on Scenario

- **Conversation** — Read and display full standard content
- **Skill** — Output `@` file references or full content (ask which)
- **Plan** — Output `@` file references or full content (ask which)

## Explicit Mode

When arguments are provided, skip suggestions. Still detect scenario for formatting.

Validate that specified files/folders exist. Suggest alternatives if not found.

## Output

Standards content or references injected into current context.
