import { Schema, Document, models, model } from 'mongoose';

interface IDataItem {
    date: string
    rate: number
  }

interface IDataList {
  week:IDataItem[],
  month:IDataItem[],
  quarter:IDataItem[],
}

interface IAssetData {
  [key:string]:IDataList
}

interface IPeriodicTrend extends Document{

    periods:{
        'G':IAssetData,
        'J':IAssetData,
    }
}


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

