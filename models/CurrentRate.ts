import mongoose, { Schema, Document, models, model  } from 'mongoose';

interface IPrice {
  buy: number;
  sell: number;
}

interface ICurrentRate extends Document {
  currentrate: Record<string, {
    price: IPrice;
  }>;
  last_update: Date;
}

const currentRateSchema: Schema<ICurrentRate> = new Schema({
  currentrate: {
    type: Map,
    of: new Schema({
      price: {
        buy: { type: Number, required: true },
        sell: { type: Number, required: true }
      }
    }, { _id: false }),
    required: true
  },
  last_update: { type: Date, required: true }
});

// Create the CurrentRate model
const CurrentRate = models.CurrentRate || model<ICurrentRate >('CurrentRate', currentRateSchema);

export default CurrentRate;
