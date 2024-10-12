import { z } from 'zod';

// Zod schema for each currency record
const CurrencyRecordSchema = z.object({
  date: z.string(), // Ensure the date is a non-empty string
  rate: z.number().positive(), // The rate should be a positive number
  moving_avg_short_3: z.number().positive(),
  moving_avg_short_5: z.number().positive(),
  moving_avg_short_10: z.number().positive(),
  moving_avg_mid_50: z.number().positive(),
  moving_avg_mid_100: z.number().positive(),
  moving_avg_long_200: z.number().positive(),
  moving_avg_long_300: z.number().positive(),
});


export const MASchemaValidation = z.object({
  ma: z.record(
    z.array(CurrencyRecordSchema) // Map-like structure where each currency has an array of currency records
  )
});