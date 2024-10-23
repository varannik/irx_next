"use client"

import React, { useEffect, useState } from "react"

import { Card } from "@/components/UI/cardTremor"
import { Tracker } from "@/components/UI/tracker"
import useSelectedAsset from "@/stores/useSelectedAssetStore"

import {  IAiPredictAsset } from "@/models/AiPredict"
import { LineChart, LineChartEventProps, TooltipProps } from "./UI/lineChartAi"
import SpinerIcon from "./UI/icons/Spinner"
import { AvailableChartColorsKeys } from "@/lib/chartUtils"
import Alert from "./UI/alert"

interface Itooltip {
    date:string,
    "Real Change":number,
    "Predicted Change":number
  }
  

interface ITrendData {
  "Date": string,
  "Real Rate"?: number,
  "Forecasted Rate"?: number,
  "Future Rate"?:number,
}


export function TrackerAi() {
  const {currentAsset} = useSelectedAsset()
  const [data, setData] = useState<IAiPredictAsset | null>(null)
  const [trendData, setTrendData] = useState<ITrendData[]>([{  "Date": "",
                                                                "Real Rate": 0,
                                                                "Forecasted Rate":0,
                                                                "Future Rate":0}])
                                                                
  const [trackerData, setTrackerData] = useState([{ color: "bg-emerald-600", 
                                                    tooltip: {date:"", 
                                                              "Real Change":0,
                                                              "Predicted Change":0
                                                            }}])
  const [value, setValue] = useState<LineChartEventProps>(null)
  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [colors, setColors] = useState<AvailableChartColorsKeys[]>(['blue',  'gray']);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/aipredict');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0];
        setData(data)
      } catch (error) {
        console.log('Ai data is not reachable');
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    if (data && currentAsset.name == 'US Dollar'){

      const currencyData = data.aipredict[currentAsset.name];

      const refineTrend = currencyData.trend.map(item => {
        let newObj :ITrendData = {
          "Date": item.date,  // Renaming "date" to "Date"
        };
      
        if (item.RP !== undefined) {
          newObj["Real Rate"] = item.RP;  // Renaming "RP" to "Real Rate"
        }
      
        if (item.PP !== undefined) {
          newObj["Forecasted Rate"] = item.PP;  // Renaming "PP" to "Forecasted Rate"
        }
      
        if (item.PT !== undefined) {
          newObj["Future Rate"] = item.PT;  // Renaming "PT" to "Future Rate"
        }
      
        return newObj;  // Return the new object with updated keys
      });

      setTrendData(refineTrend)

      const trackerdata = currencyData.tracker.map(item => {
        return {
          color: item.TP === 'T' ? "bg-green-high" : item.TP === 'F' ? "bg-red-high" : "bg-gray-600",
          tooltip: {
            date: item.date,
            "Real Change": item.RC,
            "Predicted Change": item.PC
          }
        };
      });
      setTrackerData(trackerdata)
      
    }
  }, [currentAsset, data])

  useEffect(() => {

    let freshColors:AvailableChartColorsKeys[] = ['blue',  'gray']
    let futureColor:AvailableChartColorsKeys = trackerData[trackerData.length-1].tooltip["Predicted Change"] < 0 ? 'negative' : trackerData[trackerData.length-1].tooltip["Predicted Change"] > 0 ? 'positive' : 'gray'
    setColors(freshColors.concat(futureColor))

  }, [trackerData]);
 
  if (currentAsset.name !== 'US Dollar' ) return (
    <Card className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5" >
      <p className="text-base font-normal text-text-active">Ai</p>
      <div className="flex items-center justify-center text-xs">
      Exclusively available in USD.
      </div>
      
    </Card>
  )


  if (data == null ) return (
    <Card className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5" >
      <p className="text-base font-normal text-text-active">Ai</p>
      <div className="flex items-center justify-center">
      <SpinerIcon />
      </div>
      
    </Card>
  )

  return (
    <Card  className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5 "> 

        <div className="flex-none font-medium text-gray-700 dark:text-gray-300">Ai</div>
        <div  className="">
        <LineChart

            data={trendData}
            index="Date"
            categories={["Real Rate", "Forecasted Rate","Future Rate"]}
            showLegend={true}
            showYAxis={false}
            showXAxis={false}
            autoMinValue={true}
            onValueChange={(v) => setValue(v)}
            colors={colors}
            showGridLines={false}
            className="mb-3 mt-8 h-48"
            showTooltip={true}
            refAreaX1={trendData.length > 2 ? trendData[trendData.length-3].Date : 'null'}
            refAreaX2={trendData.length > 2 ? trendData[trendData.length-2].Date : 'null'}
            tooltipCallback={(props) => {
              if (props.active) {
                setDatas((prev: any) => {
                  if (prev?.label === props.label) return prev
                  return props
                })
              } else {
                setDatas(null)
              }
              return null
            }}
        />
        </div>

        <div className="flex-none font-medium text-xs mb-3 text-gray-700 dark:text-gray-300">Accurately predicted rate shifts</div>

        <Tracker className="w-full" data={trackerData} hoverEffect={true} />

        <Alert />
    </Card>
  )
}

