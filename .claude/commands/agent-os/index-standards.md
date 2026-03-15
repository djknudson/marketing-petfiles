# Index Standards

Rebuild and maintain the standards index file (`index.yml`).

## Purpose

The index enables `/inject-standards` to suggest relevant standards without reading all files. It maps each standard to a brief description for quick matching.

## Process

### Step 1: Scan for Standards Files

1. List all `.md` files in `agent-os/standards/` and its subfolders
2. Build a list organized by folder (`root` for files directly in `agent-os/standards/`)

### Step 2: Load Existing Index

Read `agent-os/standards/index.yml` if it exists. Note which entries already have descriptions.

### Step 3: Identify Changes

Compare the file scan with the existing index:

- **New files** — Standards files without index entries
- **Deleted files** — Index entries for files that no longer exist
- **Existing files** — Already indexed, keep as-is

### Step 4: Handle New Files

For each new standard file:

1. Read the file to understand its content
2. Use AskUserQuestion to propose a one-sentence description
3. Keep descriptions brief — they're for matching, not documentation

### Step 5: Handle Deleted Files

Remove stale index entries automatically. Report what was removed.

### Step 6: Write Updated Index

Generate `agent-os/standards/index.yml`:

```yaml
folder-name:
  file-name:
    description: Brief description here
```

Rules: Alphabetize folders, then files. No `.md` extension. One-line descriptions.

### Step 7: Report Results

Summarize entries added, removed, and unchanged.

## Output

Updates `agent-os/standards/index.yml`
