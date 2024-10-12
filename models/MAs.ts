import { Schema, Document, models, model } from 'mongoose';

// Define the interface for each currency record
interface ICurrencyRecord  {
    date: string;
    rate: number;
    moving_avg_short_3: number;
    moving_avg_short_5: number;
    moving_avg_short_10: number;
    moving_avg_mid_50: number;
    moving_avg_mid_100: number;
    moving_avg_long_200: number;
    moving_avg_long_300: number;
}

// Define the schema for each currency record
const CurrencyRecordSchema: Schema = new Schema({
    date: { type: String, required: true },
    rate: { type: Number, required: true },
    moving_avg_short_3: { type: Number, required: true },
    moving_avg_short_5: { type: Number, required: true },
    moving_avg_short_10: { type: Number, required: true },
    moving_avg_mid_50: { type: Number, required: true },
    moving_avg_mid_100: { type: Number, required: true },
    moving_avg_long_200: { type: Number, required: true },
    moving_avg_long_300: { type: Number, required: true }
});

// Define the interface for the main schema
interface IMAModel extends Document {
    ma: {
        [key: string]: ICurrencyRecord[];
    };
}

// Define the main schema that holds multiple currencies
const MASchema: Schema = new Schema({
    ma: {
        type: Map,
        of: [CurrencyRecordSchema],
        required: true
    }
});


// Create the CurrentRate model
const MA = models.MA || model<IMAModel >('MA', MASchema);

export default MA;
