# Design: Update Dependencies

## Technical Approach

This design implements a **phased dependency update strategy** that isolates breaking changes and validates at each step. The approach maps directly to the proposal's three-phase plan:

1. **Phase 1**: Minor/patch updates (low risk, backward-compatible)
2. **Phase 2**: jsdom major update (medium risk, test-focused validation)
3. **Phase 3**: Astro + TypeScript major updates (high risk, requires migration)

Each phase uses atomic commits with regenerated lock files, enabling granular rollback. The strategy prioritizes monorepo stability by validating workspace dependencies, dual exports (Node.js + browser), and CI/CD pipelines after each phase.

## Architecture Decisions

### Decision: Phased Update Strategy Over Bulk Update

**Choice**: Three-phase incremental update with validation gates between phases

**Alternatives considered**:
- Bulk update all dependencies at once
- Selective update (defer major versions)

**Rationale**: 
- Three major version bumps (Astro 5→6, TypeScript 5→6, jsdom 28→29) have high breaking change risk
- Astro 6.x may break image service API (`passthroughImageService`) and Starlight integration
- TypeScript 6.x may introduce new strict checks and type errors
- jsdom 29.x may change DOM API behavior affecting Vitest tests
- Phased approach allows isolation of failures and targeted rollback
- Matches semantic versioning principles (minor/patch → major → major)

### Decision: Use pnpm Recursive Update Commands

**Choice**: `pnpm update -r <package>@<version>` for targeted updates

**Alternatives considered**:
- Manual package.json editing + `pnpm install`
- `pnpm update -i -r --latest` (interactive bulk update)

**Rationale**:
- Recursive flag (`-r`) updates across all workspace packages
- Explicit version targeting prevents unintended updates
- Regenerates pnpm-lock.yaml automatically
- Preserves workspace protocol for internal dependencies (`workspace:*`)
- Matches existing `update-deps` script pattern

### Decision: Validate with Full Build + Test + Lint Cycle

**Choice**: Run `pnpm check && pnpm build && pnpm test` after each phase

**Alternatives considered**:
- Only run tests
- Only run build
- Skip validation until final phase

**Rationale**:
- `pnpm check` runs Biome linting + Astro type checking (catches config errors early)
- `pnpm build` validates documentation site + library bundling (catches build-time issues)
- `pnpm test` validates library functionality + DOM environment (catches runtime issues)
- Full cycle catches cascading failures across monorepo packages
- Matches CI/CD validation pipeline (GitHub Actions runs same commands)

### Decision: Commit Each Phase Separately

**Choice**: One commit per phase with descriptive conventional commit message

**Alternatives considered**:
- Single commit for all updates
- Separate commits per dependency

**Rationale**:
- Enables granular rollback (`git revert <commit>`)
- Clear git history for debugging future issues
- Matches semantic-release commit conventions
- Balances granularity with commit noise (3 commits vs 16 commits)

## Data Flow

