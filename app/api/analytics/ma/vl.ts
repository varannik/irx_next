import { z } from 'zod';

// Zod schema for each currency record
const CurrencyRecordSchema = z.object({
  date: z.string(), // Ensure the date is a non-empty string
  rate: z.number().positive(), // The rate should be a positive number
  moa3: z.number().positive(),
  moa5: z.number().positive(),
  moa10: z.number().positive(),
  moa50: z.number().positive(),
  moa100: z.number().positive(),
  moa200: z.number().positive(),
  moa300: z.number().positive(),
});


export const MASchemaValidation = z.object({
  ma: z.record(
    z.array(CurrencyRecordSchema) // Map-like structure where each currency has an array of currency records
  )
});