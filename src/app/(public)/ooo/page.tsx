// src/app/(public)/ooo/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export default function OOOPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="p-8">
      <h1>Out of Office</h1>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <Button>Save</Button>
    </div>
  );
}