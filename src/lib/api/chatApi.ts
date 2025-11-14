// src\lib\api\chatApi.ts

import { apiUrl } from "@/config/env.client";

export async function sendChatMessage(message: string, currentModule: string) {
  const res = await fetch(`${apiUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message , currentModule}),
  });

  if (!res.ok) {
    throw new Error(`Chat API error: ${res.status}`);
  }

  return res.json();
}
