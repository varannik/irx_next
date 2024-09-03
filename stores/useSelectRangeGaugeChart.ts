import {create} from 'zustand'


const defaultRange = { range: 'today' , selectedDaysAsRange: 1 }

type TRange = 'days' | 'week' | 'month' | 'today' 

interface IRange {
    range : string | TRange,
    selectedDaysAsRange : null | number
}

interface IRangeRadioGroup {
    selectedRange : IRange;
    setRange : (range: IRange) => void;
}

const useSelectRangeGaugeChart = create<IRangeRadioGroup>((set)=>({
    selectedRange : defaultRange ,
    setRange : (selectedRange: IRange) => set({selectedRange})
}));


export default useSelectRangeGaugeChart;