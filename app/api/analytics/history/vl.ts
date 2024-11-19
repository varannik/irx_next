import { z } from "zod";
import { ObjectId } from "mongodb";

// Schema for IPredict
const vPredictSchema = z.object({
  nextdaydate: z.string(), // Assume ISO date format; use regex if stricter validation is needed
  predictedrate: z.number(),
  actualrate: z.number(),
  pct_predicted: z.number(),
  pct_actual: z.number(),
  csp: z.boolean(),
});

// Schema for IDayPredict
const vDayPredictSchema = z.record(vPredictSchema);

// Schema for IDayPredictAsset
const vDayPredictAssetSchema = z.record(z.array(vDayPredictSchema));

// Schema for IUserHistoryPredict
const vUserHistoryPredictSchema = z.object({
  userId: z.string().refine(
    (value) => ObjectId.isValid(value),
    { message: "Invalid ObjectId" }
  )
  ,assets: z.array(vDayPredictAssetSchema) // Validate nested IDayPredictAsset
  ,lastUpdate: z.string(), // Validate as string; can add date regex for stricter validation
});

const vGetLastUpdate = z.string().refine(
  (value) => ObjectId.isValid(value),
  { message: "Invalid ObjectId" }
)

// Export schemas
export {
  vPredictSchema,
  vDayPredictSchema,
  vDayPredictAssetSchema,
  vUserHistoryPredictSchema,
  vGetLastUpdate,
};


// Define the schema for AssetData
const vPredictUpdateSchema = z.object({
  nextdaydate: z.string(),
  predictedrate: z.number(),
  actualrate: z.number(),
  pct_predicted: z.number(),
  pct_actual: z.number(),
  csp: z.boolean(),
});

// Define the schema for UpdateAssetRequest
const vUpdateAssetRequestSchema = z.object({
  userId: z.string().min(24).max(24), // Assuming userId is a 24-character string (e.g., ObjectId)
  assetType: z.string().min(1), // Validate that assetType is a non-empty string
  date: z.string(),
  newData: vPredictUpdateSchema, // Reference to AssetData schema
});

// Export schemas
export { vPredictUpdateSchema, vUpdateAssetRequestSchema };