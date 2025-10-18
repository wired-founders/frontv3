// src\app\(dashboard)\layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiUrl } from "@/config/env.client";
import Header from "@/components/layout/dashboard/Header";
import { UserStoreProvider } from "@/providers/UserStoreProvider";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const res = await fetch(`${apiUrl}/auth/validate`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (res.status === 401) redirect("/login");
  if (res.status === 403) redirect("/verify-email");

  const userData = res.ok ? await res.json() : null;

  return (
    <UserStoreProvider initialUser={userData?.user}>
      <Header />
      <main>{children}</main>
    </UserStoreProvider>
  );
}
