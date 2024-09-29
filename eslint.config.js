module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json", // ważne dla Airbnb
  },
  plugins: ["react", "@typescript-eslint", "unused-imports"],
  rules: {
    "react/react-in-jsx-scope": "off", // Vite automatycznie importuje React
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "unused-imports/no-unused-imports": "error", // usuwa nieużywane importy
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
