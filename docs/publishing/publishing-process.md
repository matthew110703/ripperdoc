# Ripperdoc --- Publishing & Release Process

**Package visibility:** Public\
**Package registry:** npm\
**Package manager:** pnpm\
**Repository:** `ripperdoc`\
**Release tooling:** Changesets + GitHub Actions\
**Publishing authentication:** npm Trusted Publishing (OIDC)

------------------------------------------------------------------------

## 1. Goal

Ripperdoc is a public, reusable design-system platform consumed by
multiple micro-frontends.

The publishing system should provide:

-   Public npm packages
-   Semantic versioning
-   Automated changelogs
-   Controlled releases
-   CI validation before publishing
-   Secure npm authentication
-   npm provenance
-   Support for prereleases/beta releases
-   Clear package boundaries

The intended release flow is:

``` text
Developer
    ↓
Pull Request
    ↓
CI checks
    ↓
Merge to main
    ↓
Changeset
    ↓
Release PR
    ↓
Merge release PR
    ↓
GitHub Actions
    ↓
npm Trusted Publishing
    ↓
Public npm package
```

------------------------------------------------------------------------

# 2. Public Package Model

Ripperdoc packages should be public on npm.

Potential package structure:

``` text
@ripperdoc/tokens
@ripperdoc/primitives
@ripperdoc/components
@ripperdoc/icons
@ripperdoc/hooks
@ripperdoc/utils
@ripperdoc/themes
```

Do not create every package immediately.

Start with only the packages that have a real purpose:

``` text
packages/
├── tokens/
└── components/
```

Add other packages when their boundaries become justified.

------------------------------------------------------------------------

# 3. Monorepo

Use:

-   pnpm workspaces
-   Turborepo
-   TypeScript

Recommended repository structure:

``` text
ripperdoc/
│
├── apps/
│   └── storybook/
│
├── packages/
│   ├── tokens/
│   ├── components/
│   └── ...
│
├── tooling/
│
├── .changeset/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

The existing Storybook setup should remain the component-development
environment.

------------------------------------------------------------------------

# 4. Package Configuration

Every package intended for npm must explicitly be public.

Example:

``` json
{
  "name": "@ripperdoc/components",
  "version": "0.1.0",
  "private": false,
  "publishConfig": {
    "access": "public"
  }
}
```

For a scoped npm package, `access: public` is important because scoped
packages can otherwise default to restricted/private publishing behavior
depending on the publishing setup.

The same approach should be used for:

``` text
@ripperdoc/tokens
@ripperdoc/components
...
```

------------------------------------------------------------------------

# 5. Control What Gets Published

Do not publish the entire monorepo.

Each package should specify its public artifacts.

Example:

``` json
{
  "files": [
    "dist",
    "README.md"
  ]
}
```

The resulting npm package should contain only what consumers need:

``` text
@ripperdoc/components
├── dist/
├── README.md
└── package.json
```

It should not expose:

``` text
src/
tests/
stories/
internal/
tooling/
configs/
```

unless a particular file is intentionally part of the public package.

------------------------------------------------------------------------

# 6. Build Requirements

Each publishable package must have a production build.

Example scripts:

``` json
{
  "scripts": {
    "build": "tsup",
    "test": "vitest",
    "typecheck": "tsc --noEmit"
  }
}
```

The exact bundler can evolve, but the package must produce:

-   JavaScript
-   TypeScript declarations
-   CSS/assets where applicable

For a React library, React should normally be treated as a peer
dependency rather than bundled into every package.

------------------------------------------------------------------------

# 7. Changesets

Install Changesets at the repository root:

``` bash
pnpm add -D @changesets/cli
```

Initialize it:

``` bash
pnpm changeset init
```

This creates:

``` text
.changeset/
├── config.json
└── README.md
```

Changesets is responsible for:

-   Recording package changes
-   Choosing semantic version bumps
-   Generating changelogs
-   Creating release PRs
-   Publishing changed packages

------------------------------------------------------------------------

# 8. Developer Release Workflow

When a developer changes a publishable package:

``` bash
pnpm changeset
```

Select the affected package.

Example:

``` text
@ripperdoc/components
```

Choose the appropriate version bump:

``` text
patch
minor
major
```

Then write a human-readable description.

Example:

``` md
---
"@ripperdoc/components": minor
---

