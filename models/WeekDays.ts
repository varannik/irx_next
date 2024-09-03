import { Schema, Document, models, model } from "mongoose";
import { object } from "zod";


interface IWeekDay {
    dyn:number,
    dab:number,
    das:number
}


export interface IWeek {
    [key: number]: IWeekDay[]
}

export interface IPastWeeks {
    [key:number]:IWeek
}

interface IAssetWeeks {
    [key:string]:IPastWeeks
}

export interface IWeekDays extends Document {
    'weekdays':{
        'J':IAssetWeeks,
        'G':IAssetWeeks,
    } 
}


// Create the weekdays schema
const WeekDaysSchema: Schema = new Schema({
    weekdays: {}
}
);


const WeekDays = models.WeekDays || model<IWeekDays> ('WeekDays', WeekDaysSchema);

export default WeekDays;

