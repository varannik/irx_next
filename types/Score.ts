export interface IUserScoreDetails{
    join_date: string
    ,mean_absolute_error: number
    ,root_mean_squared_error: number
    ,mean_absolute_percentage_error: number
    ,weighted_score: number
    ,rolling_average_stability: number
    ,consistency_incentive: number
    ,trend_sensitivity: number
    ,bonus_points: number
    ,frequency_of_predictions: number
    ,ranking_score: number
    ,rank: number
}


export interface IUsers {
    [key:string]:IUserScoreDetails
}

export interface IScoreAsset {
    [key:string]:IUsers[]
}

export interface IScore{
    updateDate: string
    ,assets: IScoreAsset[]
} 