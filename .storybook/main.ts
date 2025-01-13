import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "storybook-dark-mode",
    "@storybook/theming",
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  viteFinal: (config) => {
    // Ensure `config.resolve` exists
    if (!config.resolve) {
      config.resolve = { alias: {} };
    }

    // Add your alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "/src", // Adjust this to your project structure
    };

    return config;
  },
};
export { config as default };
