import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    // Documentation pages (ordered)
    '../src/docs/00-introduction/**/*.mdx',
    '../src/docs/01-getting-started/**/*.mdx',
    '../src/docs/02-design-tokens/**/*.mdx',
    '../src/docs/03-components/**/*.mdx',
    '../src/docs/04-themes/**/*.mdx',
    '../src/docs/05-accessibility/**/*.mdx',
    '../src/docs/06-migration/**/*.mdx',
    // Component stories
    '../src/stories/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: true,
  },
}
export default config
