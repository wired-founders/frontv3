// tests\aside\ChannelsPage.tsx
// "use client";

// import { ConnectChannelsModal } from "@/components/modals/ConnectChannelsModal";
// import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
// import { Facebook, Instagram, Linkedin, Music2, Globe } from "lucide-react";
// import { useUserStore } from "@/providers/UserStoreProvider";
// import { useAssets } from "@/hooks/useHome";

// type Asset = {
//   id: string;
//   accountId: string;
//   provider: "facebook" | "instagram" | string;
//   externalId: string;
//   name: string;
//   assetType: "business" | "page" | "ad_account" | "instagram" | "whatsapp" | string;
//   purpose: string;
//   parentId: string | null;
//   parentName: string | null;
//   metadata?: Record<string, any>;
// };

// const platformIcons: Record<string, any> = {
//   facebook: Facebook,
//   instagram: Instagram,
//   tiktok: Music2,
//   linkedin: Linkedin,
//   website: Globe,
// };

// const typeLabel: Record<string, string> = {
//   business: "Business",
//   page: "Page",
//   ad_account: "Ad Account",
//   instagram: "Instagram",
//   whatsapp: "WhatsApp",
// };

// export default function ChannelsPage() {
//   const socialAccounts = useUserStore((s) => s.socialAccounts);
//   const { data, isLoading } = useAssets();
//   const assets: Asset[] = data?.assets || [];

//   if (isLoading) return <div className="p-6">Loading...</div>;

//   // 1) Group assets by social account (DB FK)
//   const assetsByAccount = new Map<string, Asset[]>();
//   for (const a of assets) {
//     if (!assetsByAccount.has(a.accountId)) assetsByAccount.set(a.accountId, []);
//     assetsByAccount.get(a.accountId)!.push(a);
//   }

//   // 2) For each account, build tree: businesses -> children
//   function buildBusinessTree(accountId: string) {
//     const owned = assetsByAccount.get(accountId) || [];
//     const businesses = owned.filter(a => a.assetType === "business");

//     // children keyed by parentId
//     const childrenByParent = new Map<string, Asset[]>();
//     for (const a of owned) {
//       if (a.parentId) {
//         if (!childrenByParent.has(a.parentId)) childrenByParent.set(a.parentId, []);
//         childrenByParent.get(a.parentId)!.push(a);
//       }
//     }

//     return businesses.map(b => ({
//       business: b,
//       children: (childrenByParent.get(b.externalId) || []).sort(sortByTypeThenName),
//     }));
//   }

//   // stable, readable ordering in UI
//   function sortByTypeThenName(a: Asset, b: Asset) {
//     const order = ["page", "instagram", "whatsapp", "ad_account"];
//     const ai = order.indexOf(a.assetType);
//     const bi = order.indexOf(b.assetType);
//     if (ai !== bi) return ai - bi;
//     return a.name.localeCompare(b.name);
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Connected Channels</h1>
//         <ConnectChannelsModal />
//       </div>

//       {socialAccounts.length === 0 ? (
//         <p className="text-gray-500">No channels connected yet</p>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {socialAccounts.map((account: any) => {
//             const Icon = platformIcons[account.platform] || Globe;
//             const trees = buildBusinessTree(account.id); // use FK relation

//             return (
//               <Card key={account.id} className="border">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Icon className="w-5 h-5" />
//                     {account.accountName || account.platform}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {trees.length === 0 ? (
//                     <p className="text-xs text-gray-400">No assets</p>
//                   ) : (
//                     trees.map(({ business, children }) => (
//                       <div key={business.id} className="space-y-2">
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold">{business.name}</span>
//                           <Badge variant="secondary" className="text-[10px]">
//                             {typeLabel[business.assetType] || business.assetType}
//                           </Badge>
//                         </div>

//                         {children.length > 0 ? (
//                           <div className="space-y-1">
//                             {children.map((child) => (
//                               <div key={child.id} className="text-sm border-l-2 pl-2 border-gray-200">
//                                 <div className="flex items-center gap-2">
//                                   <span className="font-medium">{child.name}</span>
//                                   <span className="text-xs text-gray-500">
//                                     {typeLabel[child.assetType] || child.assetType}
//                                   </span>
//                                 </div>
//                                 {/* Never render tokens or secrets from metadata */}
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="text-xs text-gray-400 ml-2">No child assets</p>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
