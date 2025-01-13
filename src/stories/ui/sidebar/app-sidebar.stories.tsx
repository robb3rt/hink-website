import { Meta, StoryObj } from "@storybook/react";
import Page from "@/app/dashboard/page.tsx";

const meta: Meta = {
  title: "App/Sidebar",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    showSidebar: true,
    showNavMenu: true,
  },
};

export const PopoverOnly: Story = {
  args: {
    showSidebar: true,
    showNavMenu: false,
  },
};

export const NavigationMenuOnly: Story = {
  args: {
    showSidebar: false,
    showNavMenu: true,
  },
};
