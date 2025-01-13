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

interface PageProps {
  showSidebar?: boolean;
  showNavMenu?: boolean;
}

export default function Page({
  showSidebar = true,
  showNavMenu = true,
}: PageProps) {
  return (
    <SidebarProvider>
      {showSidebar && <AppSidebar />}
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            {showSidebar && <SidebarTrigger />}
            {showSidebar && (
              <Separator orientation="vertical" className="mr-2 h-4" />
            )}
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
          {showNavMenu && (
            <div className="ml-auto px-3">
              <NavActions />
            </div>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4">
          <LoremIpsum p={10} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
