// src\lib\api\auth.ts
import { apiUrl } from "@/config/env.client";

export async function signUp(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${apiUrl}/auth/signup-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Signup failed (${res.status})`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signup failed";
    throw new Error(message);
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    const res = await fetch(`${apiUrl}/auth/signin-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed: ${res.status}`);
    }
    const result = await res.json();

    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signup failed";
    throw new Error(message);
  }
}

export async function logOut() {
  const res = await fetch(`${apiUrl}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
}

// lib/api/auth.ts
export const resetPassword = async (password: string) => {
  const res = await fetch(`${apiUrl}/auth/password-reset/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Password reset failed");

  return data;
};
