"use client"

import React, { useEffect, useState } from "react"

import { Card } from "@/components/UI/cardTremor"
import { Tracker } from "@/components/UI/base/charts/tracker"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { LineChart, LineChartEventProps, TooltipProps } from "./base/charts/lineChart"
import SpinerIcon from "./icons/Spinner"
import { AvailableChartColorsKeys } from "@/lib/chartUtils"
import Alert from "./alert"
import { IChartData, recCatTrack, recTrend } from "@/types/Forcasts"
import { futureTrendColor } from "@/lib/utils"






export function ForecastChart({ ChartData, Title, Cats}: { ChartData: IChartData , Title:string, Cats:string[]}) {

  const { currentAsset } = useSelectedAsset()

  const [trendData, setTrendData] = useState<recTrend[]>([{
    date: ""
    , "AI": 0
    , "Votes": 0
    , "You": 0
    , "Real": 0
    , "AI Forcast": 0
    , "Voting Forcast": 0
    , "Your Forcast": 0

  }])

  const [trackerData, setTrackerData] = useState<recCatTrack[]>([{
    color: "bg-green-high",
    tooltip: {
      date: ""
      , "Forcasted Shift %": 0
      , "Actual Shift %": 0
    }
  }])


  const [value, setValue] = useState<LineChartEventProps>(null)
  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [colors, setColors] = useState<AvailableChartColorsKeys[]>(['blue', 'gray']);


  useEffect(() => {
    if (ChartData && currentAsset.name == 'US Dollar') {


      const assetData = ChartData[currentAsset.name]
      setTrendData(assetData.trend)
      if (Title=="AI"){
        setTrackerData(assetData.track.AI)
      }if(Title=='Community Polling'){
        setTrackerData(assetData.track.Voting)
      }
      

    }
  }, [currentAsset, ChartData])



    useEffect(() => {

        let freshColors:AvailableChartColorsKeys[] = ['blue',  'gray']
        let futureColor:AvailableChartColorsKeys = futureTrendColor(trackerData[trackerData.length-1].tooltip["Forcasted Shift %"])
        setColors(freshColors.concat(futureColor))
        console.log(trackerData)
      }, [trackerData]);



  if (currentAsset.name !== 'US Dollar') return (
    <Card  >
      <p className="text-lg font-normal text-text-active">{Title}</p>
      <div className="flex items-center justify-center text-xs text-gray-light">
        Exclusively available in USD.
      </div>

    </Card>
  )


  if (ChartData == null) return (
    <Card  >
      <p className="text-lg font-normal text-text-active">{Title}</p>
      <div className="flex items-center justify-center">
        <SpinerIcon />
      </div>

    </Card>
  )

  return (
    <Card >
            {/* Header with 2 row span */}

            <div className="grid grid-cols-8 h-full row-span-1  ">
              <div className="col-span-5 text-lg font-normal text-text-active ">{Title}</div>
            </div>

            {/* End of header  */}


            {/* Chart or content  */}
            <div className="flex row-span-5 h-full items-center justify-center">
            <LineChart
                        data={trendData}
                        index="date"
                        categories={Cats}
                        showLegend={true}
                        showYAxis={false}
                        showXAxis={false}
                        autoMinValue={true}
                        onValueChange={(v) => setValue(v)}
                        colors={colors}
                        connectNulls={true}
                        showGridLines={false}
                        className="mb-3 mt-8 h-48"
                        showTooltip={true}
                        refAreaX1={trendData.length > 2 ? trendData[trendData.length-3].date : 'null'}
                        refAreaX2={trendData.length > 2 ? trendData[trendData.length-2].date : 'null'}
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



            {/* End of chart area */}
            {/* Description area*/}
            <div className=" row-span-1 h-full">
             hi
            </div>
            {/* End Description */}

            {/* Adjustments area 3 row span */}
            <div className="  row-span-3 h-full">

            <div className="flex-none font-medium text-xs mb-3 text-gray-300">Accurately predicted rate shifts</div>
      <Tracker className="w-full" data={trackerData} hoverEffect={true} />
      <Alert />
            </div>

      




    </Card>
  )
}

