import globals from "globals";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        
      },
      globals: {
        ...globals.node,
        NodeJS: 'readonly',
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      '@typescript-eslint/no-unused-vars': 'off',  // Warn on unused variables
      '@typescript-eslint/explicit-function-return-type': 'off',  // Warn if function return types are not explicitly defined
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],  // Enforce using 'interface' for type definitions
      '@typescript-eslint/no-inferrable-types': 'off',  // Warn on redundant type declarations
      '@typescript-eslint/explicit-module-boundary-types': 'off',  // Warn on missing return types in module boundaries
      '@typescript-eslint/no-non-null-assertion': 'off',  // Warn on non-null assertions
      '@typescript-eslint/array-type': ['error', { 'default': 'array' }],  // Enforce array type definitions as 'T[]'
      '@typescript-eslint/ban-ts-comment': 'off',  // Warn on the use of @ts-<directive> comments
      '@typescript-eslint/no-empty-function': 'off',  // Warn on empty functions
      '@typescript-eslint/no-require-imports': 'off',  // Warn on require() statements
      '@typescript-eslint/no-empty-object-type': 'off',  // Warn on empty object types

    },
  },
];