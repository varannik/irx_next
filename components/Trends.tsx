import { TrendsChart } from './UI/trends';
import { ICalAsset } from '@/types/PeriodTrend';
import { fetchCollectionData } from '@/utils/apiActions/fetchData';
import { IAssetDays } from '@/types/DurationTrend';

const Trend = async () => {
  // Fetch data with caching applied in the external file
  const [DurationData, PeriodData] = await Promise.all([
    fetchCollectionData<IAssetDays[]>('trends', 0),
    fetchCollectionData<ICalAsset[]>('periodictrends', 0),
  ]);
  
  return (
    <TrendsChart PeriodData={PeriodData[0].periods} DurationData={DurationData}/> 
 
  );
};

export default Trend;