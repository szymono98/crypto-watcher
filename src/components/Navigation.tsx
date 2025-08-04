"use client";

import dynamic from "next/dynamic";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const ThemeToggle = dynamic(
  () =>
    import("@/components/ThemeToggle").then((mod) => ({
      default: mod.ThemeToggle,
    })),
  {
    ssr: false,
    loading: () => (
      <button
        className="relative w-14 h-8 rounded-full border border-white/20 bg-white/10 dark:bg-black/20 shadow-lg backdrop-blur-md flex items-center transition-colors duration-300 focus:outline-none opacity-50"
        style={{
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
        }}
        disabled
      >
        <span className="absolute left-1 top-1 w-6 h-6 rounded-full shadow-md bg-white/90"></span>
      </button>
    ),
  }
);

export function Navigation() {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <span className="font-bold text-xl">cryptoWatcher</span>
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Market Panel</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/coins">
                  Cryptocurrency Explorer
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/portfolio">
                  My Portfolio
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/user">User Panel</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
