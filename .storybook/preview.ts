// .storybook/preview.ts
import { ModeDecorator } from "./modeDecorator";
import "../src/App.css"; // Adjust path to your global CSS file containing Tailwind setup
import { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: {
      // Explicitly define actions using the 'action' function from @storybook/addon-actions
      handles: ["onClick", "onChange"], // You can add more event handlers as needed
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export const decorators = [ModeDecorator];
export default preview;
