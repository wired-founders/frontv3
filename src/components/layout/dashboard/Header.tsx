// src\components\layout\dashboard\Header.tsx
/**
 1. 
 2. 
 3. 
 4. 
 */
"use client";

import { PasswordResetModal } from "@/components/modals/PasswordResetModal";
import { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, Settings, User } from "lucide-react";
import { logOut } from "@/lib/api/authApi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  Button,
  Avatar,
  AvatarFallback,
} from "@/components/ui";
import { useUserStore } from "@/providers/UserStoreProvider";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  onLogout?: () => Promise<void> | void;
};

export default function Header({ onLogout }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const email = useUserStore((s) => s.user?.email ?? null);
  const userName = useUserStore((s) => s.user?.name ?? null);
  const imageUrl = useUserStore((s) => s.user?.image || undefined);
  const { theme, setTheme } = useTheme();

  const initials = useMemo(() => {
    if (userName && userName.trim().length > 0) {
      const parts = userName.trim().split(" ");
      return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
    }
    if (email) return email[0]?.toUpperCase() ?? "U";
    return "U";
  }, [userName, email]);

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      } else {
        await logOut();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/analytics", label: "Analytics" },
    { href: "/social", label: "Social" },
  ];

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-3 sm:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Image src="/kordor-logo.svg" alt="App logo" width={32} height={32} priority className="h-10 w-auto" />
        </div>

        {/* Center: Nav */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-1 rounded-lg bg-background/60 backdrop-blur-sm px-1.5 py-0.5 border border-border/40 shadow-sm">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
          relative text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200
          ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
        `}
              >
                {item.label}
                {active && <span className="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Right: Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-2">
              <Avatar className="h-7 w-7 ring-2 ring-primary">
                {imageUrl && (
                  <Image src={imageUrl} alt="User avatar" width={28} height={28} className="rounded-full" unoptimized />
                )}
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="leading-tight">
              <div className="font-semibold">{userName ?? "Signed in"}</div>
              <div className="text-xs text-muted-foreground truncate">{email ?? ""}</div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/account")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>S</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <PasswordResetModal />
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {theme === "dark" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  <span>Theme</span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={theme ?? "system"}
                      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                    >
                      <DropdownMenuRadioItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          <span>Light</span>
                        </div>
                      </DropdownMenuRadioItem>

                      <DropdownMenuRadioItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          <span>Dark</span>
                        </div>
                      </DropdownMenuRadioItem>

                      <DropdownMenuRadioItem value="system">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-4 w-4 rounded border" />
                          <span>System</span>
                        </div>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
