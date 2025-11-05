# Automated Version & Publish Workflow Guide

This document explains how the automated version bumping and publishing workflow works.

## Overview

Every time you push to or merge a PR into the `main` branch, the workflow:

1. **Analyzes your commit messages** (Conventional Commits format)
2. **Determines version bump type** (major, minor, or patch)
3. **Runs tests** to ensure quality
4. **Builds the package**
5. **Automatically bumps the version**
6. **Publishes to npm**
7. **Creates a GitHub Release** with changelog
8. **Commits version bump** back to main

## Workflow Trigger

The workflow runs on push to main when these files change:
- `src/**` - Source code changes
- `tests/**` - Test changes
- `package.json` - Dependencies or config
- `package-lock.json` - Lockfile changes
- `.github/workflows/publish.yml` - Workflow itself

## Version Bump Logic

The workflow analyzes all commits since the last git tag:

### Major Version (1.0.0 → 2.0.0)

**Breaking changes** that are not backward compatible:

```bash
feat!: redesign scale function API
fix!: remove deprecated exports
refactor!: change function signatures

# Or with body
feat: redesign scaling API

BREAKING CHANGE: scale() now requires options object as second parameter
```

**Triggers:** Commit messages with `!` after type or `BREAKING CHANGE:` in body

### Minor Version (1.0.0 → 1.1.0)

**New features** that are backward compatible:

```bash
feat: add getScales() function
feat(api): export new deviceInfo object
feat: add support for adaptive spacing
```

**Triggers:** Commit messages starting with `feat:` or `feat(`

### Patch Version (1.0.0 → 1.0.1)

**Bug fixes and improvements** that don't add features:

```bash
fix: correct scaling calculation for tablets
fix(fonts): respect accessibility settings
docs: improve API documentation
chore: update dependencies
refactor: simplify calculation logic
perf: optimize performance
test: add missing test cases
style: format code
```

**Triggers:** Commit messages starting with `fix:`, `docs:`, `chore:`, `refactor:`, `perf:`, `test:`, `style:`

## Workflow Steps

### Step 1: Checkout & Setup
- Checks out code with full git history
- Sets up Node.js 20
- Configures git for commits

### Step 2: Analyze Commits
```bash
# Gets all commits since last tag
git describe --tags --abbrev=0  # Find last tag
git log v1.0.0..HEAD            # Get commits since tag

# Analyzes commit messages with regex
- Checks for BREAKING CHANGE → major
- Checks for feat: → minor
- Checks for fix:/docs:/chore: → patch
- Default: patch
```

### Step 3: Install & Test
```bash
npm ci           # Clean install dependencies
npm test         # Run all 63 tests
npm run build    # Build package
```

If tests fail, workflow stops here ❌

### Step 4: Bump Version
```bash
npm version major|minor|patch -m "chore: bump version to %s [skip ci]"
```

This:
- Updates `package.json` version
- Creates a git commit with `[skip ci]` to prevent infinite loop
- Creates a git tag (e.g., `v1.2.0`)

### Step 5: Push Changes
```bash
git push origin main --follow-tags
```

Pushes:
- Version bump commit
- New version tag

### Step 6: Publish to npm
```bash
npm publish --access public
```

Publishes package to npm registry using `NPM_TOKEN` secret.

### Step 7: Create GitHub Release
- Creates a release on GitHub
- Uses tag name (e.g., `v1.2.0`)
- Includes changelog from commits
- Links to npm package

## Skipping CI

To skip the workflow (e.g., for docs-only changes):

```bash
git commit -m "docs: update readme [skip ci]"
```

The `[skip ci]` tag prevents workflow from running.

**Note:** The workflow automatically adds `[skip ci]` to version bump commits to prevent infinite loops.

## Examples

### Example 1: Bug Fix

**Commits:**
```bash
fix: correct scaling on small devices
test: add test for small device scaling
```

**Result:**
- Version: 1.0.0 → **1.0.1** (patch bump)
- Published to npm as `1.0.1`
- GitHub release created: `v1.0.1`

### Example 2: New Feature

**Commits:**
```bash
feat: add getScales() function for dynamic access
docs: document getScales() in README
test: add tests for getScales()
```

