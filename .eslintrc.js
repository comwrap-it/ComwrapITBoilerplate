export default {
  root: true,
  plugins: ['solid', 'prettier'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
      browser: true,
      es2022: true,
  },
  parserOptions: {
      allowImportExportEverywhere: true,
      ecmaVersion: 2022,
      sourceType: 'module',
  },
  rules: {
      'no-var': 'error',
      'require-await': 'error',
      'guard-for-in': 2,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
