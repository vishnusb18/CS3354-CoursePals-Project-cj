"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  MessagesSquare,
  Newspaper,
  BarChart3,
  Calendar,
  Bell,
  User,
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Course Directory", icon: BookOpen },
  { href: "/my-courses", label: "My Courses", icon: BookOpen },
  { href: "/pals", label: "Find Pals", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/groups", label: "Group Chats", icon: MessagesSquare },
  { href: "/feed", label: "Course Feed", icon: Newspaper },
  { href: "/polls", label: "Polls", icon: BarChart3 },
  { href: "/sessions", label: "Study Sessions", icon: Calendar },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
