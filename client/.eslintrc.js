const path = require('path');

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  "ignorePatterns": ["**/*.spec.ts", "**/*.js"],
  "parserOptions": {
    "sourceType": "module",
    "project": path.join(__dirname, "./tsconfig.json"),
  },
  "plugins": ["@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  rules: {
    'semi': 'always',
    'max-len': ["error", { "code": 140 }],
    'no-console': 'error',
    'no-debugger': 'error',
    'default-case': 'off',

    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        "allowExpressions": true
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "classProperty",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "require"
      }
    ],
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }
    ],
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'implicit-arrow-linebreak': 'off',
    'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-useless-constructor': 'off',
    'no-await-in-loop': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'spaced-comment': 'off',
    'function-paren-newline': 'off',
    'arrow-parens': 'off',
    'lines-between-class-members': 'off',
    'no-return-assign': 'off'

  },
};