module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'eqeqeq': ['error', 'always'],
    'no-extra-semi': 'error',
    'no-return-await': 'error',
    'require-await': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 100, ignoreStrings: true }],
    'import/newline-after-import': ['error', { count: 2 }],
    'eol-last': ['error', 'always'],
    'semi': ['error', 'always']
  },
};
