import { z } from 'zod';

// Define the schema for a single Rate entry (IBBDay)
const BBDaySchema = z.object({
  date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  Rate: z.number().positive(),
  Lower: z.number().positive(),
  Middle: z.number().positive(),
  Upper: z.number().positive(),
});

// Define the schema for the Moving Averages (MA3, MA5, MA10)
const IBBMovsSchema = z.object({
  MA3: z.array(BBDaySchema),
  MA5: z.array(BBDaySchema),
  MA10: z.array(BBDaySchema),
});

// Define the main schema for the asset (IBBAsset)
export const BBAssetSchemaValidation = z.object({
  bb: z.record(IBBMovsSchema) // Using z.record for dynamic keys
});
