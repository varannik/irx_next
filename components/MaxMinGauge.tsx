"use client"

import dynamic from "next/dynamic";
import SelectRangeDays from "./UI/selectRangeDays";
import { use, useEffect, useState } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import useSelectRangeGaugeChart from "@/stores/useSelectRangeGaugeChart";
import { Card } from "@/components/UI/cardTremor"
import SpinerIcon from "./UI/icons/Spinner";
import { IndexRange } from "@/utils/keyIndex";
import { SimpleTrend } from "./SimpleTrend";
import { I7Days } from "@/models/SimpleTrend";
import { SparkAreaChart } from "./UI/sparkChart";
import { cx } from "@/lib/utils";
import { AreaChart } from "./UI/areaChart";
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

export default function MaxMinGauge() {

  const { currentAsset } = useSelectedAsset()
  const { currentCalendar } = useSelectedCalendar()
  const { selectedRange } = useSelectRangeGaugeChart()
  const [currentData, setcurrentData] = useState(null)
  const [currentRate, setCurrentRate] = useState(null)
  const [maxminData, setMaxminData] = useState(null)
  const [arcLimits, setArcLimits] = useState(null)
  const [currentMaxMin, setCurrentMaxMin] = useState({ 'min': 0, 'max': 100 })
  const [simpleTrendData, setSimpleTrendData] = useState(null)
  const [current7dData, setCurrent7dData] = useState<Record<string, any>[]>([])
  const [currentDiffVal, setCurrentDiffVal] = useState<string | null>(null)
  const [color, setColor] = useState<"positive" | "negative" | 'gray'>('gray')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/simpletrend');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0].assets;
        setSimpleTrendData(data)

      } catch (error) {
        console.log('Simple trend data is not reachable');
      }
    };

    fetchData();
  }, []);


  useEffect(() => {

    if (simpleTrendData !== null) {

      let n = Number(simpleTrendData[String(currentAsset.name)]['diff_per'])
      setCurrent7dData(standizeRate(simpleTrendData[String(currentAsset.name)]['pre_days']))
      setCurrentDiffVal(formatter.format(n))
      setColor(n > 0
        ? "positive"
        : n == 0 ? "gray" : "negative"
      )

    }
  }, [currentAsset, currentDiffVal, simpleTrendData]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/maxmin');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0].maxmin;

        setMaxminData(data)
      } catch (error) {
        console.log('MaxMin data are not reachable');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/current');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0].currentrate;
        setcurrentData(data)



      } catch (error) {
        console.log('Current data is not reachable');
      }
    };

    fetchData();
  }, []);


  useEffect(() => {

    if (currentData !== null) {
      setCurrentRate(currentData[String(currentAsset.name)]['price']['sell'])
    }

    if (maxminData !== null) {
      if (selectedRange.range == 'days') {

        setCurrentMaxMin(maxminData[currentCalendar][String(currentAsset.name)][String(selectedRange.range)][IndexRange(selectedRange.selectedDaysAsRange)])
      } else {
        setCurrentMaxMin(maxminData[currentCalendar][String(currentAsset.name)][String(selectedRange.range)])
      }

    }
  }, [currentAsset, maxminData, currentCalendar, selectedRange, currentData, currentMaxMin]);


  if (maxminData == null || currentData == null || currentRate == null || simpleTrendData == null || currentAsset == null || currentDiffVal == null) return (

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