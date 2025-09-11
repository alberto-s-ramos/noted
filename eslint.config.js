import js from '@eslint/js';
import tseslint from '@typescript-eslint';

export default tseslint.config([
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugins['@typescript-eslint'],
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      'plugin:prettier/recommended',
    ],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
]);
