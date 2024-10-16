"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/UI/cardTremor"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { LineChart, LineChartEventProps, TooltipProps } from "./UI/lineChartBB"
import { RadioGroup } from "@nextui-org/react";
import { IBBAsset, IBBDay } from "@/models/BollingerBands"
import { CustomRadio } from "./UI/selectRangeDays"



export function BollingerBands() {
  const { currentAsset } = useSelectedAsset()
  const [data, setData] = useState<IBBAsset | null>(null)
  const [assetData, setAssetData] = useState<IBBDay[] | [] >([])

  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [value, setValue] = useState<LineChartEventProps>(null)
  const [selected, setSelected] = useState("MA3");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/bb');
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

      const currencyData = data.bb[currentAsset.name][selected];

      const sortedData = currencyData.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAssetData(sortedData)
    }
  }, [assetData, currentAsset, data, selected])

//   useEffect(() => {

//     let freshCat = ['Rate']

//     setCats(freshCat.concat(selected.filter(item => !freshCat.includes(item))))

//   }, [selected]);

  return (
    <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5">

      <div className="w-full">
        <p className="text-base font-normal text-text-active">Bollinger Bands </p>

  
        <LineChart

          data={assetData}
          index="date"
          categories={['Rate', 'Upper','Middle','Lower']}
          showLegend={true}
          showYAxis={false}
          showXAxis={false}
          autoMinValue={true}
          onValueChange={(v) => setValue(v)}
          colors={['blue',  'positive', 'gray', "negative"]}
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



     <RadioGroup
      classNames={{
        wrapper:
          "grid grid-cols-3 gap-2 "
      }}
      defaultValue={selected}
      onValueChange={setSelected}
      
      description=" ">

      <CustomRadio  description="SD3" value="MA3">
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
    </Card>
  )
}