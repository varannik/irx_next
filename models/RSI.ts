import  { Schema, Document, models, model } from 'mongoose';

// Define the RSI data schema for each currency
interface IRSIEntry {
    date: string;
    RSI: number;
}

// Define the main RSI schema
interface IRSIModel extends Document {
    rsi: {
        [key:string]:IRSIEntry[]
    };
}

// RSI Entry Schema
const RSIEntrySchema = new Schema<IRSIEntry>({
    date: { type: String, required: true },
    RSI: { type: Number, required: true }
}, { _id: false });


// Main RSI Model Schema
const RSISchema = new Schema<IRSIModel>({
    rsi: { type: Map, of:[RSIEntrySchema], required: true }
});


// Create the MaxMin model
const RSI = models.RSI || model<IRSIModel>("RSI", RSISchema);

export default RSI;


