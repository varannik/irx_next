"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/UI/cardTremor"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { LineChart, LineChartEventProps, TooltipProps } from "./lineChartMA"
import { CheckboxGroup, Checkbox, cn } from "@nextui-org/react";
import SpinerIcon from "./icons/Spinner"
import { ICurrencyRecord, IMAModel } from "@/types/MA"


export function MA({ MAData }: { MAData: IMAModel }) {

  const { currentAsset } = useSelectedAsset()
  const [assetData, setAssetData] = useState<ICurrencyRecord[] | []>([])

  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [value, setValue] = useState<LineChartEventProps>(null)

  const [selected, setSelected] = useState(["MA3", "MA10"]);
  const [cats, setCats] = useState<string[]>(['Rate']);

  const ShortTerm: string[] = ["MA3", "MA5", "MA10"];
  const MidTerm: string[] = ["MA50", "MA100"];
  const LongTerm: string[] = ["MA200", "MA300"];

  function CustumCheckBox({
    value,
    label,
    key
  }: {
    value: string,
    label: string
    key: string
  }) {
    return (

      <Checkbox key={key} classNames={{
        base: cn(

          "flex w-full max-w-md bg-content1 -m-0 h-12 bg-bg-layer3 hover:bg-hov-c  items-center justify-around",
          "items-center justify-start ",
          "cursor-pointer justify-right rounded-lg border-2 border-transparent ",
          "data-[selected=true]:border-border-selected",
        ),
        wrapper: 'group-data-[selected=true]:border-border-selected z-0',
        label: "w-full text-xs text-gray-light",
      }} value={value}>{label}</Checkbox>
    )
  }

  useEffect(() => {

    if (MAData !== null) {
      const currencyData: ICurrencyRecord[] = MAData.ma[currentAsset.name];
      const sortedData = currencyData.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAssetData(sortedData)
    }
  }, [assetData, currentAsset, MAData])


  useEffect(() => {
    let freshCat = ['Rate']
    setCats(freshCat.concat(selected.filter(item => !freshCat.includes(item))))
  }, [selected]);




  if (assetData.length == 0) return (
    <Card  >
      <p className="text-lg font-normal text-text-active">Moving average</p>
      <div className="flex items-center justify-center">
        <SpinerIcon />
      </div>

    </Card>
  )

  return (
    <Card >
      {/* Header with 1 row span */}
      <div className="grid grid-cols-8 h-full row-span-1  ">
        <div className="col-span-5 text-lg font-normal text-text-active ">Moving average</div>
      </div>
      {/* End of header  */}
      {/* Chart or content  */}
      <div className="flex  row-span-4 h-full ">


        <LineChart
          data={assetData}
          index="date"
          categories={cats}
          showLegend={true}
          showYAxis={false}
          showXAxis={false}
          autoMinValue={true}
          onValueChange={(v) => setValue(v)}
          colors={['blue', 'gray', 'gray', "gray", "gray", "gray", "gray", "gray"]}
          showGridLines={false}
          className="h-56"
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

      {/* End of chart area */}
      {/* Description area*/}
      <div className=" row-span-1 h-full">
          <div className="grid grid-cols-3 place-items-center h-full">
          <div className="text-sm text-gray-light ">Short-Term</div>
          <div className="text-sm text-gray-light ">Mid-Term</div>
          <div className="text-sm text-gray-light ">Long-Term</div>
          </div>
      </div>


      {/* Adjustments area 3 row span */}
      <div className="  row-span-3 h-full">
        <CheckboxGroup
        className="h-full"
        classNames={{
          base:'h-full'
          ,'wrapper':'h-full'
        }}
          value={selected}
          onValueChange={setSelected}
          color="default"
        >
          <div className="grid grid-cols-3 h-full gap-1" >
            <div className="grid grid-rows-3 place-items-center gap-1">
              {
                ShortTerm.map(item => {
                  return CustumCheckBox({ value: item, label: item, key: item })
                })
              }
            </div>
            <div className="grid grid-rows-3  place-items-center gap-1">
              {
                MidTerm.map(item => {
                  return CustumCheckBox({ value: item, label: item, key: item })
                })
              }
            </div>

            <div className="grid grid-rows-3  place-items-center gap-1">
              {
                LongTerm.map(item => {
                  return CustumCheckBox({ value: item, label: item, key: item })
                })
              }
            </div>


          </div>

        </CheckboxGroup>
      </div>

    </Card>
  )
}