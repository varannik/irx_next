
import { z } from 'zod';

export const maxminSchema = z.object({
  maxmin: z.object({
    J: z.record(z.string(), z.object({
      week: z.object({
        max: z.number(),
        min: z.number()
      }),
      month: z.object({
        max: z.number(),
        min: z.number()
      }),
      days: z.record(z.string(), z.object({
        max: z.number(),
        min: z.number()
      }))
    })),
    G: z.record(z.string(), z.object({
      week: z.object({
        max: z.number(),
        min: z.number()
      }),
      month: z.object({
        max: z.number(),
        min: z.number()
      }),
      days: z.record(z.string(), z.object({
        max: z.number(),
        min: z.number()
      }))
    }))
  })
});