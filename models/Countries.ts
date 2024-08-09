import  { Schema, Document, Model, model, models } from 'mongoose';


// Define the TypeScript interface for an individual asset
interface IAssetInfo {
  COUNTRY_NAME: string;
  ALPHA_2: string;
  ALPHA_3: string;
  NUMERIC: number;
}

export interface IAsset {
  name: String,
  info: IAssetInfo ;
}

interface IAssetCollection extends Document {
  assets: IAsset[];
}

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




