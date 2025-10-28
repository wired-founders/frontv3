// src\app\(dashboard)\test\data.ts
const data = [
  {
    provider: "facebook",
    businesses: [
      {
        businessId: "biz_fb_1",
        businessName: "aenigm3_labs",
        assets: [
          { id: "pg_1", assetType: "page", name: "Kordor Main Page", externalId: "123456789" },
          { id: "pg_2", assetType: "page", name: "Kordor Events", externalId: "987654321" },
          { id: "ad_1", assetType: "ad_account", name: "Main Ad Account", externalId: "act_987654321" },
          { id: "ig_1", assetType: "ig_account", name: "@kordor", externalId: "178414001" },
          { id: "wa_1", assetType: "wa_account", name: "Kordor Support", externalId: "whatsapp:+94771234567" },
        ],
      },
      {
        businessId: "biz_ln_1",
        businessName: "neo_marketing_hub",
        assets: [
          { id: "pg_10", assetType: "page", name: "Neo Corporate Page", externalId: "4433221100" },
          { id: "pg_11", assetType: "page", name: "Neo Events", externalId: "9988776655" },
          { id: "ad_10", assetType: "ad_account", name: "LinkedIn Ads Account", externalId: "act_1122334455" },
          { id: "ig_10", assetType: "ig_account", name: "@neoagency", externalId: "178414009" },
          { id: "wa_10", assetType: "wa_account", name: "Neo Client Support", externalId: "whatsapp:+94776543210" },
        ],
      },
    ],
  },
  {
    provider: "linkedin",
    businesses: [
      {
        businessId: "biz_li_1",
        businessName: "Kordor B2B",
        assets: [
          { id: "li_pg_1", assetType: "page", name: "Kordor LinkedIn Page", externalId: "123456" },
          { id: "li_pg_2", assetType: "page", name: "Kordor Careers Page", externalId: "123457" },
          { id: "li_ad_1", assetType: "ad_account", name: "LinkedIn Campaigns", externalId: "LI-AD-789" },
        ],
      },
    ],
  },
];
export default data;
