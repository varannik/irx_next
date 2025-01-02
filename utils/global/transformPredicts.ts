import { IAssetCurrentRate } from "@/types/Current";
import { IDayPredictAsset } from "@/types/HistPredict";
import { addOneDay } from "./currentday";
import { IPreDayRate } from "@/types/PreDayRate";
import { IUserPredict } from "@/types/UserDailyPredict";
import { haveSameSign } from "@/lib/utils";
import { IHist } from "@/types/UserHistoryCards";



// Transform function
export const transformHist = (input: IDayPredictAsset):IHist[] => {
    const result = [];
  
    for (const asset in input) {
      const transformedPredictions = input[asset].map((dayPredict) => {
        const entries = [];
  
        for (const date in dayPredict) {
          const prediction = dayPredict[date];
          entries.push({
            date:prediction.nextdaydate,
            predictedrate: prediction.predictedrate,
            actualrate: prediction.actualrate,
            pct_predicted: Number(prediction.pct_predicted.toFixed(2)),
            pct_actual: Number(prediction.pct_actual.toFixed(2)),
            csp: prediction.csp,
          });
        }
  
        return entries;
      }).flat();
  
      result.push({
        [asset]: transformedPredictions,
      });
    }
  
    return result;
  };


  // Function to get actual sell rates
export const getActualSellRates = (assetData: IAssetCurrentRate) => {
  const sellRates: Record<string, number> = {};

  for (const asset in assetData.currentrate) {
    sellRates[asset] = assetData.currentrate[asset].price.sell;
  }

  return sellRates;
};

export const appendCurrentToHist = ({histData
  ,currentData
  ,preDayRate
  ,assetRates}:{
  histData: IHist[]
  ,currentData: IUserPredict[]
  ,preDayRate:IPreDayRate
  ,assetRates: IAssetCurrentRate
  }):IHist[] => {

  const sellRates = getActualSellRates(assetRates);

  currentData.forEach((entry) => {
    const { selectedAsset, nextDayRate, submitDate } = entry;

    // Find the asset in the transformedData array
    let assetEntry = histData.find((item) => item[selectedAsset]);

    const pr = preDayRate.preDayRate.assets[selectedAsset]
    const rr = sellRates[selectedAsset]
    const pp = (pr && nextDayRate) ? Number(((nextDayRate - pr )/ pr * 100).toFixed(2)) : 0
    const pa = (pr && rr) ? Number(((rr - pr )/ pr * 100).toFixed(2)) : 0
    const ss = haveSameSign(pp, pa)
    const newEntry = {
      date: addOneDay(submitDate),
      predictedrate: nextDayRate,
      actualrate: rr,
      pct_predicted: pp,
      pct_actual: pa,
      csp: ss,

    };

    if (assetEntry) {
      // Append the new entry to the existing asset's predictions
      assetEntry[selectedAsset].push(newEntry);
    } else {
      // Create a new asset entry if it doesn't exist
      const newAsset = {
        [selectedAsset]: [newEntry],
      };
      histData.push(newAsset);
    }
  });

  return histData;
};
  