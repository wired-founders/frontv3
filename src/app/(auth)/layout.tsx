// src\app\(auth)\layout.tsx
import { redirect } from "next/navigation";
import { checkSession } from "@/lib/api/serverAuthApi";
import AuthHeader from "@/components/layout/signup/Header";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ok } = await checkSession();
  if (ok) redirect("/home");

  return (
    <div className="flex h-screen flex-col">
      <AuthHeader />
      <main className="">{children}</main>
    </div>
  );
}
