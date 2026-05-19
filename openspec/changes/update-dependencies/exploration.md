# Exploration: Update Dependencies

## Current State

The ascii-progress-bar monorepo uses pnpm workspaces with three main areas:

1. **Root package** (documentation site): Astro-based documentation with Starlight
2. **Main package** (`packages/ascii-progress-bar`): The core library with dual exports (Node.js + browser)
3. **Examples** (3 packages): Demo applications using workspace protocol

### Current Dependency Versions

**Root package dependencies:**
- `@astrojs/check`: ^0.9.6 (latest: 0.9.9)
- `@astrojs/starlight`: ^0.37.6 (latest: 0.39.2)
- `astro`: ^5.17.1 (latest: 6.3.5) ⚠️ **MAJOR UPDATE**
- `sharp`: ^0.34.5 (up to date)
- `@biomejs/biome`: 2.3.14 (latest: 2.4.15)
- `typescript`: ^5.9.3 (latest: 6.0.3) ⚠️ **MAJOR UPDATE**

**Main package devDependencies:**
- `tsup`: ^8.5.1 (up to date)
- `jsdom`: ^28.0.0 (latest: 29.1.1) ⚠️ **MAJOR UPDATE**
- `vitest`: ^4.0.18 (latest: 4.1.6)
- `semantic-release`: ^25.0.3 (up to date)
- `@semantic-release/changelog`: ^6.0.3 (up to date)
- `@semantic-release/git`: ^10.0.1 (up to date)
- `@semantic-release/github`: ^12.0.5 (latest: 12.0.8)
- `@semantic-release/npm`: ^13.1.4 (latest: 13.1.5)
- `@semantic-release/release-notes-generator`: ^14.1.0 (latest: 14.1.1)
- `@semantic-release/exec`: ^7.1.0 (up to date)

### Dependency Management Setup

- **Package manager**: pnpm@10.0.0 (pinned via packageManager field)
- **Automation**: Dependabot (weekly for npm, monthly for GitHub Actions) + Renovate (config:recommended)
- **Update script**: `pnpm update -i -r --latest` available in root package.json

## Affected Areas

- `package.json` — Root documentation site dependencies
- `packages/ascii-progress-bar/package.json` — Core library devDependencies
- `astro.config.mjs` — May need updates for Astro 6.x API changes
- `tsconfig.json` — May need updates for TypeScript 6.x
- `packages/ascii-progress-bar/tsconfig.json` — TypeScript configuration for library
- `packages/ascii-progress-bar/vitest.config.ts` — Vitest configuration with jsdom
- `.github/workflows/*.yml` — CI/CD workflows may need Node.js version updates
- `pnpm-lock.yaml` — Will be regenerated with new versions

## Approaches

### 1. **Incremental Update (Recommended)**
Update dependencies in phases, testing after each major version bump.

**Phase 1: Minor/Patch Updates (Low Risk)**
- Biome: 2.3.14 → 2.4.15
- Astro ecosystem patches: @astrojs/check, @astrojs/starlight
- Vitest: 4.0.18 → 4.1.6
- Semantic-release plugins: minor bumps

**Phase 2: Major Updates (Medium Risk)**
- jsdom: 28.0.0 → 29.1.1
- Investigate breaking changes, update tests if needed

**Phase 3: Breaking Updates (High Risk)**
- Astro: 5.17.1 → 6.3.5
- TypeScript: 5.9.3 → 6.0.3
- Review migration guides, update configs, fix type errors

- **Pros**: 
  - Safer, easier to isolate breaking changes
  - Can validate at each step
  - Easier to rollback if issues arise
  - Follows semantic versioning principles
- **Cons**: 
  - Takes longer (3 separate test cycles)
  - More commits/PRs if done separately
- **Effort**: Medium

### 2. **Bulk Update with Validation**
Update all dependencies at once, then fix breaking changes.

- **Pros**: 
  - Faster to execute
  - Single PR/commit
  - Matches the existing `update-deps` script behavior
- **Cons**: 
  - Higher risk of cascading failures
  - Harder to debug if multiple things break
  - May require significant rework for Astro 6 + TypeScript 6
- **Effort**: Medium-High (due to potential breaking changes)

### 3. **Selective Update (Conservative)**
Only update minor/patch versions, defer major updates.

- **Pros**: 
  - Minimal risk
  - Quick validation
  - No breaking changes expected
- **Cons**: 
  - Leaves major updates unaddressed
  - Technical debt accumulates
  - Misses new features and improvements
- **Effort**: Low

## Recommendation

**Approach 1: Incremental Update** is recommended because:

1. **Three major version bumps** (Astro 6, TypeScript 6, jsdom 29) require careful migration
2. **Astro 6.x** is a significant release that may have breaking changes in:
   - Image service API (currently using `passthroughImageService`)
   - Starlight integration compatibility
   - Build output structure
3. **TypeScript 6.x** may introduce:
   - New strict checks
   - Breaking changes in type inference
   - Module resolution changes
4. **jsdom 29.x** may affect:
   - Vitest browser environment simulation
   - Test assertions and DOM APIs

### Breaking Change Investigation Required

Before proceeding, we need to review:

1. **Astro 5 → 6 migration guide**: Check for breaking changes in:
   - Image service API
   - Starlight compatibility
   - Config schema changes
   - Build output changes

2. **TypeScript 5 → 6 migration guide**: Check for:
   - New compiler errors
   - Module resolution changes
   - Type inference changes
   - Breaking changes in lib definitions

3. **jsdom 28 → 29 changelog**: Check for:
   - DOM API changes
   - Breaking changes in test environment
   - Performance implications

## Risks

### High Risk
- **Astro 6.x breaking changes** may require significant config and code updates
- **TypeScript 6.x** may introduce new type errors across the codebase
- **jsdom 29.x** may break existing tests or change DOM behavior

### Medium Risk
- **Biome 2.4.x** may introduce new linting rules that fail CI
- **Vitest 4.1.x** may have subtle test runner behavior changes
- **Starlight 0.39.x** may have breaking changes in sidebar/navigation API

### Low Risk
- Semantic-release plugin updates (minor versions, well-tested)
- @astrojs/check patch update

### Mitigation Strategies

1. **Test after each phase**: Run full test suite + build after each update phase
2. **Check CI/CD**: Ensure GitHub Actions workflows still pass
3. **Validate documentation site**: Build and preview Astro site locally
4. **Review changelogs**: Read CHANGELOG/migration guides for each major update
5. **Rollback plan**: Keep git history clean with atomic commits per phase

## Ready for Proposal

**Yes** — The exploration is complete. The orchestrator should inform the user:

> I've analyzed the dependency landscape across the monorepo. There are **6 outdated dependencies** in the root package and **10 in the main package**, including **three major version updates** (Astro 5→6, TypeScript 5→6, jsdom 28→29) that require careful migration.
>
> I recommend an **incremental update approach** in three phases:
> 1. Safe minor/patch updates (Biome, Vitest, semantic-release plugins)
> 2. jsdom major update with test validation
> 3. Astro + TypeScript major updates with migration guide review
>
> This approach minimizes risk while ensuring we can isolate and fix any breaking changes systematically.
>
> **Next steps**: 
> - Review Astro 6, TypeScript 6, and jsdom 29 migration guides
> - Create a proposal with detailed update plan and rollback strategy
> - Proceed to spec and design phases

### Questions for User (Optional)

1. Do you want to update all dependencies, or defer the major version updates (Astro 6, TypeScript 6)?
2. Should we update pnpm itself (currently pinned to 10.0.0)?
3. Are there any specific features in the new versions you want to leverage?
