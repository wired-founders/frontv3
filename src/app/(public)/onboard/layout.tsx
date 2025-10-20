// src\app\(public)\onboard\layout.tsx
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { checkSession } from "@/lib/api/serverAuthApi";

export default async function OnboardLayout({ children }: { children: ReactNode }) {
  const session = await checkSession();
  
  if (!session || !session.ok) {
    redirect('/login');
  }

  return (
    <div>
      {children}
    </div>
  );
}