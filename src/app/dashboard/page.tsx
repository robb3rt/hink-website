import "@/App.css";
import { LoremIpsum } from "react-lorem-ipsum";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";

interface PageProps {
  showSidebar?: boolean;
  showNavMenu?: boolean;
  showTeamSwitcher?: boolean;
}

export default function Page({
  showSidebar = true,
  showNavMenu = false,
  showTeamSwitcher = false,
}: PageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(showSidebar);
  const [NavMenuOpen, setNavMenuOpen] = useState(showNavMenu);
  const [TeamSwitcherOpen, setTeamSwitcherOpen] = useState(showTeamSwitcher);

  const handleTeamSwitcherToggle = (open: boolean) => {
    setTeamSwitcherOpen(open);
  };
  const handleNavMenuToggle = (open: boolean) => {
    setNavMenuOpen(open);
  };

  // This function will be used to set the state from outside (onToggle of SidebarTrigger).
  const handleSidebarToggle = (open: boolean) => {
    setSidebarOpen(open);
  };

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={handleSidebarToggle}>
      <AppSidebar showTeamSwitcher={NavMenuOpen} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions showNavMenu={showNavMenu} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4">
          <LoremIpsum p={10} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
