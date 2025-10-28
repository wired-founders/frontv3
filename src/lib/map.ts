// src\lib\map.ts

type Platform = {
  provider: string;
  businesses: {
    businessId: string;
    businessName: string;
    assets: any[];
  }[];
};

export function mapProviders(data: Platform[]) {
  return data.map((platform) => ({
    name: platform.provider,
    count: platform.businesses.length,
    businesses: platform.businesses,
    ownedAssets: platform.businesses.flatMap((b) => b.assets),
  }));
}
