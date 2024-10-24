import { Schema, Document, models, model } from "mongoose";

// Define the interface for the Trend
export interface Iday {
    date: string;
    rate: number;
}

// Define the interface for the Asset document
export interface IAsset extends Document{
    asset: string;
    trend: Iday[];
}

// Create the schema for the Asset
const daySchema: Schema = new Schema<Iday>({
    date: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const assetSchema: Schema = new Schema<IAsset>({
    asset: {
        type: String,
        required: true
    },
    trend: {
        type: [daySchema], // Array of Trend objects
        required: true
    }
});

const Trend = models.Trend || model<IAsset> ('Trend', assetSchema);

export default Trend;