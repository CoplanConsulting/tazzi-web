---
name: tazzi-tailwind-standards
description: Enforces Tailwind CSS standards for the Tazzi app using your ITCSS-layered hybrid system (CSS vars/tokens in settings + @apply in components/utilities) for consistent design across components/pages. Use this skill when generating or reviewing Tailwind code to prevent inconsistent values and align with Stylelint (custom-property-no-missing-var-function, at-rule-no-unknown).
---

# Tazzi Tailwind Standards

This skill enforces your ITCSS folder structure (assets/css/01-settings → 07-utilities) with tokens (CSS vars in palette.css/tokens.css) and @apply for composed classes. Tokens prevent LLM inconsistencies (e.g., varying margins); add iteratively from mockups. Aligns with Stylelint (extends standard/tailwindcss; require var() for customs). Code uses ESLint stylistic (double quotes, semi-colons, 2-space indent).

Workflow for Tailwind tasks:

1. Identify layer (settings/tokens, components, etc.).
2. Reference existing tokens (palette.css example); propose new ones only if pattern repeats.
3. Apply section.
4. Validate: Ensure var() usage, proper @layer.
5. Output: Compliant CSS, with examples from [examples.md](examples.md).

## Tokenization (CSS Variables in Settings)

- Define in 01-settings/palette.css or tokens.css (OKLCH, :root + .dark).
- Categories: Colors (--primary, --background), spacing (--spacing-global if added), radius (--radius), etc.
- Patterns: Start with palette.css defaults; add only when mockups show repeats (e.g., common 2rem margin → new token).
- Require: Always use var(--token, fallback).
  Load [reference.md#tokenization](reference.md#tokenization) for details.

## @Apply and Layered Composition

- Use @apply in 06-components or 07-utilities (e.g., .btn { @apply ... }).
- Patterns: Compose utilities + tokens for reusability (buttons, cards, sections).
- Layers: @layer base (tokens), components (compositions), utilities (overrides).
- Avoid: Inline utilities for core elements; random values.
  Load [reference.md#apply-and-layered-composition](reference.md#apply-and-layered-composition) for details.

## Folder Structure and Integration

- Follow assets/css structure: 01-settings (tokens), 06-components (@apply), 07-utilities, main.css imports.
- Integration: Import main.css in Nuxt; use classes in Vue templates.
- Iterative: Add tokens/config extends as needed.
  Load [reference.md#folder-structure-and-integration](reference.md#folder-structure-and-integration) for details.
