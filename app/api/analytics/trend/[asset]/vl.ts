import { z } from 'zod';

// Define the Zod schema for Iday
const trendDaySchema = z.object({
    date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Invalid date format. Use YYYY-MM-DD.",
      }),
    rate: z.number().min(0) // Validate that rate is a number and must be non-negative
});

// Define the Zod schema for IAsset
const trendSchemaValidation = z.object({
    asset: z.string(), // Validate that asset is a non-empty string
    trend: z.array(trendDaySchema) // Validate that trend is an array of Iday objects
});

// Export the schemas
export { trendDaySchema, trendSchemaValidation };