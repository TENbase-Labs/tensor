/**
 * Design tokens
 * Core design system values for colors, typography, spacing, etc.
 *
 * Phase 1: Foundation Hardening
 * - Typography: 6 levels (was 9)
 * - Spacing: 8 levels (was 12)
 * - Container: 5 semantic sizes
 * - Colors: Always-semantic status colors
 * - Motion: Duration and easing
 */

export const tokens = {
  /**
   * Color tokens
   * Semantic colors for consistent, theme-aware styling
   */
  colors: {
    // Semantic colors
    primary: '#3B82F6',
    secondary: '#10B981',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',

    // Neutral palette
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },

    // Surface colors
    surface: {
      base: '#FFFFFF',
      raised: '#F9FAFB',
      overlay: '#FFFFFF',
      sunken: '#F3F4F6',
    },

    // Text colors
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      disabled: '#D1D5DB',
      inverse: '#F9FAFB',
    },
  },

  /**
   * Typography tokens
   * Consolidated from 9 to 6 levels
   */
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },

    // 6 font sizes (consolidated from 9)
    fontSize: {
      sm: '0.875rem', // 14px - small UI text, labels
      base: '1rem', // 16px - body text, default
      lg: '1.125rem', // 18px - emphasized text, large UI
      xl: '1.25rem', // 20px - section titles, card headers
      '2xl': '1.5rem', // 24px - page subtitles, prominent headings
      '3xl': '1.875rem', // 30px - main headings, hero text
    },

    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },

    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
    },

    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
    },
  },

  /**
   * Spacing tokens
   * Consolidated to 8 levels with clear semantic names
   */
  spacing: {
    0: '0',
    xs: '0.25rem', // 4px - icon padding, tight spacing
    sm: '0.5rem', // 8px - compact lists, button padding
    md: '1rem', // 16px - card padding, form fields
    lg: '1.5rem', // 24px - component gaps, section padding
    xl: '2rem', // 32px - section margins, card spacing
    '2xl': '3rem', // 48px - major section spacing
    '3xl': '4rem', // 64px - page-level spacing, hero sections
  },

  /**
   * Container size tokens
   * 5 semantic breakpoints for responsive layouts
   */
  container: {
    sm: '640px', // Small devices, mobile landscape
    md: '768px', // Tablets
    lg: '1024px', // Desktop
    xl: '1280px', // Large desktop
    full: '100%', // Full width
  },

  /**
   * Motion tokens
   * Animation duration and easing functions
   */
  motion: {
    duration: {
      instant: '0ms',
      fast: '100ms',
      normal: '200ms',
      slow: '300ms',
    },

    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  /**
   * Border radius tokens
   */
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    full: '9999px', // Fully rounded
  },

  /**
   * Shadow tokens
   */
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
} as const

/**
 * Token type exports for TypeScript
 */
export type Tokens = typeof tokens
export type ColorToken = keyof typeof tokens.colors
export type SpacingToken = keyof typeof tokens.spacing
export type FontSizeToken = keyof typeof tokens.typography.fontSize
export type ContainerToken = keyof typeof tokens.container
