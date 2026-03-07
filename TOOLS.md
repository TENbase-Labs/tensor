# TENsor Design System Tooling

Developer tooling and infrastructure for the TENsor design system.

---

## Overview

This document describes the tooling infrastructure that makes TENsor frictionless to use, maintain, and scale. All tools follow the principle: **invisible when working perfectly**.

### Tooling Philosophy

1. **Automation over manual work** — Token changes propagate automatically
2. **Consistency by default** — CLI generators enforce best practices
3. **Developer experience first** — VSCode integration, autocomplete, type safety
4. **Zero configuration** — Works out of the box

---

## Token Pipeline

### Architecture

```
Figma Design → Design Specs → tokens.ts → Style Dictionary → CSS/JS/JSON outputs
```

### Style Dictionary Configuration

**File:** `style-dictionary.config.js`

Transforms TypeScript tokens into multiple output formats:

| Format | Output | Use Case |
|---|---|---|
| **CSS** | `packages/tensor/dist/css/tokens.css` | CSS custom properties for Tailwind v4 |
| **JavaScript** | `packages/tensor/dist/js/tokens.js` | ES6 modules for runtime access |
| **JSON** | `packages/tensor/dist/json/tokens.json` | Nested format for tooling |
| **JSON (flat)** | `packages/tensor/dist/json/tokens-flat.json` | Flat structure for automation |
| **TypeScript** | `packages/tensor/dist/types/token-types.d.ts` | Type definitions for autocomplete |

### Building Tokens

```bash
# Build all token outputs
npm run build:tokens

# Build happens automatically during full build
npm run build
```

**Output example:**

```css
/* packages/tensor/dist/css/tokens.css */
:root {
  --colors-primary: #3B82F6;
  --colors-danger: #EF4444;
  --spacing-md: 1rem;
  --typography-fontSize-base: 1rem;
  /* ... all tokens as CSS custom properties */
}
```

### Token Naming Convention

All tokens follow this structure:

```
{category}-{semantic-name}-{variant}
```

Examples:
- `--colors-primary`
- `--colors-text-secondary`
- `--spacing-md`
- `--typography-fontSize-lg`
- `--container-md`

### Usage in Components

**JavaScript/TypeScript:**

```typescript
import { tokens } from '@tenbaselabs/tensor';

const Button = () => (
  <button
    style={{
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      fontSize: tokens.typography.fontSize.base,
      backgroundColor: tokens.colors.primary,
    }}
  >
    Click me
  </button>
);
```

**CSS:**

```css
.my-component {
  padding: var(--spacing-md);
  font-size: var(--typography-fontSize-base);
  color: var(--colors-text-primary);
}
```

---

## Component Generator CLI

### Quick Start

```bash
npm run create-component Button
```

### What It Creates

The CLI scaffolds a complete component with best practices:

```
packages/tensor-react/src/components/Button/
├── Button.tsx              # React component with TypeScript
├── Button.css              # Styles using design tokens
├── Button.test.tsx         # Vitest tests
├── Button.stories.tsx      # Storybook documentation
└── index.ts                # Exports
```

### Generated Component Structure

**Button.tsx:**
```typescript
import React from 'react';
import { tokens } from '@tenbaselabs/tensor';
import './Button.css';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`tensor-button ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Button.displayName = 'Button';
```

**Button.css:**
```css
.tensor-button {
  /* Base styles using design tokens */
  font-family: var(--typography-font-family-sans);
  font-size: var(--typography-font-size-base);
  color: var(--colors-text-primary);
}

/* Variants */
.tensor-button--primary {
  background-color: var(--colors-primary);
  color: var(--colors-text-inverse);
}

/* States */
.tensor-button:hover { }
.tensor-button:focus-visible {
  outline: 2px solid var(--colors-primary);
  outline-offset: 2px;
}
.tensor-button:disabled {
  color: var(--colors-text-disabled);
  cursor: not-allowed;
}
```

**Button.test.tsx:**
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  // ... more tests
});
```

