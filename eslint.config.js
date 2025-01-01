import js from "@eslint/js";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginStorybook from "eslint-plugin-storybook";

export default [
  // ESLint's built-in recommended config
  js.configs.recommended,

  // Additional custom rules
  {
    rules: {
      semi: ["warn", "always"], // Example custom rule
    },
  },

  // Plugins object (flat config requires plugins to be in this form)
  {
    plugins: {
      react: eslintPluginReact,
      storybook: eslintPluginStorybook,
    },
  },
];
