// src\app\(public)\onboard\layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { checkSession } from "@/lib/api/serverAuthApi";
import { Header } from "@/components/layout/public/Header";

export default async function OnboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await checkSession();

  if (!session || !session.ok) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="p-6">{children}</main>
    </div>
  );
}
