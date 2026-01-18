# Examples for Tazzi Tailwind Standards

Based on your palette.css and structure.

## Tokenization Example

Extend palette.css for spacing (add to 01-settings/palette.css):

```css
@layer base {
  :root {
    /* Existing from your file */
    --spacing-global: 1rem;
    --spacing-section: 3rem;
  }

  .dark {
    /* No change needed for spacing unless theme-specific */
  }
}
```

## @Apply Example in Components

In 06-components/buttons.css:

CSS

```
@layer components {
  .btn {
    @apply px-[var(--spacing-global)] py-[calc(var(--spacing-global)*0.5)] rounded-[var(--radius)] font-medium;
  }
  .btn-primary {
    @apply btn bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-opacity-90;
  }
}
```

Usage in Vue: <button class="btn btn-primary">Submit</button>

## Section Example

In 06-components/sections.css:

CSS

```
@layer components {
  .section {
    @apply mb-[var(--spacing-section)] p-[var(--spacing-global)] bg-[var(--background)] rounded-[var(--radius)];
  }
}
```

This ensures consistent spacing/colors across pages.
