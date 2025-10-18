// src\components\layout\dashboard\Header.tsx
"use client";
import { PasswordResetModal } from "@/components/modals/PasswordResetModal";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, Settings, User } from "lucide-react";
import { logOut } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/providers/UserStoreProvider";
import Image from "next/image";

type HeaderProps = {
  onLogout?: () => Promise<void> | void; // optional hook to wire your own sign-out
};

export default function Header({ onLogout }: HeaderProps) {
  const router = useRouter();

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
        await onLogout(); // custom logout handler, if passed
      } else {
        // Use your backend logout function
        await logOut();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Always redirect to /login
      router.push("/login");
      router.refresh(); // ensures new session state
    }
  };

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-3 sm:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/kordor-logo.svg"
            alt="App logo"
            width={32}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </div>

        {/* Right: Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={imageUrl} alt={userName ?? email ?? "User"} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">
                {userName ?? email ?? "User"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="leading-tight">
              <div className="font-semibold">{userName ?? "Signed in"}</div>
              <div className="text-xs text-muted-foreground truncate">
                {email ?? ""}
              </div>
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
                  {theme === "dark" ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <span className="mr-2 inline-block h-4 w-4 rounded border" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
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
