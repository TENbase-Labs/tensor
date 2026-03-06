/**
 * Style Dictionary Configuration - TENbase Theme
 * Extends core tokens with TENbase brand colors
 */

export default {
  source: ['tokens/core/**/*.json', 'tokens/tenbase/**/*.json'],

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'packages/tensor/dist/css/',
      files: [
        {
          destination: 'tenbase.css',
          format: 'css/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'packages/tensor/dist/js/',
      files: [
        {
          destination: 'tenbase.tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'packages/tensor/dist/json/',
      files: [
        {
          destination: 'tenbase.tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
}
