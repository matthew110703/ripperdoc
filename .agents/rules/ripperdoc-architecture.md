# Ripperdoc Architecture Rules

## 1. Package Boundaries & Dependency Direction
- **Rule 1.1**: The dependency direction is strictly one-way: `MFE → Ripperdoc Global`. Ripperdoc must **never** depend on an MFE or application code.
- **Rule 1.2**: Lower-level packages must not import from higher-level packages:
  - Allowed: `components → primitives`, `components → tokens`, `components → utils`, `themes → tokens`.
  - Not allowed: `tokens → components`, `utils → components`, `primitives → components`.

## 2. Component Acceptance Criteria
- A component belongs in Ripperdoc **only** if it is semantically generic and reusable across multiple applications.
- Domain components (cart, checkout, player DRM, user profile) stay within individual MFEs.
- Components must be composed using primitives, semantic tokens, and accessible interaction patterns.

## 3. Theming & Styling Rules
- Themes are purely configuration (CSS variables); components must never be duplicated for different themes.
- Component styling must use CSS Custom Properties (`--rd-*`), `class-variance-authority` (cva), and `cn` utility.
- Never hardcode raw hex values inside component styles; always reference semantic tokens.

## 4. Accessibility & Quality
- Every interactive component must support keyboard navigation, visible focus indicators, and appropriate ARIA attributes.
- Every component must have comprehensive Storybook stories covering all states (default, hover, active, focus, disabled, loading, responsive).
- Any consumer-visible change must include a Changeset.

## 5. Git & Commit Invariant
- **Rule 5.1**: Agents must **NEVER** run `git commit` or commit changes automatically.
- **Rule 5.2**: Always leave all modified and created files in the working directory for the user to review, stage, and commit themselves.
