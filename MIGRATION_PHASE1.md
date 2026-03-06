# Phase 1 Foundation Hardening Migration Guide

This guide helps you migrate from the old token structure to the consolidated Phase 1 foundation.

## Overview

Phase 1 reduces token count by 36% while maintaining functionality:

- **Typography**: 9 → 6 levels
- **Spacing**: 12 → 8 levels
- **Container**: 11 → 5 semantic sizes (new)
- **Colors**: Always-semantic status colors
- **Removed**: Redundant z-index layers, custom breakpoints

## Token Migration Mapping

### Typography Font Sizes

**Before (9 levels):**
```typescript
tokens.typography.fontSize.xs     // 0.75rem (12px)
tokens.typography.fontSize.sm     // 0.875rem (14px)
tokens.typography.fontSize.base   // 1rem (16px)
tokens.typography.fontSize.lg     // 1.125rem (18px)
tokens.typography.fontSize.xl     // 1.25rem (20px)
tokens.typography.fontSize['2xl'] // 1.5rem (24px)
tokens.typography.fontSize['3xl'] // 1.875rem (30px)
tokens.typography.fontSize['4xl'] // 2.25rem (36px)
tokens.typography.fontSize['5xl'] // 3rem (48px)
```

**After (6 levels):**
```typescript
tokens.typography.fontSize.sm     // 0.875rem (14px)
tokens.typography.fontSize.base   // 1rem (16px)
tokens.typography.fontSize.lg     // 1.125rem (18px)
tokens.typography.fontSize.xl     // 1.25rem (20px)
tokens.typography.fontSize['2xl'] // 1.5rem (24px)
tokens.typography.fontSize['3xl'] // 1.875rem (30px)
```

**Migration:**

| Old Token | New Token | Notes |
|-----------|-----------|-------|
| `fontSize.xs` | `fontSize.sm` | Use sm for small UI text, captions |
| `fontSize.sm` | `fontSize.sm` | ✅ No change |
| `fontSize.base` | `fontSize.base` | ✅ No change |
| `fontSize.lg` | `fontSize.lg` | ✅ No change |
| `fontSize.xl` | `fontSize.xl` | ✅ No change |
| `fontSize['2xl']` | `fontSize['2xl']` | ✅ No change |
| `fontSize['3xl']` | `fontSize['3xl']` | ✅ No change |
| `fontSize['4xl']` | `fontSize['3xl']` | Consolidate large headings to 3xl |
| `fontSize['5xl']` | `fontSize['3xl']` | Consolidate hero text to 3xl |

**Example:**

```diff
// Before
<h1 style={{ fontSize: tokens.typography.fontSize['5xl'] }}>
  Hero Title
</h1>

// After
<h1 style={{ fontSize: tokens.typography.fontSize['3xl'] }}>
  Hero Title
</h1>
```

### Font Weights

**Before:**
```typescript
light: '300'      // Removed
normal: '400'
medium: '500'
semibold: '600'
bold: '700'
extrabold: '800'  // Removed
```

**After:**
```typescript
normal: '400'
medium: '500'
semibold: '600'
bold: '700'
```

**Migration:**

| Old Token | New Token | Notes |
|-----------|-----------|-------|
| `fontWeight.light` | `fontWeight.normal` | Use normal with larger size instead |
| `fontWeight.extrabold` | `fontWeight.bold` | Use bold for maximum emphasis |

### Line Heights

**Before:**
```typescript
tight: '1.25'
snug: '1.375'     // Removed
normal: '1.5'
relaxed: '1.625'
loose: '2'        // Removed
```

**After:**
```typescript
tight: '1.25'
normal: '1.5'
relaxed: '1.625'
```

**Migration:**

| Old Token | New Token | Notes |
|-----------|-----------|-------|
| `lineHeight.snug` | `lineHeight.tight` | Use tight for headings |
| `lineHeight.loose` | `lineHeight.relaxed` | Use relaxed for maximum readability |

### Spacing Tokens

**Before (12+ levels):**
```typescript
px, 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32
```

**After (8 semantic levels):**
```typescript
tokens.spacing.0      // 0
tokens.spacing.xs     // 0.25rem (4px)
tokens.spacing.sm     // 0.5rem (8px)
tokens.spacing.md     // 1rem (16px)
tokens.spacing.lg     // 1.5rem (24px)
tokens.spacing.xl     // 2rem (32px)
tokens.spacing['2xl'] // 3rem (48px)
tokens.spacing['3xl'] // 4rem (64px)
```

