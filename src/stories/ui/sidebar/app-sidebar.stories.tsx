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
    showTeamSwitcher: false,
  },
};

export const PopoverOnly: Story = {
  args: {
    showSidebar: true,
    showNavMenu: false,
    showTeamSwitcher: false,
  },
};

export const NavigationMenuOnly: Story = {
  args: {
    showSidebar: false,
    showNavMenu: true,
    showTeamSwitcher: false,
  },
};

export const MainContentOnly: Story = {
  args: {
    showSidebar: false,
    showNavMenu: false,
    showTeamSwitcher: false,
  },
};

export const ShowTeamSwitcher: Story = {
  args: {
    showSidebar: true,
    showNavMenu: false,
    showTeamSwitcher: true
  }
};