```
Phase 1: Minor/Patch Updates
┌─────────────────────────────────────────────────────────────┐
│ pnpm update -r <package>@<version>                          │
│   ↓                                                          │
│ package.json (root) ──→ pnpm-lock.yaml regeneration         │
│ package.json (lib)  ──→ workspace dependency resolution     │
│   ↓                                                          │
│ pnpm install ──→ node_modules update                        │
│   ↓                                                          │
│ Validation: pnpm check && pnpm build && pnpm test           │
│   ↓                                                          │
│ git commit -m "chore(deps): update minor/patch dependencies"│
└─────────────────────────────────────────────────────────────┘

Phase 2: jsdom Major Update
┌─────────────────────────────────────────────────────────────┐
│ Review jsdom 29.x changelog                                  │
│   ↓                                                          │
│ pnpm update -r jsdom@29.1.1                                  │
│   ↓                                                          │
│ Check vitest.config.ts (environment: "jsdom")                │
│   ↓                                                          │
│ Validation: pnpm test --reporter=verbose                     │
│   ↓                                                          │
│ git commit -m "chore(deps): update jsdom to 29.1.1"         │
└─────────────────────────────────────────────────────────────┘

Phase 3: Astro + TypeScript Major Updates
┌─────────────────────────────────────────────────────────────┐
│ Review Astro 6.x + TypeScript 6.x migration guides          │
│   ↓                                                          │
│ pnpm update -r astro@6.3.5 typescript@6.0.3                  │
│   ↓                                                          │
│ Check astro.config.mjs (passthroughImageService API)         │
│ Check tsconfig.json (compiler options)                       │
│   ↓                                                          │
│ Fix TypeScript errors (if any)                               │
│   ↓                                                          │
│ Validation: pnpm check && pnpm build && pnpm test           │
│   ↓                                                          │
│ Manual: pnpm dev (verify docs site loads)                    │
│   ↓                                                          │
│ git commit -m "chore(deps): update Astro to 6.x and TS 6.x" │
└─────────────────────────────────────────────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modify | Update root dependencies: `@astrojs/check`, `@astrojs/starlight`, `astro`, `@biomejs/biome`, `typescript` |
| `packages/ascii-progress-bar/package.json` | Modify | Update devDependencies: `jsdom`, `vitest`, `@semantic-release/*` plugins |
| `pnpm-lock.yaml` | Modify | Regenerated after each phase with new dependency tree |
| `astro.config.mjs` | Potentially Modify | May need updates if Astro 6.x changes `passthroughImageService` API or Starlight integration |
| `tsconfig.json` | Potentially Modify | May need updates if TypeScript 6.x changes compiler options or module resolution |
| `packages/ascii-progress-bar/tsconfig.json` | Potentially Modify | May need updates for TypeScript 6.x strict checks |
| `packages/ascii-progress-bar/vitest.config.ts` | Potentially Modify | May need updates if jsdom 29.x changes environment configuration |

## Interfaces / Contracts

### pnpm Update Commands

```bash
# Phase 1: Minor/Patch Updates
pnpm update -r @biomejs/biome@2.4.15
pnpm update -r vitest@4.1.6
pnpm update -r @astrojs/check@0.9.9
pnpm update -r @astrojs/starlight@0.39.2
pnpm update -r @semantic-release/github@12.0.8
pnpm update -r @semantic-release/npm@13.1.5
pnpm update -r @semantic-release/release-notes-generator@14.1.1

# Phase 2: jsdom Major Update
pnpm update -r jsdom@29.1.1

# Phase 3: Astro + TypeScript Major Updates
pnpm update -r astro@6.3.5 @astrojs/check@0.9.9 @astrojs/starlight@0.39.2
pnpm update -r typescript@6.0.3
```

### Validation Commands

```bash
# Full validation cycle (run after each phase)
pnpm check      # Biome lint + Astro type check
pnpm build      # Build docs site + library
pnpm test       # Run Vitest test suite

# Phase 2 specific: verbose test output
pnpm test --reporter=verbose

# Phase 3 specific: manual verification
pnpm dev        # Start dev server, verify docs site loads
```

### Astro Config Contract (Potential Changes)

```typescript
// Current (Astro 5.x)
import { passthroughImageService } from "astro/config";

export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
});

// Potential Astro 6.x changes (to be verified from migration guide):
// - passthroughImageService may be renamed or moved
// - image.service API may change
// - Starlight integration may require new config options
```

### TypeScript Config Contract (Potential Changes)

```json
// Current (TypeScript 5.x)
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node"
  }
}

// Potential TypeScript 6.x changes (to be verified from migration guide):
// - moduleResolution: "node" may be deprecated (use "bundler" or "node16")
// - New strict checks may require additional compiler options
// - lib definitions may have breaking changes
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Library functionality (progress bar rendering, browser/Node.js exports) | Run `pnpm test` in `packages/ascii-progress-bar` after each phase |
| Integration | Monorepo workspace dependencies, dual exports | Run `pnpm build` at root to validate workspace protocol resolution |
| Build | Documentation site build, library bundling | Run `pnpm build` to validate Astro build + tsup bundling |
| Lint | Code style, type checking | Run `pnpm check` to validate Biome rules + Astro type checking |
| Manual | Documentation site rendering, navigation | Run `pnpm dev` after Phase 3 to verify docs site loads correctly |
| CI/CD | Full pipeline validation | Push to branch and verify GitHub Actions workflows pass |

## Migration / Rollout

### Phase 1: Minor/Patch Updates (No Migration Required)

- Backward-compatible changes, no config updates expected
- Biome 2.4.x may introduce new linting rules → fix violations or disable in `biome.json`
- Vitest 4.1.x should be backward-compatible with existing test suite

### Phase 2: jsdom Major Update

**Migration steps**:
1. Review jsdom 29.x changelog for breaking changes
2. Check if `vitest.config.ts` environment configuration changed
3. Run tests with verbose output to catch DOM API changes
4. Update test assertions if DOM behavior changed legitimately

**Potential breaking changes**:
- DOM API method signatures
- Event handling behavior
- Window/document object properties

### Phase 3: Astro + TypeScript Major Updates

**Astro 6.x migration steps**:
1. Review Astro 6.x migration guide
2. Check `passthroughImageService` API (may be renamed or moved)
3. Check Starlight 0.39.x compatibility (sidebar/navigation config)
4. Update `astro.config.mjs` if API changes detected
5. Rebuild documentation site and verify output

**TypeScript 6.x migration steps**:
1. Review TypeScript 6.x migration guide
2. Check for new compiler errors (run `pnpm check`)
3. Update `moduleResolution` if "node" is deprecated
4. Fix type errors incrementally:
   - Use `@ts-expect-error` with TODO comments for complex issues
   - Prioritize errors in library code over documentation code
5. Validate dual exports still work (Node.js + browser)

**Rollout plan**:
- Phase 1 → Phase 2 → Phase 3 (sequential, not parallel)
- Validate after each phase before proceeding
- If Phase 3 fails, rollback and investigate migration guides
- If CI/CD fails after merge, immediately revert merge commit

## Open Questions

- [ ] Does Astro 6.x change the `passthroughImageService` API? (Check migration guide)
- [ ] Does TypeScript 6.x deprecate `moduleResolution: "node"`? (Check migration guide)
- [ ] Does jsdom 29.x have breaking changes in DOM API methods? (Check changelog)
- [ ] Do any new Biome 2.4.x linting rules fail CI? (Discovered during Phase 1 validation)
- [ ] Does Starlight 0.39.x require config changes for sidebar/navigation? (Check changelog)

## Rollback Strategy

### Per-Phase Rollback

```bash
# Rollback Phase 1 only
git revert <phase-1-commit-sha>
pnpm install  # Restore previous lock file

# Rollback Phase 2 only
git revert <phase-2-commit-sha>
pnpm install

# Rollback Phase 3 only
git revert <phase-3-commit-sha>
pnpm install
```

### Complete Rollback

```bash
# If all three phases committed
git reset --hard HEAD~3

# Or using revert (preserves history)
git revert <phase-3-commit-sha>
git revert <phase-2-commit-sha>
git revert <phase-1-commit-sha>

# Restore lock file
pnpm install
```

### Emergency Rollback (CI/CD Failure After Merge)

```bash
# Immediately revert merge commit
git revert -m 1 <merge-commit-sha>
git push origin main

# Restore lock file
pnpm install

# Investigate failures locally before re-attempting
git checkout -b fix/dependency-update-issues
```

### Lock File Recovery

```bash
# If lock file conflicts occur during rollback
rm pnpm-lock.yaml
pnpm install --no-frozen-lockfile

# Verify lock file integrity
pnpm install --frozen-lockfile
```

## Risk Mitigation

| Risk | Mitigation Strategy |
|------|---------------------|
| Astro 6.x breaks image service API | Review migration guide before Phase 3; test docs build locally; rollback to Phase 2 if critical |
| TypeScript 6.x introduces new type errors | Review migration guide; fix errors incrementally; use `@ts-expect-error` for complex issues |
| jsdom 29.x breaks existing tests | Review changelog before Phase 2; run tests with verbose output; update assertions if behavior changed |
| Biome 2.4.x introduces failing linting rules | Fix violations during Phase 1; disable rules in `biome.json` if too strict |
| CI/CD pipeline fails after merge | Immediately revert merge commit; investigate locally; re-attempt with fixes |
| Lock file conflicts during rollback | Delete lock file and regenerate with `pnpm install --no-frozen-lockfile` |
