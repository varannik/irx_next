import { IDataItem, IDataList, IPeriodicTrend } from '@/types/PeriodTrend';
import { Schema, models, model } from 'mongoose';


// Define the IDataItem schema
const DataItemSchema: Schema = new Schema<IDataItem>({
    date: { type: String, required: true },
    rate: { type: Number, required: true },
  }, { _id: false });
  


// Define the Mongoose schema for PeriodicTrend
const PeriodicTrendSchema = new Schema({
  periods: {
    G:{
      type:Map,  
      of: new Schema<IDataList>({
        week: { type: [DataItemSchema], required: true },
        month: { type: [DataItemSchema], required: true },
        quarter: { type: [DataItemSchema], required: true }
      }, { _id: false })
    } ,
    J: {
      type:Map,  
      of: new Schema<IDataList>({
        week: { type: [DataItemSchema], required: true },
        month: { type: [DataItemSchema], required: true },
        quarter: { type: [DataItemSchema], required: true }
      }, { _id: false })
    }
  }
});


  // Create the PeriodicTrend model
const PeriodicTrend = models.PeriodicTrend || model<IPeriodicTrend>('PeriodicTrend', PeriodicTrendSchema);

export default PeriodicTrend;

