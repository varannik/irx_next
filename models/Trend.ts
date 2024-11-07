import { IAsset, Iday } from "@/types/DurationTrend";
import { Schema, Document, models, model } from "mongoose";


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