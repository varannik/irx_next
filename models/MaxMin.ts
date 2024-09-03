import mongoose, { Schema, Document, models, model } from 'mongoose';

interface IMaxMin extends Document {
  maxmin: {
    J: Record<string, {
      week: { max: number, min: number },
      month: { max: number, min: number },
      today: { max: number, min: number },
      days: Record<number, { max: number, min: number }>
    }>,
    G: Record<string, {
      week: { max: number, min: number },
      month: { max: number, min: number },
      today: { max: number, min: number },
      days: Record<number, { max: number, min: number }>
    }>
  };
}

const MaxMinSchema: Schema = new Schema({
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