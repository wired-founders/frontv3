// src\app\(auth)\layout.tsx
/**
 * 
 * RootLayout: global HTML/body shell, fonts, theme, toaster
 * AuthLayout: auth-only shell (header + full-screen column)
 * signup/page: centers signup form in the viewport
 * SignupForm: card UI + fields + validation

 */
import { redirect } from "next/navigation";
import { checkSession } from "@/lib/api/serverAuthApi";
import AuthHeader from "@/components/layout/signup/Header";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { ok } = await checkSession();
  if (ok) redirect("/home");

  return (
    <div className="flex min-h-svh flex-col">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-6 md:p-10 ">{children}</main>
    </div>
  );
}
