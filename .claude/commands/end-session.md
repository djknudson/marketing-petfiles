---
description: End session with proper handoff
---

Before ending a work session:

1. **Check for uncommitted changes**:
   ```bash
   git status
   ```

2. **If changes exist, commit them**:
   - Stage relevant files (not `git add -A` blindly)
   - Use **conventional commit** prefixes: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`
   - Optional scope: `feat(scope): Add feature description`
   - `feat:` and `fix:` trigger version bumps; `docs:`, `chore:`, `refactor:`, `test:` do not

3. **Overwrite SESSION_STATE.md** with current state:
   - Do NOT append to existing content
   - Update: Date, Phase, Next, Blockers, Last Session

4. **Summarize for user**:
   - What was accomplished this session
   - What's queued for next session
   - Any decisions pending

**Do not leave uncommitted work** — the next agent should pick up cleanly.
