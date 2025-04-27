import { Suspense, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions/nav-actions";
import { AuthButtons } from "@/components/auth/AuthButtons";
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
import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";

interface LayoutProps {
  showSidebar?: boolean;
  showNavMenu?: boolean;
  showTeamSwitcher?: boolean;
  showUserMenu?: boolean;
  children?: ReactNode;
}

export function DashboardLayout({
  showSidebar = true,
  showNavMenu = false,
  showTeamSwitcher = false,
  showUserMenu = false,
  children,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(showSidebar);
  const { session } = useAuthContext();

  useEffect(() => {
    setSidebarOpen(showSidebar);
  }, [showSidebar]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <AppSidebar showTeamSwitcher={showTeamSwitcher} />
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
          <div className="ml-auto flex items-center gap-2 px-3">
            {session ? (
              <NavActions showNavMenu={showNavMenu} showUserMenu={showUserMenu} />
            ) : (
              <AuthButtons 
                onAuthStateChange={(_event) => {
                  // Auth state is handled by the context
                }} 
              />
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4">
          <Suspense fallback={<div>Loading...</div>}>
            {children || <Outlet />}
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Default export for lazy loading
export default DashboardLayout; 