import { fetchCollectionData } from '@/utils/apiActions/fetchData';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import SubmitPredictionForm from './UI/submitPredictionForm';
import { IAssetCurrentRate } from '@/types/Current';
import { fetchUserForcast } from '@/utils/apiActions/fetchUserForcast';
import { IUserPredict } from '@/types/UserDailyPredict';
import { IAssets } from '@/types/Assets';
import { fetchGenForcast } from '@/utils/apiActions/fetchGenForcast';
import { IGenDayPredictions } from '@/types/GensPredictions';
import { fetchUserHist } from '@/utils/apiActions/fetchUserHist';
import { IDayPredictAsset } from '@/types/HistPredict';
import { getPreviousDay } from '@/utils/global/currentday';
import { ForecastChart } from './UI/ForecastChart';
import { IChartData, recCatTrack, recTrack, recTrend } from '@/types/Forcasts';
import { createTrackData, resModule } from '@/lib/utils';


const today = new Date();
const currentDay = today.toISOString().split('T')[0];

const yesterday = getPreviousDay();

const Forcast = async () => {
  // Fetch data with caching applied in the external file
  const session = await getServerSession(authOptions);


  if (session) {
    const [CurrentRateData, UserForcast, AssetListData, GenData, UserHist, AiHist, VoteHist] = await Promise.all([
      fetchCollectionData<IAssetCurrentRate[]>('currentrates', 60),
      fetchUserForcast<IUserPredict[]>({ userId: session.user.id, submitDate: currentDay }, 0),
      fetchCollectionData<IAssets[]>('countries', 60),
      fetchGenForcast<IGenDayPredictions>({ date: currentDay }, 60),
      fetchUserHist<IDayPredictAsset[]>({ userId: session.user.id, limit: 10 }, 60),
      fetchUserHist<IDayPredictAsset[]>({ userId: 'A'.repeat(24), limit: 10 }, 60),
      fetchUserHist<IDayPredictAsset[]>({ userId: 'B'.repeat(24), limit: 10 }, 60)
    ]);


    const ChartData: IChartData = {}


    AiHist.forEach((el: IDayPredictAsset) => {


      const asset = Object.keys(el)[0]
      const trend: recTrend[] = []
      const track: recTrack = {
          AI: []
        , Voting: []
        , You: []
      }
      const dataArr = el[asset]

      const userf = UserForcast.find(item => item.selectedAsset === asset)
      const genf = GenData.assets.find((obj) => obj[asset] !== undefined)
      if (genf){

        let genfAi = genf[asset].find((obj) => obj["AAAAAAAAAAAAAAAAAAAAAAAA"] !== undefined)
        let genfVote = genf[asset].find((obj) => obj["BBBBBBBBBBBBBBBBBBBBBBBB"] !== undefined)
        let preDayRec = dataArr.find((obj) => obj[yesterday] !== undefined)

        let gaf = genfAi ? genfAi["AAAAAAAAAAAAAAAAAAAAAAAA"] : null
        let gvf = genfVote ? genfVote["BBBBBBBBBBBBBBBBBBBBBBBB"]: null
        let uf = userf ? userf.nextDayRate : null
        let rr = preDayRec? preDayRec[yesterday]['actualrate'] : null 


        // let preRealRate = resModule(UserHist, asset, yesterday, 'actualrate')
        
          trend.push({
            date:  currentDay
            ,"AI": null
            , "Votes": null
            , "You": null
            , "Real": null
            , "AI Forcast": gaf
            , "Voting Forcast": gvf
            , "Your Forcast": uf
          })

          track.AI.push(createTrackData({module:undefined, type:"f", asset, d:currentDay, preRealRate:rr, forecastedRate:gaf}))
          track.Voting.push(createTrackData({module:undefined, type:"f", asset, d:currentDay,  preRealRate:rr, forecastedRate:gvf}))
      }
      


      dataArr.forEach((item) => {

        const d = Object.keys(item)[0]
        const u = UserHist.find((obj) => obj[asset] !== undefined)
        const a = AiHist.find((obj) => obj[asset] !== undefined)
        const v = VoteHist.find((obj) => obj[asset] !== undefined)

        if (d == yesterday) {
          trend.push({
            date: d
            , "AI": resModule(a, asset, d, 'predictedrate')
            , "Votes": resModule(v, asset, d, 'predictedrate')
            , "You": resModule(u, asset, d, 'predictedrate')
            , "Real": resModule(a, asset, d, 'actualrate')
            , "AI Forcast": resModule(a, asset, d, 'predictedrate')
            , "Voting Forcast": resModule(v, asset, d, 'predictedrate')
            , "Your Forcast": resModule(u, asset, d, 'predictedrate')
          })

        } else {
          trend.push({
            date: d
            , "AI": resModule(a, asset, d, 'predictedrate')
            , "Votes": resModule(v, asset, d, 'predictedrate')
            , "You": resModule(u, asset, d, 'predictedrate')
            , "Real": resModule(a, asset, d, 'actualrate')

          })
        }

        track.AI.push(createTrackData({module:a, type:"c", asset, d}))
        track.Voting.push(createTrackData({module:v, type:"c", asset, d}))
        track.You.push(createTrackData({module:u, type:"c", asset, d}))


      })
      trend.sort((a:recTrend, b:recTrend) => new Date(a.date).getTime() - new Date(b.date).getTime());
      track.AI.sort((a:recCatTrack, b:recCatTrack) => new Date(a.tooltip.date).getTime() - new Date(b.tooltip.date).getTime());
      track.Voting.sort((a:recCatTrack, b:recCatTrack) => new Date(a.tooltip.date).getTime() - new Date(b.tooltip.date).getTime());
      track.You.sort((a:recCatTrack, b:recCatTrack) => new Date(a.tooltip.date).getTime() - new Date(b.tooltip.date).getTime());
      ChartData[asset] = { trend, track }
    })



    return (

      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-flow-row  gap-x-3 gap-y-4  mb-14'>
        <div>
        <ForecastChart ChartData={ChartData} Title='AI' Cats={['Real', 'AI', 'AI Forcast']}/>
        </div>
        <div>
        <ForecastChart ChartData={ChartData} Title='Community Polling' Cats={['Real', 'Votes', 'Voting Forcast']}/>
        </div>
        <div>
        <SubmitPredictionForm User={session} CurrentRateS={CurrentRateData[0]} ForcastedRateS={UserForcast} AssetListData={AssetListData[0].assets} />
        </div>
        
        
      </div>

    );
  } else {
    <div>
      kose amat
    </div>
  }

};

export default Forcast;
