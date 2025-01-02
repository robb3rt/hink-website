import js from "@eslint/js";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginStorybook from "eslint-plugin-storybook";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginNode from "eslint-plugin-node";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";

export default [
  // ESLint's built-in recommended config
  js.configs.recommended,

  // Additional custom rules
  {
    rules: {
      semi: ["warn", "always"], // Example custom rule
      "tailwindcss/classnames-order": "warn", // Tailwind classnames order rule (if necessary)
    },
  },

  // Plugins object (flat config requires plugins to be in this form)
  {
    plugins: {
      react: eslintPluginReact,
      storybook: eslintPluginStorybook,
      import: eslintPluginImport,
      node: eslintPluginNode,
      prettier: eslintPluginPrettier,
      promise: eslintPluginPromise,
      unicorn: eslintPluginUnicorn,
      typescript: eslintPluginTypescript,
      "react-hooks": eslintPluginReactHooks,
      tailwindcss: eslintPluginTailwindcss,
    },
  },
];