**Migration:**

| Old Token | New Token | Pixel Value | Notes |
|-----------|-----------|-------------|-------|
| `spacing.px` | `spacing.xs` | 4px | Consolidated |
| `spacing['0.5']` | `spacing.xs` | 4px | Rounded up |
| `spacing['1']` | `spacing.xs` | 4px | ✅ Maps to xs |
| `spacing['2']` | `spacing.sm` | 8px | ✅ Maps to sm |
| `spacing['3']` | `spacing.sm` | 8px | Rounded down |
| `spacing['4']` | `spacing.md` | 16px | ✅ Maps to md |
| `spacing['5']` | `spacing.lg` | 24px | Rounded up |
| `spacing['6']` | `spacing.lg` | 24px | ✅ Maps to lg |
| `spacing['8']` | `spacing.xl` | 32px | ✅ Maps to xl |
| `spacing['10']` | `spacing.xl` | 32px | Rounded down |
| `spacing['12']` | `spacing['2xl']` | 48px | ✅ Maps to 2xl |
| `spacing['16']` | `spacing['3xl']` | 64px | ✅ Maps to 3xl |
| `spacing['20']` | `spacing['3xl']` | 64px | Rounded down |
| `spacing['24']` | `spacing['3xl']` | 64px | Rounded down |
| `spacing['32']` | `spacing['3xl']` | 64px | Rounded down |

**Example:**

```diff
// Before
<div style={{
  padding: tokens.spacing['4'],
  margin: tokens.spacing['6'],
  gap: tokens.spacing['12'],
}}>

// After
<div style={{
  padding: tokens.spacing.md,
  margin: tokens.spacing.lg,
  gap: tokens.spacing['2xl'],
}}>
```

### Container Sizes (NEW)

**Before:** Used arbitrary max-width values

**After:**
```typescript
tokens.container.sm   // 640px - Mobile landscape, small tablets
tokens.container.md   // 768px - Tablets
tokens.container.lg   // 1024px - Desktop
tokens.container.xl   // 1280px - Large desktop
tokens.container.full // 100% - Full width
```

**Migration:**

Replace hard-coded max-width values with semantic container tokens:

```diff
// Before
<div style={{ maxWidth: '1024px' }}>

// After
<div style={{ maxWidth: tokens.container.lg }}>
```

### Colors

**No Breaking Changes** — All color tokens remain the same. Enhanced with always-semantic status colors:

```typescript
// Semantic colors (use these for meaning)
tokens.colors.primary
tokens.colors.secondary
tokens.colors.success   // ✅ Always green
tokens.colors.warning   // ✅ Always amber
tokens.colors.danger    // ✅ Always red
tokens.colors.info      // ✅ Always blue
```

**Best Practice:**

```diff
// Before (color name doesn't convey meaning)
- backgroundColor: tokens.colors.red

// After (semantic meaning preserved across themes)
+ backgroundColor: tokens.colors.danger
```

### Motion Tokens

**No Breaking Changes** — Simplified duration scale:

```typescript
tokens.motion.duration.instant  // 0ms
tokens.motion.duration.fast     // 100ms
tokens.motion.duration.normal   // 200ms
tokens.motion.duration.slow     // 300ms
```

**Removed:**
- `duration.slower` (500ms) — Use `slow` instead

**Migration:**

| Old Token | New Token | Notes |
|-----------|-----------|-------|
| `duration.slower` | `duration.slow` | 300ms is sufficient for most animations |

## Removed Features

### 1. Z-Index Dock Layer

**Before:**
```typescript
tokens.zIndex.dock  // Removed
```

**After:**
Use standard z-index layers instead:

```typescript
// Manually set z-index where needed
style={{ zIndex: 1000 }}
```

### 2. Custom Breakpoints

**Before:** Multiple custom breakpoint tokens

**After:** Use the 5 semantic container sizes for responsive design

```diff
// Before
- @media (min-width: ${tokens.breakpoint.tablet})

// After
+ @media (min-width: ${tokens.container.md})
```

## Migration Checklist

Use this checklist to ensure a complete migration:

### Phase 1: Update Typography

