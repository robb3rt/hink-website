import type { Meta, StoryObj } from "@storybook/react";
import { DashboardStoryComponent, type StoryProps } from "./app-sidebar.component";

const meta = {
  title: "App/Sidebar",
  component: DashboardStoryComponent,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    showSidebar: { control: "boolean", description: "Whether to show the sidebar" },
    showNavMenu: { control: "boolean", description: "Whether to show the navigation menu" },
    showTeamSwitcher: { control: "boolean", description: "Whether to show the team switcher" },
    isLoggedIn: { control: "boolean", description: "Whether the user is logged in" },
    showUserMenu: { control: "boolean", description: "Whether to show the user menu" },
  },
} satisfies Meta<typeof DashboardStoryComponent>;

export default meta;
type Story = StoryObj<typeof DashboardStoryComponent>;

// Base args that all stories extend from
const baseArgs: StoryProps = {
  showSidebar: false,
  showNavMenu: false,
  showTeamSwitcher: false,
  isLoggedIn: false,
  showUserMenu: false,
};

// Base logged-in args
const loggedInArgs: StoryProps = {
  ...baseArgs,
  isLoggedIn: true,
};

export const Primary: Story = {
  args: baseArgs,
};

export const LoggedIn: Story = {
  args: loggedInArgs,
};

export const WithSidebar: Story = {
  args: {
    ...loggedInArgs,
    showSidebar: true,
  },
};

export const WithNavMenu: Story = {
  args: {
    ...WithSidebar.args,
    showNavMenu: true,
  },
};

export const WithTeamSwitcher: Story = {
  args: {
    ...WithNavMenu.args,
    showTeamSwitcher: true,
  },
};

export const WithUserMenu: Story = {
  args: {
    ...WithSidebar.args,
    showUserMenu: true,
  },
};
