import { Schema, Document, models, model } from 'mongoose';

// Define the interface for each currency record
export interface ICurrencyRecord  {
    date: string;
    Rate: number;
    MA3: number;
    MA5: number;
    MA10: number;
    MA50: number;
    MA100: number;
    MA200: number;
    MA300: number;
}

// Define the schema for each currency record
const CurrencyRecordSchema: Schema = new Schema({
    date: { type: String, required: true },
    Rate: { type: Number, required: true },
    MA3: { type: Number, required: true },
    MA5: { type: Number, required: true },
    MA10: { type: Number, required: true },
    MA50: { type: Number, required: true },
    MA100: { type: Number, required: true },
    MA200: { type: Number, required: true },
    MA300: { type: Number, required: true }
});

// Define the interface for the main schema
export interface IMAModel extends Document {
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
