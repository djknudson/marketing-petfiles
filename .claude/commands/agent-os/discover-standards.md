# Discover Standards

Extract tribal knowledge from your codebase into concise, documented standards.

## Important Guidelines

- **Always use AskUserQuestion tool** when asking the user anything
- **Write concise standards** — Use minimal words. Standards must be scannable by AI agents without bloating context windows.
- **Offer suggestions** — Present options the user can confirm, choose between, or correct. Don't make them think harder than necessary.

## Process

### Step 1: Determine Focus Area

Check if the user specified an area when running this command. If they did, skip to Step 2.

If no area was specified:

1. Analyze the codebase structure (folders, file types, patterns)
2. Identify 3-5 major areas. Examples:
   - **Frontend areas:** UI components, styling/CSS, state management, forms, routing
   - **Backend areas:** API routes, database/models, authentication, background jobs
   - **Cross-cutting:** Error handling, validation, testing, naming conventions, file structure
3. Use AskUserQuestion to present the areas and ask which to focus on

Wait for user response before proceeding.

### Step 2: Analyze & Present Findings

Once an area is determined:

1. Read key files in that area (5-10 representative files)
2. Look for patterns that are:
   - **Unusual or unconventional** — Not standard framework/library patterns
   - **Opinionated** — Specific choices that could have gone differently
   - **Tribal** — Things a new developer wouldn't know without being told
   - **Consistent** — Patterns repeated across multiple files

3. Use AskUserQuestion to present findings and let user select which to document

### Step 3: Ask Why, Then Draft Each Standard

**IMPORTANT:** For each selected standard, complete this full loop before moving to the next:

1. **Ask 1-2 clarifying questions** about the "why" behind the pattern
2. **Wait for user response**
3. **Draft the standard** incorporating their answer
4. **Confirm with user** before creating the file
5. **Create the file** if approved

**Do NOT batch all questions upfront.** Process one standard at a time through the full loop.

### Step 4: Create the Standard File

For each standard (after completing Step 3's Q&A):

1. Determine the appropriate folder (create if needed):
   - `api/`, `database/`, `javascript/`, `css/`, `backend/`, `testing/`, `global/`
2. Check if a related standard file already exists — append to it if so
3. Draft the content and use AskUserQuestion to confirm
4. Create or update the file in `agent-os/standards/[folder]/`
5. **Then repeat Steps 3-4 for the next selected standard**

### Step 5: Update the Index

After all standards are created:

1. Scan `agent-os/standards/` for all `.md` files
2. For each new file without an index entry, propose a description via AskUserQuestion
3. Update `agent-os/standards/index.yml` — alphabetize by folder, then by filename

### Step 6: Offer to Continue

Ask if the user wants to discover standards in another area or finish.

## Output Location

All standards: `agent-os/standards/[folder]/[standard].md`
Index file: `agent-os/standards/index.yml`

## Writing Concise Standards

Standards will be injected into AI context windows. Every word costs tokens:

- **Lead with the rule** — State what to do first, explain why second
- **Use code examples** — Show, don't tell
- **Skip the obvious** — Don't document what the code already makes clear
- **One standard per concept** — Don't combine unrelated patterns
- **Bullet points over paragraphs** — Scannable beats readable
