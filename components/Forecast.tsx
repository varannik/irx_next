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
import { getSubmitionDate, getTehranDate } from '@/utils/global/currentday';
import { ForecastChart } from './UI/ForecastChart';
import { IChartData, recCatTrack, recTrack, recTrend } from '@/types/Forcasts';
import { createTrackData, resModule } from '@/lib/utils';
import { IScore } from '@/types/Score';
import { fetchScore } from '@/utils/apiActions/fetchScore';
import { UserNotLoggedIn } from './UI/userNotLoggedIn';


const currentDay = getTehranDate(0)
const tomorrow = getTehranDate(1)
const yesterday = getTehranDate(-1)
const prePreDay = getTehranDate(-2)

console.log('getSubmitionDate():',getSubmitionDate())


const Forcast = async () => {
  // Fetch data with caching applied in the external file
  const session = await getServerSession(authOptions);


  if (session) {
    const [ CurrentRateData, AssetListData, 
            UserForcastF, UserForcastC,
            GenDataF, GenDataC , 
            UserHist, AiHist, VoteHist,
            score
          ] = await Promise.all([

      fetchCollectionData<IAssetCurrentRate[]>('currentrates', 0),
      fetchCollectionData<IAssets[]>('countries', 0),
      
      fetchUserForcast<IUserPredict[]>({ userId: session.user.id, submitDate: getSubmitionDate() }, 0),
      fetchUserForcast<IUserPredict[]>({ userId: session.user.id, submitDate: yesterday }, 0),

      fetchGenForcast<IGenDayPredictions>({ date: currentDay }, 0),
      fetchGenForcast<IGenDayPredictions>({ date: yesterday }, 0),

      fetchUserHist<IDayPredictAsset[]>({ userId: session.user.id, limit: 12 }, 0),
      fetchUserHist<IDayPredictAsset[]>({ userId: 'A'.repeat(24), limit: 12 }, 0),
      fetchUserHist<IDayPredictAsset[]>({ userId: 'B'.repeat(24), limit: 12 }, 0),

      fetchScore<IScore[]>(0)
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



      //  FUTURE ------------------------------------
      if (GenDataF){


        const userf = UserForcastF.length > 0 ? UserForcastF.find(item => item.selectedAsset === asset) : null
        const genf = GenDataF.assets.find((obj) => obj[asset] !== undefined)
        const crr = CurrentRateData[0].currentrate[asset]['price']['sell']

        if(genf){
          let genfAi = genf[asset].find((obj) => obj["AAAAAAAAAAAAAAAAAAAAAAAA"] !== undefined)
          let genfVote = genf[asset].find((obj) => obj["BBBBBBBBBBBBBBBBBBBBBBBB"] !== undefined)
  
          let gaf = genfAi ? genfAi["AAAAAAAAAAAAAAAAAAAAAAAA"] : null
          let gvf = genfVote ? genfVote["BBBBBBBBBBBBBBBBBBBBBBBB"]: null
          let uf = userf ? userf.nextDayRate : null

          trend.push({
            date:  tomorrow
            ,"AI": null
            , "Votes": null
            , "You": null
            , "Real": null
            , "AI Forcast": gaf
            , "Voting Forcast": gvf
            , "Your Forcast": uf
          })
          track.AI.push(createTrackData({module:undefined, type:"f", asset, d:currentDay, preRealRate:crr, forecastedRate:gaf}))
          track.Voting.push(createTrackData({module:undefined, type:"f", asset, d:currentDay,  preRealRate:crr, forecastedRate:gvf}))
          track.You.push(createTrackData({module:undefined, type:"f", asset, d:currentDay,  preRealRate:crr, forecastedRate:uf}))
        }
      }

      // CURRENT ------------------------------------

      if(GenDataC){

        const userC = UserForcastC.length > 0 ? UserForcastC.find(item => item.selectedAsset === asset) : null
        const genC = GenDataC.assets.find((obj) => obj[asset] !== undefined)
        const crrC= CurrentRateData[0].currentrate[asset]['price']['sell']
        const preRec =  dataArr.find((obj) => obj[prePreDay])
        
      
      if (genC){
        let gencAi = genC[asset].find((obj) => obj["AAAAAAAAAAAAAAAAAAAAAAAA"] !== undefined)
        let gencVote = genC[asset].find((obj) => obj["BBBBBBBBBBBBBBBBBBBBBBBB"] !== undefined)

        let gaC = gencAi ? gencAi["AAAAAAAAAAAAAAAAAAAAAAAA"] : null
        let gvC = gencVote ? gencVote["BBBBBBBBBBBBBBBBBBBBBBBB"]: null
        let uC = userC ? userC.nextDayRate : null
        let preRealRate = preRec ? preRec[prePreDay]['actualrate'] : null

        trend.push({
          date:  currentDay
          ,"AI": gaC
          , "Votes": gvC
          , "You": uC
          , "Real": crrC
          , "AI Forcast": gaC
          , "Voting Forcast": gvC
          , "Your Forcast": uC
        })
  
        track.AI.push(createTrackData({module:undefined, type:"c", asset, d:currentDay, preRealRate, forecastedRate:gaC, currRealRate: crrC}))
        track.Voting.push(createTrackData({module:undefined, type:"c", asset, d:currentDay,  preRealRate, forecastedRate:gvC, currRealRate:crrC }))
      }
      }

      // HISTORY 
      dataArr.forEach((item) => {

        const d = Object.keys(item)[0]

        let date = new Date(d);
        let limit = new Date()
        // Subtract 1 day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        date.setDate(date.getDate() - 1);
        limit.setDate(limit.getDate() - 11);
        // Format the date back to string (optional)
        let oneDayAgo = date.toISOString().split('T')[0]; // Outputs: YYYY-MM-DD
        let limits = limit.toISOString().split('T')[0]; // Outputs: YYYY-MM-DD

        const u = typeof UserHist !== "string" ? UserHist.find((obj) => obj[asset] !== undefined) : null
        const a = AiHist.find((obj) => obj[asset] !== undefined)
        const v = VoteHist.find((obj) => obj[asset] !== undefined)

          trend.push({
            date: d
            , "AI": resModule(a, asset, oneDayAgo, 'predictedrate')
            , "Votes": resModule(v, asset, oneDayAgo, 'predictedrate')
            , "You": resModule(u, asset, oneDayAgo, 'predictedrate')
            , "Real": resModule(a, asset, oneDayAgo, 'actualrate')
          })
        
        if (d > limits){
          track.AI.push(createTrackData({module:a, type:"h", asset, d:oneDayAgo}))
          track.Voting.push(createTrackData({module:v, type:"h", asset, d:oneDayAgo}))
          if (u !== null){
            track.You.push(createTrackData({module:u, type:"h", asset, d:oneDayAgo}))
          }
        }
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
        <ForecastChart ChartData={ChartData} CurrentRateS={CurrentRateData[0]} Title='AI' Cats={['Real', 'AI', 'AI Forcast']}/>
        </div>
        <div>
        <ForecastChart ChartData={ChartData} CurrentRateS={CurrentRateData[0]} Title='Community Polling' Cats={['Real', 'Votes', 'Voting Forcast']}/>
        </div>
        <div>
        <SubmitPredictionForm User={session} CurrentRateS={CurrentRateData[0]} ForcastedRateS={UserForcastF} AssetListData={AssetListData[0].assets} Score={score}/>
        </div>
      </div>

    );
  } else {
      return (<UserNotLoggedIn />)
  }

};

export default Forcast;
