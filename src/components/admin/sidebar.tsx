// components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { School, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const adminMenuItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/schools",
    label: "Schools",
    icon: School,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <aside className="w-64 bg-secondary p-4 min-h-screen border-r">
      <div className="space-y-4">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <nav className="space-y-2">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center p-2 rounded-md transition-colors
                  ${pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-accent"}
                `}
              >
                <Icon className="mr-2 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
