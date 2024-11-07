import { ICurrencyRecord, IMAModel } from '@/types/MA';
import { Schema, models, model } from 'mongoose';

// Define the schema for each currency record
const CurrencyRecordSchema: Schema = new Schema<ICurrencyRecord>({
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
