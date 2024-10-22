"use client"

import React, { useEffect, useState } from "react"

import { Card } from "@/components/UI/cardTremor"
import { Tracker } from "@/components/UI/tracker"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { cx } from "@/lib/utils"
import { I7Days } from "@/models/SimpleTrend"

interface Itooltip {
    date:string,
    RC:number,
    PC:number
  }
  
  interface TrackerBlockProps {
    key?: string | number
    color?: string
    tooltip?: Itooltip
    hoverEffect?: boolean
    defaultBackgroundColor?: string
  }


let formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});


const data:TrackerBlockProps[] = [
    { color: "bg-emerald-600", tooltip: {date:"2024-10-9", RC:-3.1 , PC:2.3}},
    { color: "bg-emerald-600", tooltip: {date:"2024-10-9", RC:-3.1 , PC:2.3} },
    { color: "bg-emerald-600", tooltip: {date:"2024-10-9", RC:-3.1 , PC:2.3} },
    { color: "bg-red-600", tooltip: {date:"2024-10-9", RC:-3.1 , PC:2.3} },
    { color: "bg-emerald-600", tooltip: {date:"2024-10-9", RC:-3.1 , PC:2.3} },
    { color: "bg-emerald-600", tooltip: {date:"2024-10-9", RC:-3.1 , PC:2.3} },
    { color: "bg-emerald-600", tooltip: {date:"2024-10-9", RC:-3.1 , PC:2.3} },
]  


export function TrackerAi() {
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


  return (
    <Card  className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5 "> 
      <div className="flex grow items-center space-x-2.5">
        <div className="flex-none font-medium text-gray-700 dark:text-gray-300">Ai</div>
        <div className="flex justify-center grow">
        </div>

        
      </div>
      <Tracker className="hidden w-full lg:flex" data={data} />
    </Card>
  )
}

