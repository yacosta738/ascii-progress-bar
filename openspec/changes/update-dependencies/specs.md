# Dependency Management Specification

## Purpose

This specification defines the requirements and acceptance criteria for updating outdated dependencies in the ascii-progress-bar monorepo. The update includes 16 packages with three major version bumps (Astro 5→6, TypeScript 5→6, jsdom 28→29) that require phased migration to maintain monorepo stability, dual exports (Node.js + browser), and CI/CD pipeline integrity.

## Requirements

### Requirement: Phase 1 Minor and Patch Updates

The system MUST update all minor and patch version dependencies without introducing breaking changes or regressions.

**Dependencies in scope:**
- Biome: 2.3.14 → 2.4.15
- Vitest: 4.0.18 → 4.1.6
- @astrojs/check: 0.9.6 → 0.9.9
- @astrojs/starlight: 0.37.6 → 0.39.2
- @semantic-release/github: 12.0.5 → 12.0.8
- @semantic-release/npm: 13.1.4 → 13.1.5
- @semantic-release/release-notes-generator: 14.1.0 → 14.1.1

The system MUST regenerate pnpm-lock.yaml with the updated dependency tree while preserving workspace protocol references (`workspace:*`) for internal packages.

#### Scenario: Successful Phase 1 Update

- GIVEN the repository has outdated minor and patch dependencies
- WHEN Phase 1 updates are applied using `pnpm update -r <package>@<version>`
- THEN all target dependencies MUST be updated to specified versions in package.json files
- AND pnpm-lock.yaml MUST be regenerated successfully
- AND `pnpm install` MUST complete without errors
- AND workspace protocol dependencies MUST remain intact

#### Scenario: Phase 1 Validation Passes

- GIVEN Phase 1 dependencies have been updated
- WHEN validation commands are executed
- THEN `pnpm check` MUST pass (Biome linting + Astro type checking)
- AND `pnpm build` MUST pass (documentation site + library build)
- AND `pnpm test` MUST pass (all test suites in packages/ascii-progress-bar)
- AND no new linting errors MUST be introduced

#### Scenario: New Biome Rules Introduced

- GIVEN Biome 2.4.15 introduces new linting rules
- WHEN `pnpm check` is executed
- THEN any new linting violations MUST be fixed
- OR failing rules MUST be disabled in biome.json with justification
- AND the build MUST pass after rule adjustments

### Requirement: Phase 2 jsdom Major Update

The system MUST update jsdom from 28.0.0 to 29.1.1 while maintaining test suite compatibility and DOM environment simulation.

The system SHOULD review jsdom 29.x changelog for breaking changes before applying the update.

#### Scenario: Successful jsdom Update

- GIVEN Phase 1 updates are complete and validated
- WHEN jsdom is updated to 29.1.1 using `pnpm update -r jsdom@29.1.1`
- THEN jsdom version MUST be 29.1.1 in packages/ascii-progress-bar/package.json
- AND pnpm-lock.yaml MUST be regenerated
- AND vitest.config.ts environment configuration MUST remain valid

#### Scenario: jsdom Test Suite Validation

- GIVEN jsdom has been updated to 29.1.1
- WHEN `pnpm test --reporter=verbose` is executed in packages/ascii-progress-bar
- THEN all existing tests MUST pass
- AND DOM API behavior MUST remain consistent with test expectations
- AND browser environment simulation MUST work correctly
- AND no test timeouts or crashes MUST occur

#### Scenario: jsdom Breaking Change Detected

- GIVEN jsdom 29.x introduces a breaking change in DOM API
- WHEN tests fail due to changed DOM behavior
- THEN test assertions MUST be updated to match new legitimate behavior
- OR the breaking change MUST be documented as a blocker
- AND rollback to Phase 1 MUST be possible via git revert

### Requirement: Phase 3 Astro and TypeScript Major Updates

The system MUST update Astro from 5.17.1 to 6.3.5 and TypeScript from 5.9.3 to 6.0.3 while maintaining documentation site functionality, library type safety, and dual export compatibility.

