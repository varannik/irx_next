import { z } from 'zod';

// Define the zod schema for IDataItem
const DataItemSchema = z.object({
  date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Invalid date format. Use YYYY-MM-DD.",
  }),
  rate: z.number().min(0, { message: "Rate must be a non-negative number." })
});

// Define the zod schema for IDataList
const DataListSchema = z.object({
  week: z.array(DataItemSchema),
  month: z.array(DataItemSchema),
  quarter: z.array(DataItemSchema),
});

// Schema for IAssetData
const assetDataSchema = z.record(DataListSchema);

// Define the zod schema for PeriodicTrend
export const PeriodicTrendSchema = z.object({
  periods: z.object({
    G: assetDataSchema,
    J: assetDataSchema
  })
});