Add loading state support to Button.
```

The changeset file is committed with the feature PR.

------------------------------------------------------------------------

# 9. Semantic Versioning

Use semantic versioning.

## Patch

Bug fixes that do not change the public API.

``` text
1.2.0 → 1.2.1
```

Example:

``` text
Fix Button focus ring.
```

## Minor

Backward-compatible functionality.

``` text
1.2.0 → 1.3.0
```

Example:

``` text
Add Button loading state.
```

## Major

Breaking changes.

``` text
1.3.0 → 2.0.0
```

Example:

``` text
Rename Button.variant and remove the old API.
```

------------------------------------------------------------------------

# 10. Initial Version

Because Ripperdoc is being built from scratch, start with:

``` text
0.1.0
```

During early development:

``` text
0.x.y
```

can evolve quickly.

Once the component APIs, tokens, themes, and package contracts are
stable:

``` text
1.0.0
```

should represent the first stable public API.

------------------------------------------------------------------------

# 11. Release PR

The recommended workflow is to use Changesets to create a release PR.

Feature PR:

``` text
feat(button): add loading state
        +
.changeset/...
```

After merging, the release automation creates:

``` text
Release Ripperdoc packages
```

The release PR updates:

``` text
package.json
CHANGELOG.md
```

Example:

``` text
@ripperdoc/components
0.3.0 → 0.4.0

@ripperdoc/tokens
0.2.0 → 0.2.1
```

Review this PR normally.

After it is merged, the publishing workflow runs.

------------------------------------------------------------------------

# 12. CI Before Publishing

Every pull request should validate the repository.

Recommended pipeline:

``` text
Install
  ↓
Lint
  ↓
Typecheck
  ↓
Unit tests
  ↓
Build
  ↓
Storybook
  ↓
Accessibility checks
  ↓
Visual regression checks
```

Recommended tools:

``` text
ESLint
Prettier
TypeScript
Vitest
Testing Library
Playwright
Storybook
axe
Chromatic or equivalent
```

Publishing should never happen if the release build fails.

------------------------------------------------------------------------

# 13. Package Validation

Before the first release, validate the actual npm artifact.

Build the package:

``` bash
pnpm --filter @ripperdoc/components build
```

Then inspect the package tarball.

The package should contain:

``` text
dist/
README.md
package.json
```

Verify:

-   JavaScript entry points
-   Type declarations
-   CSS
-   Assets
-   Peer dependencies
-   Export map
-   No accidental source files
-   No test files
-   No Storybook files
-   No internal configuration
-   React is not incorrectly bundled

------------------------------------------------------------------------

# 14. npm Trusted Publishing

Do not use a long-lived npm token in GitHub Actions if Trusted
Publishing is available.

Use:

``` text
GitHub Actions
      │
      │ OIDC
      ▼
     npm
```

instead of:

``` text
GitHub Actions
      │
      │ NPM_TOKEN
      ▼
     npm
```

Trusted Publishing reduces the need to store long-lived publishing
credentials in GitHub secrets.

It also enables npm provenance for supported public packages.

------------------------------------------------------------------------

# 15. First Publish

There is a bootstrapping step because npm Trusted Publishing needs the
package to exist before its trusted publisher configuration can be
attached.

For the first release:

``` text
Build package
      ↓
Publish initial package
      ↓
Configure npm Trusted Publishing
      ↓
Use automated publishing from then onward
```

For example:

``` text
@ripperdoc/components@0.1.0
```

Once the package exists on npm, configure its trusted publisher to point
to the Ripperdoc GitHub repository and release workflow.

------------------------------------------------------------------------

# 16. GitHub Actions Publishing

The release workflow should:

1.  Check out the repository
2.  Install Node
3.  Install pnpm
4.  Install dependencies
5.  Build packages
6.  Run required validation
7.  Authenticate with npm through OIDC
8.  Run the Changesets publish process
9.  Create/update Git tags as appropriate

The GitHub Actions job requires OIDC permissions.

Example:

``` yaml
permissions:
  contents: write
  id-token: write
