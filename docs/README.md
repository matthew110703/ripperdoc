# Ripperdoc Documentation Center

Welcome to the **Ripperdoc** Design System and Multi-MFE platform specifications.

Ripperdoc provides a shared visual language, token contract, and accessible component library for multiple micro-frontends (MFEs), supporting multiple cinematic themes.

---

## Documentation Structure

### 1. Architecture
- [**Multi-MFE Design System Architecture**](./architecture/multi-mfe-design-system-architecture.md)
  - Core philosophy, ownership boundaries (Ripperdoc vs. MFEs), dependency direction, repository strategy, accessibility standards, and package boundaries.

### 2. Design System & Tokens
- [**Unified Design System Specification**](./design-system/unified-design-system.md)
  - Unified token contract (`--rd-*`), three-tier token model (Primitive → Semantic → Component), shared foundations (4px grid, Inter typography, radii scales, motion), and theme normalization.
- [**Pre-Publication Design System Specification**](./design-system/pre-publication-design-system-spec.md)
  - Definition of Done, package contracts, primitive layer, component specifications, form infrastructure, and accessibility baselines.

### 3. Themes
- [**Obsidian Theme**](./themes/obsidian.md)
  - Dark, immersive, cinematic minimalism. Deep tonal layering, `#131313` canvas, electric blue accents, and soft ambient depth.
- [**Luminous Theme**](./themes/luminous.md)
  - Light, editorial, architectural minimalism. Crisp cool-slate surfaces, `#F8FAFC` canvas, vibrant cobalt triggers, and architectural slate shadows.

### 4. Storybook UI/UX & Documentation
- [**Storybook UI/UX & Documentation Specification**](./storybook/storybook-ui-ux-spec.md)
  - Cyberpunk-inspired engineering control center guidelines, sidebar hierarchy, interactive playgrounds, and theme comparison mode.

### 5. Releases & Publishing
- [**Publishing & Release Process**](./publishing/publishing-process.md)
  - Semantic versioning, Changesets workflow, public npm packaging, OIDC Trusted Publishing, and CI/CD pipelines.

---

## Core Guiding Principles

1. **One-Way Dependency Flow**: MFEs depend on Ripperdoc; Ripperdoc **never** depends on an MFE.
2. **Domain Agnosticism**: Only semantically generic, cross-application components belong in Ripperdoc. Domain-specific features belong inside their respective MFEs.
3. **Themes as Configuration**: Themes modify tokens via CSS custom properties; components do not fork for branding.
4. **Accessibility First**: Accessible interactions, focus management, keyboard navigation, and contrast are core requirements.
