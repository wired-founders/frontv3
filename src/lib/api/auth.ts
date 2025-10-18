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
  } catch (err: any) {
    throw new Error(err.message || "Signup failed");
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
  } catch (err: any) {
    throw new Error(err.message || "Signup failed");
  }
}

export async function logOut() {
  const res = fetch(`${apiUrl}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
}