The system MUST review Astro 6.x and TypeScript 6.x migration guides before applying updates.

#### Scenario: Successful Astro and TypeScript Update

- GIVEN Phase 2 updates are complete and validated
- WHEN Astro and TypeScript are updated using `pnpm update -r astro@6.3.5 typescript@6.0.3`
- THEN Astro version MUST be 6.3.5 in package.json
- AND TypeScript version MUST be 6.0.3 in package.json and packages/ascii-progress-bar/package.json
- AND pnpm-lock.yaml MUST be regenerated
- AND @astrojs/check and @astrojs/starlight MUST be compatible with Astro 6.x

#### Scenario: Astro Configuration Migration

- GIVEN Astro 6.x changes the image service API
- WHEN astro.config.mjs is validated
- THEN passthroughImageService import and usage MUST be updated to Astro 6.x API
- AND Starlight integration configuration MUST remain valid
- AND `pnpm build` MUST successfully build the documentation site

#### Scenario: TypeScript Configuration Migration

- GIVEN TypeScript 6.x introduces compiler option changes
- WHEN tsconfig.json files are validated
- THEN moduleResolution MUST be updated if "node" is deprecated
- AND any new required compiler options MUST be added
- AND `pnpm check` MUST pass without type errors

#### Scenario: TypeScript Type Errors Introduced

- GIVEN TypeScript 6.x introduces stricter type checking
- WHEN `pnpm check` detects new type errors
- THEN type errors MUST be fixed incrementally
- OR complex issues MUST be marked with `@ts-expect-error` and TODO comments
- AND library code type errors MUST be prioritized over documentation code
- AND dual exports (Node.js + browser) MUST remain type-safe

#### Scenario: Documentation Site Validation

- GIVEN Astro and TypeScript updates are complete
- WHEN `pnpm dev` starts the development server
- THEN the documentation site MUST load without errors
- AND navigation MUST work correctly
- AND Starlight sidebar MUST render properly
- AND all pages MUST be accessible

#### Scenario: Phase 3 Full Validation

- GIVEN Astro and TypeScript updates are complete
- WHEN full validation cycle is executed
- THEN `pnpm check` MUST pass
- AND `pnpm build` MUST pass (documentation site + library)
- AND `pnpm test` MUST pass (all test suites)
- AND no regressions MUST be introduced in library functionality

### Requirement: Lock File Integrity

The system MUST maintain pnpm-lock.yaml integrity throughout all update phases.

The system MUST regenerate pnpm-lock.yaml after each phase using `pnpm install`.

#### Scenario: Lock File Regeneration

- GIVEN dependencies have been updated in package.json
- WHEN `pnpm install` is executed
- THEN pnpm-lock.yaml MUST be regenerated with new dependency tree
- AND all workspace dependencies MUST resolve correctly
- AND no dependency conflicts MUST exist
- AND `pnpm install --frozen-lockfile` MUST succeed after regeneration

#### Scenario: Lock File Conflict Recovery

- GIVEN a lock file conflict occurs during rollback
- WHEN lock file recovery is performed
- THEN pnpm-lock.yaml MUST be deleted
- AND `pnpm install --no-frozen-lockfile` MUST regenerate a valid lock file
- AND `pnpm install --frozen-lockfile` MUST verify lock file integrity

### Requirement: Atomic Phase Commits

The system MUST commit each phase separately with conventional commit messages.

Each commit MUST include updated package.json files and regenerated pnpm-lock.yaml.

#### Scenario: Phase 1 Commit

- GIVEN Phase 1 updates are complete and validated
- WHEN changes are committed
- THEN commit message MUST follow format: "chore(deps): update minor/patch dependencies"
- AND commit MUST include all updated package.json files
- AND commit MUST include regenerated pnpm-lock.yaml
- AND commit MUST be atomic (revertable independently)

#### Scenario: Phase 2 Commit

