"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 flex items-center justify-between py-4">
        <span className="font-bold text-xl">cryptoWatcher</span>
        <div className="hidden md:flex items-center gap-2">
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

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-muted/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Market Panel
            </Link>
            <Link
              href="/coins"
              className="block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cryptocurrency Explorer
            </Link>
            <Link
              href="/portfolio"
              className="block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Portfolio
            </Link>
            <Link
              href="/user"
              className="block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              User Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
