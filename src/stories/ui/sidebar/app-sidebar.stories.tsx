import { Meta, StoryObj } from "@storybook/react";
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

// Default export for AppSidebar stories
const meta: Meta = {
  title: "Components/Sidebar",
  component: SidebarProvider,
  subcomponents: { SidebarInset, SidebarTrigger },
};
export default meta;

// 1. AppSidebar Story
export const DefaultAppSidebar: StoryObj = {
  render: () => (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  ),
};

// 2. NavActions Story
export const NavActionsMeta: Meta = {
  title: "Components/NavActions",
  component: NavActions,
};
export const DefaultNavActions: StoryObj = {
  render: () => <NavActions />,
};

// 3. Breadcrumb Story
export const BreadcrumbMeta: Meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  subcomponents: { BreadcrumbItem, BreadcrumbList, BreadcrumbPage },
};
export const DefaultBreadcrumb: StoryObj = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Project Management & Task Tracking</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// 4. Separator Story
export const SeparatorMeta: Meta = {
  title: "Components/Separator",
  component: Separator,
};
export const VerticalSeparator: StoryObj = {
  render: () => <Separator orientation="vertical" className="h-4" />,
};

// 5. Sidebar Components Story
export const SidebarMeta: Meta = {
  title: "Components/Sidebar",
  component: SidebarProvider,
  subcomponents: { SidebarInset, SidebarTrigger },
};
export const DefaultSidebar: StoryObj = {
  render: () => (
    <SidebarProvider>
      <SidebarInset>
        <SidebarTrigger />
        <div className="p-4">Sidebar Content</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
