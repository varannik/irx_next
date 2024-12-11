export interface IDayHist {
    date: string;
    predictedrate: number;
    actualrate: number;
    pct_predicted: number;
    pct_actual: number;
    csp: boolean;
}
export interface IHist {
    [x: string]: IDayHist[]
}