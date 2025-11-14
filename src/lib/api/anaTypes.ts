// src\lib\api\anaTypes.ts

export type Platform = "all" | "facebook" | "instagram" | "linkedin" | "tiktok" | "google";

export type Sort = "spend" | "-spend" | "clicks" | "-clicks" | "ctr" | "-ctr" | "cpc" | "-cpc" | "date" | "-date";

export type DateISO = string; // "YYYY-MM-DD"
export type Page = number; // 1, 2, 3...
export type Limit = number; // 10, 25, 50...

export type CampaignQuery = {
  companyId: string;
  platform?: Platform;
  scope?: "paid" | "organic" | "both";
  sort?: Sort;
  page?: Page;
  limit?: Limit;
  start?: DateISO;
  end?: DateISO;
};
