---
description: Start a new session with context from previous work
---

Begin each session by getting oriented:

1. **Read SESSION_STATE.md** for current project state

2. **Detect stale state**:
   - Note the **Date** field in SESSION_STATE.md
   - Run `git log --oneline --after="<date from SESSION_STATE>" -- ':!*.md' ':!docs/'` to find commits of real work (non-doc files) after that date
   - If commits exist that aren't described in "Last Session", the state is **stale**
   - When stale:
     1. Warn: "SESSION_STATE.md appears stale — last updated [date] but [N] commits have landed since then."
     2. Show the unreflected commits from `git log --oneline`
     3. **Do NOT trust the "Next" field** — it describes work that may already be done
     4. Use git history to reconstruct what actually happened and suggest next work from there
     5. Offer: "Want me to update SESSION_STATE.md before we proceed?"

3. **Check git status**:
   - If uncommitted changes exist, ask user: "Found uncommitted changes. Should I commit them before we start?"
   - If clean, continue

4. **Parse and summarize**:
   - Current phase and status
   - What "Next" says to work on (skip if stale — use git history instead)
   - Any blockers noted
   - What "Last Session" accomplished (if present)

5. **Suggest work**:
   - If state is fresh and SESSION_STATE.md has clear "Next" task, suggest that
   - If state is stale, derive suggestions from recent git history
   - If "Next" is vague or empty, read README.md or project docs for direction
   - Present 1-3 options if multiple tasks are available

6. **Ask user**: "What would you like to work on?"

**Output format:**

> **Session Start**
> - Phase: [current phase]
> - Last completed: [brief summary from Last Session field or recent git]
> - Suggested next: [task from Next field or docs]
>
> Ready to continue, or would you like to work on something else?

---

**Note:** Always run `/end-session` before ending a conversation. Skipping it leaves SESSION_STATE.md stale, causing the next session to suggest already-completed work. The staleness check above will catch this, but it's better to keep state current.
