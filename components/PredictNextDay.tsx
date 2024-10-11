"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/UI/cardTremor"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { cx } from "@/lib/utils"
import { I7Days } from "@/models/SimpleTrend"
import { LineChart, TooltipProps } from "./UI/lineChart"

const data = [

  {
      "date": "2024-09-28",
      "rate": 61000,
      "MA3": null
  },
  {
      "date": "2024-09-29",
      "rate": 60400,
      "MA3": null
  },
  {
      "date": "2024-09-30",
      "rate": 60650,
      "MA3": null
  },
  {
      "date": "2024-10-01",
      "rate": 61850,
      "MA3": null
  },
  {
      "date": "2024-10-02",
      "rate": 61800,
      "MA3": null
  },
  {
      "date": "2024-10-03",
      "rate": 62450,
      "MA3": null
  },
  {
      "date": "2024-10-04",
      "rate": 61750,
      "MA3": null
  },
  {
      "date": "2024-10-05",
      "rate": 62250,
      "MA3": null
  },
  {
      "date": "2024-10-06",
      "rate": 63100,
      "MA3": 63100
  },
  {
      "date": "2024-10-07",
      "rate": 62750,
      "MA3": 63500
  }
]

function standizeRate (current7dData : Array<I7Days> ):Array<I7Days>{
  // To accurately display the fluctuating trend
  // Step 1: Extract the rates from pre_days
  const rates = current7dData.map(day => day.rate);

  // Step 2: Find min and max values of rates
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);

  // Step 3: Standardize the rates using min-max normalization
  current7dData = current7dData.map(day => ({
      ...day,
      rate: (day.rate - minRate) / (maxRate - minRate)
  }));
  return current7dData
}

let formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});


export function PredictNextDay() {
  const {currentAsset} = useSelectedAsset()
  const [simpleTrendData, setSimpleTrendData] = useState(null)
  const [current7dData, setCurrent7dData] = useState<Record<string, any>[]>([])
  const [currentDiffVal, setCurrentDiffVal] = useState<string | null>(null)
  const [color, setColor] = useState<"positive" | "negative" | 'gray'>('gray')
  const [datas, setDatas] = useState<TooltipProps | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/simpletrend');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0].assets;
        setSimpleTrendData(data)
        
      } catch (error) {
        console.log('Simple trend data is not reachable');
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{

    if (simpleTrendData !== null) {
      
      let n = Number(simpleTrendData[String(currentAsset.name)]['diff_per'])
      setCurrent7dData(simpleTrendData[String(currentAsset.name)]['pre_days'])
      setCurrentDiffVal(formatter.format(n))
      setColor( n > 0
        ? "positive"
        : n == 0 ? "gray" : "negative"
      )

    }
    }  , [currentAsset, currentDiffVal, simpleTrendData]);
    console.log(current7dData)
  return (
    <Card  className="mx-auto  max-w-lg items-center justify-between px- py-3.5"> 

<div>
    <p className="text-base font-normal text-text-active">Moving Average</p>


      <LineChart
        data={data}
        index="date"
        categories={["rate", "predict"]}
        showLegend={false}
        showYAxis={false}
        autoMinValue={true}
        // colors={["gray"]}
        className="mb-3 mt-8 h-48"
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
    </Card>
  )
}