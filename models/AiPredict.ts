import { Schema, Document, models, model } from 'mongoose';

interface IAiPredictDay {
    date:string,
    RP?:number,
    PP?:number,
    PT?:number
    
}

interface AiPerformanceDay{
    date:string,
    RC:number,
    PC:number,
    TP:string
}

export interface IAiPredict10Days {
    trend: IAiPredictDay[],
    tracker:AiPerformanceDay[]
}

export interface IAiPredictAsset extends Document {
    aipredict: {
      [key: string]: IAiPredict10Days;
    };
  }

// Mongoose schema for IAiPredictDay
const AiPredictDaySchema: Schema = new Schema<IAiPredictDay>({
    date: { type: String, required: true },
    RP: { type: Number, required: false },
    PP: { type: Number, required: false },
    PT: { type: Number, required: false }
});


// Mongoose schema for AiPerformanceDay
const AiPerformanceDaySchema: Schema = new Schema<AiPerformanceDay>({
    date: { type: String, required: true },
    RC: { type: Number, required: true },
    PC: { type: Number, required: true },
    TP: { type: String, required: true },
});

// Mongoose schema for IAiPredict10Days
const AiPredict10DaysSchema: Schema = new Schema<IAiPredict10Days>({
    trend: { type: [AiPredictDaySchema], required: true },
    tracker: { type: [AiPerformanceDaySchema], required: true }
});

// Mongoose schema for IAiPredict10Days
const AiPredictSchema: Schema = new Schema<IAiPredictAsset>({
    aipredict: {
        type: Map,
        of: AiPredict10DaysSchema,
        required: true,
      },
});


// Create the CurrentRate model
const AiPredict = models.AiPredict || model<IAiPredictAsset >('AiPredict', AiPredictSchema);

export default AiPredict;