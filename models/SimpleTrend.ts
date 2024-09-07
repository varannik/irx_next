import { Schema, Document, models, model } from "mongoose";


interface I7Days {
    dyn:number,
    rate:number,
}

interface ITrend {
    pre_days: I7Days[],
    diff_per: number,
}

interface IAsset {
    [key:string]:ITrend
}

interface ISimpleTrend  extends Document{
    assets : IAsset
}


// Define the I7Days schema
const _7DaysSchema = new Schema<I7Days>({
    dyn: { type: Number, required: true },
    rate: { type: Number, required: true }
});

// Define the ITrend schema
const TrendSchema = new Schema<ITrend>({
    pre_days: { type: [_7DaysSchema], required: true },  // Array of I7Days
    diff_per: { type: Number, required: true }
});

// Define the ISimpleTrend schema
const SimpleTrendSchema = new Schema <ISimpleTrend>({
    assets: { type: Map, of: TrendSchema, required: true }
});

const SimpleTrend = models.SimpleTrend || model<ISimpleTrend> ('SimpleTrend', SimpleTrendSchema);

export default SimpleTrend;