- [ ] Replace `fontSize.xs` with `fontSize.sm`
- [ ] Replace `fontSize['4xl']` with `fontSize['3xl']`
- [ ] Replace `fontSize['5xl']` with `fontSize['3xl']`
- [ ] Replace `fontWeight.light` with `fontWeight.normal`
- [ ] Replace `fontWeight.extrabold` with `fontWeight.bold`
- [ ] Replace `lineHeight.snug` with `lineHeight.tight`
- [ ] Replace `lineHeight.loose` with `lineHeight.relaxed`

### Phase 2: Update Spacing

- [ ] Replace numeric spacing tokens with semantic names (e.g., `spacing['4']` → `spacing.md`)
- [ ] Verify spacing looks correct after consolidation
- [ ] Use 8px grid for visual alignment

### Phase 3: Add Container Tokens

- [ ] Replace hard-coded max-width values with `tokens.container.*`
- [ ] Update responsive breakpoints to use container tokens

### Phase 4: Colors

- [ ] Replace color names with semantic tokens (e.g., `colors.red` → `colors.danger`)
- [ ] Verify color contrast ratios meet WCAG AA

### Phase 5: Motion

- [ ] Replace `duration.slower` with `duration.slow`

### Phase 6: Clean Up

- [ ] Remove references to `zIndex.dock`
- [ ] Remove custom breakpoint tokens
- [ ] Test across all themes (PlusOne, HooverSheet, etc.)

## Automated Migration

Use this regex find-replace pattern to automate common migrations:

### Typography

```regex
# Font size xs → sm
Find: tokens\.typography\.fontSize\.xs
Replace: tokens.typography.fontSize.sm

# Font size 4xl/5xl → 3xl
Find: tokens\.typography\.fontSize\['[45]xl'\]
Replace: tokens.typography.fontSize['3xl']

# Font weight light → normal
Find: tokens\.typography\.fontWeight\.light
Replace: tokens.typography.fontWeight.normal

# Font weight extrabold → bold
Find: tokens\.typography\.fontWeight\.extrabold
Replace: tokens.typography.fontWeight.bold
```

### Spacing

```regex
# spacing.1 → spacing.xs
Find: tokens\.spacing\['1'\]
Replace: tokens.spacing.xs

# spacing.2 → spacing.sm
Find: tokens\.spacing\['2'\]
Replace: tokens.spacing.sm

# spacing.4 → spacing.md
Find: tokens\.spacing\['4'\]
Replace: tokens.spacing.md

# spacing.6 → spacing.lg
Find: tokens\.spacing\['6'\]
Replace: tokens.spacing.lg

# spacing.8 → spacing.xl
Find: tokens\.spacing\['8'\]
Replace: tokens.spacing.xl

# spacing.12 → spacing.2xl
Find: tokens\.spacing\['12'\]
Replace: tokens.spacing['2xl']

# spacing.16/20/24/32 → spacing.3xl
Find: tokens\.spacing\['(?:16|20|24|32)'\]
Replace: tokens.spacing['3xl']
```

## Testing Strategy

After migration, test the following:

1. **Visual Regression**
   - Compare before/after screenshots of key pages
   - Verify spacing and typography scales look correct
   - Check responsive layouts at each container breakpoint

2. **Accessibility**
   - Run Lighthouse accessibility audit
   - Verify WCAG AA contrast ratios
   - Test keyboard navigation and screen readers

3. **Cross-Theme**
   - Test with PlusOne theme
   - Test with HooverSheet theme
   - Test with base theme

4. **Responsive**
   - Test at each container breakpoint (sm, md, lg, xl)
   - Verify touch targets meet 44px minimum

## Rollback Plan

If issues arise, you can temporarily use legacy tokens:

```typescript
// Emergency fallback (not recommended for production)
import { tokens as legacyTokens } from '@tenbaselabs/tensor/legacy';
```

## Support

If you encounter issues during migration:

1. Check this guide for token mappings
2. Review the [Design Tokens Documentation](src/docs/02-design-tokens/Overview.mdx)
3. Open an issue on GitHub with `[Migration]` prefix

## Timeline

- **Week 1**: Update tokens.ts (✅ Complete)
- **Week 2**: Migrate components and documentation
- **Week 3**: Visual regression testing
- **Week 4**: Production rollout

---

**Questions?** See [CONTRIBUTING.md](CONTRIBUTING.md) or open a GitHub issue.