**Result:**
- Version: 1.0.1 → **1.1.0** (minor bump)
- Published to npm as `1.1.0`
- GitHub release created: `v1.1.0`

### Example 3: Breaking Change

**Commits:**
```bash
feat!: redesign configuration API
refactor: simplify internal structure

BREAKING CHANGE: configureScaler now requires an options object
```

**Result:**
- Version: 1.1.0 → **2.0.0** (major bump)
- Published to npm as `2.0.0`
- GitHub release created: `v2.0.0`

### Example 4: Multiple Changes

**Commits:**
```bash
feat: add new scaleMargin function
fix: correct orientation change handling
docs: improve examples
chore: update dependencies
```

**Analysis:**
- Has `feat:` → Would be minor
- Also has `fix:`, `docs:`, `chore:` → Would be patch
- **Winner: Minor** (feat takes precedence)

**Result:**
- Version: 1.0.0 → **1.1.0** (minor bump)

## Troubleshooting

### Workflow Skipped

**Problem:** Workflow runs but skips all steps

**Causes:**
1. No changes in monitored paths
2. Commit has `[skip ci]` tag
3. Only changed non-code files

**Solution:** Make changes to `src/` or `tests/` directory

### Tests Failed

**Problem:** Workflow fails at test step

**Solution:**
1. Run tests locally: `npm test`
2. Fix failing tests
3. Commit with fix: `fix: resolve test failures`
4. Push again

### Build Failed

**Problem:** Workflow fails at build step

**Solution:**
1. Run build locally: `npm run build`
2. Check for TypeScript errors: `npx tsc --noEmit`
3. Fix errors
4. Commit and push

### Publish Failed

**Problem:** npm publish step fails

**Causes:**
1. NPM_TOKEN not set or invalid
2. Version already exists on npm
3. No publish permissions

**Solution:**
1. Verify NPM_TOKEN in GitHub secrets
2. Check https://www.npmjs.com/package/@shayrn/react-native-scaler for existing versions
3. Verify you have maintainer access

### Version Not Bumped Correctly

**Problem:** Expected minor but got patch

**Cause:** Commit message doesn't follow convention

**Solution:** Use correct prefix:
- `feat:` for features (not `feature:` or `add:`)
- `fix:` for fixes (not `bug:` or `fixed:`)
- Case-sensitive: use lowercase

### Infinite Loop

**Problem:** Workflow keeps triggering itself

**Cause:** Version bump commit doesn't have `[skip ci]`

**Solution:** The workflow automatically adds `[skip ci]`. If issue persists:
1. Check workflow logs
2. Verify `[skip ci]` in commit message
3. Check path filters

## Monitoring

### Watch Workflow

View workflow runs:
```
https://github.com/maheshmuttintidev/react-native-scaler/actions
```

### Check Published Version

npm:
```
https://www.npmjs.com/package/@shayrn/react-native-scaler
```

GitHub Releases:
```
https://github.com/maheshmuttintidev/react-native-scaler/releases
```

### Debug Logs

Workflow logs show:
- All commits analyzed
- Version bump decision
- Test results
- Build output
- Publish status

## Best Practices

1. **Use Conventional Commits** - Follow the format strictly
2. **Write Tests** - All tests must pass before publish
3. **Review Changes** - Use PRs for code review
4. **Meaningful Messages** - Describe what changed and why
5. **Small Commits** - Keep commits focused
6. **Test Locally** - Run tests before pushing
7. **Check Workflow** - Monitor Actions tab after merge

## Security

### Secrets Required

- `NPM_TOKEN` - For publishing to npm (required)
- `GITHUB_TOKEN` - Provided automatically by GitHub

### Permissions

Workflow needs:
- `contents: write` - To push version commits and tags
- `packages: write` - To create releases

## Manual Override

If you need to manually control version:

```bash
# Bump version locally
npm version patch  # or minor, major

# Push with tags
git push origin main --follow-tags

# Workflow will detect version change and publish
```

## Support

- **Issues:** https://github.com/maheshmuttintidev/react-native-scaler/issues
- **Discussions:** For questions about the workflow
- **Maintainer:** maheshmuttintidev@gmail.com
