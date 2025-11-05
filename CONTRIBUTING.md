# Contributing to react-native-scaler

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Automated Release Process

This project uses an **automated version bumping and publishing workflow**. When you merge changes to the `main` branch, the version is automatically bumped and published to npm based on your commit messages.

### How It Works

1. **You merge a PR to main** (or push directly to main)
2. **Workflow analyzes commit messages** to determine version bump type
3. **Automatically bumps version** in package.json
4. **Runs tests** to ensure everything works
5. **Builds the package**
6. **Publishes to npm**
7. **Creates a GitHub release** with changelog
8. **Commits version bump back** to main with `[skip ci]`

### Commit Message Format (Conventional Commits)

We use **Conventional Commits** to automatically determine version bumps:

#### Patch Release (1.0.0 → 1.0.1) - Bug fixes
```bash
fix: correct scaling calculation for edge cases
fix(fonts): respect accessibility settings properly
```

#### Minor Release (1.0.0 → 1.1.0) - New features (backward compatible)
```bash
feat: add new scaleMargin function
feat(api): export deviceInfo object for device detection
```

#### Major Release (1.0.0 → 2.0.0) - Breaking changes
```bash
feat!: change scale function signature
fix!: remove deprecated scales export

# Or with body
feat: redesign API
BREAKING CHANGE: scale() now requires options object
```

#### Other Types (Patch release)
```bash
docs: update README with new examples
style: format code with prettier
refactor: simplify scaling algorithm
perf: optimize calculation performance
test: add tests for orientation changes
chore: update dependencies
```

### Commit Message Examples

**Good Examples:**
```bash
✅ feat: add getScales() function for dynamic scale access
✅ fix: correct return type of onOrientationChange
✅ docs: improve API documentation with examples
✅ test: add 63 comprehensive test cases
✅ chore: bump version to 1.2.0 [skip ci]
```

**Bad Examples (avoid these):**
```bash
❌ updated stuff
❌ fixed bug
❌ WIP
❌ changes
❌ commit
```

## Development Workflow

### Setup

```bash
# Clone the repository
git clone https://github.com/maheshmuttintidev/react-native-scaler.git
cd react-native-scaler

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the package
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write code
   - Add tests
   - Update documentation

3. **Test your changes:**
   ```bash
   npm test
   npm run build
   ```

4. **Commit with conventional format:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

6. **Once merged to main:**
   - Workflow automatically bumps version based on your commit messages
   - Publishes to npm
   - Creates GitHub release

### Pull Request Guidelines

- **Title:** Use conventional commit format
  - `feat: add new feature`
  - `fix: resolve bug in X`
  - `docs: improve Y documentation`

- **Description:** Include:
  - What changes were made
  - Why the changes were needed
  - Any breaking changes
  - Testing performed

- **Tests:** Include tests for new features or bug fixes

- **Documentation:** Update README.md if adding new features

### Testing

All pull requests must pass tests:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

**Test Coverage Requirements:**
- New features must have tests
- Bug fixes should include regression tests
- Aim for high coverage (currently 63 tests covering all functions)

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check for linting issues
npm run lint

# Auto-format code
npm run format
```

**Style Guidelines:**
- Use TypeScript types for all functions
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Keep functions focused and testable

## Version Bumping Cheat Sheet

| Commit Prefix | Example | Version Bump |
|---------------|---------|--------------|
| `feat:` | `feat: add new function` | Minor (1.0.0 → 1.1.0) |
| `fix:` | `fix: correct bug` | Patch (1.0.0 → 1.0.1) |
| `feat!:` or `BREAKING CHANGE:` | `feat!: redesign API` | Major (1.0.0 → 2.0.0) |
| `docs:`, `chore:`, `style:`, `refactor:`, `test:` | `docs: update README` | Patch (1.0.0 → 1.0.1) |

## Skipping CI

If you need to skip the CI workflow (e.g., for documentation-only changes):

```bash
git commit -m "docs: update contributing guide [skip ci]"
```

The `[skip ci]` tag prevents the workflow from running.

## Project Structure

```
react-native-scaler/
├── src/
│   ├── index.ts          # Main exports
│   └── responsive.ts     # Core implementation
├── tests/
│   └── responsive.test.ts # Test suite (63 tests)
├── dist/                  # Build output (generated)
├── .github/
│   └── workflows/
│       └── publish.yml    # Auto version & publish workflow
├── package.json
├── tsconfig.json
├── rollup.config.js
├── jest.config.cjs
└── README.md
```

## Release Process (Automated)

You don't need to manually release! The workflow handles everything:

1. **Developer:** Merge PR to main with conventional commit
2. **Workflow:** Analyzes commits since last tag
3. **Workflow:** Determines version bump (major/minor/patch)
4. **Workflow:** Runs tests
5. **Workflow:** Builds package
6. **Workflow:** Bumps version in package.json
7. **Workflow:** Commits version bump with `[skip ci]`
8. **Workflow:** Pushes to main and creates tag
9. **Workflow:** Publishes to npm
10. **Workflow:** Creates GitHub release with changelog

### Manual Release (if needed)

If you need to manually trigger a release:

```bash
# Bump version locally
npm version patch  # or minor, or major

# Push with tags
git push origin main --follow-tags
```

The workflow will detect the version change and publish.

## Troubleshooting

### Tests Failing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run tests with verbose output
npm test -- --verbose
```

### Build Failing

```bash
# Clean and rebuild
rm -rf dist
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Workflow Not Running

- Check if commit message has `[skip ci]`
- Verify changes are in monitored paths (src/, tests/, package.json)
- Check GitHub Actions tab for error logs

### NPM Publish Failing

- Verify NPM_TOKEN is set in GitHub secrets
- Check if version already exists on npm
- Ensure you have publish permissions

## Getting Help

- **Issues:** https://github.com/maheshmuttintidev/react-native-scaler/issues
- **Discussions:** Use GitHub Discussions for questions
- **Email:** maheshmuttintidev@gmail.com

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
