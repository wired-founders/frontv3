// src\app\(dashboard)\layout.tsx
/**
 * RootLayout: global HTML/body shell, fonts, theme, toaster
 * AuthLayout: auth-only shell (header + full-screen column)
 * signup/page: centers signup form in the viewport
 * SignupForm: card UI + fields + validation

 */
/**
 * Handles authentication checks and redirects before rendering dashboard.
 *
 * Redirect flow:
 * - 401 (No session) → /login
 * - 403 (Unverified email) → /verify-email
 * - No workspace → /onboard
 *
 * @todo Add loading state during session check
 * @todo Add error boundary for failed redirects
 * @todo Cache workspace data to reduce API calls
 */

import { redirect } from "next/navigation";
import { checkSession } from "@/lib/api/serverAuthApi";
import Header from "@/components/layout/dashboard/Header";
import { UserStoreProvider } from "@/providers/UserStoreProvider";
import ChatBot from "@/components/bot/ChatBot";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const result = await checkSession();
  // console.log('results', result)

  if (!result.ok) {
    if (result.status === 401) redirect("/login");
    if (result.status === 403) redirect("/verify-email");
    redirect("/login");
  }
  if (!result.workspace) redirect("/onboard");

  return (
    <UserStoreProvider
      initialUser={result.user}
      initialWorkspace={result.workspace}
      initialCompany={result.company}
      initialSocialAccounts={result.socialAccounts}
    >
      <div className="grid h-[100dvh] grid-rows-[var(--header-height)_1fr]">
        <Header />
        {children}
         <ChatBot />
      </div>
    </UserStoreProvider>
  );
}

