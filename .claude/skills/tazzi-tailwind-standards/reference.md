# Reference for Tazzi Tailwind Standards

Detailed rules based on your palette.css and ITCSS structure.

## Tokenization (CSS Variables in Settings)

Rationale: OKLCH ensures perceptual consistency; prevents random values.

- Current (from palette.css): --radius, --background, --primary, --card, --muted, --accent, --destructive, --border, --ring, --chart-_, --sidebar-_ (light/dark modes).
- Additions: For spacing (e.g., --spacing-global: 1rem; --spacing-section: 3rem;), typography, shadows—add to palette.css or tokens.css in 01-settings.
- Usage: var(--primary), var(--radius); always with fallback.
- Process: From mockups, if repeated value (e.g., 3rem mb), add token + update.
  Edge: Calc for derived (e.g., --spacing-double: calc(var(--spacing-global) \* 2)).
  Anti-Patterns: Hardcoded OKLCH/rem in higher layers; no fallbacks.

## @Apply and Layered Composition

Rationale: Structures for consistency; @apply references tokens.

- In components: @layer components { .section { @apply mb-[var(--spacing-section)] p-[var(--spacing-global)]; } }
- Variants: .btn-primary { @apply bg-[var(--primary)] text-[var(--primary-foreground)]; }
- Layers: base (palette.css), components (composed), utilities (overrides).
- Avoid: @apply in settings; deep nesting.
  Edge: Hover/focus: .btn:hover { @apply bg-opacity-90; }
  Anti-Patterns: Mixing inline + @apply; ignoring layers.

## Folder Structure and Integration

Rationale: ITCSS for scalability (settings first, utilities last).

- 01-settings: palette.css (colors), tokens.css (spacing if separate), typography.css, etc.
- 06-components: @apply classes (e.g., buttons, cards).
- 07-utilities: Custom utilities if needed.
- main.css: @import all layers.
- Nuxt: Import main.css in app.vue or layout.
- Config (future): Extend spacing/colors with vars if patterns solidify.
  Edge: Dark mode via .dark class; media queries in higher layers.
  Anti-Patterns: Out-of-order imports; skipping layers.
