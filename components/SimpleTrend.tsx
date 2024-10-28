"use client"

import React, { useEffect, useState } from "react"

import { Card } from "@/components/UI/cardTremor"
import { SparkAreaChart } from "@/components/UI/sparkChart"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { cx } from "@/lib/utils"
import { I7Days } from "@/models/SimpleTrend"
import SpinerIcon from "./UI/icons/Spinner"

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


export function SimpleTrend() {
  const {currentAsset} = useSelectedAsset()
  const [simpleTrendData, setSimpleTrendData] = useState(null)
  const [current7dData, setCurrent7dData] = useState<Record<string, any>[]>([])
  const [currentDiffVal, setCurrentDiffVal] = useState<string | null>(null)
  const [color, setColor] = useState<"positive" | "negative" | 'gray'>('gray')


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
      setCurrent7dData(standizeRate(simpleTrendData[String(currentAsset.name)]['pre_days']))
      setCurrentDiffVal(formatter.format(n))
      setColor( n > 0
        ? "positive"
        : n == 0 ? "gray" : "negative"
      )

    }
    }  , [currentAsset, currentDiffVal, simpleTrendData]);

    if (simpleTrendData == null || currentAsset ==null || currentDiffVal ==null) return (
      <Card  >
        <p className="text-base font-normal text-text-active">7 Days</p>
        <div className="flex items-center justify-center">
          <SpinerIcon />
        </div>
      </Card>
    )


  return (
    <div className="flex mb-3"> 

      <div className="flex grow items-center space-x-2.5">
        <div className="flex-none font-medium text-gray-300">7 Days </div>
        <div className="flex justify-center grow">
        <SparkAreaChart
        data={current7dData}
        categories={["rate"]}
        index={"dyn"}
        colors={[color]}
        className="h-8 w-20 sm:h-10 sm:w-36 "/>
        </div>
      </div>
      <div className="flex items-center space-x-2.5 pl-4 ">
        <span  className={cx(
          "rounded px-2 py-1 text-sm font-medium text-white",
          color == 'positive'
        ? "bg-red-high"
        : color == 'negative' ? "bg-green-high"  : "bg-gray-mid"
          )}>
          % {currentDiffVal}
        </span>
      </div>
    </div>
  )
}

