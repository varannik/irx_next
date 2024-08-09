import { z } from 'zod';

export const currentrateSchema = z.object({
  currentrate: z.record(z.string(), z.object({
    price: z.object({
      buy: z.number().int(),
      sell: z.number().int(),
    })
  })),
  last_update: z.string().datetime()
});

