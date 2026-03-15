# marketing-petfiles

Website for the PetFiles mobile app — marketing, promotion, privacy policy, tech support contact, plus agentic research on marketing/SEO/ASO. Connects to App Store Connect.

---

## Find Information

| What | Where |
|------|-------|
| Current state | `SESSION_STATE.md` |
| Session logs | `.claude/sessions/` |
| Guardrails | `.claude/rules/` |
| Agent OS standards | `agent-os/standards/` (run `/agent-os:discover-standards`) |
| Memory tools | Memory MCP (`mcp__memory__*`) — see Memory section |

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/start-session` | Orient and suggest next work |
| `/end-session` | Commit, update state, handoff |
| `/review` | Review staged changes |
| `/agent-os:discover-standards` | Extract patterns into standards |
| `/agent-os:index-standards` | Rebuild standards index |
| `/agent-os:inject-standards` | Inject relevant standards |
| `/agent-os:plan-product` | Create product documentation |
| `/agent-os:shape-spec` | Shape specs in plan mode |

## Workflow

1. **Plan first** — Use plan mode for complex changes
2. **Test before commit** — Verify changes work before committing
3. **Commit atomically** — One logical change per commit, conventional commit messages
4. **Update state** — Keep `SESSION_STATE.md` current at session end

## Quick Commands

```bash
# Add project-specific commands here
```

## Project

- **Name**: marketing-petfiles
- **Stack**: Vanilla HTML/CSS/JS
- **Status**: Planning

## Session Protocol

### Session Start

1. Read CLAUDE.md
2. Read most recent session log in `.claude/sessions/`
3. Summarize: "Last session accomplished X. Ready to continue with Y?"
4. Wait for user confirmation before working

### Session End

Create session log at `.claude/sessions/YYYY-MM-DD-HH-MM-session.md`:

```
# Session Log: [Date]

## Summary
[2-3 sentences]

## Completed
- [x] Task 1
- [x] Task 2

## Remaining
- [ ] Task 3

## Blockers
- [Any unresolved issues]

## Next Priorities
1. [Most important next task]
2. [Second priority]
```

Then: `git add -A && git commit -m "Session [date]: [summary]"`

## Memory

This project has access to the Tsvetok ecosystem memory via MCP tools (`mcp__memory__*`).

| Tool | Purpose |
|------|---------|
| `mcp__memory__remember` | Store a fact, decision, or observation |
| `mcp__memory__recall` | Semantic search across memories |
| `mcp__memory__list_recent` | Browse recent memories |
| `mcp__memory__memory_stats` | Health metrics |

**Rules:**
- Always set `project="marketing-petfiles"` when calling `remember`
- Store non-obvious decisions as `memory_type="fact"`
- Store project state changes as `memory_type="context"`
- Recall before guessing — search memory when unsure about past decisions

---

## Standards (enforced)

No standards discovered yet. Run `/agent-os:discover-standards` to extract patterns from your codebase.

Full details: `agent-os/standards/` | Index: `agent-os/standards/index.yml`

---

## Principles

- **Confirm before acting** — Show exactly what you'll do, wait for approval
- **Conventional commits** — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:` prefixes
