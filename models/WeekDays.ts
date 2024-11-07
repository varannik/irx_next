import { IWeekDays } from "@/types/WeekDays";
import { Schema, models, model } from "mongoose";


// Create the weekdays schema
const WeekDaysSchema: Schema = new Schema({
    weekdays: {}
}
);


const WeekDays = models.WeekDays || model<IWeekDays> ('WeekDays', WeekDaysSchema);

export default WeekDays;

