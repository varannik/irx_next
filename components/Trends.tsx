import { TrendsChart } from './UI/trends';
import { ICalAsset } from '@/types/PeriodTrend';
import { fetchCollectionData } from '@/utils/apiActions/fetchData';
import { IAssetDays } from '@/types/DurationTrend';

const Trend = async () => {
  // Fetch data with caching applied in the external file
  const [DurationData, PeriodData] = await Promise.all([
    fetchCollectionData<IAssetDays[]>('trends', 60),
    fetchCollectionData<ICalAsset[]>('periodictrends', 60),
  ]);
  
  console.log(DurationData[0])
  return (
    <TrendsChart PeriodData={PeriodData[0].periods} DurationData={DurationData}/> 
 
  );
};

export default Trend;