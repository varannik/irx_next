"use client"

import dynamic from "next/dynamic";
import SelectRangeDays from "./UI/selectRangeDays";
import { use, useEffect, useState } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import useSelectRangeGaugeChart from "@/stores/useSelectRangeGaugeChart";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

interface objAsset {
  min: number,
  max: number
}

function adjustMinMax(obj:objAsset) {
  if (obj.min === obj.max) {
      const adjustment = obj.min * 0.03;
      return {
          max: obj.max + adjustment,
          min: obj.min - adjustment
      };
  }
  return obj;
}

function limitsArcs (data:objAsset) {

  const base = (data['max'] - data['min']) / 3
  const low = data['min'] + base
  const mid = data['min'] + base*2
  const high = data['min'] + base*3
  return [{ limit: low }, {limit: mid}, {limit: high}]
}

export default function MaxMinGauge() {

  const {currentAsset} = useSelectedAsset()
  const {currentCalendar} = useSelectedCalendar()
  const {selectedRange} = useSelectRangeGaugeChart()
  const [currentData, setcurrentData] = useState(null)
  const [currentRate, setCurrentRate] = useState(null)
  const [maxminData, setMaxminData] = useState(null)
  const [arcLimits, setArcLimits] = useState(null)
  const [currentMaxMin, setCurrentMaxMin] = useState({'min':null ,'max':null })

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

        console.log(data)
      } catch (error) {
        console.log(error.message);
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
        console.log(error.message);
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{

    if (currentData !== null) {
      setCurrentRate(currentData[String(currentAsset.name)]['price']['sell'])
    }
    
    if (maxminData !== null) {
      if (selectedRange.range == 'days') {

        setCurrentMaxMin(maxminData[currentCalendar][String(currentAsset.name)][String(selectedRange.range)][selectedRange.selectedDaysAsRange!])
      } else {
        setCurrentMaxMin(maxminData[currentCalendar][String(currentAsset.name)][String(selectedRange.range)])
      }
      
      
    }
 

    }  , [currentAsset, maxminData, currentCalendar, selectedRange, currentData, currentMaxMin]);


  return (
    <div className="max-w-sm w-full rounded-lg shadow-[0px_0px_2px_1px_#2d3748] bg-bg-layer1 p-4 md:p-6">

      <div className="flex justify-between">
        <div>
          <p className="text-base font-normal text-text-active">Max and Min</p>
        </div>

      </div>
      <div className=" py-5">

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
          color: "#edf6f9"

        }}
      />
      </div>



      {/* Select current week or month */}
      <SelectRangeDays />
    </div>

  )
}

