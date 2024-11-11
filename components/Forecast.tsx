import { fetchCollectionData } from '@/utils/fetchData';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import SubmitPredictionForm from './UI/submitPredictionForm';
import { IAssetCurrentRate } from '@/types/Current';
import { fetchUserForcast } from '@/utils/fetchUserForcast';
import { IUserForcastRes } from '@/types/UserDailyPredict';
import { IAssets } from '@/types/Assets';
import { IAiPredictAsset } from '@/models/AiPredict';



const today = new Date();
const currentDay = today.toISOString().split('T')[0];

const Forcast = async () => {
  // Fetch data with caching applied in the external file
  const session = await getServerSession(authOptions);

  if (session){
    const [CurrentRateData, UserForcast, AssetListData] = await Promise.all([
      fetchCollectionData<IAssetCurrentRate[]>('currentrates', 60),
      fetchUserForcast<IUserForcastRes>({userId:session.user.id, submitDate: currentDay}, 0),
      fetchCollectionData<IAssets[]>('countries', 60),
      fetchCollectionData<IAiPredictAsset[]>('aiPredicts', 60),
    ]);

    console.log(UserForcast)

    return (
      
      <div> 
      <SubmitPredictionForm User={session} CurrentRateS={CurrentRateData[0]}  ForcastedRateS={UserForcast} AssetListData={AssetListData[0].assets} />
      </div>
   
    );
  } else{
    <div>
      kose amat
    </div>
  }

};

export default Forcast;