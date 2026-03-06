# Design Specification: Foundation Token System

**Project:** TENsor Design System
**Phase:** Phase 1 — Foundation Hardening
**Author:** Creative Director
**Date:** March 6, 2026
**Status:** Ready for Implementation

---

## Executive Summary

This specification defines the consolidated design token system for TENsor, reducing token count by 36% while maintaining full functionality. The consolidation focuses on five core token categories: typography, spacing, containers, colors, and motion.

### Key Changes

| Category | Before | After | Reduction |
|---|---|---|---|
| Typography sizes | 9 levels | 6 levels | 33% |
| Spacing scale | 12 levels | 8 levels | 33% |
| Container sizes | 11 breakpoints | 5 semantic | 55% |
| Colors | Mixed semantic/literal | Always semantic | Structure change |

**Strategic Rationale:** Fewer, more intentional tokens reduce cognitive load, speed up design decisions, and create a more cohesive visual language across all TENbase Labs products.

---

## 1. Typography Scale

### Overview

**Goal:** Consolidate from 9 to 6 font size levels with clear semantic purpose.

**Design Philosophy:** Each size level serves a distinct purpose in the typographic hierarchy. The consolidated scale maintains visual rhythm while eliminating redundant intermediate sizes that created decision paralysis.

### Font Size Specification

| Token | Value | Pixels | Use Case | Rationale |
|---|---|---|---|---|
| `sm` | 0.875rem | 14px | Small UI text, labels, captions, metadata | Minimum readable size for secondary information |
| `base` | 1rem | 16px | Body text (default), form inputs, primary content | Web accessibility standard, optimal reading size |
| `lg` | 1.125rem | 18px | Emphasized body text, large UI components | Subtle emphasis without full heading weight |
| `xl` | 1.25rem | 20px | Section titles, card headers, tertiary headings | Clear hierarchy step for subsection organization |
| `2xl` | 1.5rem | 24px | Page subtitles, secondary headings (H2-H3) | Strong visual presence for section breaks |
| `3xl` | 1.875rem | 30px | Main headings (H1), hero text, page titles | Maximum impact for primary page headings |

### Removed Sizes (Migration Path)

| Old Token | Old Value | Migration Target | Notes |
|---|---|---|---|
| `xs` | 12px | `sm` (14px) | Too small for accessibility |
| `md` (redundant) | 17px | `base` or `lg` | Between base and lg, no distinct purpose |
| `4xl` | 36px | `3xl` (30px) | Rarely used, excessive for most layouts |
| `5xl` | 48px | `3xl` (30px) + weight variation | Use `3xl` with `bold` weight instead |

### Font Weight Specification

| Token | Value | Use Case |
|---|---|---|
| `normal` | 400 | Body text, descriptions, default content |
| `medium` | 500 | Subheadings, emphasized text, form labels |
| `semibold` | 600 | Buttons, strong emphasis, tertiary headings |
| `bold` | 700 | Primary headings (H1-H3), critical emphasis |

**Removed:** `light` (300), `extrabold` (800) — use size + normal/bold combinations instead for better hierarchy control.

### Line Height Specification

| Token | Value | Paired Font Sizes | Use Case |
|---|---|---|---|
| `tight` | 1.25 | `2xl`, `3xl` | Large display text, headings where vertical space is constrained |
| `normal` | 1.5 | `sm`, `xl` | Default for UI text and small headings |
| `relaxed` | 1.625 | `base`, `lg` | Comfortable reading for body text and longer content |

**Removed:** `snug` (1.375), `loose` (1.75) — three line heights cover all use cases with clearer semantic intent.

### Letter Spacing Specification

| Token | Value | Use Case |
|---|---|---|
| `tight` | -0.025em | Large headings, display text (optical correction) |
| `normal` | 0em | Body text, default (no tracking adjustment) |
| `wide` | 0.025em | Uppercase text, all-caps labels, small text for legibility |

