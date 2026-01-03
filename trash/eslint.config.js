// import js from "@eslint/js";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";

// export default [
//   js.configs.recommended,
//   {
//     files: ["**/*.{js,jsx}"],
//     languageOptions: {
//       ecmaVersion: "latest",
//       sourceType: "module",
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       react,
//       "react-hooks": reactHooks,
//     },
//     rules: {
//       "no-unused-vars": "warn",
//       "react/react-in-jsx-scope": "off",
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//   },
// ];

import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...js.environments.browser.globals, // allow console, window, etc.
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // Relaxed rules for dev workflow
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-constant-condition": "off",

      // React
      "react/react-in-jsx-scope": "off", // React 17+ JSX auto import

      // Hooks
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility
      "jsx-a11y/anchor-is-valid": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
