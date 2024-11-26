'use client'

import dynamic from "next/dynamic";
import SelectRangeDays from "./selectRangeDays";
import { useEffect, useState } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import useSelectRangeGaugeChart from "@/stores/useSelectRangeGaugeChart";
import { Card } from "@/components/UI/cardTremor"
import SpinerIcon from "./icons/Spinner";
import { SparkAreaChart } from "./sparkChart";
import { cx } from "@/lib/utils";
import { I7Days, IAsset } from "@/types/SimpleTrend";
import { IAssetRange, IDayMaxMin, IMaxMinCal } from "@/types/MaxMin";
import { IAssetCurrentRate } from "@/types/Current";

const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

interface objAsset {
  min: number,
  max: number
}

function standizeRate(current7dData: Array<I7Days>): Array<I7Days> {
  // To accurately display the fluctuating trend
  // Step 1: Extract the rates from pre_days
  const rates = current7dData.map(day => day.rate);

  // Step 2: Find min and max values of rates
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);

  // Step 3: Standardize the rates using min-max normalization
  current7dData = current7dData.map(day => ({
    ...day,
    rate: (day.rate - minRate) / (maxRate - minRate)
  }));
  return current7dData
}

let formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});


function adjustMinMax(obj: objAsset) {
  if (obj.min === obj.max) {
    const adjustment = obj.min * 0.03;
    return {
      max: obj.max + adjustment,
      min: obj.min - adjustment
    };
  }
  return obj;
}

function limitsArcs(data: objAsset) {

  const base = (data['max'] - data['min']) / 3
  const low = data['min'] + base
  const mid = data['min'] + base * 2
  const high = data['min'] + base * 3
  return [{ limit: low }, { limit: mid }, { limit: high }]
}

export default function MaxMinGauge({ CurrentRateData, SimpleData, MaxMinData }: { CurrentRateData: IAssetCurrentRate, SimpleData: IAsset, MaxMinData: IMaxMinCal }) {

  const { currentAsset } = useSelectedAsset()
  const { currentCalendar } = useSelectedCalendar()
  const { selectedRange } = useSelectRangeGaugeChart()


  const [currentRate, setCurrentRate] = useState(0)
  const [currentMaxMin, setCurrentMaxMin] = useState<IDayMaxMin>({ 'min': 0, 'max': 100 })
  const [current7dData, setCurrent7dData] = useState<Record<string, any>[]>([])
  const [currentDiffVal, setCurrentDiffVal] = useState<string | null>(null)

  const [color, setColor] = useState<"positive" | "negative" | 'gray'>('gray')


  useEffect(() => {

    if (SimpleData !== null) {

      let n = Number(SimpleData[currentAsset.name]['diff_per'])
      setCurrent7dData(standizeRate(SimpleData[String(currentAsset.name)]['pre_days']))
      setCurrentDiffVal(formatter.format(n))
      setColor(n > 0
        ? "positive"
        : n == 0 ? "gray" : "negative"
      )
    }
  }, [currentAsset, currentDiffVal, SimpleData]);



  useEffect(() => {

    if (CurrentRateData !== null) {
      setCurrentRate(CurrentRateData.currentrate[currentAsset.name]['price']['sell'])
    }

    if (MaxMinData !== null) {
      if (selectedRange.range == 'days') {

        setCurrentMaxMin(MaxMinData.maxmin[currentCalendar][currentAsset.name][selectedRange.range][selectedRange.selectedDaysAsRange])
      } else {
        setCurrentMaxMin(MaxMinData.maxmin[currentCalendar][currentAsset.name][selectedRange.range as keyof IAssetRange] as IDayMaxMin)
      }

    }
  }, [currentAsset, MaxMinData, currentCalendar, selectedRange, currentMaxMin, CurrentRateData]);


  if (currentMaxMin.min == 0 || current7dData == null || currentRate == 0) return (

    <Card  >
      <div className="flex flex-col divide-y-1 divide-div-diff gap-4 ">
        <div>
          <p className="text-lg font-normal text-text-active">Momentum</p>
          <div className="flex items-center justify-center">
            <SpinerIcon />
          </div>
        </div>

      </div>

    </Card>
  )

  return (

    <Card >
      {/* Header with 2 row span */}
      <div className="grid grid-cols-8 h-full row-span-1  ">

        <div className="col-span-3 text-lg font-normal text-text-active ">Momentum</div>

        <div className="flex col-span-3 font-semibold text-gray-50 items-center justify-center ">
          <SparkAreaChart
            data={current7dData}
            categories={["rate"]}
            index={"dyn"}
            colors={[color]}
            className="h-8 w-24  sm:h-10 " />
        </div>

        <div className="col-span-2 flex items-center justify-center ml-2 ">
          <div className={cx(
            "rounded px-2 text-xs h-8 flex items-center  font-medium text-white",
            color == 'positive'
              ? "bg-red-high"
              : color == 'negative' ? "bg-green-high" : "bg-gray-mid"
          )}>
            % {currentDiffVal}
          </div>
        </div>


      </div>



      {/* End of header  */}
      {/* Chart or content  */}

      <div className="flex row-span-5 h-full items-center justify-center">
        <GaugeComponent
          value={currentRate}
          type="radial"
          className="w-72 h-56"
          labels={{
            tickLabels: {
              type: "outer",

              ticks: [
                { value: adjustMinMax(currentMaxMin)['min'] },
                { value: adjustMinMax(currentMaxMin)['max'] }
              ]
            }
            ,
          }}
          arc={{
            colorArray: ['#008068', '#9EABB3', '#D64E52'],
            subArcs: limitsArcs(adjustMinMax(currentMaxMin)),
            padding: 0.02,
            width: 0.2
          }}
          minValue={adjustMinMax(currentMaxMin)['min']}
          maxValue={adjustMinMax(currentMaxMin)['max']}
          pointer={{
            elastic: true,
            animationDelay: 0,
            type: "needle",
            color: "#edf6f9",

          }}
        />
      </div>
      {/* End of chart area */}
      {/* Description area*/}
      <div className=" row-span-1 h-full">
         
      </div>
      {/* End Description */}

      {/* Adjustments area 3 row span */}
      <div className="  row-span-3 h-full">
        <SelectRangeDays />
      </div>
    </Card>
  )
}