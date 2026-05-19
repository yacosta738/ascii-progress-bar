# Proposal: Update Dependencies

## Intent

Update outdated dependencies across the ascii-progress-bar monorepo to incorporate bug fixes, security patches, and new features. The update includes 16 outdated packages, with three major version bumps (Astro 5→6, TypeScript 5→6, jsdom 28→29) that require careful migration to avoid breaking the documentation site, core library, and test suite.

## Scope

### In Scope
- Update Biome from 2.3.14 to 2.4.15 (minor)
- Update Vitest from 4.0.18 to 4.1.6 (minor)
- Update @astrojs/check from 0.9.6 to 0.9.9 (patch)
- Update @astrojs/starlight from 0.37.6 to 0.39.2 (minor)
- Update semantic-release plugins (@semantic-release/github, @semantic-release/npm, @semantic-release/release-notes-generator) to latest minor versions
- Update jsdom from 28.0.0 to 29.1.1 (major) with test validation
- Update Astro from 5.17.1 to 6.3.5 (major) with migration guide review
- Update TypeScript from 5.9.3 to 6.0.3 (major) with type error fixes
- Regenerate pnpm-lock.yaml with updated dependency tree
- Validate all changes through CI/CD pipeline (build, test, lint)

### Out of Scope
- Updating pnpm package manager version (currently pinned to 10.0.0)
- Updating sharp (already at latest 0.34.5)
- Updating tsup (already at latest 8.5.1)
- Updating semantic-release core and other plugins already at latest
- Refactoring code to leverage new features from updated dependencies
- Updating GitHub Actions workflow dependencies (handled by separate Dependabot config)

## Approach

Use an **incremental three-phase update strategy** to isolate breaking changes and validate at each step:

### Phase 1: Minor and Patch Updates (Low Risk)
Update dependencies with backward-compatible changes:
- Biome: 2.3.14 → 2.4.15
- Vitest: 4.0.18 → 4.1.6
- @astrojs/check: 0.9.6 → 0.9.9
- @astrojs/starlight: 0.37.6 → 0.39.2
- @semantic-release/github: 12.0.5 → 12.0.8
- @semantic-release/npm: 13.1.4 → 13.1.5
- @semantic-release/release-notes-generator: 14.1.0 → 14.1.1

**Validation**: Run `pnpm install`, `pnpm build`, `pnpm test`, `pnpm lint` to ensure no regressions.

### Phase 2: jsdom Major Update (Medium Risk)
Update jsdom from 28.0.0 to 29.1.1:
- Review jsdom 29.x changelog for breaking changes
- Update vitest.config.ts if environment configuration changed
- Run test suite with focus on DOM-dependent tests
- Validate browser environment simulation still works correctly

**Validation**: Run `pnpm test` in packages/ascii-progress-bar with verbose output to catch any DOM API changes.

### Phase 3: Astro and TypeScript Major Updates (High Risk)
Update Astro and TypeScript together (they often have interdependencies):
- Review Astro 5→6 migration guide for breaking changes
- Review TypeScript 5→6 migration guide for breaking changes
- Update astro.config.mjs if API changes are required
- Update tsconfig.json files if compiler options changed
- Fix any new TypeScript errors introduced by stricter checks
- Validate documentation site builds and renders correctly

**Validation**: 
- Run `pnpm build` at root to build documentation site
- Run `pnpm dev` and manually verify documentation site loads
- Run `pnpm build` in packages/ascii-progress-bar to validate library build
- Run full CI/CD pipeline to catch any environment-specific issues

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | Modified | Root documentation site dependencies updated |
| `packages/ascii-progress-bar/package.json` | Modified | Core library devDependencies updated |
| `pnpm-lock.yaml` | Modified | Regenerated with new dependency tree |
| `astro.config.mjs` | Potentially Modified | May need updates for Astro 6.x API changes (image service, config schema) |
| `tsconfig.json` | Potentially Modified | May need updates for TypeScript 6.x compiler options |
| `packages/ascii-progress-bar/tsconfig.json` | Potentially Modified | TypeScript configuration for library |
| `packages/ascii-progress-bar/vitest.config.ts` | Potentially Modified | May need updates for jsdom 29.x environment changes |
| `.github/workflows/*.yml` | No Change | CI/CD workflows should continue working (Node.js version unchanged) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Astro 6.x introduces breaking changes in image service API or Starlight integration | High | Review migration guide before updating; test documentation site build locally; rollback to Phase 2 if critical issues found |
| TypeScript 6.x introduces new type errors or stricter checks | High | Review migration guide; fix type errors incrementally; use `@ts-expect-error` with TODO comments for complex issues requiring deeper refactoring |
| jsdom 29.x changes DOM API behavior breaking existing tests | Medium | Review changelog; run tests with verbose output; update test assertions if DOM behavior changed legitimately |
| Biome 2.4.x introduces new linting rules that fail CI | Medium | Review new rules; fix violations or disable rules in biome.json if too strict; ensure `pnpm lint` passes before committing |
| Vitest 4.1.x has subtle test runner behavior changes | Low | Run full test suite; check for flaky tests; review Vitest changelog if unexpected failures occur |
| Starlight 0.39.x breaks sidebar or navigation configuration | Low | Test documentation site navigation; review Starlight changelog; adjust astro.config.mjs if needed |

## Rollback Plan

Each phase is isolated with atomic commits, allowing granular rollback:

1. **Phase 1 rollback**: Revert the Phase 1 commit, run `pnpm install` to restore lock file
2. **Phase 2 rollback**: Revert the Phase 2 commit, run `pnpm install` to restore lock file
3. **Phase 3 rollback**: Revert the Phase 3 commit, run `pnpm install` to restore lock file
4. **Complete rollback**: `git reset --hard HEAD~3` (if all three phases committed) or `git revert <commit-range>`

**Emergency rollback during CI/CD failure**:
- If CI fails after merge, immediately revert the merge commit
- Run `pnpm install` to restore previous lock file
- Investigate failures locally before re-attempting

**Lock file safety**:
- Keep pnpm-lock.yaml committed at each phase
- Never force-push over lock file changes
- If lock file conflicts occur, regenerate with `pnpm install --no-frozen-lockfile`

## Dependencies

- **pnpm 10.0.0**: Required for workspace protocol and lock file format
- **Node.js**: Current CI/CD Node.js version must support all updated dependencies
- **Migration guides**: Astro 6.x, TypeScript 6.x, and jsdom 29.x documentation must be available

## Success Criteria

- [ ] All dependencies updated to target versions in package.json files
- [ ] pnpm-lock.yaml regenerated successfully with no conflicts
- [ ] `pnpm build` passes at root (documentation site builds)
- [ ] `pnpm build` passes in packages/ascii-progress-bar (library builds)
- [ ] `pnpm test` passes in packages/ascii-progress-bar (all tests pass)
- [ ] `pnpm lint` passes at root (no linting errors)
- [ ] Documentation site renders correctly in local dev server (`pnpm dev`)
- [ ] CI/CD pipeline passes (GitHub Actions workflows complete successfully)
- [ ] No new TypeScript errors introduced (or all errors documented and addressed)
- [ ] No regression in library functionality (existing tests continue to pass)
