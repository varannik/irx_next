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
import { CategoryBar } from "./base/charts/catChart"
import { IAssetCurrentRate } from "@/types/Current"
import { IGenDayPredictions } from "@/types/GensPredictions"



function refineCenterCatBar(center: any, adjust: any): number {
  if (typeof center === 'number' && !isNaN(center)) {
    const p = (adjust - center) / center * 100
    return ((p + 5) / 10) * 100
  } else {
    return 50
  }
}



export function ForecastChart({ ChartData, Title, Cats, CurrentRateS }: { ChartData: IChartData, Title: string, Cats: string[], CurrentRateS: IAssetCurrentRate }) {

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
  const [currentRate, setCurrentRate] = useState<number>(0)
  const [catBarCenter, setCatBarCenter] = useState<number | null | undefined>(0)



  useEffect(() => {
    if (ChartData && currentAsset.name == 'US Dollar') {
      const assetData = ChartData[currentAsset.name]
      setTrendData(assetData.trend)
      if (Title == "AI") {
        setTrackerData(assetData.track.AI)
        setCatBarCenter(ChartData[currentAsset.name].trend[(ChartData[currentAsset.name].trend).length - 2]["AI Forcast"])
      } if (Title == 'Community Polling') {
        setTrackerData(assetData.track.Voting)
        setCatBarCenter(ChartData[currentAsset.name].trend[(ChartData[currentAsset.name].trend).length - 2]["Voting Forcast"])
      }



    }
  }, [currentAsset, ChartData])

  useEffect(() => {
    if (CurrentRateS !== null) {

      let cr = CurrentRateS.currentrate[currentAsset.name]['price']['sell']
      setCurrentRate(cr)


    }
  }, [CurrentRateS, currentAsset])


  useEffect(() => {

    let freshColors: AvailableChartColorsKeys[] = ['blue', 'gray']
    let futureColor: AvailableChartColorsKeys = futureTrendColor(trackerData[trackerData.length - 1].tooltip["Forcasted Shift %"])
    setColors(freshColors.concat(futureColor))
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
    <Card>
      <p className="text-lg font-normal text-text-active">{Title}</p>
      <div className="flex items-center justify-center">
        <SpinerIcon />
      </div>

    </Card>
  )

  return (
    <Card >
      {/* Header with 2 row span */}
      <div className="flex flex-col row-span-10 gap-2">


      
      <div className="grid grid-cols-8 h-10">
        <div className="col-span-5 text-lg font-normal text-text-active ">{Title}</div>
        <div className="flex col-span-3 text-xs pt-1 text-gray-500 justify-end">{Title == 'AI' ? " Model: RNN-GRU" : ""}</div>
      </div>
      {/* End of header  */}

      {/* Chart or content  */}
      <div className="flex relative  items-start justify-center p-3  w-full   border-gray-800 border-1 rounded-lg">
        <div className="absolute italic font-medium -inset-2 left-2 bg-[#090E1A] text-xs text-gray-700 w-10 h-6 "> Today </div>
        <div className="w-60">
          <CategoryBar
            forcastedValue={catBarCenter?.toLocaleString()}
            values={[0, 49, 2, 49]}
            marker={{ value: refineCenterCatBar(catBarCenter, currentRate), tooltip: `RealTime: ${currentRate?.toLocaleString()}`, showAnimation: true }}
            colors={["negative", "negative", "gray", "positive", "positive"]}
            className="mx-auto max-w-sm"
          />
        </div>
      </div>

      <div className="flex relative row-span-4 h-56 items-start justify-center border-gray-800 mt-2 p-3  border-1 rounded-lg">
      <div className="absolute italic font-medium -inset-2 left-2 bg-[#090E1A] text-xs text-gray-700 w-16 h-6 "> Tomorrow </div>
        <LineChart
          data={trendData}
          legendPosition={"center"} 
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
          className="mb-1 mt-1 h-48"
          showTooltip={true}
          refAreaX1={trendData.length > 2 ? trendData[trendData.length - 3].date : 'null'}
          refAreaX2={trendData.length > 2 ? trendData[trendData.length - 2].date : 'null'}
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
      {/* <div className=" row-span-1 h-full">
             hi
            </div> */}
      {/* End Description */}

      {/* Adjustments area 3 row span */}
      <div className="flex relative flex-col  border-gray-800 mt-2 p-3  border-1 rounded-lg">
      <div className="absolute italic font-medium -inset-2 left-2 bg-[#090E1A] text-xs text-gray-700 w-12 h-6 "> History </div>
        <div className=" text-xs  text-gray-500 pb-2 ">Accurately predicted rate shifts</div>
        <Tracker className="w-full" data={trackerData} hoverEffect={true} />
      </div>
      <Alert text="The new forecast for the next day will be updated after 10 PM Tehran time." />

      </div>

    </Card>
  )
}

