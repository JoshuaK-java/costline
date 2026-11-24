# Contributing

## The convention

## Day-to-day workflow

```bash
git checkout main
git pull
git checkout -b feature/CL-123-short-name
# ...work...
git add .
git commit -m "CL-123 Describe the change"
git push -u origin feature/CL-123-short-name
# Open a PR on GitHub, wait for checks, squash-merge, and delete the branch
```

### Branches

Use the following branch naming format:

```text
<type>/CL-<id>-<short-name>
```

- `feature/CL-176-quick-add`: new functionality
- `fix/CL-189-filter-reset`: bug fix
- `chore/CL-36-dependabot`: tooling, configuration, or dependencies
- `docs/CL-78-readme`: documentation only

### Commits

Start commit messages with the card ID, then use the imperative present tense.

- `CL-176 Add camera step to quick add`
- `CL-189 Fix filters not resetting after search`
- For several cards: `CL-38 CL-39 Scaffold app and add lint`

### Pull requests

Use the same format as the main commit for the PR title. For example:

- `CL-176 Quick add on phone`

In the PR description, link the card with a closing reference:

```text
Closes https://costline.youtrack.cloud/issue/CL-176
```