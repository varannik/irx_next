
import { z } from 'zod';


// Define the Zod schema for IAssetInfo
const AssetInfoSchema = z.object({
  COUNTRY_NAME: z.string(),
  ALPHA_2: z.string(),
  ALPHA_3: z.string().optional(),
  NUMERIC: z.number()
});

// Define the Zod schema for IAsset
const AssetSchema = z.object({
  name: z.string(),
  info: AssetInfoSchema
});

// Define the Zod schema for IAssetCollection
export const AssetCollectionSchemaVal = z.object({
  assets: z.array(AssetSchema)
});
