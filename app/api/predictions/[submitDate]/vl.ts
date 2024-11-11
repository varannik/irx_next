import { z } from 'zod';

export const PredictSchemaVl = z.object({
  selectedAsset: z.string(),
  nextDayRate: z.number()
});
