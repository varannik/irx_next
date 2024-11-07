import { Document } from "mongoose";

// Define the TypeScript interface for an individual asset
export interface IAssetInfo {
    COUNTRY_NAME: string;
    ALPHA_2: string;
    ALPHA_3: string;
    NUMERIC: number;
  }
  
  export interface IAsset {
    name: string,
    info: IAssetInfo ;
  }
  
  export interface IAssets  {
    assets: IAsset[];
  }

  export type IAssetCollection = IAssets & Document