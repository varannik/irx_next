import { Card } from '@/components/UI/cardTremor';
import Bands  from '@/components/Bands';
import WeekDays from '@/components/WeekDays';
import Trends from '@/components/Trends';
import MATrend  from '@/components/MATrend';
import MaxMin from '@/components/MaxMin';

const items = [
  { id: 1 
    ,content: <MaxMin />
  }
  ,{
    id:2
    ,content: <Trends />
   }
   ,{
    id:5
    ,content: <MATrend />
   }

  ,{
    id:4
    ,content: <Bands />
   }

   ,{
    id:3
    ,content: <WeekDays />
   }
]



export default function Analytics() {

  return (


    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-flow-row  gap-x-3 gap-y-4  mb-14  ">
      
      {items.map((item) => (
        <div key={item.id} className=" ">
        {item.content}
      </div>

    ))}

    </div>




  );
}


