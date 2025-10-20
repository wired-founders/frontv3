// src\app\(public)\reset-password\page.tsx
import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export const dynamic = "force-dynamic"; // stops prerender crash

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div />}>
      <ResetPasswordClient />
    </Suspense>
  );
}
