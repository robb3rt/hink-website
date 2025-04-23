import remarkGfm from "remark-gfm";
import type { StorybookConfig } from "@storybook/react-vite";
import { loadEnv } from 'vite';

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
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  viteFinal: (config, { configType }) => {
    // Load env file based on mode
    const env = loadEnv(
      configType === 'PRODUCTION' ? 'production' : 'development',
      process.cwd(),
      ''
    );

    // Ensure `config.resolve` exists
    if (!config.resolve) {
      config.resolve = { alias: {} };
    }

    // Add your alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "/src", // Adjust this to your project structure
    };

    // Add env variables
    return {
      ...config,
      define: {
        ...config.define,
        'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
        'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      },
    };
  },
};
export { config as default };
