import { z } from "zod";

// Define the I7Days schema
const PreDaysSchema = z.object({
  dyn: z.number(),
  rate: z.number(),
});

// Define the ITrend schema
const TrendSchema = z.object({
  pre_days: z.array(PreDaysSchema), // Array of I7Days
  diff_per: z.number(),
});


// Define the ISimpleTrend schema
export const SimpleTrendSchemaVl = z.object({
  assets: z.record(TrendSchema),
});