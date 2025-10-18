// src\app\(dashboard)\home\pages\Settings.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-muted-foreground">Manage your preferences</p>

      <div className="mt-6 max-w-2xl space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Email notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Push notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
