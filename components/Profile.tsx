import { ICalAsset } from '@/types/PeriodTrend';
import { fetchCollectionData } from '@/utils/apiActions/fetchData';
import { IAssetDays } from '@/types/DurationTrend';
import ProfileSideBar from './UI/profileSide';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/utils/auth';
import { IDayPredictAsset } from '@/types/HistPredict';
import { fetchUserHist } from '@/utils/apiActions/fetchUserHist';
import { IUserPredict } from '@/types/UserDailyPredict';
import { fetchUserForcast } from '@/utils/apiActions/fetchUserForcast';
import { getTehranDate } from '@/utils/global/currentday';
import { IAssetCurrentRate } from '@/types/Current';
import { IAssets } from '@/types/Assets';
import { fetchScore } from '@/utils/apiActions/fetchScore';
import { IScore } from '@/types/Score';
import { appendCurrentToHist, transformHist } from '@/utils/global/transformPredicts';
import { IPreDayRate } from '@/types/PreDayRate';

const Profile = async () => {

  // Fetch data with caching applied in the external file
  const session = await getServerSession(authOptions)

  if (session) {

    // Fetch data with caching applied in the external file
    const [CurrentRateData, PreDayRateData,
      UserForcastC,
      UserHist,
      score,
    ] = await Promise.all([

      fetchCollectionData<IAssetCurrentRate[]>('currentrates', 10),
      fetchCollectionData<IPreDayRate[]>('predayrates', 10),


      fetchUserForcast<IUserPredict[]>({ userId: session.user.id, submitDate: getTehranDate(-1) }, 0),

      fetchUserHist<IDayPredictAsset[] | "user dosent exist">({ userId: session.user.id, limit: 12 }, 10),

      fetchScore<IScore[]>(10)


    ]);

    if (UserHist == 'user dosent exist') {
      if (UserForcastC.length > 0 ){
        const HistCurrData = appendCurrentToHist({ histData:[], currentData: UserForcastC, assetRates: CurrentRateData[0], preDayRate: PreDayRateData[0] })
        return (
          <ProfileSideBar 
          User={session}
          HistCurrData={HistCurrData}
          Score={score}
          /> 
        )
      } else {
      return (
        <ProfileSideBar
          User={session}
          HistCurrData={null}
          Score={score}
        />
      )
    }} else {

      const histData = transformHist(UserHist[0])
      const HistCurrData = appendCurrentToHist({ histData, currentData: UserForcastC, assetRates: CurrentRateData[0], preDayRate: PreDayRateData[0] })

      return (
        <ProfileSideBar 
        User={session}
        HistCurrData={HistCurrData}
        Score={score}
        /> 
      )
    }

  } else {
    <div> Please login</div>
  }
};

export default Profile;