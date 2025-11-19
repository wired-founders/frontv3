// src\lib\api\socialApi.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type CreatePostPayload = {
  content: string;
  platform: string;
  scheduledAt?: string | null;
};

export type CreatedPostResponse = {
  id: string;
  content: string;
  platform: string;
  scheduledAt?: string | null;
  // extend this type to match your backend response
};

export async function createPost(
  payload: CreatePostPayload
): Promise<CreatedPostResponse> {
  const res = await fetch(`${BASE_URL}/social/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // remove if your backend doesn't use cookies
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to create post");
  }

  return res.json();
}
