import { Schema, Document, models, model } from 'mongoose';

// Define the interface for each currency record
interface ICurrencyRecord  {
    date: string;
    rate: number;
    moa3: number;
    moa5: number;
    moa10: number;
    moa50: number;
    moa100: number;
    moa200: number;
    moa300: number;
}

// Define the schema for each currency record
const CurrencyRecordSchema: Schema = new Schema({
    date: { type: String, required: true },
    rate: { type: Number, required: true },
    moa3: { type: Number, required: true },
    moa5: { type: Number, required: true },
    moa10: { type: Number, required: true },
    moa50: { type: Number, required: true },
    moa100: { type: Number, required: true },
    moa200: { type: Number, required: true },
    moa300: { type: Number, required: true }
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
