
import { fetchCollectionData } from '@/utils/fetchData';
import MaxMinGauge  from './UI/MaxMinGauge';
import { IAssetCurrentRate } from '@/types/Current';
import { IAssets } from '@/types/SimpleTrend';
import { IMaxMinCal } from '@/types/MaxMin';


const MaxMin = async () => {
  // Fetch data with caching applied in the external file
  const [CurrentRateData, SimpleData, MaxMinData] = await Promise.all([
    fetchCollectionData<IAssetCurrentRate[]>('currentrates', 60),
    fetchCollectionData<IAssets[]>('simpletrends', 60),
    fetchCollectionData<IMaxMinCal[]>('maxmins', 60),
  ]);

  return (
        <MaxMinGauge CurrentRateData={CurrentRateData[0]} SimpleData={SimpleData[0].assets} MaxMinData = {MaxMinData[0]} />
  );
};

export default MaxMin;
