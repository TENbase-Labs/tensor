import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

// Import theme switcher
import { getTheme, setTheme, themes } from '../src/themes'

// Ensure theme is set for initial render
setTheme(getTheme())

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    // Theme switcher configuration
    themes: {
      themes: {
        roundvision: {
          title: themes.roundvision.name,
          color: themes.roundvision.className,
        },
        tenbase: {
          title: themes.tenbase.name,
          color: themes.tenbase.className,
        },
      },
      activeTheme: getTheme(),
      onChange: (theme: keyof typeof themes) => {
        setTheme(theme)
      },
    },
  },
}

export default preview