```

`id-token: write` is required for OIDC-based authentication.

The publishing workflow should be the only workflow authorized to
publish packages.

------------------------------------------------------------------------

# 17. Public npm Access

Ripperdoc packages should remain public.

Consumers should be able to install them normally:

``` bash
pnpm add @ripperdoc/components
```

No npm organization membership should be required to consume released
packages.

The package visibility should be:

``` text
Public
```

The source repository can also be public if desired, but npm package
visibility and GitHub repository visibility are separate decisions.

------------------------------------------------------------------------

# 18. npm Package Metadata

Each package should have useful metadata.

Example:

``` json
{
  "name": "@ripperdoc/components",
  "version": "0.1.0",
  "description": "Shared React components for the Ripperdoc design system",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "..."
  },
  "bugs": {
    "url": "..."
  },
  "homepage": "..."
}
```

Also define:

``` json
{
  "keywords": [
    "react",
    "design-system",
    "ui",
    "components"
  ]
}
```

Use the actual repository URLs when the repository is finalized.

------------------------------------------------------------------------

# 19. Exports

Use explicit package exports.

Example:

``` json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  }
}
```

If CSS is public:

``` json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

Avoid making internal source paths part of the public API.

------------------------------------------------------------------------

# 20. Peer Dependencies

For React packages, use peer dependencies for the host React
installation.

Example:

``` json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

The exact supported versions should be decided when the package
implementation is finalized.

The design-system package should not silently install another React
instance for the consuming MFE.

------------------------------------------------------------------------

# 21. Prerelease / Beta Releases

When testing major design-system changes, use prereleases.

Example:

``` text
@ripperdoc/components@0.5.0-beta.1
```

Possible npm dist-tags:

``` text
latest
beta
next
```

Consumers can explicitly install beta builds:

``` bash
pnpm add @ripperdoc/components@beta
```

Use prereleases when validating:

-   New token architecture
-   New component APIs
-   Major theme changes
-   Breaking changes
-   New MFE integrations

------------------------------------------------------------------------

# 22. Release Tags

Git tags should correspond to releases.

Example:

``` text
@ripperdoc/components@0.4.0
```

If multiple packages are released together, the release process should
keep package versions and tags consistent with the Changesets workflow.

------------------------------------------------------------------------

# 23. Changelogs

Every published package should maintain a changelog.

Example:

``` text
packages/components/
├── CHANGELOG.md
├── README.md
├── package.json
└── dist/
```

Changesets generates the changelog entries from committed changesets.

Changelogs should communicate consumer-visible changes rather than
implementation details.

Good:

``` text
Added loading state support to Button.
```

Less useful:

``` text
Refactored Button.tsx internal state handling.
```

------------------------------------------------------------------------

# 24. Release Rules

### Rule 1

Every consumer-visible package change requires a Changeset.

### Rule 2

Never manually edit package versions during normal development.

### Rule 3

Never manually publish from a developer machine after the automated
pipeline is established.

### Rule 4

Never publish a package that has not passed CI.

### Rule 5

Breaking changes require a major version bump.

### Rule 6

MFE-specific code should not be published as a Ripperdoc global package
unless it has a justified reusable contract.

### Rule 7

Keep npm packages public.

### Rule 8

Use Trusted Publishing instead of long-lived npm tokens whenever
possible.

------------------------------------------------------------------------

# 25. Complete Example

A developer changes Button:

``` text
packages/components/src/button/
```

They add a changeset:

``` bash
pnpm changeset
```

Select:

``` text
@ripperdoc/components
```

Choose:

``` text
minor
```

Commit:

``` text
feat(button): add loading state
```

Open PR.

CI runs:

``` text
✓ lint
✓ typecheck
✓ test
✓ build
✓ storybook
✓ accessibility
```

PR is merged.

Changesets prepares:

``` text
Release Ripperdoc packages
```

The release PR updates:

``` text
@ripperdoc/components
0.1.0 → 0.2.0
```

Release PR is merged.

GitHub Actions:

``` text
Checkout
   ↓
