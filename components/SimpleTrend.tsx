"use client"

import React, { useEffect, useState } from "react"

import { Card } from "@/components/UI/cardTremor"
import { SparkAreaChart } from "@/components/UI/sparkChart"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { cx } from "@/lib/utils"
import { set } from "mongoose"

let formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function SimpleTrend() {
  const {currentAsset} = useSelectedAsset()
  const [simpleTrendData, setSimpleTrendData] = useState(null)
  const [current7dData, setCurrent7dData] = useState(null)
  const [currentDiffVal, setCurrentDiffVal] = useState<number | null>(null)
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
        console.log(error.message);
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{

    if (simpleTrendData !== null) {
      setCurrent7dData(simpleTrendData[String(currentAsset.name)]['pre_days'])
      setCurrentDiffVal(formatter.format(String(simpleTrendData[String(currentAsset.name)]['diff_per'])))
      setColor( currentDiffVal > 0
        ? "positive"
        : currentDiffVal == 0 ? "gray" : "negative"
      )

    }
    
    }  , [current7dData, currentAsset, currentDiffVal, simpleTrendData]);


  console.log(simpleTrendData)
  return (
    <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5 divide-x-1 divide-div-diff">
      <div className="flex grow items-center space-x-2.5">
        <div className="flex-none font-medium text-gray-700 dark:text-gray-300">7 Days </div>
        <div className="flex justify-center grow">
        <SparkAreaChart
        data={current7dData}
        categories={["rate"]}
        index={"dyn"}
        colors={[color]}
        className="h-8 w-20 sm:h-10 sm:w-36"
      />
        </div>

      </div>

      <div className="flex items-center space-x-2.5 pl-4 ">
        <span className="font-medium text-gray-700 dark:text-gray-300">
        Pre-day
        </span>
        <span  className={cx(
          "rounded px-2 py-1 text-sm font-medium text-white",
          currentDiffVal > 0
        ? "bg-red-high"
        : currentDiffVal == 0 ? "bg-gray-mid" : "bg-green-high"
          )}>
          %{currentDiffVal}
        </span>
      </div>
    </Card>
  )
}

