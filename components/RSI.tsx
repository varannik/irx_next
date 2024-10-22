"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/UI/cardTremor"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { LineChart, LineChartEventProps, TooltipProps } from "./UI/lineChartRSI"
import { RadioGroup } from "@nextui-org/react";
import { IRSIEntry, IRSIModel } from "@/models/RSI"
import { CustomRadio } from "./UI/selectRangeDays"



export function RSI() {
  const { currentAsset } = useSelectedAsset()
  const [data, setData] = useState<IRSIModel | null>(null)
  const [assetData, setAssetData] = useState<IRSIEntry[] | [] >([])

  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [value, setValue] = useState<LineChartEventProps>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/rsi');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0];
        setData(data)

      } catch (error) {
        console.log('BB data is not reachable');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {

    
    if (data && assetData){

      const currencyData = data.rsi[currentAsset.name];

      const sortedData = currencyData.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAssetData(sortedData)
    }
  }, [assetData, currentAsset, data])


  return (
    <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5">

      <div className="w-full">
        <p className="text-base font-normal text-text-active">RSI </p>

  
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

        <div className="flex flex-col mt-5">

        </div>
      </div>
    </Card>
  )
}