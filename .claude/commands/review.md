---
description: Review staged changes and suggest a conventional commit message
---

Review the current changes for quality and suggest a commit message.

1. **Get the diff**:
   - If there are staged changes: `git diff --staged`
   - If nothing staged: `git diff`
   - If neither has changes: report "No changes to review" and stop

2. **Review the diff** for:
   - Bugs or logic errors
   - Security issues (hardcoded secrets, injection vectors)
   - Breaking changes that affect existing behavior
   - Missing error handling at system boundaries
   - Type safety issues

3. **Report findings**:
   - If issues found: list them with file:line references and severity (error/warning/info)
   - If clean: confirm "No issues found"

4. **Suggest a commit message** using conventional commit format:
   - Type: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`, `ci`, `build`, `revert`
   - Optional scope in parentheses
   - Description: imperative mood, under 100 chars total
   - Body: brief explanation if the change is non-trivial

5. **Verdict**: APPROVE (safe to commit) or NEEDS CHANGES (list what to fix first)
