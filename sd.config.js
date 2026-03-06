/**
 * Style Dictionary Configuration
 * Transforms design tokens from JSON to CSS, JSON, and other formats
 *
 * Pipeline: tokens/*.json → Style Dictionary → CSS/JS/JSON outputs
 */

export default {
  source: ['tokens/**/*.json'],

  platforms: {
    // CSS custom properties for Tailwind CSS v4
    css: {
      transformGroup: 'css',
      buildPath: 'packages/tensor/dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },

    // JavaScript/ES6 modules
    js: {
      transformGroup: 'js',
      buildPath: 'packages/tensor/dist/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },

    // JSON for tooling and documentation
    json: {
      transformGroup: 'js',
      buildPath: 'packages/tensor/dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
        {
          destination: 'tokens-flat.json',
          format: 'json/flat',
        },
      ],
    },
  },
}
