/**
 * Style Dictionary Configuration - Multi-Brand Support
 * Base configuration that other brand configs extend from
 */

export default {
  source: ['tokens/core/**/*.json'],

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'packages/tensor/dist/css/',
      files: [
        {
          destination: 'core.css',
          format: 'css/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'packages/tensor/dist/js/',
      files: [
        {
          destination: 'core.tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
}
