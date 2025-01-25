# ASCII Progress Bar

A lightweight and customizable ASCII progress bar web component for modern web applications.

[![Deploy Docs to GitHub Pages](https://github.com/yacosta738/ascii-progress-bar/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/yacosta738/ascii-progress-bar/actions/workflows/deploy-docs.yml)
![NPM Version](https://img.shields.io/npm/v/@yacosta738/ascii-progress-bar)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-blue)](https://www.typescriptlang.org/)
[![npm version](https://badge.fury.io/js/@yacosta738%2Fascii-progress-bar.svg)](https://www.npmjs.com/package/@yacosta738/ascii-progress-bar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

```bash
# npm
npm install @yacosta738/ascii-progress-bar

# yarn
yarn add @yacosta738/ascii-progress-bar

# pnpm
pnpm add @yacosta738/ascii-progress-bar
```

## 📚 Documentation

Visit our [documentation site](https://ascii-progress-bar.vercel.app) for detailed usage instructions and examples.

## 🎯 Features

- 📦 Lightweight and dependency-free
- 🎨 Multiple built-in patterns
- ✨ Customizable patterns
- 📱 Responsive and accessible
- 🔧 Easy to integrate
- 📝 TypeScript support

## 🛠️ Development

```bash
# Install dependencies (this will automatically build the package first)
pnpm install

# Start development server
pnpm dev

# Build packages and documentation
pnpm build

# Build only packages
pnpm build:packages

# Run tests
pnpm test
```

## 🧪 Try it Online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/yacosta738/ascii-progress-bar)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github.com/yacosta738/ascii-progress-bar)

## 📦 Project Structure

```
.
├── README.md
├── astro.config.mjs
├── directory-structure.md
├── examples
│   ├── basic
│   │   ├── index.html
│   │   ├── index.js
│   │   └── package.json
│   ├── console
│   │   ├── package.json
│   │   └── src
│   │       └── demo-console.js
│   └── customization
│       ├── index.html
│       ├── index.js
│       └── package.json
├── package.json
├── packages
│   └── ascii-progress-bar
│       ├── README.md
│       ├── package.json
│       ├── src
│       │   ├── ascii-progress-bar.ts
│       │   ├── ascii-progress-renderer.ts
│       │   ├── index.browser.ts
│       │   ├── index.ts
│       │   └── types.ts
│       ├── tsconfig.json
│       └── tsup.config.ts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── public
│   ├── ascii-bar-logo.webp
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── ascii-bar-logo.webp
│   ├── components
│   │   ├── AsciiProgressBarDemo.astro
│   │   ├── ReadMore.astro
│   │   └── tabs
│   │       └── PackageManagerTabs.astro
│   ├── content
│   │   └── docs
│   │       ├── examples
│   │       │   ├── all.md
│   │       │   ├── chars.md
│   │       │   ├── console.md
│   │       │   └── web-component.md
│   │       ├── guides
│   │       │   └── installation.mdx
│   │       └── index.mdx
│   ├── content.config.ts
│   └── layouts
└── tsconfig.json
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Using the `links.yml` Workflow

The `links.yml` workflow is used to check for broken links in your project. It uses the `lychee-action` to perform the link checking.

### Setting up the Workflow

1. Create a `.github/workflows/links.yml` file in your repository.
2. Add the following content to the file:

```yaml
name: Links

on:
  repository_dispatch:
  workflow_dispatch:
  schedule:
    - cron: '00 18 * * *'

jobs:
  linkChecker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Restore lychee cache
        id: restore-cache
        uses: actions/cache/restore@v4
        with:
          path: .lycheecache
          key: cache-lychee-${{ github.sha }}
          restore-keys: cache-lychee-

      - name: Run lychee
        id: run-lychee
        uses: lycheeverse/lychee-action@v2.2.0
        with:
          args: "--base . --cache --max-cache-age 1d . --max-redirects 10 --max-retries 5 --user-agent Chrome/51.0.2704.103 Safari/537.36"

      - name: Set lychee exit code
        run: echo "lychee_exit_code=$?" >> $GITHUB_ENV

      - name: Save lychee cache
        uses: actions/cache/save@v4
        if: always()
        with:
          path: .lycheecache
          key: ${{ steps.restore-cache.outputs.cache-key }}

      - name: Create Issue From File
        if: steps.run-lychee.outcome == 'failure'
        uses: peter-evans/create-issue-from-file@v5
        with:
          title: Link Checker Report
          content-filepath: ./lychee/out.md
          labels: report, automated issue
```

### Environment Variable

The `lychee_exit_code` environment variable is used to capture the exit code of the `lychee` command. This is important for determining whether the link checking step was successful or not. The `Create Issue From File` step uses this variable to decide if an issue should be created based on the link check results.
