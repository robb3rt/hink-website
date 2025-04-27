import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Star,
  Trash,
  Trash2,
  User,
  LogOut,
  HelpCircle,
  Settings,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { withAuth } from '@/contexts/auth-context'
import { useAuthContext } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { supabase } from '@/lib/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getAvatarUrl } from '@/lib/utils'
import { useTheme } from '@/hooks/use-theme'

interface NavActionsProps {
  showNavMenu?: boolean;
  showUserMenu?: boolean;
}

interface MenuItem {
  label: string;
  icon: React.ComponentType;
  onClick: (supabase: SupabaseClient, setTheme?: (t: 'light' | 'dark' | 'system') => void, userId?: string) => Promise<void> | void;
}

const userMenuItems: MenuItem[] = [
  {
    label: "View Profile",
    icon: User,
    onClick: () => {/* TODO: Implement profile view */}
  },
  {
    label: "Settings & Privacy",
    icon: Settings,
    onClick: () => {/* TODO: Implement settings */}
  },
  {
    label: "Help",
    icon: HelpCircle,
    onClick: () => {/* TODO: Implement help */}
  },
  {
    label: "Sign Out",
    icon: LogOut,
    onClick: async (supabase: SupabaseClient) => {
      await supabase.auth.signOut();
    }
  }
];

const data = [
  [
    {
      label: "Customize Page",
      icon: Settings2,
    },
    {
      label: "Turn into wiki",
      icon: FileText,
    },
  ],
  [
    {
      label: "Copy Link",
      icon: Link,
    },
    {
      label: "Duplicate",
      icon: Copy,
    },
    {
      label: "Move to",
      icon: CornerUpRight,
    },
    {
      label: "Move to Trash",
      icon: Trash2,
    },
  ],
  [
    {
      label: "Undo",
      icon: CornerUpLeft,
    },
    {
      label: "View analytics",
      icon: LineChart,
    },
    {
      label: "Version History",
      icon: GalleryVerticalEnd,
    },
    {
      label: "Show delete pages",
      icon: Trash,
    },
    {
      label: "Notifications",
      icon: Bell,
    },
  ],
  [
    {
      label: "Import",
      icon: ArrowUp,
    },
    {
      label: "Export",
      icon: ArrowDown,
    },
  ],
];

function NavActionsComponent({ showNavMenu = false, showUserMenu = false }: NavActionsProps) {
  const [isOpen, setIsOpen] = React.useState(showNavMenu);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(showUserMenu);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const { user } = useAuthContext();
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setIsOpen(showNavMenu);
  }, [showNavMenu]);

  React.useEffect(() => {
    setIsUserMenuOpen(showUserMenu);
  }, [showUserMenu]);

  React.useEffect(() => {
    if (user?.email) {
      const generatedAvatarUrl = getAvatarUrl(user.email);
      setAvatarUrl(generatedAvatarUrl);
    }
  }, [user?.email]);

  const lastEditDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit'
  });

  const userInitials = user?.email 
    ? user.email.substring(0, 2).toUpperCase()
    : '??';

  // Derive display name
  const displayName = user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : '');

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        Edit {lastEditDate}
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>

      <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full p-0"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={avatarUrl || ''} 
                alt={user?.email || 'User avatar'}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none">
            <SidebarContent>
              <SidebarGroup className="border-b p-4 pb-2 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={avatarUrl || ''} 
                      alt={user?.email || 'User avatar'}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                      }}
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{displayName}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    className={`rounded-full p-1 ${theme === 'light' ? 'bg-accent text-accent-foreground' : ''}`}
                    title="Light theme"
                    onClick={() => setTheme('light')}
                  >
                    <Sun size={18} />
                  </button>
                  <button
                    className={`rounded-full p-1 ${theme === 'dark' ? 'bg-accent text-accent-foreground' : ''}`}
                    title="Dark theme"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon size={18} />
                  </button>
                  <button
                    className={`rounded-full p-1 ${theme === 'system' ? 'bg-accent text-accent-foreground' : ''}`}
                    title="System theme"
                    onClick={() => setTheme('system')}
                  >
                    <Monitor size={18} />
                  </button>
                </div>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupContent className="gap-0">
                  <SidebarMenu>
                    {userMenuItems.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton onClick={() => item.label === 'Sign Out' ? item.onClick(supabase) : item.onClick(supabase, setTheme, user?.id)}>
                          <item.icon /> <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Export the protected version of NavActions
export const NavActions = withAuth(NavActionsComponent, null) 