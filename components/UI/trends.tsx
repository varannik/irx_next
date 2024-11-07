"use client"

import React, { useEffect, useState } from "react"
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { Card } from "./cardTremor"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import useSelectedCalendar from "@/stores/useSelectedCalendarStore"

import { IAssetDays, Iday } from "@/types/DurationTrend";
import { IAssetData, IDataList } from "@/types/PeriodTrend";
import { AreaChart, TooltipProps } from "./base/charts/areaChart";
import SpinerIcon from "./icons/Spinner";

function lastRate(datas: any, latestValue: number) {

  const currencyFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number)}`

  const payload = datas?.payload?.[0]
  const value = payload?.value

  const formattedValue = payload
    ? currencyFormatter(value || 0)
    : currencyFormatter(latestValue)
  return formattedValue

}


export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-bg-layer3 hover:bg-hov-c items-center justify-around",
          "flex-row-reverse min-w-full  cursor-pointer rounded-lg gap-1  border-2 border-transparent",
          "data-[selected=true]:border-border-selected"
        ),
        control: 'bg-gray-light ',
        wrapper: 'group-data-[selected=true]:border-border-selected z-0   ',
        label: 'text-xs text-gray-light',
        description: 'text-xs'
      }}
    >
      {children}
    </Radio>
  );
};

type d = {
  date:string,
  rate:number
}

export function TrendsChart({DurationData, PeriodData}:{PeriodData:Record<string, IAssetData>, DurationData:IAssetDays[]}) {

  const { currentCalendar } = useSelectedCalendar()
  const { currentAsset } = useSelectedAsset()
  
  const [selectedRange, setSelectedRange] = useState('p_week')

  const [trendData, setTrendData] = useState<d[]>([])
  const [datas, setDatas] = useState<TooltipProps | null>(null)



  useEffect(() => {
    if (PeriodData !== null && DurationData !== null) {

      if (selectedRange.includes("p")) {

        let range = selectedRange.replace("p_", "");
        setTrendData(PeriodData[currentCalendar][String(currentAsset.name)][range as keyof IDataList])

      } else {

        let range = selectedRange.replace("d_", "");
        let number = Number(range);

        const assetdata = DurationData.find(item => item.asset === currentAsset.name);
        if (assetdata!==undefined){
          let filteredData = assetdata.trend.slice(-number)
          setTrendData(filteredData)
        }
      }
    }
  }, [currentCalendar, currentAsset, selectedRange])

  const latestValue = trendData.length==0 ? 0 : trendData[trendData.length - 1].rate 


  if (trendData == null || trendData?.length==0) return (

    <Card className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5" >
      <p className="text-base font-normal text-text-active">Trend</p>
      <div className="flex items-center justify-center">
        <SpinerIcon />
      </div>
    </Card>
  )

  return (
    <Card >
      <div className="flex justify-between">
        <div>
          <p className="text-base font-normal text-text-active">Trend</p>
          <p className="mt-2 text-xl font-semibold text-gray-50">
            {lastRate(datas, latestValue)}
          </p>
        </div>
      </div>
      <div>
      <AreaChart
          data={trendData}
          index="date"
          categories={["rate"]}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          autoMinValue={true}
          className="mb-3 mt-8 h-48"
          tooltipCallback={(props) => {
            if (props.active) {
              setDatas((prev) => {
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

      <RadioGroup
        defaultValue={selectedRange}
        onValueChange={setSelectedRange}
        description=" ">
        <p className="text-sm text-gray-light">
          Current
        </p>
        <div className="grid grid-cols-3 gap-1">

          <CustomRadio description="" value="p_week">
            Week
          </CustomRadio>

          <CustomRadio description="" value="p_month">
            Month
          </CustomRadio>

          <CustomRadio description="" value="p_quarter">
            Quarter
          </CustomRadio>

        </div>
        <p className="text-sm text-gray-light">
          Past
        </p>
        <div className="grid grid-cols-3  gap-1">

          <CustomRadio description="Days" value="d_7">
            7
          </CustomRadio>
          <CustomRadio description="Days" value="d_30">
            30
          </CustomRadio>
          <CustomRadio description="Days" value="d_90">
            90
          </CustomRadio>
        </div>
        <div className="grid grid-cols-2  gap-1">
          <CustomRadio description="180 Days" value="d_180">
            6 months
          </CustomRadio>

          <CustomRadio description="365 Days" value="d_365">
            1 Year
          </CustomRadio>
        </div>
      </RadioGroup>
    </Card>
  )
}