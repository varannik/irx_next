import { fetchCollectionData } from '@/utils/apiActions/fetchData';
import Assets from './UI/Assets';
import { IAssets } from '@/types/Assets';


const SelectAssets = async () => {
  // Fetch data with caching applied in the external file
  const [AssetListData] = await Promise.all([
    fetchCollectionData<IAssets[]>('countries', 60),

  ]);
  
  return (
    <Assets AssetListData={AssetListData[0].assets} /> 
 
  );
};

export default SelectAssets;