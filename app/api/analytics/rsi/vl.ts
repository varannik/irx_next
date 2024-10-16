import { z } from 'zod';

// Zod schema for RSI Entry
const RSIEntrySchema = z.object({
    date: z.string(),
    RSI: z.number()
});

// Zod schema for main RSI model
export const RSISchemaValidation = z.object({
    rsi: z.record(z.string(), z.array(RSIEntrySchema)) // 'record' to map a string key to an array of RSIEntry
});