- GIVEN Phase 2 jsdom update is complete and validated
- WHEN changes are committed
- THEN commit message MUST follow format: "chore(deps): update jsdom to 29.1.1"
- AND commit MUST include packages/ascii-progress-bar/package.json
- AND commit MUST include regenerated pnpm-lock.yaml
- AND commit MAY include vitest.config.ts if configuration changed

#### Scenario: Phase 3 Commit

- GIVEN Phase 3 Astro and TypeScript updates are complete and validated
- WHEN changes are committed
- THEN commit message MUST follow format: "chore(deps): update Astro to 6.x and TypeScript to 6.x"
- AND commit MUST include all updated package.json files
- AND commit MUST include regenerated pnpm-lock.yaml
- AND commit MAY include astro.config.mjs if API migration required
- AND commit MAY include tsconfig.json files if compiler options changed

### Requirement: Rollback Capability

The system MUST support granular rollback of any phase without affecting other phases.

The system MUST support complete rollback of all phases.

#### Scenario: Single Phase Rollback

- GIVEN a phase has been committed
- WHEN `git revert <phase-commit-sha>` is executed
- THEN the phase commit MUST be reverted
- AND `pnpm install` MUST restore the previous lock file state
- AND other phases MUST remain unaffected
- AND the repository MUST return to a valid state

#### Scenario: Complete Rollback

- GIVEN all three phases have been committed
- WHEN complete rollback is performed using `git reset --hard HEAD~3` or sequential reverts
- THEN all dependency updates MUST be reverted
- AND `pnpm install` MUST restore the original lock file state
- AND the repository MUST return to the pre-update state

#### Scenario: Emergency Rollback After Merge

- GIVEN updates have been merged to main branch
- AND CI/CD pipeline fails
- WHEN emergency rollback is performed
- THEN merge commit MUST be reverted using `git revert -m 1 <merge-commit-sha>`
- AND revert MUST be pushed to main immediately
- AND `pnpm install` MUST restore previous lock file state
- AND investigation MUST occur in a separate branch before re-attempting

### Requirement: CI/CD Pipeline Validation

The system MUST pass all CI/CD pipeline checks after each phase.

The system SHOULD validate locally before pushing to remote.

#### Scenario: Local Validation Before Push

- GIVEN a phase is complete
- WHEN local validation is performed
- THEN `pnpm check` MUST pass
- AND `pnpm build` MUST pass
- AND `pnpm test` MUST pass
- AND changes SHOULD be pushed only after local validation succeeds

#### Scenario: CI/CD Pipeline Execution

- GIVEN changes have been pushed to a branch
- WHEN GitHub Actions workflows execute
- THEN all workflow jobs MUST pass
- AND build job MUST complete successfully
- AND test job MUST complete successfully
- AND lint job MUST complete successfully
- AND no environment-specific failures MUST occur

#### Scenario: CI/CD Pipeline Failure

- GIVEN CI/CD pipeline fails after push
- WHEN failure is detected
- THEN failure logs MUST be reviewed
- AND root cause MUST be identified
- AND fix MUST be applied locally and validated
- OR rollback MUST be performed if fix is not straightforward

## Coverage Summary

### Happy Paths Covered
- ✅ Phase 1 minor/patch updates with validation
- ✅ Phase 2 jsdom major update with test validation
- ✅ Phase 3 Astro and TypeScript major updates with migration
- ✅ Lock file regeneration and integrity
- ✅ Atomic commits per phase
- ✅ CI/CD pipeline validation

### Edge Cases Covered
- ✅ New Biome linting rules introduced
- ✅ jsdom breaking changes in DOM API
- ✅ Astro image service API migration
- ✅ TypeScript compiler option changes
- ✅ TypeScript stricter type checking
- ✅ Lock file conflicts during rollback

### Error States Covered
- ✅ Phase validation failures
- ✅ Test suite failures after jsdom update
- ✅ Type errors after TypeScript update
- ✅ Documentation site build failures
- ✅ CI/CD pipeline failures
- ✅ Emergency rollback scenarios

## Next Steps

This specification is ready for implementation (sdd-apply). The design document provides detailed technical approach, validation commands, and migration strategies for each phase.
