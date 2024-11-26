import { fetchCollectionData } from '@/utils/apiActions/fetchData';
import {MA} from './UI/maTrend'
import { IMAModel } from '@/types/MA';


const MATrend = async () => {
  // Fetch data with caching applied in the external file
  const [MAData] = await Promise.all([
    fetchCollectionData<IMAModel[]>('mas', 60),

  ]);

  return (
        <MA MAData={MAData[0]}/>
  );
};

export default MATrend;