**Button.stories.tsx:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Default Button' },
};
```

### CLI Validation

The generator enforces:
- ✅ PascalCase component names
- ✅ No duplicate components
- ✅ Consistent file structure
- ✅ Design token usage
- ✅ Accessibility patterns

### After Generation

1. Implement component logic in `ComponentName.tsx`
2. Add styles using design tokens in `ComponentName.css`
3. Write comprehensive tests in `ComponentName.test.tsx`
4. Document with Storybook stories in `ComponentName.stories.tsx`
5. Export from `packages/tensor-react/src/index.ts`

---

## VSCode Developer Experience

### Snippet Library

**File:** `.vscode/tensor.code-snippets`

Provides autocomplete snippets for common TENsor patterns.

### Available Snippets

| Trigger | Description |
|---|---|
| `tensor-import-tokens` | Import design tokens |
| `tensor-import-component` | Import TENsor component |
| `tensor-button` | Insert Button component |
| `tensor-card` | Insert Card component |
| `token-color` | Insert color token |
| `token-typography` | Insert typography token |
| `token-spacing` | Insert spacing token |
| `token-container` | Insert container token |
| `css-color` | Insert CSS custom property (color) |
| `css-spacing` | Insert CSS custom property (spacing) |
| `tensor-component` | Full React component template |
| `tensor-component-css` | Full CSS template |
| `tensor-story` | Storybook story template |
| `tensor-test` | Test template |
| `tensor-accessible-button` | Accessible button example |
| `tensor-container` | Responsive container |
| `tensor-heading` | Typography heading |
| `tensor-form-field` | Form field with tokens |

### Usage Example

**Type:** `token-color` → **Expands to:**

```typescript
tokens.colors.primary // (with autocomplete for all color options)
```

**Type:** `tensor-component` → **Expands to:**

```typescript
import React from 'react';
import { tokens } from '@tenbaselabs/tensor';
import './ComponentName.css';

export interface ComponentNameProps {
  // ... full component template
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  // ... complete implementation
);
```

### TypeScript Autocomplete

All tokens have full TypeScript type definitions:

```typescript
import { tokens } from '@tenbaselabs/tensor';

// Autocomplete shows all available tokens
tokens.colors.        // ← primary, secondary, success, warning, danger, ...
tokens.spacing.       // ← 0, xs, sm, md, lg, xl, 2xl, 3xl
tokens.typography.fontSize.  // ← sm, base, lg, xl, 2xl, 3xl
```

---

## Visual Regression Testing

### Argos CI Integration

**Package:** `@argos-ci/cli` + `@argos-ci/storybook`

Captures screenshots of all Storybook stories and detects visual regressions.

### Running Visual Tests

```bash
# Build Storybook
npm run build-storybook

# Upload screenshots to Argos
npm run argos
```

### CI/CD Integration

Argos runs automatically on pull requests:

1. Captures screenshots of current branch
2. Compares with base branch (main)
3. Flags visual differences
4. Requires approval before merge

### Baseline Management

- **First run:** Creates baseline screenshots
- **Subsequent runs:** Compares against baseline
- **Approving changes:** Updates baseline for future comparisons

---

## Development Workflow

### Initial Setup

```bash
# Install dependencies
npm install

# Build tokens
npm run build:tokens

# Start Storybook
npm run storybook
```

### Creating a New Component

```bash
# 1. Generate component scaffold
npm run create-component TextField

# 2. Implement component
# Edit packages/tensor-react/src/components/TextField/TextField.tsx

# 3. Add styles using tokens
# Edit packages/tensor-react/src/components/TextField/TextField.css

# 4. Write tests
# Edit packages/tensor-react/src/components/TextField/TextField.test.tsx

# 5. Document in Storybook
# Edit packages/tensor-react/src/components/TextField/TextField.stories.tsx

# 6. Run tests
npm test

# 7. View in Storybook
npm run storybook
```

### Updating Tokens

```bash
# 1. Edit tokens.ts
# Edit packages/tensor/src/tokens.ts

# 2. Rebuild token outputs
npm run build:tokens

# 3. Verify changes in Storybook
npm run storybook

# 4. Run visual regression tests
npm run build-storybook
npm run argos
```

### Release Process

```bash
# 1. Run full test suite
npm test

# 2. Type check
npm run typecheck

# 3. Lint
npm run lint

# 4. Build all packages
npm run build

# 5. Visual regression check
npm run build-storybook
npm run argos

# 6. Semantic release (automated in CI)
# Uses conventional commits to determine version bump
```

---

## Troubleshooting

### Token Changes Not Reflecting

```bash
# Clear build cache and rebuild tokens
rm -rf packages/tensor/dist
npm run build:tokens
```

### Component Generator Fails

```bash
# Ensure scripts directory exists
mkdir -p scripts

# Check file permissions
chmod +x scripts/create-component.js

# Run directly with node
node scripts/create-component.js ComponentName
```

### VSCode Snippets Not Working

1. Reload VSCode window: `Cmd+Shift+P` → "Reload Window"
2. Check file location: `.vscode/tensor.code-snippets`
3. Verify JSON syntax is valid

### Style Dictionary Build Errors

```bash
# Check config syntax
node style-dictionary.config.js

# Ensure tokens.ts is valid
npm run typecheck

