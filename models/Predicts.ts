import  { Schema, Document, Model, model, models } from 'mongoose';


interface IPredicts extends Document  {
    userId :Schema.Types.ObjectId,
    submitDate: Date,
    selectedAsset: string,
    nextDay: number
}

// Define the schema for an prediction
const PredictsSchema: Schema = new Schema<IPredicts>({
    userId: { type: Schema.Types.ObjectId, required: true },
    submitDate: { type: Date, default: Date.now, required: true },
    selectedAsset: { type: String, required: true },
    nextDay: { type: Number , required: true},
});

const Predict = models.Pridict || model<IPredicts> ('Predict', PredictsSchema);
export default Predict; 