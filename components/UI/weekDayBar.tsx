"use client"

import { useEffect, useState } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import { Button, Pagination } from "@nextui-org/react";
import { BarChartWeekDays } from "@/components/UI/barChartWeekDays"

import { getWeekdayName } from "@/lib/weekDays"
import { Card } from "@/components/UI/cardTremor"
import SpinerIcon from "./icons/Spinner";
import { IndexCurrentCalendar } from "@/utils/global/keyIndex";
import { IWeek, IWeekDay, IWeekDayCal } from "@/types/WeekDays";


function fibonacci(n: number): number {

  let a = 0, b = 1;
  for (let i = 3; i <= n + 2; i++) {
    let next = a + b;
    a = b;
    b = next;
  }

  return b;
}
function findLowestDab(week: IWeek): number | null {
  // Flatten the 2D array of IWeekDay objects into a 1D array
  const flatWeek = week.flat();

  // Use reduce to find the day with the lowest dab
  const result = flatWeek.reduce((cheapestDay: IWeekDay | null, currentDay: IWeekDay) => {
    // If the cheapestDay is null or currentDay's dab is cheaper, update cheapestDay
    if (cheapestDay === null || currentDay.dab < cheapestDay.dab) {
      return currentDay;
    }
    return cheapestDay;
  }, null);

  // Return the dyn of the day with the lowest dab, or null if no such day exists
  return result ? result.dyn : null;
}


export default function WeekDayBar({ WeekDaysData }: { WeekDaysData: IWeekDayCal }) {

  const { currentAsset } = useSelectedAsset()
  const { currentCalendar } = useSelectedCalendar()

  const [filteredData, setFilteredData] = useState<IWeek>([])
  const [cheapestDay, setCheapestDay] = useState<string>('')


  const [currentStepsBack, setCurrenStepsBack] = useState(1);



  useEffect(() => {
    // filteredData(weekDaysData, currentAsset, currentCalendar)

    if (WeekDaysData !== null) {

      const data = WeekDaysData.weekdays[currentCalendar][currentAsset.name][fibonacci(currentStepsBack)]
      let lowestDay = findLowestDab(data)

      setCheapestDay(getWeekdayName(IndexCurrentCalendar(currentCalendar), lowestDay, "full"))
      setFilteredData(data)
    }

  }, [WeekDaysData, currentCalendar, currentAsset, currentStepsBack, cheapestDay])


  if (filteredData.length == 0) return (
    <Card  >
      <p className="text-base font-normal text-text-active">Highest & Lowest weekday</p>
      <div className="flex items-center justify-center">
        <SpinerIcon />
      </div>
    </Card>
  )

  return (
    <Card >
      {/* Header with 1 row span */}
      <div className="grid grid-cols-8 h-full row-span-1  ">
        <div className="col-span-6 text-base font-normal text-text-active ">Highest & Lowest weekday</div>
      </div>
      {/* End of header  */}
      {/* Chart or content  */}
      <div className="flex  row-span-5 h-full ">

        <BarChartWeekDays data={filteredData} />
      </div>
      {/* End of chart area */}


      {/* Description area*/}
      <div className=" row-span-1 h-full">
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
      </div>


      {/* Adjustments area 3 row span */}
      <div className=" gird grid-cols-2  row-span-3 h-full">

        <div >
          <Pagination
            classNames={{
              base: "text-gray-mid -m-0",
              wrapper: 'bg-bg-layer3 ',
              item: 'bg-bg-layer3 ',
              cursor: 'bg-gray-light text-bg-layer0',
            }}
            total={12}
            page={currentStepsBack}
            onChange={setCurrenStepsBack}
          />

        </div>


        <div className="flex  justify-evenly">
          <Button
            className='bg-bg-layer3 text-gray-light'
            size="sm"
            variant="flat"
            onPress={() => setCurrenStepsBack((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            -1 Step
          </Button>
          <Button
            className='bg-bg-layer3 text-gray-light'
            size="sm"
            variant="flat"
            onPress={() => setCurrenStepsBack((prev) => (prev < 12 ? prev + 1 : prev))}
          >
            +1 Step
          </Button>
        </div>




      </div>


    </Card>
  )
}