Install
   ↓
Build
   ↓
Test
   ↓
OIDC authentication
   ↓
Changesets publish
   ↓
npm
```

npm now contains:

``` text
@ripperdoc/components@0.2.0
```

Consumers install:

``` bash
pnpm add @ripperdoc/components
```

------------------------------------------------------------------------

# 26. Recommended Initial Setup

Because the Ripperdoc repository already has:

``` text
pnpm
Storybook
Next.js
Vite
```

do not rebuild the repository.

Add the release infrastructure around the existing setup:

``` text
Current
├── pnpm
├── Storybook
├── Next.js
└── Vite

        ↓

Add
├── pnpm workspaces
├── Turborepo
├── packages/
├── Changesets
├── CI
└── npm Trusted Publishing
```

Initial publishable packages:

``` text
@ripperdoc/tokens
@ripperdoc/components
```

Then expand later:

``` text
@ripperdoc/primitives
@ripperdoc/icons
@ripperdoc/hooks
@ripperdoc/utils
@ripperdoc/themes
```

------------------------------------------------------------------------

# 27. Final Release Architecture

``` text
                         GitHub
                           │
                     Pull Request
                           │
             ┌─────────────┴─────────────┐
             │                           │
          Developer                    CI
             │                           │
         Changeset              lint/typecheck/test
             │                  build/Storybook/a11y
             │                           │
             └─────────────┬─────────────┘
                           │
                         Merge
                           │
                           ▼
                    Changesets Release PR
                           │
                         Merge
                           │
                           ▼
                    GitHub Actions
                           │
                     OIDC / Trusted
                       Publishing
                           │
                           ▼
                          npm
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          @ripperdoc/   @ripperdoc/   @ripperdoc/
           tokens       components      icons
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                    Multiple MFEs
```

------------------------------------------------------------------------

# 28. Implementation Checklist

## Repository

-   [ ] pnpm workspace
-   [ ] Turborepo
-   [ ] TypeScript
-   [ ] Existing Storybook retained
-   [ ] `apps/storybook`
-   [ ] `packages/tokens`
-   [ ] `packages/components`

## Package configuration

-   [ ] Package names
-   [ ] `private: false`
-   [ ] `publishConfig.access: public`
-   [ ] `files`
-   [ ] `exports`
-   [ ] `types`
-   [ ] `peerDependencies`
-   [ ] README
-   [ ] License
-   [ ] Repository metadata

## Release system

-   [ ] Install Changesets
-   [ ] Configure Changesets
-   [ ] Create Changeset workflow
-   [ ] Configure release PR
-   [ ] Configure GitHub Actions
-   [ ] Configure npm Trusted Publishing
-   [ ] Configure OIDC permissions
-   [ ] Test package tarballs
-   [ ] First public npm publish
-   [ ] Verify automated release

## Quality gates

-   [ ] ESLint
-   [ ] TypeScript
-   [ ] Vitest
-   [ ] Testing Library
-   [ ] Playwright
-   [ ] Storybook
-   [ ] Accessibility checks
-   [ ] Visual regression

------------------------------------------------------------------------

# 29. Recommended End State

The desired developer experience is:

``` bash
# install
pnpm add @ripperdoc/components

# develop
pnpm storybook

# test
pnpm turbo test

# build
pnpm turbo build

# create release note
pnpm changeset
```

The developer should **not** need to know the details of npm
authentication or manually publish packages.

Their responsibility ends at:

``` text
Code
 ↓
Test
 ↓
Changeset
 ↓
PR
```

The release infrastructure handles:

``` text
Version
 ↓
Changelog
 ↓
Build
 ↓
Authentication
 ↓
Publish
 ↓
Tag
```

This provides a clean, secure, and scalable publishing foundation for a
public Ripperdoc design system consumed by multiple micro-frontends.
