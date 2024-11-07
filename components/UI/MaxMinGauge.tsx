'use client'

import dynamic from "next/dynamic";
import SelectRangeDays from "./selectRangeDays";
import { useEffect, useState } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import useSelectRangeGaugeChart from "@/stores/useSelectRangeGaugeChart";
import { Card } from "@/components/UI/cardTremor"
import SpinerIcon from "./icons/Spinner";
import { IndexRange } from "@/utils/keyIndex";
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

export default function MaxMinGauge({CurrentRateData, SimpleData, MaxMinData}:{CurrentRateData:IAssetCurrentRate, SimpleData:IAsset, MaxMinData:IMaxMinCal}) {

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


  if (currentMaxMin.min == 0 || current7dData == null || currentRate==0) return (

    <Card  >
      <div className="flex flex-col divide-y-1 divide-div-diff gap-4 ">
        <div>
          <p className="text-base font-normal text-text-active">7 Days</p>
          <div className="flex items-center justify-center">
            <SpinerIcon />
          </div>
        </div>
        <div>
          <p className="text-base font-normal text-text-active">Max and Min</p>
          <div className="flex items-center justify-center">
            <SpinerIcon />
          </div>
        </div>
      </div>

    </Card>
  )

  return (

    <Card >
      <div className="flex flex-col divide-y-1 divide-div-diff gap-4 ">

        {/* Last 7 Days  */}
        <div className="flex mb-3">
          <div className="flex grow items-center space-x-2.5">
            <div className="flex-none font-medium text-gray-300">7 Days</div>
            <div className="flex justify-center grow max-w-2xl">
              <SparkAreaChart
                data={current7dData}
                categories={["rate"]}
                index={"dyn"}
                colors={[color]}
                className="h-8 w-20  sm:h-10 sm:w-36"/>
            </div>
          </div>
          <div className="flex items-center space-x-2.5 pl-4 ">
            <span className={cx(
              "rounded px-2 py-1 text-sm font-medium text-white",
              color == 'positive'
                ? "bg-red-high"
                : color == 'negative' ? "bg-green-high" : "bg-gray-mid"
            )}>
              % {currentDiffVal}
            </span>
          </div>
        </div>

        {/* Min Max */}
        <div className="pt-3">
          <div className="flex justify-between">
            <div>
              <p className="text-base font-normal text-text-active">Max and Min</p>
            </div>
          </div>
          <div className=" py-5">
            <div className="flex justify-center items-center">
              <GaugeComponent
                value={currentRate}
                type="radial"
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

          </div>

          {/* Select current week or month */}
          <SelectRangeDays />
          {/* </div> */}
        </div>

      </div>
    </Card>
  )
}