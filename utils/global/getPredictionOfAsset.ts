import { IUserPredict } from "@/types/UserDailyPredict";


export type predictOfAsset = number | null

export function getPredictOfAsset({ selectedAsset, ForcastedRateS }: { selectedAsset: string, ForcastedRateS: IUserPredict[] }): predictOfAsset {
    const asset = ForcastedRateS.find((item) => item.selectedAsset === selectedAsset);
    return asset?.nextDayRate || null;
}

