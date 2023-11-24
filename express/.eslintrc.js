module.exports = {
  env: {
    browser: true,
    commonjs: true
  },
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // "no-console": ["error", { allow: ["warn", "error"] }],
    'no-undef': 'off'
  }
};
