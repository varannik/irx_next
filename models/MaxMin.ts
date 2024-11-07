import { IMaxMin } from '@/types/MaxMin';
import { Schema, models, model } from 'mongoose';


const MaxMinSchema: Schema = new Schema<IMaxMin>({
  maxmin: {
    J: {
      type: Map,
      of: new Schema({
        week: { max: Number, min: Number },
        month: { max: Number, min: Number },
        today: { max: Number, min: Number },
        days: {
          type: Map,
          of: { max: Number, min: Number }
        }
      })
    },
    G: {
      type: Map,
      of: new Schema({
        week: { max: Number, min: Number },
        month: { max: Number, min: Number },
        today: { max: Number, min: Number },
        days: {
          type: Map,
          of: { max: Number, min: Number }
        }
      })
    }
  }
});

// Create the MaxMin model
const MaxMin = models.MaxMin || model<IMaxMin>('MaxMin', MaxMinSchema);

export default MaxMin;