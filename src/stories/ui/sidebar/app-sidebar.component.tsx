import { DashboardLayout } from "@/app/dashboard/layout";
import { DashboardPage } from "@/app/dashboard/page";
import { BrowserRouter } from "react-router-dom";

export interface StoryProps {
  showSidebar?: boolean;
  showNavMenu?: boolean;
  showTeamSwitcher?: boolean;
  isLoggedIn?: boolean;
  showUserMenu?: boolean;
}

// Component that renders the dashboard story
export const DashboardStoryComponent = (props: StoryProps) => {
  const { isLoggedIn, ...layoutProps } = props;
  return (
    <BrowserRouter>
      <DashboardLayout {...layoutProps}>
        <DashboardPage />
      </DashboardLayout>
    </BrowserRouter>
  );
}; 