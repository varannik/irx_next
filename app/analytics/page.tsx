import { Card } from '@/components/UI/cardTremor';
import Bands  from '@/components/Bands';
import WeekDays from '@/components/WeekDays';
import Trends from '@/components/Trends';
import MATrend  from '@/components/MATrend';
import MaxMin from '@/components/MaxMin';


export default function Analytics() {

  return (
    <>
      <Card className='mt-9 '>
        <div className=" grid lg:grid-cols-2 grid-cols-1 mt-3  gap-x-7 gap-y-6   mx-auto max-w-7xl px-2 ">
          <div className=' rounded-lg shadow-sm border border-gray-800 '>
            <MaxMin />
          </div>
          <div className='rounded-lg shadow-sm border border-gray-800 '>
            <Trends />
          </div>
          <div className='rounded-lg shadow-sm border border-gray-800 '>
            <WeekDays />
          </div>
          <div className='rounded-lg shadow-sm border border-gray-800 '>
            <Bands />
          </div>
          <div className='rounded-lg shadow-sm border border-gray-800 '>
            <MATrend />
          </div>
        </div>
      </Card>    
    </>
  );
}