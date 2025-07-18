module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/first': 'error',
  },
  ignorePatterns: ['node_modules/'],
};
