module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
  ignorePatterns: [
    'node_modules/',
    '*.min.js',
    'client/.next/',
    'frontend/dist/',
    'build/',
  ],
  overrides: [
    {
      files: ['server/**/*.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['client/**/*.{js,jsx,ts,tsx}'],
      extends: ['next/core-web-vitals'],
    },
    {
      files: ['frontend/**/*.{js,jsx}'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      plugins: ['react-refresh'],
      settings: { react: { version: '18.2' } },
    },
  ],
}; 