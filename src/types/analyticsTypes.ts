// src\types\analyticsTypes.ts

// Analytics (Campaign Page)
type MetricRow = {
  id: string;
  entityId: string;
  metricDate: string; // ISO yyyy-mm-dd
  metrics: {
    cpc?: number;
    ctr?: number;
    spend?: number;
    clicks?: number;
    impressions?: number;
  };
  createdAt: string; // ISO
};

export type CampaignDTO = {
  id: string;
  name: string;
  status: string;
  objective: string;
  createdAt: string; // ISO
  allMetrics: MetricRow[];
};