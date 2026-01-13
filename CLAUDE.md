# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tazzi is a tour management web application built with Nuxt 4, Vue 3, TypeScript, and Tailwind CSS 4. The application uses shadcn-vue for UI components with the "New York" style variant.

## Common Commands

### Development

```bash
npm run dev              # Start dev server on http://localhost:3000
npm run cleanup          # Kill processes on ports 3000 and 4983
```

### Building

```bash
npm run build            # Production build
npm run build:analyze    # Build with bundle analyzer
```

### Linting

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
```

### Git Workflow

The project uses Husky for pre-commit hooks that run lint-staged. On commit, `npm run lint` runs on all staged `.js`, `.ts`, and `.vue` files.

## Architecture

### Tech Stack

- **Framework**: Nuxt 4 (Vue 3, TypeScript)
- **Styling**: Tailwind CSS 4 with CSS variables, tw-animate-css for animations
- **UI Components**: shadcn-nuxt (New York style, lucide icons via @nuxt/icon)
- **Form Validation**: vee-validate with zod schemas
- **Table Components**: @tanstack/vue-table
- **Additional Libraries**: @vueuse/core, embla-carousel-vue, vaul-vue (drawer), vue-sonner (notifications)

### Directory Structure

- `app/` - Application-specific files (currently minimal, migrated from `app/`)
- `app.vue` - Root application component
- `components/ui/` - shadcn-vue UI components (auto-generated, excluded from linting)
- `lib/` - Utility functions (e.g., `cn()` for className merging)
- `assets/css/` - Global CSS with Tailwind imports and theme variables
- `public/` - Static assets
- `.nuxt/` - Auto-generated Nuxt files

### Path Aliases

Configured in `components.json`:

- `@/components` → components directory
- `@/lib` → lib directory
- `@/utils` → lib/utils
- `@/ui` → components/ui
- `@/composables` → composables directory

### Styling System

The project uses Tailwind CSS 4 with a custom theme system:

- CSS variables for colors defined in `assets/css/main.css`
- Supports light/dark mode via `.dark` class
- Custom variant for dark mode: `dark:` prefix
- Theme colors use OKLCH color space
- Custom radius variables (sm, md, lg, xl)
- shadcn components use CSS variable-based theming

### ESLint Configuration

Uses @antfu/eslint-config with custom rules:

- Type-only imports are not enforced
- Type definitions must use `type` (not `interface`)
- Filename case: kebabCase or PascalCase allowed
- No `console` statements (warning level)
- No direct `process.env` access (must use runtime config)
- Import sorting via perfectionist plugin
- UI components (`components/ui/`) are excluded from linting

### Component System

- UI components from shadcn-nuxt in `components/ui/`
- Components auto-import via Nuxt convention
- Icon usage via `@nuxt/icon` with Tabler icon set (`@iconify-json/tabler`)

## Important Notes

### Environment Variables

Never access `process.env` directly. The ESLint rule `node/no-process-env` is set to error. Use Nuxt's runtime config instead.

### File Naming

Files must use either kebab-case or PascalCase. The ESLint rule `unicorn/filename-case` enforces this.

### UI Components

Do not manually edit files in `components/ui/` - these are managed by shadcn-nuxt CLI. Use the shadcn CLI to add/update components.

### TypeScript

The project uses Nuxt's auto-generated TypeScript configuration. Type definitions are split across:

- `.nuxt/tsconfig.app.json` - App types
- `.nuxt/tsconfig.server.json` - Server types
- `.nuxt/tsconfig.shared.json` - Shared types
- `.nuxt/tsconfig.node.json` - Node types

### CI/CD

GitHub Actions workflow runs on PRs and pushes to main:

1. Removes node_modules and package-lock.json
2. Installs fresh dependencies with Node 22.x
3. Runs `npx nuxi prepare` to generate Nuxt types
4. Runs `npm run lint`
