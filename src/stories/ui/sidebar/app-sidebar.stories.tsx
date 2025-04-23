import { Meta, StoryObj } from "@storybook/react";
import Page from "@/app/dashboard/page.tsx";

interface StoryProps {
  showSidebar?: boolean;
  showNavMenu?: boolean;
  showTeamSwitcher?: boolean;
  isLoggedIn?: boolean;
}

const meta: Meta<StoryProps> = {
  title: "App/Sidebar",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    showSidebar: { control: "boolean", description: "Whether to show the sidebar" },
    showNavMenu: { control: "boolean", description: "Whether to show the navigation menu" },
    showTeamSwitcher: { control: "boolean", description: "Whether to show the team switcher" },
    isLoggedIn: { control: "boolean", description: "Whether the user is logged in" },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: { showSidebar: false, showNavMenu: false, showTeamSwitcher: false, isLoggedIn: false },
};

export const LoggedIn: Story = {
  args: { showSidebar: false, showNavMenu: false, showTeamSwitcher: false, isLoggedIn: true },
};

export const LoggedInWithSidebar: Story = {
  args: { showSidebar: true, showNavMenu: false, showTeamSwitcher: false, isLoggedIn: true },
};

export const LoggedInWithNavMenu: Story = {
  args: { showSidebar: true, showNavMenu: true, showTeamSwitcher: false, isLoggedIn: true },
};

export const LoggedInWithTeam: Story = {
  args: { showSidebar: true, showNavMenu: true, showTeamSwitcher: true, isLoggedIn: true },
};
