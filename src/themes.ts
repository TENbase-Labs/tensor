/**
 * TENsor Theme Switching Utility
 *
 * Provides runtime theme switching between RoundVision and TENbase brands.
 * Themes are applied via CSS custom properties loaded from separate stylesheets.
 */

import React from 'react'

export type Theme = 'roundvision' | 'tenbase'

/**
 * Available themes in the design system
 */
export const themes = {
  roundvision: {
    name: 'RoundVision',
    className: 'theme-roundvision',
    cssFile: '/css/roundvision.css',
  },
  tenbase: {
    name: 'TENbase',
    className: 'theme-tenbase',
    cssFile: '/css/tenbase.css',
  },
} as const

/**
 * Apply a theme to the document by setting data-theme attribute
 * @param theme - The theme to apply ('roundvision' or 'tenbase')
 */
export function setTheme(theme: Theme): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

/**
 * Get the currently active theme
 * @returns The current theme or 'roundvision' as default
 */
export function getTheme(): Theme {
  if (typeof document !== 'undefined') {
    const theme = document.documentElement.getAttribute('data-theme')
    return (theme === 'tenbase' ? 'tenbase' : 'roundvision') as Theme
  }
  return 'roundvision'
}

/**
 * Toggle between available themes
 */
export function toggleTheme(): void {
  const current = getTheme()
  const next = current === 'roundvision' ? 'tenbase' : 'roundvision'
  setTheme(next)
}

/**
 * React hook for theme switching (if using React)
 * @example
 * const [theme, setTheme] = useTheme()
 */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'roundvision'
    }
    return getTheme()
  })

  const updateTheme = (theme: Theme) => {
    if (typeof window !== 'undefined') {
      setTheme(theme)
    }
    setCurrentTheme(theme)
  }

  return [currentTheme, updateTheme]
}

// Export for ES modules
export { themes as default }
