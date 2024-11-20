import { z } from "zod";

// Zod schema for IGenIdPrediction
export const vGenIdPredictionSchema = z.record(
  z.string()
  ,z.number() // Validates that userId is a number
)

// Zod schema for IGenAsset
export const vGenAssetSchema = z.record(
  z.string(), // The keys of the record are strings
  z.array(vGenIdPredictionSchema) // The values are arrays of IGenIdPrediction objects
);

// Zod schema for IGenDayPredictions
export const vGenDayPredictionsSchema = z.object({
  date: z.string(), // Validates that date is a string
  assets: z.array(vGenAssetSchema), // Validates that assets is an array of IGenAsset objects
});