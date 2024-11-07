
import { Card } from "@/components/UI/cardTremor"
import { BollingerBands } from "./UI/BollingerBands"
import { RSI } from "./UI/RSI"
import { fetchCollectionData } from '@/utils/fetchData';
import { IRSIAsset } from "@/types/RSI";
import { IBB } from "@/types/BB";

const Bands = async () => {
  // Fetch data with caching applied in the external file
  const [RSIData, BBData] = await Promise.all([
    fetchCollectionData<IRSIAsset[]>('rsis', 60),
    fetchCollectionData<IBB[]>('bbs', 60),

  ]);
  return (
    <Card >
      <div className="flex flex-col divide-y-1 divide-div-diff gap-4">
        <div>
          <div className="flex justify-between">
            <div>
              <p className="text-base font-normal text-text-active">Bollinger Bands</p>
            </div>
          </div>
          <BollingerBands BBData={BBData[0]}/>
        </div>
        <div className="pt-3">
          <div className="flex justify-between">
            <div>
              <p className="text-base font-normal text-text-active">RSI</p>
            </div>
          </div>
        </div>
      </div>
      <RSI RSIData={RSIData[0]}/>
    </Card>
  );
};
export default Bands