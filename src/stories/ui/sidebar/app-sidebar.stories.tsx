import { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "@/app/dashboard/layout";
import { DashboardPage } from "@/app/dashboard/page";
import { BrowserRouter } from "react-router-dom";

interface StoryProps {
  showSidebar?: boolean;
  showNavMenu?: boolean;
  showTeamSwitcher?: boolean;
  isLoggedIn?: boolean;
  showUserMenu?: boolean;
}

export function DashboardStory(props: StoryProps) {
  const { isLoggedIn, ...layoutProps } = props;
  return (
    <BrowserRouter>
      <DashboardLayout {...layoutProps}>
        <DashboardPage />
      </DashboardLayout>
    </BrowserRouter>
  );
}

const meta: Meta<StoryProps> = {
  title: "App/Sidebar",
  component: DashboardStory,
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
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: { 
    showSidebar: false, 
    showNavMenu: false, 
    showTeamSwitcher: false,
    isLoggedIn: false,
    showUserMenu: false
  },
};

export const LoggedIn: Story = {
  args: { 
    showSidebar: false, 
    showNavMenu: false, 
    showTeamSwitcher: false,
    isLoggedIn: true,
    showUserMenu: false
  },
};

export const LoggedInWithSidebar: Story = {
  args: { 
    showSidebar: true, 
    showNavMenu: false, 
    showTeamSwitcher: false,
    isLoggedIn: true,
    showUserMenu: false
  },
};

export const LoggedInWithNavMenu: Story = {
  args: { 
    showSidebar: true, 
    showNavMenu: true, 
    showTeamSwitcher: false,
    isLoggedIn: true,
    showUserMenu: false
  },
};

export const LoggedInWithTeam: Story = {
  args: { 
    showSidebar: true, 
    showNavMenu: true, 
    showTeamSwitcher: true,
    isLoggedIn: true,
    showUserMenu: false
  },
};

export const LoggedInWithUserMenu: Story = {
  args: {
    showSidebar: true,
    showNavMenu: false,
    showTeamSwitcher: false,
    isLoggedIn: true,
    showUserMenu: true
  },
};
