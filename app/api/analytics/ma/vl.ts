import { z } from 'zod';

// Zod schema for each currency record
const CurrencyRecordSchema = z.object({
  date: z.string(), // Ensure the date is a non-empty string
  Rate: z.number().positive(), // The rate should be a positive number
  MA3: z.number().positive(),
  MA5: z.number().positive(),
  MA10: z.number().positive(),
  MA50: z.number().positive(),
  MA100: z.number().positive(),
  MA200: z.number().positive(),
  MA300: z.number().positive(),
});


export const MASchemaValidation = z.object({
  ma: z.record(
    z.array(CurrencyRecordSchema) // Map-like structure where each currency has an array of currency records
  )
});