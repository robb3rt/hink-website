import type { Meta, StoryObj } from "@storybook/react";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const meta: Meta<typeof AppSidebar> = {
  title: "Components/Sidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

const Header = ({ title }: { title: string }) => (
  <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
    <SidebarTrigger />
    <Separator orientation="vertical" className="mx-2 h-4" />
    <h1 className="text-lg font-semibold">{title}</h1>
    <div className="ml-auto">
      <NavActions />
    </div>
  </header>
);

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="w-full flex h-screen">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <Header title="Project Management & Task Tracking" />
          <main className="flex-1 p-4">
            <div className="h-full rounded-lg border-2 border-dashed border-gray-200 p-4">
              Main content area
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};

export const InPopover: Story = {
  render: () => (
    <SidebarProvider>
      <div className="w-full flex h-screen flex-col">
        <Header title="Project Management & Task Tracking" />
        <main className="flex-1 p-4">
          <div className="h-full rounded-lg border-2 border-dashed border-gray-200 p-4">
            Main content area
          </div>
        </main>
        <Popover>
          <PopoverContent
            className="w-80 p-0 bg-background"
            align="start"
            side="left"
          >
            <AppSidebar />
          </PopoverContent>
        </Popover>
      </div>
    </SidebarProvider>
  ),
};
