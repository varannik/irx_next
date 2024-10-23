"use client"

import React, { useEffect, useState } from "react"
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { AreaChart, TooltipProps } from "@/components/UI/areaChart"
import { Card } from "./UI/cardTremor"
import useSelectedAsset from "@/stores/useSelectedAssetStore"
import useSelectedCalendar from "@/stores/useSelectedCalendarStore"
import SpinerIcon from "./UI/icons/Spinner";

interface DataItem {
  date: string
  rate: number
}

function lastRate (datas : any, latestValue:number){

  const currencyFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number)}`

  const payload = datas?.payload?.[0]
  const value = payload?.value

  const formattedValue = payload
    ? currencyFormatter(value || 0)
    : currencyFormatter(latestValue)
  return formattedValue

}


export const CustomRadio = (props:any) => {
  

  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-bg-layer3 hover:bg-hov-c  items-center justify-around",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-1  border-2 border-transparent",
          "data-[selected=true]:border-border-selected"
        ),
        control: 'bg-gray-light ',
        wrapper: 'group-data-[selected=true]:border-border-selected z-0 ',
        label:'text-xs',
        description:'text-xs'
      }}
    >
      {children}
    </Radio>
  );
};



export function PeriodTrends() {

  const { currentCalendar } = useSelectedCalendar()
  const { currentAsset } = useSelectedAsset()
  const [fullData, setFullData] = useState(null)
  const [selectedRange, setSelectedRange] = useState('week')
  const [trendData, setTrendData] = useState<DataItem[] | null >(null)
  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [latestValue, setLatestValue] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/periodictrend');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0]['periods'];
        
        setFullData(data)
        // 
      } catch (error) {
        console.log('periodictrend data are not reachable');
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
    if (fullData !== null ){
      setTrendData(fullData[currentCalendar][String(currentAsset.name)][selectedRange])
    
    }
    if (trendData !==null){
      setLatestValue(trendData[trendData.length - 1].rate)
    }
  },[currentCalendar, currentAsset, fullData, trendData, selectedRange])

  console.log(trendData)

  if (fullData == null || trendData == null) return (
    <Card className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5" >
      <p className="text-base font-normal text-text-active">Trend</p>
      <div className="flex items-center justify-center">
      <SpinerIcon />
      </div>
      
    </Card>
  )


  return (
    <Card className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5" >

    <div>
    <p className="text-base font-normal text-text-active">Trend</p>
      <p className="mt-2 text-xl font-semibold text-gray-50">
      {lastRate(datas, latestValue)}
      </p>

      <AreaChart
        data={trendData}
        index="date"
        categories={["rate"]}
        showLegend={false}
        showYAxis={false}
        startEndOnly={true}
        autoMinValue={true}
        // colors={["gray"]}
        className="mb-3 mt-8 h-48"
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

    <RadioGroup
      classNames={{
        wrapper:
          "grid grid-cols-3 gap-2 "
      }}
      defaultValue={selectedRange}
      onValueChange={setSelectedRange}
      
      description=" ">

      <CustomRadio  description="Current" value="week">
      Week
      </CustomRadio>

      <CustomRadio description="Current" value="month">
      Month
      </CustomRadio>

      <CustomRadio description="Current" value="quarter">
      Quarter
      </CustomRadio>
    </RadioGroup>
</Card>
  )
}