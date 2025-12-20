'use client';

import * as React from 'react';
import {
  Home,
  MessageSquare,
  FileText,
  Settings,
  User,
  PanelLeft,
  Bot,
  BarChart,
  History,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Chatbot',
    url: '/chatbot',
    icon: Bot,
  },
  {
    title: 'Chat History',
    url: '/chat-history',
    icon: History,
  },
  {
    title: 'Materials',
    url: '/materials',
    icon: FileText,
  },
  {
    title: 'Statistics',
    url: '/statistics',
    icon: BarChart,
  },
  {
    title: 'Settings',
    url: '/setting',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { isMobile, setOpen } = useSidebar();

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="md:h-8 md:p-0 hover:bg-transparent active:bg-transparent active:scale-100"
              onClick={handleLinkClick}
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-[10px] font-bold">P</span>
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-lg">
                    ProtoStar
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="mt-6">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-fit"
              onClick={(e) => {
                // We need to access the toggleSidebar function.
                // Since we are inside AppSidebar, we can't easily access the context without a wrapper or using the trigger.
                // But SidebarTrigger uses useSidebar().
                // Let's use SidebarTrigger but styled as a menu item.
              }}
              asChild
            >
              <SidebarTrigger className="h-10 w-full justify-start gap-3 px-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <PanelLeft className="size-5" />
                <span className="text-base lg:text-sm">Fold / Unfold</span>
              </SidebarTrigger>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 text-base font-medium lg:text-sm"
                    onClick={handleLinkClick}
                  >
                    <Link href={item.url} className="gap-3">
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 flex justify-center">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
