"use client"

import React, { useEffect, useState } from "react"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { LineChart, LineChartEventProps, TooltipProps } from "./lineChartBB"
import { RadioGroup } from "@nextui-org/react";

import { CustomRadio } from "./selectRangeDays"
import SpinerIcon from "./icons/Spinner"
import { IBB, IBBDay } from "@/types/BB";


export function BollingerBands({BBData}:{BBData:IBB}) {
  const { currentAsset } = useSelectedAsset()
  const [assetData, setAssetData] = useState<IBBDay[] | []>([])

  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [value, setValue] = useState<LineChartEventProps>(null)
  const [selected, setSelected] = useState("MA3");

  useEffect(() => {
    if (BBData) {
      const currencyData = BBData.bb[currentAsset.name][selected];
      const sortedData = currencyData.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAssetData(sortedData)
    }
  }, [assetData, currentAsset, BBData, selected])

  if (assetData.length == 0 ) return (
    <SpinerIcon />
  )

  return (
    <div className="grid grid-row-5 w-full h-full" >

      <div className="grid row-span-4 w-full h-full" >
      <LineChart
        data={assetData}
        index="date"
        categories={['Rate', 'Upper', 'Middle', 'Lower']}
        showLegend={true}
        showYAxis={false}
        showXAxis={false}
        autoMinValue={true}
        onValueChange={(v) => setValue(v)}
        colors={['blue', 'positive', 'gray', "negative"]}
        showGridLines={false}
        className=" h-48"
        showTooltip={true}
        refAreaX1={assetData.length > 0 ? assetData[assetData.length - 2].date : 'null'}
        refAreaX2={assetData.length > 0 ? assetData[assetData.length - 1].date : 'null'}
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


      <div className="grid row-span-1 w-full h-full" >
        <RadioGroup
          classNames={{
            wrapper: "grid grid-cols-3 gap-2 ",
          }}
          defaultValue={selected}
          onValueChange={setSelected}

          description=" ">

          <CustomRadio description="SD3" value="MA3">
            MA3
          </CustomRadio>

          <CustomRadio description="SD5" value="MA5">
            MA5
          </CustomRadio>

          <CustomRadio description="SD10" value="MA10">
            MA10
          </CustomRadio>
        </RadioGroup>
      </div>
    </div>
  )
}