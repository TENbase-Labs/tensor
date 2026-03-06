/**
 * Style Dictionary Configuration - RoundVision Theme
 * Extends core tokens with RoundVision brand colors
 */

export default {
  source: ['tokens/core/**/*.json', 'tokens/roundvision/**/*.json'],

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'packages/tensor/dist/css/',
      files: [
        {
          destination: 'roundvision.css',
          format: 'css/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'packages/tensor/dist/js/',
      files: [
        {
          destination: 'roundvision.tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'packages/tensor/dist/json/',
      files: [
        {
          destination: 'roundvision.tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
}
