import { IPreDayRate } from '@/types/PreDayRate';
import { Schema, models, model  } from 'mongoose';


const preDayRateSchema: Schema<IPreDayRate> = new Schema({
    preDayRate: {
        date:{ type: String, required: true }
        ,assets: {
            type: Map 
            ,of: Number
            ,required: true
        }
    }
  });



// Create the CurrentRate model
const PreDayRate = models.PreDayRate || model<IPreDayRate >('PreDayRate', preDayRateSchema);

export default PreDayRate;

