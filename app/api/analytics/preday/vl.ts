import { z } from 'zod';

// Schema for IAssetRate
const AssetRateSchema = z.record(z.number());

// Schema for IPreDayRate
export const vPreDayRateSchema = z.object({
  preDayRate: z.object({
    date: z.string(),
    assets: AssetRateSchema,
  }),
});