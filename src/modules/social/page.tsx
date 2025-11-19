// src\modules\social\page.tsx
"use client";
import { SocialHomePage, ConnectPage, CalendarPage, CreatePostPage } from "./pages";
import { useSocialNavStore } from "@/stores/useSocialNav";

export default function SocialHome() {
  const activePage = useSocialNavStore((s) => s.activePage);

  switch (activePage) {
    case "connect":
      return <ConnectPage />;
    case "create":
      return <CreatePostPage />;
    case "calendar":
      return <CalendarPage />;
    case "home":
    default:
      return <SocialHomePage />;
  }
}