# Debug with verbose output
DEBUG=* npm run build:tokens
```

---

## Reference

### File Structure

```
tensor/
├── .vscode/
│   └── tensor.code-snippets         # VSCode snippets
├── packages/
│   ├── tensor/
│   │   ├── src/
│   │   │   └── tokens.ts            # Source tokens (TypeScript)
│   │   └── dist/                    # Generated token outputs
│   │       ├── css/tokens.css
│   │       ├── js/tokens.js
│   │       ├── json/tokens.json
│   │       └── types/token-types.d.ts
│   └── tensor-react/
│       └── src/
│           └── components/          # Generated components
├── scripts/
│   └── create-component.js          # Component generator CLI
├── style-dictionary.config.js       # Token transformation config
└── package.json                     # Build scripts
```

### NPM Scripts

| Script | Description |
|---|---|
| `npm run build:tokens` | Transform tokens using Style Dictionary |
| `npm run create-component` | Generate new component scaffold |
| `npm run build` | Build tokens + TypeScript + Vite |
| `npm run storybook` | Start Storybook dev server |
| `npm run build-storybook` | Build Storybook for production |
| `npm run argos` | Upload screenshots to Argos CI |
| `npm test` | Run Vitest tests |
| `npm run lint` | Lint TypeScript files |
| `npm run typecheck` | Type check without building |

---

## Multi-Brand Theme System

### Overview

TENsor supports multiple brands (RoundVision and TENbase) with runtime theme switching. Each brand has its own color palette while sharing core tokens for typography, spacing, and layout.

### Supported Brands

| Brand | Primary Color | Use Case |
|---|---|---|
| **RoundVision** | `#3B82F6` (Blue) | TENbase Labs default |
| **TENbase** | `#8B5CF6` (Purple) | TENbase specific apps |

### Token Structure

```
tokens/
├── core/              # Shared tokens (used by all brands)
│   ├── colors.json    # Neutral colors, surface, text
│   ├── spacing.json
│   ├── typography.json
│   └── container.json
├── roundvision/       # RoundVision brand colors
│   └── colors.json    # Primary, secondary, brand colors
└── tenbase/           # TENbase brand colors
    └── colors.json    # Primary, secondary, brand colors
```

### Build Commands

```bash
# Build both themes (RoundVision + TENbase)
npm run build:tokens

# Or build a specific theme
npx style-dictionary build --config sd.roundvision.config.js
npx style-dictionary build --config sd.tenbase.config.js
```

### Usage in Components

**Import theme utilities:**
```typescript
import { setTheme, getTheme, useTheme } from '@tenbaselabs/tensor/themes'
```

**Programmatic theme switching:**
```typescript
// Set theme to RoundVision
setTheme('roundvision')

// Set theme to TENbase
setTheme('tenbase')

// Toggle between themes
function toggleTheme() {
  const current = getTheme()
  const next = current === 'roundvision' ? 'tenbase' : 'roundvision'
  setTheme(next)
}
```

**In React with hook:**
```typescript
function Component() {
  const [theme, setTheme] = useTheme()

  return (
    <div>
      <button onClick={() => setTheme('roundvision')}>
        RoundVision
      </button>
      <button onClick={() => setTheme('tenbase')}>
        TENbase
      </button>
      <p>Current: {theme}</p>
    </div>
  )
}
```

### Theme Output Files

| Theme | CSS | JS | JSON |
|---|---|---|---|
| RoundVision | `dist/css/roundvision.css` | `dist/js/roundvision.tokens.js` | `dist/json/roundvision.tokens.json` |
| TENbase | `dist/css/tenbase.css` | `dist/js/tenbase.tokens.js` | `dist/json/tenbase.tokens.json` |

### Storybook Integration

Theme switcher controls are available in Storybook preview. Use the theme selector in the toolbar or add the theme decorator to individual stories:

```typescript
import { roundvision, tenbase } from '@tenbaselabs/tensor/themes'

export const RoundVisionVersion: Story = {
  args: { ... },
  decorators: [
    (Story) => (
      <div className={roundvision.className}>
        <Story />
      </div>
    ),
  ],
}
```

---

## Design System Tooling Engineer Responsibilities

As the DSS Tooling Engineer, I maintain:

1. **Token Pipeline Automation**
   - Style Dictionary configuration
   - Build scripts for multi-format outputs
   - Token naming conventions and validation

2. **Component Generation & CLI**
   - `create-component` CLI generator
   - Component templates and scaffolding
   - Consistent structure enforcement

3. **VSCode Developer Experience**
   - Snippet library maintenance
   - Autocomplete and IntelliSense
   - Type definition exports

4. **Design System Infrastructure**
   - Visual regression testing (Argos)
   - CI/CD pipeline for releases
   - Documentation automation

**Contact:** DSS Tooling Engineer
**Reference:** `AGENTS.md` for role details

---

**Last Updated:** 2026-03-06
**Version:** 1.0
