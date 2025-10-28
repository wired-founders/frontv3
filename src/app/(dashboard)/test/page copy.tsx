// src\app\(dashboard)\test\page copy.tsx
// "use client";
// import data from "./data";
// import { useState } from "react";
// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui";
// import { ReactElement } from "react";
// import { BusinessModal } from "@/components/modals/BusinessModal";
// import { mapProviders } from "@/lib/map";

// const providerIcons: Record<string, ReactElement> = {
//   facebook: <Facebook className="w-5 h-5 text-blue-600" />,
//   instagram: <Instagram className="w-5 h-5 text-pink-500" />,
//   linkedin: <Linkedin className="w-5 h-5 text-sky-700" />,
//   youtube: <Youtube className="w-5 h-5 text-red-600" />,
// };

// export default function ConnectionPage() {
//   const providers = mapProviders(data);

//   const [selectedBiz, setSelectedBiz] = useState<null | {
//     businessName: string;
//     assets: any[];
//   }>(null);

//   const handleViewAssets = (biz: { businessName: string; assets: any[] }) => {
//     setSelectedBiz({
//       businessName: biz.businessName,
//       assets: biz.assets,
//     });
//   };

//   console.log("providers", providers);
//   return (
//     <div className="p-6">
//       <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min">
//         {providers.map((provider) => (
//           <div
//             key={provider.name}
//             className="self-start rounded-xl border bg-white dark:bg-neutral-950 shadow-sm overflow-hidden"
//           >
//             <Accordion type="multiple">
//               <AccordionItem value="details">
//                 <AccordionTrigger className="px-4 py-3">
//                   <div className="flex items-center justify-between w-full">
//                     <h3 className="text-base font-semibold capitalize">{provider.name}</h3>
//                     <span className="text-xs text-gray-500">{provider.count} Business Managers</span>
//                   </div>
//                 </AccordionTrigger>

//                 <AccordionContent className="px-4 pb-4 pt-0 border-t space-y-2">
//                   {provider.businesses.map((biz) => (
//                     <div
//                       key={biz.businessId}
//                       className="border rounded-md px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-900"
//                     >
//                       <div className="flex items-center justify-between">
//                         <p className="font-medium">{biz.businessName}</p>
//                         <div className="flex flex-col items-end">
//                           <span className="text-xs text-gray-500">{biz.assets?.length ?? 0} assets</span>
//                           <button
//                             onClick={() => handleViewAssets(biz)}
//                             className="text-[11px] text-blue-600 hover:underline mt-1"
//                           >
//                             View
//                           </button>
//                         </div>
//                       </div>
//                       <p className="text-xs text-gray-500">{biz.businessId}</p>
//                     </div>
//                   ))}
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>
//         ))}
//       </div>
//       {/* Single modal instance at the page level */}
//       {selectedBiz && (
//         <BusinessModal
//           businessName={selectedBiz.businessName}
//           assets={selectedBiz.assets}
//           open={true}
//           onClose={() => setSelectedBiz(null)}
//         />
//       )}
//     </div>
//   );
// }
