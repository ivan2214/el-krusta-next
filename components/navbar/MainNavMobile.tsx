"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

export const MainNavMobile: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  let routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  routes = [
    {
      href: "/",
      label: "Inicio",
      active: pathname === "/",
    },
    ...routes,
  ];

  return (
    <nav className="flex items-center space-x-4 md:hidden md:space-x-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {routes.map((route) => (
            <DropdownMenuItem key={route.href}>
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
