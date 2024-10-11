import { z } from 'zod';

export const PredictSchemaVl = z.object({
  nextDay: z.number()
});
