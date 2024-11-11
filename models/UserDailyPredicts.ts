import { IUserDailyPredicts } from '@/types/UserDailyPredict';
import  { Schema, model, models } from 'mongoose';


// Define the schema for an prediction
const PredictsSchema: Schema = new Schema<IUserDailyPredicts>({
    userId: { type: Schema.Types.ObjectId, required: true },
    submitDate: { type: Date, default: Date.now, required: true },
    selectedAsset: { type: String, required: true },
    nextDayRate: { type: Number , required: true},
});

const UserDailyPredict = models.UserDailyPredict || model<IUserDailyPredicts> ('UserDailyPredict', PredictsSchema);
export default UserDailyPredict; 