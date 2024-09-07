"use client"

import { useEffect, useState } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import { Button, Pagination } from "@nextui-org/react";
import { BarChartWeekDays } from "@/components/UI/barChartWeekDays"
import { IWeekDays, IWeek } from "@/models/WeekDays";
import { getWeekdayName } from "@/lib/weekDays"
import { Card } from "@/components/UI/cardTremor"


function fibonacci(n: number): number {

  let a = 0, b = 1;
  for (let i = 3; i <= n+2; i++) {
    let next = a + b;
    a = b;
    b = next;
  }

  return b;
}

export default function CheapestDayofTheWeek() {

  const { currentAsset } = useSelectedAsset()
  const { currentCalendar } = useSelectedCalendar()
  const [weekDaysData, setWeekDaysData] = useState<null | IWeekDays>(null)
  const [filteredData, setFilteredData] = useState([])
  const [cheapestDay , setCheapestDay] = useState<string>('')


  const [currentStepsBack, setCurrenStepsBack] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/weekdays');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0];

        setWeekDaysData(data)
        // 
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // filteredData(weekDaysData, currentAsset, currentCalendar)
    if (weekDaysData !== null) {
      const data = weekDaysData['weekdays'][currentCalendar][String(currentAsset.name)][fibonacci(currentStepsBack)]
      let lowestDay = data.reduce((min, current) => current.dab < min.dab ? current : min);
      
      setCheapestDay(getWeekdayName(currentCalendar, lowestDay.dyn, "full"))
      setFilteredData(data)

    } else {
      console.log('ridim')
    }
  }, [weekDaysData, currentCalendar, currentAsset, currentStepsBack, cheapestDay])



  return (
    // <div className="max-w-sm w-full rounded-lg shadow-[0px_0px_2px_1px_#2d3748] bg-bg-layer1 p-4 md:p-6">
      <Card className="mx-auto  max-w-lg items-center justify-between px-4 py-3.5">
      <div className="flex">
        <div className="flex justify-center">
          <p className="text-base font-normal text-text-active">Cheapest day of the week</p>
        </div>
        <div className="ml-6 p-2 grow flex flex-col items-center bg-bg-layer3 rounded-lg text-xs">
              <div>
                {cheapestDay}
              </div>
            </div>

      </div>

      <div className="py-10">

        <BarChartWeekDays data={filteredData} />
        <div className="flex flex-col gap-4  items-center mt-5">

          <div className="flex">
            <div >
              <div className="text-small text-default-500">
              Count of preceding weeks: {fibonacci(currentStepsBack)}
              </div>
              <div className='text-xs italic text-default-300' >
                  From Fibonachi sequence
              </div>
            </div>

          </div>




          <Pagination
            classNames={{

              wrapper:'bg-bg-layer3 ',
              item:'bg-bg-layer3 ',
              cursor:'bg-gray-light text-bg-layer0'
            }}
            total={12}
            page={currentStepsBack}
            onChange={setCurrenStepsBack}
          />
          <div className="flex gap-2">
            <Button
              className='bg-bg-layer3'
              size="sm"
              variant="flat"
              onPress={() => setCurrenStepsBack((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              -1 Step
            </Button>
            <Button
            className='bg-bg-layer3'
              size="sm"
              variant="flat"
              onPress={() => setCurrenStepsBack((prev) => (prev < 12 ? prev + 1 : prev))}
            >
              +1 Step
            </Button>
          </div>
        </div>
      </div>
      <div className="w-64">
      </div>
      </Card>
    // </div>

  )
}