**Removed:** `tighter`, `wider`, `widest` — three levels provide sufficient range without over-engineering.

### Typography Patterns

#### Heading Hierarchy

```typescript
// H1 — Page title (hero)
{
  fontSize: tokens.typography.fontSize['3xl'],  // 30px
  fontWeight: tokens.typography.fontWeight.bold,  // 700
  lineHeight: tokens.typography.lineHeight.tight,  // 1.25
  letterSpacing: tokens.typography.letterSpacing.tight,  // -0.025em
}

// H2 — Major section heading
{
  fontSize: tokens.typography.fontSize['2xl'],  // 24px
  fontWeight: tokens.typography.fontWeight.bold,  // 700
  lineHeight: tokens.typography.lineHeight.tight,  // 1.25
}

// H3 — Subsection heading
{
  fontSize: tokens.typography.fontSize.xl,  // 20px
  fontWeight: tokens.typography.fontWeight.semibold,  // 600
  lineHeight: tokens.typography.lineHeight.normal,  // 1.5
}

// Body — Default paragraph text
{
  fontSize: tokens.typography.fontSize.base,  // 16px
  fontWeight: tokens.typography.fontWeight.normal,  // 400
  lineHeight: tokens.typography.lineHeight.relaxed,  // 1.625
}
```

### Accessibility Requirements (WCAG AA)

| Font Size | Font Weight | Minimum Contrast Ratio | Notes |
|---|---|---|---|
| < 18px | 400-500 | 4.5:1 | Standard body text |
| < 18px | 600-700 | 3:1 | Bold text exception |
| ≥ 18px | Any | 3:1 | Large text exception |

**Critical:** Never use `sm` (14px) for critical content with low-contrast colors. Reserve `sm` for metadata with high contrast (e.g., `#111827` on `#FFFFFF` = 16.1:1).

---

## 2. Spacing Scale

### Overview

**Goal:** Consolidate to 8 levels with semantic names based on an 8px grid system.

**Design Philosophy:** An 8px base grid provides visual alignment and predictable spacing. The scale follows a geometric progression (4, 8, 16, 24, 32, 48, 64) for natural rhythm.

### Spacing Specification

| Token | Value | Pixels | Use Case | Rationale |
|---|---|---|---|---|
| `0` | 0 | 0 | No spacing, reset margins/padding | Explicit zero for intentional removal of space |
| `xs` | 0.25rem | 4px | Icon padding, minimal spacing, fine adjustments | Half-grid for optical corrections |
| `sm` | 0.5rem | 8px | Compact lists, button padding (vertical), tight layouts | Base grid unit |
| `md` | 1rem | 16px | Card padding, form fields, default component spacing | 2× base grid, comfortable default |
| `lg` | 1.5rem | 24px | Component gaps, section padding, breathing room | 3× base grid, clear separation |
| `xl` | 2rem | 32px | Section margins, card spacing, major component gaps | 4× base grid, strong separation |
| `2xl` | 3rem | 48px | Major section spacing, subsection breaks | 6× base grid, emphatic separation |
| `3xl` | 4rem | 64px | Page-level spacing, hero sections, maximum separation | 8× base grid, architectural spacing |

### Removed Spacing Levels (Migration Path)

| Old Token | Old Value | Migration Target | Notes |
|---|---|---|---|
| `1` | 0.25rem | `xs` | Renamed for semantic clarity |
| `2` | 0.5rem | `sm` | Renamed for semantic clarity |
| `3` | 0.75rem | `sm` or `md` | Between sm/md, no distinct purpose |
| `4` | 1rem | `md` | Renamed for semantic clarity |
| `5` | 1.25rem | `md` or `lg` | Between md/lg, use md for most cases |
| `6` | 1.5rem | `lg` | Renamed for semantic clarity |
| `8` | 2rem | `xl` | Renamed for semantic clarity |
| `10` | 2.5rem | `xl` or `2xl` | Between xl/2xl, round to xl |
| `12` | 3rem | `2xl` | Renamed for semantic clarity |
| `16` | 4rem | `3xl` | Renamed for semantic clarity |

