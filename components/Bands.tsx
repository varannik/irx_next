
import { Card } from "@/components/UI/cardTremor"
import { BollingerBands } from "./UI/BollingerBands"
import { RSI } from "./UI/RSI"
import { fetchCollectionData } from '@/utils/apiActions/fetchData';
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
      {/* Header with 1 row span */}
      <div className="grid grid-cols-8 h-full row-span-1  ">
        <div className="col-span-5 text-lg font-normal text-text-active ">Bollinger Bands</div>
      </div>
      {/* End of header  */}


    
      {/* Chart or content  */}
      <div className="flex  row-span-5 h-full ">
      <BollingerBands BBData={BBData[0]}/>
      </div>
      {/* End of chart area */}



      {/* Header with 1 row span */}
      <div className="grid grid-cols-8 h-full row-span-1  ">
        <div className="col-span-5 text-lg font-normal text-text-active ">RSI</div>
      </div>
      {/* End of header  */}

      {/* Chart or content  */}
      <div className="flex  row-span-3 h-full ">
      <RSI RSIData={RSIData[0]}/>
      </div>
      {/* End of chart area */}
      
    </Card>
  );
};
export default Bands