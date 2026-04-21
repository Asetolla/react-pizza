module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true,
  },

  extends: [
    "react-app",
    "react-app/jest",
    "plugin:storybook/recommended",
    "prettier",
  ],

  plugins: ["react", "@typescript-eslint"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    // TS
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",

    // React
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    // General
    "no-console": "warn",
    "no-empty": "warn",
    "no-unused-expressions": "error",
  },
};
