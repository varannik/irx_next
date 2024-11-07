import { Document } from "mongoose"

export interface IWeekDay {
    dyn:number,
    dab:number,
    das:number
}


export interface IWeek extends Array<IWeekDay[]> {
    [key: number]: IWeekDay[]
}

export interface IPastWeeks {
    [key:number]:IWeek
}

interface IAssetWeeks {
    [key:string]:IPastWeeks
}

export interface IWeekDayCal {
    'weekdays':{
        [key:string]:IAssetWeeks,
    } 
}

export type IWeekDays = IWeekDayCal & Document