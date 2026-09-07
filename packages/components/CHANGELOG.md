# @ripperdoc-chrome77/components

## 1.1.0

### Minor Changes

- feat(motion): introduce unified motion system, primitives, and button loading fix
  
  - **@ripperdoc-chrome77/tokens**:
    - Add centralized motion tokens (`durations`, `easings`, `springs`, `transitions`).
    - Add foundations CSS support for `[data-motion-disabled]`, `[data-reduced-motion]`, and `@keyframes rd-spin`.
  - **@ripperdoc-chrome77/components**:
    - Integrate `motion/react` (v13) with global `MotionProvider` and hooks (`useMotionConfig`, `useReducedMotion`, `useIsMotionEnabled`).
    - Add 7 declarative motion primitives (`MotionBox`, `Fade`, `Slide`, `Scale`, `Collapse`, `Stagger`, `Attention`) and 18 typed animation presets.
    - Enable interactive spring motion by default across `Button`, `Card`, and `Badge` with per-component opt-out (`motion={false}`).
    - Fix `Button` loading state: render 60fps animated spinner while preserving button label and dimensions.
    - Add interactive Storybook showcases for Motion System and Button Loading States.

### Patch Changes

- Updated dependencies
  - @ripperdoc-chrome77/tokens@1.1.0

## 1.0.0

### Patch Changes

- chore(release): bump package versions (patch)
- Updated dependencies
  - @ripperdoc-chrome77/themes@1.0.0
  - @ripperdoc-chrome77/tokens@1.0.0
  - @ripperdoc-chrome77/utils@1.0.0
