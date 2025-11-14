// src\components\bot\ChatBot.tsx
/**
 Sending messages to bot
 1. Get Module from usePathname
 2. Get the message 
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useUserStore } from "@/providers/UserStoreProvider";
import { sendChatMessage } from "@/lib/api/chatApi";
import { usePathname } from "next/navigation";

export default function ChatBot() {
  const user = useUserStore((s) => s.user);
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getCurrentModule = () => {
    if (pathname.startsWith("/home")) return "home";
    if (pathname.startsWith("/analytics")) return "analytics";
    if (pathname.startsWith("/social")) return "social";
    return "home"; // default
  };

  const currentModule = getCurrentModule();
  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // 1) replace your handleSend with this
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const data = await sendChatMessage(text, currentModule);
      const reply = data?.reply ?? "Bot returned nothing.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Bot service failed." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-to-tr from-primary to-primary/70 text-primary-foreground 
                     shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center 
                     border border-primary/30 backdrop-blur-md"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Box */}
      {open && (
        <div
          className="fixed bottom-8 right-8 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden 
                     bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-neutral-200 dark:border-neutral-800 
                     transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-sm">Kordor AI</h2>
            </div>

            <div className="flex items-center gap-1">
              {/* 3-dot dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>Assistant Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Mute Voice</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                  <DropdownMenuItem>Appearance</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Close button */}
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "px-3 py-2 rounded-xl max-w-[80%] leading-snug",
                  msg.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-neutral-100 dark:bg-neutral-800 text-foreground"
                )}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-fit">
                <span className="h-2 w-2 bg-neutral-500 dark:bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="h-2 w-2 bg-neutral-500 dark:bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
                <span className="h-2 w-2 bg-neutral-500 dark:bg-neutral-400 rounded-full animate-bounce" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-2 flex gap-2 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="text-sm"
            />
            <Button onClick={handleSend} size="icon" className="bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
