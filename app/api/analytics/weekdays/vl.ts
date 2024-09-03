import { z } from 'zod';

// Define the Zod schema for weekdays
export const WeekDaysSchema = z.object({
  weekdays: z.record(
    z.string(), 
    z.any() // Allows for an empty object schema
  )
});