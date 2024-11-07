"use client"
import React, { useEffect, useState } from "react"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { LineChart, LineChartEventProps, TooltipProps } from "./lineChartRSI"
import SpinerIcon from "./icons/Spinner"
import { IRSIAsset, IRSIEntry } from "@/types/RSI"



export function RSI({RSIData}:{RSIData:IRSIAsset}) {

  const { currentAsset } = useSelectedAsset()
  const [assetData, setAssetData] = useState<IRSIEntry[] | [] >([])
  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [value, setValue] = useState<LineChartEventProps>(null)


  useEffect(() => {
    if (RSIData){
      const currencyData = RSIData.rsi[currentAsset.name];
      const sortedData = currencyData.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAssetData(sortedData)
    }
  }, [assetData, currentAsset, RSIData])


  if (assetData.length == 0 ) return (
    <SpinerIcon />
  )

  return (
        <LineChart
          data={assetData}
          index="date"
          categories={['RSI']}
          showLegend={false}
          showYAxis={false}
          showXAxis={false}
          maxValue={100}
          minValue={0}
          onValueChange={(v) => setValue(v)}
          colors={['blue']}
          showGridLines={false}
          className="mb-3 mt-8 h-48"
          showTooltip={true}
          refAreaX1={assetData.length > 0 ? assetData[assetData.length-2].date : 'null'}
          refAreaX2={assetData.length > 0 ? assetData[assetData.length-1].date : 'null'}
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
  )
}