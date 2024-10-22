import { z } from 'zod';

// Zod schema for IAiPredictDay
const AiPredictDaySchema = z.object({
  date: z.string().min(1, "Date is required"), // Date should be a non-empty string
  RP: z.number().nonnegative("Real price must be a non-negative number").optional(), // RP must be a non-negative number
  PP: z.number().nonnegative("Predicted price must be a non-negative number").optional(), // PP must be a non-negative number
  PT: z.number().nonnegative("Next day price must be a non-negative number").optional() // PT is optional and must be non-negative if provided
});

// Zod schema for AiPerformanceDay
const AiPerformanceDaySchema = z.object({
  date: z.string().min(1, "Date is required"), // Date should be a non-empty string
  RC: z.number(), 
  PC: z.number(),
  TP: z.string()
});

// Zod schema for IAiPredict10Days
const AiPredict10DaysSchema = z.object({
  trend: z.array(AiPredictDaySchema), // Trend is an array of IAiPredictDay objects
  tracker: z.array(AiPerformanceDaySchema) // Tracker is an array of AiPerformanceDay objects
});

// Zod schema for IAiPredictAsset
export const AiPredictSchemaValidation = z.object({
  aipredict: z.record(
    z.string(),
    AiPredict10DaysSchema // Using Zod's record to map a string key to IAiPredict10Days schema
  )
});