### Usage Guidelines by Context

#### Component Internal Spacing

| Context | Spacing | Example |
|---|---|---|
| Icon padding | `xs` (4px) | Icon button internal padding |
| Button padding (vertical) | `sm` (8px) | Top/bottom padding for default button |
| Button padding (horizontal) | `md` or `lg` (16-24px) | Left/right padding for balanced proportion |
| Form field padding | `md` (16px) | Input field internal padding |
| Card padding | `md` or `lg` (16-24px) | Card internal padding depending on content density |

#### Layout Spacing

| Context | Spacing | Example |
|---|---|---|
| List item gap | `sm` (8px) for compact, `md` (16px) for comfortable | Gap between list items |
| Component gap | `lg` (24px) | Gap between distinct components (cards, sections) |
| Section margin | `xl` (32px) | Margin between major content sections |
| Major section spacing | `2xl` (48px) | Breathing room between primary page sections |
| Hero/page-level spacing | `3xl` (64px) | Top/bottom spacing for hero sections |

### Accessibility Considerations

**Touch Target Minimum:** 44px × 44px (WCAG 2.1 Level AA)

Example: Button with accessible height
- Vertical padding: `sm` (8px) × 2 = 16px
- Font size: `base` (16px)
- Line height: `normal` (1.5) → 16px × 1.5 = 24px
- **Total height:** 16 + 24 + 16 = 56px ✅ (exceeds 44px minimum)

---

## 3. Container Sizes

### Overview

**Goal:** Consolidate to 5 semantic container sizes from 11 arbitrary breakpoints.

**Design Philosophy:** Responsive layouts should adapt to device categories (mobile, tablet, desktop, wide) with semantic names, not numeric pixel values. This improves code readability and future-proofs design decisions.

### Container Specification

| Token | Max Width | Device Category | Use Case | Rationale |
|---|---|---|---|---|
| `sm` | 640px | Mobile landscape, small tablets | Narrow content, mobile-optimized views | Comfortable single-column reading on small devices |
| `md` | 768px | Tablets (portrait) | Standard content width, forms, articles | Optimal line length for readability (60-75 characters) |
| `lg` | 1024px | Tablets (landscape), small desktops | Dashboard layouts, multi-column content | Supports 2-3 column layouts without excessive width |
| `xl` | 1280px | Desktop monitors | Wide dashboards, data tables | Utilizes desktop screen real estate effectively |
| `full` | 100% | Full viewport width | Hero sections, full-bleed images, navigation | Breaks out of container for visual impact |

### Removed Container Sizes (Migration Path)

All numeric breakpoints consolidated into semantic names:

| Old Token | Old Value | Migration Target | Notes |
|---|---|---|---|
| `xs` | 480px | `sm` (640px) | Too narrow for modern mobile landscape |
| `2xl` | 1536px | `xl` (1280px) | Excessive for most content, use `xl` + padding |
| Arbitrary numeric values | Various | Use semantic tokens above | Map to nearest semantic container |

### Responsive Usage Pattern

```typescript
// Mobile-first container with responsive max-width
<div style={{
  width: '100%',
  maxWidth: tokens.container.sm,  // 640px on mobile
  padding: tokens.spacing.md,
  margin: '0 auto',

  // Increase max-width on larger screens
  '@media (min-width: 768px)': {
    maxWidth: tokens.container.md,  // 768px on tablet
  },
  '@media (min-width: 1024px)': {
    maxWidth: tokens.container.lg,  // 1024px on desktop
  },
}}>
  Content
</div>
```

---

## 4. Semantic Colors

### Overview

**Goal:** Always-semantic color system that adapts to themes without hard-coded literal values.

**Design Philosophy:** Colors should express meaning (primary, danger, success) rather than appearance (blue, red, green). This enables theme switching and ensures visual consistency across products.

