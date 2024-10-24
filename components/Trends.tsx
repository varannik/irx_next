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

interface IAsset {
  asset: string;
  trend: DataItem[];
}

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



export function Trends() {

  const { currentCalendar } = useSelectedCalendar()
  const { currentAsset } = useSelectedAsset()
  const [fullData, setFullData] = useState(null)
  const [durationData, setDurationData] = useState<IAsset>({ trend: [], asset: '' })
  const [selectedRange, setSelectedRange] = useState('p_week')
  const [trendData, setTrendData] = useState<DataItem[] | null>(null)
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

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/analytics/trend/${currentAsset.name}`);
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result;
        setDurationData(data)

        // 
      } catch (error) {

        console.log('trend data are not reachable');
      }
    };

    fetchData();
  }, [currentAsset]);

  useEffect(() => {
    if (fullData !== null && durationData !== null) {


      if (selectedRange.includes("p")) {
        let range = selectedRange.replace("p_", "");
        setTrendData(fullData[currentCalendar][String(currentAsset.name)][range])
      } else {

        let range = selectedRange.replace("d_", "");
        let number = Number(range);
        let filteredData = durationData.trend.slice(-number)
        setTrendData(filteredData)
      }


    }

  }, [currentCalendar, currentAsset, fullData, selectedRange])

  useEffect(() => {
    if (trendData !== null) {
      setLatestValue(trendData[trendData.length - 1].rate)
    }
  }, [trendData])


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
        // classNames={{
        //   wrapper:
        //     "grid grid-cols-3 gap-2 "
        // }}
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