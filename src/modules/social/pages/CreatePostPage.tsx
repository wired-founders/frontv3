// src\modules\social\pages\CreatePostPage.tsx
"use client";

import { useState } from "react";
import { createPost, type CreatePostPayload } from "@/lib/api/socialApi";

export default function CreatePostPage() {
  const [form, setForm] = useState<CreatePostPayload>({
    content: "",
    platform: "facebook",
    scheduledAt: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.content.trim()) {
      setError("Post content is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: CreatePostPayload = {
        ...form,
        scheduledAt: form.scheduledAt || null,
      };

      await createPost(payload);
      setSuccess("Post created successfully.");
      setForm((prev) => ({
        ...prev,
        content: "",
        scheduledAt: "",
      }));
    } catch (err: any) {
      setError(err.message ?? "Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden bg-white dark:bg-neutral-950">
      {/* Sub Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Post</h1>
        <div className="text-xs text-muted-foreground">v0 — simple form</div>
      </div>

      {/* Main Content */}
      <main className="overflow-y-auto p-6">
        <div className="max-w-2xl space-y-4 border rounded-lg p-4 bg-background">
          <h2 className="text-sm font-medium">Post details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Platform */}
            <div className="space-y-1">
              <label className="text-xs font-medium" htmlFor="platform">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                value={form.platform}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm bg-transparent"
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                {/* add/remove platforms as needed */}
              </select>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <label className="text-xs font-medium" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-md border px-3 py-2 text-sm bg-transparent resize-none"
                placeholder="Write your post here..."
              />
            </div>

            {/* Schedule time (optional) */}
            <div className="space-y-1">
              <label className="text-xs font-medium" htmlFor="scheduledAt">
                Schedule (optional)
              </label>
              <input
                id="scheduledAt"
                name="scheduledAt"
                type="datetime-local"
                value={form.scheduledAt ?? ""}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm bg-transparent"
              />
              <p className="text-[11px] text-muted-foreground">
                Leave empty to publish immediately (depending on backend logic).
              </p>
            </div>

            {/* Messages */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-emerald-500">{success}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-black text-white text-sm font-medium px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
