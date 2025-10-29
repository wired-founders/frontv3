// src\app\(public)\ana\page.tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faq = [
  { id: "1", question: "What is this?", answer: "An accordion built from a list." },
  { id: "2", question: "Why map?", answer: "Because typing each item by hand is painful." },
  { id: "3", question: "How does it work?", answer: "map() loops and renders one item per entry." },
];

export default function AnaPage() {
  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center justify-start"
      style={{
        backgroundColor: "#0e0e10", // base background (not pure black)
        color: "#e4e4e7", // soft white
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        className="w-full max-w-md p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: "#18181b", // card background
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h2 className="text-lg font-semibold mb-4 text-white/90">Accordion Example</h2>

        <Accordion type="multiple">
          {faq.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-white/10"
            >
              <AccordionTrigger
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                style={{
                  padding: "0.75rem 0",
                }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-sm text-gray-400 leading-relaxed"
                style={{
                  paddingBottom: "0.75rem",
                }}
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
