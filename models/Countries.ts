import { IAsset, IAssetCollection, IAssetInfo } from '@/types/Assets';
import  { Schema, model, models } from 'mongoose';

// Define the schema for an individual asset
const AssetInfoSchema = new Schema<IAssetInfo>({

  COUNTRY_NAME: { type: String, required: true },
  ALPHA_2: { type: String, required: true },
  ALPHA_3: { type: String },
  NUMERIC: { type: Number }
  

});

const AssetSchema: Schema = new Schema<IAsset>({
  name:String,
  info:AssetInfoSchema
});

// Define the Mongoose model for IAssetCollection
const AssetCollectionSchema: Schema = new Schema({
  assets: [{ type: AssetSchema, required: true }]
});

const Country = models.Country || model<IAssetCollection> ('Country', AssetCollectionSchema);
export default Country;