### Semantic Color Specification

#### Status Colors

| Token | Base Value | Use Case | Accessibility | Notes |
|---|---|---|---|---|
| `primary` | `#3B82F6` (blue) | Primary brand actions, links, focus states | WCAG AA on white (4.5:1) | Overridden by theme |
| `secondary` | `#10B981` (green) | Secondary actions, alternative CTAs | WCAG AA on white (3.3:1) | Use with caution on light backgrounds |
| `success` | `#10B981` (green) | Success messages, confirmations, positive states | WCAG AA on white (3.3:1) | Pair with iconography for colorblind users |
| `warning` | `#F59E0B` (amber) | Warning messages, caution states, alerts | WCAG AA on white (2.8:1) ⚠️ | Requires darker shade for text |
| `danger` | `#EF4444` (red) | Error messages, destructive actions, critical alerts | WCAG AA on white (4.3:1) | Strong semantic meaning, use sparingly |
| `info` | `#3B82F6` (blue) | Informational messages, help text, tooltips | WCAG AA on white (4.5:1) | Same as primary for consistency |

**Warning Token Note:** The base warning color (#F59E0B) at 2.8:1 contrast does NOT meet WCAG AA (4.5:1). For text usage, use `warning` backgrounds with dark text, or use the darker icon variant below.

#### Icon Color Variants

For icons used on light backgrounds (Alert, Toast, notification components), use these WCAG AA-compliant darker variants:

| Token | Base Value | Contrast on White | Use Case | Notes |
|---|---|---|---|---|
| `success.icon` | `#059669` (darker green) | 4.5:1 ✅ | Success icons on light backgrounds | Meets WCAG AA for graphical objects |
| `warning.icon` | `#D97706` (darker amber) | 4.6:1 ✅ | Warning icons on light backgrounds | Meets WCAG AA for graphical objects |

**When to Use:**
- ✅ Use `success.icon` and `warning.icon` for icons in Alert, Toast, and notification components on light backgrounds
- ✅ Use base `success` and `warning` for backgrounds, borders, and colored surfaces
- ✅ Always pair icon color with text label for accessibility (redundant cues for colorblind users)

#### Neutral Palette

| Token | Value | Use Case |
|---|---|---|
| `neutral.50` | `#F9FAFB` | Lightest background, subtle surfaces |
| `neutral.100` | `#F3F4F6` | Hover states, disabled backgrounds |
| `neutral.200` | `#E5E7EB` | Borders, dividers (light mode) |
| `neutral.300` | `#D1D5DB` | Disabled text, placeholder text |
| `neutral.400` | `#9CA3AF` | Subtle text, secondary borders |
| `neutral.500` | `#6B7280` | Secondary text, icons |
| `neutral.600` | `#4B5563` | Body text (dark mode), strong borders |
| `neutral.700` | `#374151` | Headings (dark mode), emphasized text |
| `neutral.800` | `#1F2937` | Dark backgrounds, navigation bars |
| `neutral.900` | `#111827` | Primary text (light mode), highest contrast |

**Contrast Ratios (on white #FFFFFF):**
- `neutral.900`: 16.1:1 ✅ (primary text)
- `neutral.700`: 10.5:1 ✅ (headings)
- `neutral.500`: 4.6:1 ✅ (secondary text, minimum AA)
- `neutral.400`: 3.0:1 ❌ (fails AA, use for disabled states only)
- `neutral.300`: 2.1:1 ❌ (fails AA, borders/dividers only)

#### Surface Colors

| Token | Value | Use Case |
|---|---|---|
| `surface.base` | `#FFFFFF` | Default background, cards in light mode |
| `surface.raised` | `#F9FAFB` | Elevated surfaces, modals, popovers |
| `surface.overlay` | `#FFFFFF` | Overlays, dropdowns, tooltips |
| `surface.sunken` | `#F3F4F6` | Inset surfaces, wells, disabled areas |

#### Text Colors

| Token | Value | Use Case | Contrast on White |
|---|---|---|---|
| `text.primary` | `#111827` | Primary content, headings, body text | 16.1:1 ✅ |
| `text.secondary` | `#6B7280` | Secondary content, labels, captions | 4.6:1 ✅ |
| `text.tertiary` | `#9CA3AF` | Placeholder text, metadata, timestamps | 3.0:1 ❌ (use for non-critical text) |
| `text.disabled` | `#D1D5DB` | Disabled form fields, inactive states | 2.1:1 ❌ (disabled states only) |
| `text.inverse` | `#F9FAFB` | Text on dark backgrounds | 15.2:1 on `neutral.900` ✅ |

### Color Usage Rules

#### Do's

✅ **Use semantic tokens** for meaning
```typescript
// Good — semantic intent
backgroundColor: tokens.colors.danger
color: tokens.colors.text.primary

// Bad — literal color
backgroundColor: '#EF4444'  // What does this mean?
```

✅ **Ensure sufficient contrast** for text
```typescript
// Good — primary text on white
color: tokens.colors.text.primary  // 16.1:1 ✅

// Bad — tertiary text for critical content
color: tokens.colors.text.tertiary  // 3.0:1 ❌ (fails AA)
```

✅ **Pair color with other indicators** (iconography, text)
```typescript
// Good — color + icon for status
<Alert color={tokens.colors.success} icon={<CheckIcon />}>
  Success message
</Alert>

// Bad — color alone (inaccessible for colorblind users)
<div style={{ color: tokens.colors.success }}>Success</div>
```

#### Don'ts

❌ **Don't use literal color values** outside the token system
❌ **Don't rely on color alone** for critical information (accessibility)
❌ **Don't use low-contrast text** for important content
❌ **Don't override theme colors** with hard-coded values

---

## 5. Token Naming Conventions

### Naming Pattern

All tokens follow a consistent hierarchical structure:

```
{category}.{semantic-name}.{variant}
```

### Category Structure

| Category | Structure | Examples |
|---|---|---|
| **Colors** | `colors.{semantic}` or `colors.{category}.{shade}` | `colors.primary`, `colors.neutral.500`, `colors.text.secondary` |
| **Typography** | `typography.{property}.{level}` | `typography.fontSize.lg`, `typography.fontWeight.bold` |
| **Spacing** | `spacing.{size}` | `spacing.md`, `spacing.xl` |
| **Container** | `container.{breakpoint}` | `container.sm`, `container.lg` |
| **Motion** | `motion.{property}.{speed}` | `motion.duration.fast`, `motion.easing.easeInOut` |

### Semantic Naming Rules

1. **Use semantic names** over descriptive values
   - ✅ `spacing.md` (intent: medium spacing)
   - ❌ `spacing.16px` (implementation detail)

2. **Use size progression** for scales
   - ✅ `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` (clear progression)
   - ❌ `tiny`, `small`, `regular`, `big`, `huge` (unclear boundaries)

3. **Use purpose-based names** for colors
   - ✅ `colors.danger` (intent: error state)
   - ❌ `colors.red` (appearance, not meaning)

4. **Use consistent casing**
   - camelCase for property access: `tokens.colors.primary`
   - Bracket notation for numeric/special characters: `tokens.spacing['2xl']`

### Namespace Structure

```typescript
export const tokens = {
  // Colors: semantic first, palette second
  colors: {
    primary: string,
    secondary: string,
    success: string,
    warning: string,
    danger: string,
    info: string,
    neutral: { 50: string, 100: string, /* ... */ 900: string },
    surface: { base: string, raised: string, overlay: string, sunken: string },
    text: { primary: string, secondary: string, tertiary: string, disabled: string, inverse: string },
  },

  // Typography: property → level
  typography: {
    fontFamily: { sans: string, serif: string, mono: string },
    fontSize: { sm: string, base: string, lg: string, xl: string, '2xl': string, '3xl': string },
    fontWeight: { normal: string, medium: string, semibold: string, bold: string },
    lineHeight: { tight: string, normal: string, relaxed: string },
    letterSpacing: { tight: string, normal: string, wide: string },
  },

  // Spacing: flat size scale
  spacing: {
    0: string,
    xs: string,
    sm: string,
    md: string,
    lg: string,
    xl: string,
    '2xl': string,
    '3xl': string,
  },

  // Container: semantic breakpoints
  container: {
    sm: string,
    md: string,
    lg: string,
    xl: string,
    full: string,
  },

  // Motion: property → speed
  motion: {
    duration: { instant: string, fast: string, normal: string, slow: string },
    easing: { linear: string, easeIn: string, easeOut: string, easeInOut: string },
  },

  // Additional categories (not changed in Phase 1)
  borderRadius: { /* ... */ },
  shadow: { /* ... */ },
} as const;
```

---

## 6. Implementation Guidelines

### TypeScript Type Safety

All tokens export TypeScript types for autocomplete and type safety:

```typescript
export type Tokens = typeof tokens;
export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.typography.fontSize;
export type ContainerToken = keyof typeof tokens.container;
```

### CSS Custom Properties Integration

For Tailwind CSS v4 integration, tokens should be exported as CSS custom properties:

```css
:root {
  /* Colors */
  --color-primary: #3B82F6;
  --color-danger: #EF4444;

  /* Typography */
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;

  /* Spacing */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Container */
  --container-md: 768px;
  --container-lg: 1024px;
}
```

### Theme Override Pattern

Themes override base tokens while inheriting others:

```typescript
// Base tokens
tokens.colors.primary → '#3B82F6' (blue)

// PlusOne theme override
plusOneTheme.colors.primary → '#FF6B35' (orange)

// Consumer code (unchanged)
<Button style={{ backgroundColor: tokens.colors.primary }} />
// Renders blue with base theme, orange with PlusOne theme
```

---

## 7. Migration Strategy

### Automated Token Replacement

Create a migration script that replaces old tokens with new semantic tokens:

```typescript
// Migration map
const tokenMigrationMap = {
  'fontSize.xs': 'fontSize.sm',
  'fontSize.4xl': 'fontSize.3xl',
  'spacing.1': 'spacing.xs',
  'spacing.4': 'spacing.md',
  'container.2xl': 'container.xl',
};
```

### Visual Regression Testing

Before finalizing migration:
1. Capture screenshots of all components with old tokens
2. Apply new token system
3. Capture screenshots with new tokens
4. Compare for unintended visual changes
5. Adjust token values if regressions detected

### Rollout Phases

1. **Phase 1a:** Implement new token structure, maintain old tokens (deprecated)
2. **Phase 1b:** Migrate internal components to new tokens
3. **Phase 1c:** Update documentation, notify consumers
4. **Phase 1d:** Remove deprecated tokens in next major version

---

## 8. Validation Checklist

### Before Implementation

- [ ] All token values have clear semantic names
- [ ] All color combinations meet WCAG AA contrast ratios (4.5:1 for text)
- [ ] Spacing scale uses 8px grid system
- [ ] Typography scale has distinct use cases (no redundant sizes)
- [ ] Container sizes are semantic, not numeric
- [ ] TypeScript types exported for all token categories
- [ ] Migration map created for all removed tokens

### After Implementation

- [ ] All components render correctly with new tokens
- [ ] Visual regression tests pass
- [ ] Documentation updated with new token names
- [ ] Storybook stories reflect new token usage
- [ ] Accessibility audit confirms WCAG AA compliance
- [ ] Theme switching works without hard-coded overrides

---

## 9. Appendix: Token Reference Tables

### Complete Typography Scale

| Token | Value | px | Line Height | Weight | Use Case |
|---|---|---|---|---|---|
| `sm` | 0.875rem | 14 | normal (1.5) | normal (400) | Labels, captions |
| `base` | 1rem | 16 | relaxed (1.625) | normal (400) | Body text |
| `lg` | 1.125rem | 18 | relaxed (1.625) | normal (400) | Emphasized text |
| `xl` | 1.25rem | 20 | normal (1.5) | semibold (600) | Card headers |
| `2xl` | 1.5rem | 24 | tight (1.25) | bold (700) | Section headings |
| `3xl` | 1.875rem | 30 | tight (1.25) | bold (700) | Page titles |

### Complete Spacing Scale

| Token | Value | px | Common Use Cases |
|---|---|---|---|
| `0` | 0 | 0 | Reset spacing |
| `xs` | 0.25rem | 4 | Icon padding, micro-adjustments |
| `sm` | 0.5rem | 8 | Button padding (vertical), compact lists |
| `md` | 1rem | 16 | Card padding, form fields |
| `lg` | 1.5rem | 24 | Component gaps, section padding |
| `xl` | 2rem | 32 | Section margins, major spacing |
| `2xl` | 3rem | 48 | Section breaks |
| `3xl` | 4rem | 64 | Hero sections, page-level spacing |

### Complete Container Scale

| Token | Max Width | Device | Layout |
|---|---|---|---|
| `sm` | 640px | Mobile landscape | Single column |
| `md` | 768px | Tablet portrait | Narrow content |
| `lg` | 1024px | Tablet landscape | 2-3 columns |
| `xl` | 1280px | Desktop | Wide dashboards |
| `full` | 100% | All devices | Full bleed |

### Complete Color Palette

#### Semantic Colors

| Token | Hex | Contrast on White | Use Case |
|---|---|---|---|
| `primary` | #3B82F6 | 4.5:1 ✅ | Brand actions |
| `secondary` | #10B981 | 3.3:1 ⚠️ | Secondary CTAs |
| `success` | #10B981 | 3.3:1 ⚠️ | Success states |
| `warning` | #F59E0B | 2.8:1 ❌ | Warning backgrounds |
| `danger` | #EF4444 | 4.3:1 ✅ | Error states |
| `info` | #3B82F6 | 4.5:1 ✅ | Informational |

#### Neutral Palette (with contrast ratios on white)

| Token | Hex | Contrast | Text Safe? |
|---|---|---|---|
| `neutral.50` | #F9FAFB | 1.03:1 | ❌ Background only |
| `neutral.100` | #F3F4F6 | 1.06:1 | ❌ Background only |
| `neutral.200` | #E5E7EB | 1.14:1 | ❌ Borders only |
| `neutral.300` | #D1D5DB | 2.1:1 | ❌ Disabled states |
| `neutral.400` | #9CA3AF | 3.0:1 | ❌ Non-critical text |
| `neutral.500` | #6B7280 | 4.6:1 | ✅ Secondary text (AA) |
| `neutral.600` | #4B5563 | 7.0:1 | ✅ Body text (AAA) |
| `neutral.700` | #374151 | 10.5:1 | ✅ Headings (AAA) |
| `neutral.800` | #1F2937 | 14.1:1 | ✅ Dark backgrounds |
| `neutral.900` | #111827 | 16.1:1 | ✅ Primary text (AAA) |

---

## Conclusion

This design specification provides unambiguous direction for implementing the Phase 1 Foundation Hardening token system. All design decisions are grounded in accessibility standards (WCAG AA), visual hierarchy principles, and developer experience.

**Next Steps:**
1. DSS Tooling Engineer implements token structure in `packages/tensor/src/tokens.ts`
2. Create migration map for deprecated tokens
3. Update component library to use new tokens
4. Run visual regression tests
5. Update documentation and Storybook

**Approval Required From:**
- CEO (strategic alignment)
- DSS Tooling Engineer (technical feasibility)

---

**Document Version:** 1.0
**Last Updated:** 2026-03-06
**Status:** ✅ Ready for Implementation
