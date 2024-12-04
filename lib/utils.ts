// Tremor Raw cx [v0.0.0]

import { recCatTrack } from "@/types/Forcasts"
import { IDayPredictAsset } from "@/types/HistPredict"
import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AvailableChartColorsKeys } from "./chartUtils"
import { getCurrentDay, getNextDay } from "@/utils/global/currentday"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-700/30",
  // border color
  " focus:border-blue-700",
]

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500",
]

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-700",
  // ring color
  "ring-red-700/30",
]

export function trackerColor (value: boolean | null ){

  if (value == null || undefined){
    return "bg-gray-600"
  } if (value == true){
    return "bg-green-high"
  } if (value == false){
    return "bg-red-high"
  } else {
    return "bg-gray-600"
  }
}

export function haveSameSign(a:number, b:number) {
  return a * b > 0; // True if both are positive or both are negative
}


export function futureTrendColor(value: number | null ):AvailableChartColorsKeys{

  if (value == null || undefined){
    return 'gray'
  } if (value > 0){
    return 'negative'
  } if (value < 0 ){
    return 'positive'
  } else {
    return 'gray'
  }
}

export function resModule (data: any, assetName: string, day: string, att: string) {



  if (data) {
    let ad = data[assetName].find((obj: IDayPredictAsset) => obj[day])
    if (ad) {
      return ad ? Number(Number(ad[day][att]).toFixed(2)) : null
    } else {
      return null
    }
  } else {
    return null
  }
}

export function resModuleB (data: any, assetName: string, day: string, att: string):boolean | null {
  if (data) {
    let ad = data[assetName].find((obj: IDayPredictAsset) => obj[day])
    if (ad) {
      return ad[day][att]
    } else {
      return null
    }
  } else {
    return null
  }
}



export function createTrackData({
  module
  ,type
  ,asset
  ,d
  ,preRealRate
  ,forecastedRate
  ,currRealRate
  
}:{
  module: IDayPredictAsset | undefined
  ,type : "f" | "c" | "h" // Future or current 
  ,asset : string
  ,d : string 
  ,preRealRate?: number | null
  ,forecastedRate?: number | null
  ,currRealRate?:number | null
}):recCatTrack{

    if (type == "f"){

      return {
        color: "bg-gray-600"
        ,tooltip: {
          date: getNextDay()
          , "Forcasted Shift %": (preRealRate && forecastedRate) ? Number(((forecastedRate - preRealRate )/ preRealRate * 100).toFixed(2)) : 0
          , "Actual Shift %": 0
        
      }
    }

  }

  if (type == "c"){

    const f = (preRealRate && forecastedRate) ? (forecastedRate - preRealRate) : 0
    const r = (preRealRate && currRealRate) ? (currRealRate - preRealRate) : 0

    return {
      color: trackerColor(haveSameSign(f, r))
      ,tooltip: {
        date: getCurrentDay()
        , "Forcasted Shift %": (preRealRate && forecastedRate) ? Number(((forecastedRate - preRealRate )/ preRealRate * 100).toFixed(2)) : 0
        , "Actual Shift %": (preRealRate && currRealRate) ? Number(((currRealRate - preRealRate )/ preRealRate * 100).toFixed(2)) : 0
      
    }
  }

      
  }

  if (type == "h"){
    let date = new Date(d);
    // Subtract 1 day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    date.setDate(date.getDate() + 1);
    // Format the date back to string (optional)
    let oneDayAgo = date.toISOString().split('T')[0]; // Outputs: YYYY-MM-DD

      return {
        color: trackerColor(resModuleB(module, asset, d, 'csp'))
        ,tooltip: {
          date: oneDayAgo
          , "Forcasted Shift %": resModule(module, asset, d, 'pct_predicted')
          , "Actual Shift %": resModule(module, asset, d, 'pct_actual')
        }
      }
  }
  
  
  else {
    return {
      color: trackerColor(false)
      ,tooltip: {
        date: d
        , "Forcasted Shift %": 0
        , "Actual Shift %": 0
      }
    }
  }



}






