import { Bands } from '@/components/Bands';
import WeekDays from '@/components/WeekDays';
import { Container } from '@/components/Container'
import MaxMinGauge from '@/components/MaxMin';
import Trends from '@/components/Trends';
import { Card } from '@/components/UI/cardTremor';
import useAnalyticsCompStore from '@/stores/useAnalyticsCompStore';
import MATrend  from '@/components/MATrend';


export default function Analytics() {

  // const { currentComp } = useAnalyticsCompStore()

  // Function to switch components by title
  const renderComponent = (current: string) => {
    switch (current) {
      case "Max & Min":
        return <MaxMinGauge />;
      case "Trends":
        return <Trends />;
      case "Moving Avarage":
        return <MATrend />;
      case "Bands":
        return <Bands />;
      case "WeekDays":
        return <WeekDays />;
      default:
        return <MaxMinGauge />;
    }
  };

  return (
    <>

      {/* mid and sm screen */}
      {/* <Container className="flex items-center justify-center  mt-9 mb-9 lg:hidden ">
        {renderComponent(currentComp)}
      </Container> */}

      {/* Desktop version of analytics  */}
      
      <Card className='mt-9 '>
        <div className=" grid lg:grid-cols-2 grid-cols-1 mt-3  gap-x-7 gap-y-6   mx-auto max-w-7xl px-2 ">
          <div className=' rounded-lg shadow-sm border border-gray-800 '>
            <MaxMinGauge />
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