"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/UI/cardTremor"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import { LineChart, LineChartEventProps, TooltipProps } from "./lineChartMA"
import { CheckboxGroup, Checkbox, cn } from "@nextui-org/react";
import SpinerIcon from "./icons/Spinner"
import { ICurrencyRecord, IMAModel } from "@/types/MA"


export function MA({MAData}:{MAData:IMAModel}) {

  const { currentAsset } = useSelectedAsset()
  const [assetData, setAssetData] = useState<ICurrencyRecord[] | [] >([])

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
    key:string
  }) {
    return (

      <Checkbox key={key} classNames={{
        base: cn(

          "flex w-full max-w-md bg-content1 mb-4 bg-bg-layer3 hover:bg-hov-c  items-center justify-around",
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

    if (MAData !==null){
      const currencyData: ICurrencyRecord[] = MAData.ma[currentAsset.name];
      const sortedData = currencyData.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAssetData(sortedData)
    }
  }, [assetData, currentAsset, MAData])


  useEffect(() => {
    let freshCat = ['Rate']
    setCats(freshCat.concat(selected.filter(item => !freshCat.includes(item))))
  }, [selected]);




  if (assetData.length == 0  ) return (
    <Card className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5" >
      <p className="text-base font-normal text-text-active">Moving average</p>
      <div className="flex items-center justify-center">
        <SpinerIcon />
      </div>

    </Card>
  )

  return (
    <Card >

        <div className="flex justify-between">
            <div>
              <p className="text-base font-normal text-text-active">Moving average</p>
            </div>
          </div>

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
          <CheckboxGroup
            value={selected}
            onValueChange={setSelected}
            color="default"
          >
            <div className="flex justify-between " >
              <div className="flex flex-col w-1/3 mx-1 gap-2">
                <div className="text-sm text-gray-light mb-3">Short-Term</div>
                {
                  ShortTerm.map(item => {
                    return CustumCheckBox({ value: item, label: item , key:item})
                  })
                }
              </div>

              <div className="flex flex-col w-1/3 mx-1 gap-2">
                <div className="text-sm text-gray-light mb-3">Mid-Term</div>
                {
                  MidTerm.map(item => {
                    return CustumCheckBox({ value: item, label: item , key:item})
                  })
                }
              </div>

              <div className="flex flex-col w-1/3 mx-1 gap-2">
                <div className="text-sm text-gray-light mb-3">Long-Term</div>
                {
                  LongTerm.map(item => {
                    return CustumCheckBox({ value: item, label: item, key:item })
                  })
                }
              </div>


            </div>

          </CheckboxGroup>
        </div>
    </Card>
  )
}