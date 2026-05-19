# Tasks: Update Dependencies

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Review budget | 400 changed lines unless project config says otherwise |
| Estimated workload | Low |
| Chained PRs recommended | No |
| Proposed delivery strategy | single-pr |
| Work-unit balance | All phases are package.json + lock file updates with validation commands; minimal code changes expected; single atomic PR with phased commits |

## Phase 1: Minor and Patch Updates

- [x] 1.1 Update `@biomejs/biome` from 2.3.14 to 2.4.15 using `pnpm update -r @biomejs/biome@2.4.15`
- [x] 1.2 Update `vitest` from 4.0.18 to 4.1.6 using `pnpm update -r vitest@4.1.6`
- [x] 1.3 Update `@astrojs/check` from 0.9.6 to 0.9.9 using `pnpm update -r @astrojs/check@0.9.9`
- [x] 1.4 Update `@astrojs/starlight` from 0.37.6 to 0.39.2 using `pnpm update -r @astrojs/starlight@0.39.2` (Note: Kept at 0.37.6 - requires Astro 6.x, moved to Phase 3)
- [x] 1.5 Update `@semantic-release/github` from 12.0.5 to 12.0.8 using `pnpm update -r @semantic-release/github@12.0.8`
- [x] 1.6 Update `@semantic-release/npm` from 13.1.4 to 13.1.5 using `pnpm update -r @semantic-release/npm@13.1.5`
- [x] 1.7 Update `@semantic-release/release-notes-generator` from 14.1.0 to 14.1.1 using `pnpm update -r @semantic-release/release-notes-generator@14.1.1`
- [x] 1.8 Run `pnpm install` to regenerate `pnpm-lock.yaml`
- [x] 1.9 Validate with `pnpm check` (Biome lint + Astro type check)
- [x] 1.10 Validate with `pnpm build` (docs site + library build)
- [x] 1.11 Validate with `pnpm test` (Vitest test suite)
- [x] 1.12 Commit with message: `chore(deps): update minor/patch dependencies`

## Phase 2: jsdom Major Update

- [x] 2.1 Review jsdom 29.x changelog for breaking changes at https://github.com/jsdom/jsdom/releases
- [x] 2.2 Update `jsdom` from 28.0.0 to 29.1.1 using `pnpm update -r jsdom@29.1.1`
- [x] 2.3 Run `pnpm install` to regenerate `pnpm-lock.yaml`
- [x] 2.4 Check `packages/ascii-progress-bar/vitest.config.ts` for environment configuration changes (No changes needed)
- [x] 2.5 Validate with `pnpm test --reporter=verbose` to catch DOM API changes (All tests passing)
- [x] 2.6 Fix any test failures related to DOM API behavior changes (if any) (No failures detected)
- [x] 2.7 Commit with message: `chore(deps): update jsdom to 29.1.1`

## Phase 3: Astro and TypeScript Major Updates

- [ ] 3.1 Review Astro 6.x migration guide at https://docs.astro.build/en/guides/upgrade-to/v6/
- [ ] 3.2 Review TypeScript 6.x migration guide at https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/
- [ ] 3.3 Update `astro` from 5.17.1 to 6.3.5 using `pnpm update -r astro@6.3.5`
- [ ] 3.4 Update `typescript` from 5.9.3 to 6.0.3 using `pnpm update -r typescript@6.0.3`
- [ ] 3.5 Run `pnpm install` to regenerate `pnpm-lock.yaml`
- [ ] 3.6 Check `astro.config.mjs` for `passthroughImageService` API changes (update if needed)
- [ ] 3.7 Check `tsconfig.json` for deprecated compiler options like `moduleResolution: "node"` (update if needed)
- [ ] 3.8 Check `packages/ascii-progress-bar/tsconfig.json` for TypeScript 6.x compatibility (update if needed)
- [ ] 3.9 Run `pnpm check` to identify new TypeScript errors
- [ ] 3.10 Fix TypeScript errors incrementally (use `@ts-expect-error` with TODO for complex issues)
- [ ] 3.11 Validate with `pnpm build` (docs site + library build)
- [ ] 3.12 Validate with `pnpm test` (Vitest test suite)
- [ ] 3.13 Manual validation: Run `pnpm dev` and verify documentation site loads correctly
- [ ] 3.14 Commit with message: `chore(deps): update Astro to 6.x and TypeScript to 6.x`

## Phase 4: Final Workspace Validation

- [ ] 4.1 Run full validation cycle: `pnpm check && pnpm build && pnpm test`
- [ ] 4.2 Verify `pnpm-lock.yaml` integrity with `pnpm install --frozen-lockfile`
- [ ] 4.3 Verify no unintended dependency changes in `package.json` files
- [ ] 4.4 Push branch and verify CI/CD pipeline passes (GitHub Actions)
- [ ] 4.5 Document any migration notes or breaking changes in PR description
