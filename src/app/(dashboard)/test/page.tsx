// src\app\(dashboard)\test\page.tsx
"use client";
import data from "./data";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui";
import { ReactElement } from "react";

const providerIcons: Record<string, ReactElement> = {
  facebook: <Facebook className="w-5 h-5 text-blue-600" />,
  instagram: <Instagram className="w-5 h-5 text-pink-500" />,
  linkedin: <Linkedin className="w-5 h-5 text-sky-700" />,
  youtube: <Youtube className="w-5 h-5 text-red-600" />,
};

export default function ConnectionPage() {
  const providers = data.map((platform) => ({
    name: platform.provider,
    count: platform.businesses.length,
    businesses: platform.businesses,
  }));

  console.log("groups", providers);
  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub-header */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Connections</h2>
        <button className="text-sm text-blue-600 hover:underline">+ Add Connection</button>
      </div>

      {/* Main content */}
      <div className="overflow-y-auto p-6 bg-neutral-100 dark:bg-neutral-900">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <Accordion
              key={provider.name}
              type="single"
              collapsible
              defaultValue=""
              className="rounded-xl py-2 border bg-white dark:bg-neutral-950 shadow-sm
                   data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionItem value="details" className="rounded-xl">
                <AccordionTrigger
                  className="px-4 py-3 flex items-center justify-between gap-3
                       [&[data-state=open]_.tw-rotate]:rotate-180"
                >
                  <div className="flex items-center gap-2">
                    {providerIcons[provider.name] || null}
                    <h3 className="text-base font-semibold capitalize">{provider.name}</h3>
                  </div>
                  <span className="text-xs text-gray-500">{provider.count} Business Managers</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 border-t space-y-2">
                  {provider.businesses.map((biz) => (
                    <div
                      key={biz.businessId}
                      className="border rounded-md px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-900"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{biz.businessName}</p>
                        <span className="text-xs text-gray-500">{biz.assets?.length ?? 0} assets</span>
                      </div>
                      <p className="text-xs text-gray-500">{biz.businessId}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
