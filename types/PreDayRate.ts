
export interface IAssetRate {
    [key:string] : number
}

export interface IPreDayRate {
    preDayRate : {
        date:string
        ,assets:IAssetRate
    }
}