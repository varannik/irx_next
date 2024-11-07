import { IRSIEntry, IRSIModel } from '@/types/RSI';
import  { Schema, models, model } from 'mongoose';


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


