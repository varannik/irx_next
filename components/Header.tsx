
import { fetchCollectionData } from '@/utils/fetchData';
import HeaderMenu from './UI/headerMenu';
import { IAssetCurrentRate } from '@/types/Current';


const Header = async () => {
  // Fetch data with caching applied in the external file
  const [LastUpdateDate] = await Promise.all([
    fetchCollectionData<IAssetCurrentRate[]>('currentrates', 60),
  ]);

  return (
        <HeaderMenu  LastUpdateDate={LastUpdateDate[0].last_update}/>
  );
};

export default Header;
