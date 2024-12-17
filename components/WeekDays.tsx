import { fetchCollectionData } from '@/utils/apiActions/fetchData';
import WeekDayBar from './UI/weekDayBar';
import { IWeekDayCal } from '@/types/WeekDays';



const WeekDays = async () => {
  // Fetch data with caching applied in the external file
  const [WeekDaysData] = await Promise.all([
    fetchCollectionData<IWeekDayCal[]>('weekdays', 0),

  ]);


  return (
    <WeekDayBar WeekDaysData={WeekDaysData[0]} /> 
 
  );
};

export default WeekDays;