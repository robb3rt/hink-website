import type { Preview } from "@storybook/react";
import { DocsContainer } from "@storybook/addon-docs";
import { themes } from "@storybook/theming";
import { DarkModeDecorator } from "./DarkModeDecorator";
import "../src/App.css"; // Ensure this contains Tailwind setup

const preview: Preview = {
  parameters: {
    actions: {
      handles: ["onClick", "onChange"], // Add more event handlers as needed
    },
    viewMode: "docs",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: DocsContainer,
      theme: themes.light, // Customize themes here if needed
    },
  },
  decorators: [DarkModeDecorator], // Add the dark mode decorator here
};

export default preview;
