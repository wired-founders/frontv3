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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Accordion Example</h2>

      <Accordion type="multiple">
        {faq.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
