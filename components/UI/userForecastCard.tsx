import { backgroundCorrect, cx, numberTextColor } from "@/lib/utils";
import { IDayHist } from "@/types/UserHistoryCards";


export default function UserForecastCard({ Data }: { Data: IDayHist[] | null }) {
    if (Data) {
        Data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return (
            <ul role="list" className="flex flex-col p-2 gap-2 w-full ">
                {Data.map((item: IDayHist) => (
                    <li key={item.date} className="justify-start items-start  px-4  shadow sm:rounded-md sm:px-6 ">
                        <div className={cx(
                                "flex relative"
                                ,"p-2"
                                ," border-1 rounded-lg border-div-diff"
                                ,"  place-items-center  "
                                
                                )}>

                            <div className={cx(
                                            "absolute top-0 left-2 h-2 w-2 rounded-b-sm"
                                            , backgroundCorrect(item.csp)
                                            )}></div>
                            <div className="flex divide-x divide-div-diff w-full ">
                            <div className="flex w-28 justify-center items-center  text-xs pr-2 ">{item.date} </div>  
                            <div className="flex w-full justify-evenly items-center ">

                                <div className="flex flex-col ">
                                            <div className="text-xs  text-gray-400"> R: <span >{item.actualrate}</span></div>
                                            <div className="text-xs  text-gray-400"> F: <span>{item.predictedrate}</span></div>
                                </div>
                                <div className="flex flex-col ">
                                    <div className="text-xs italic text-gray-400">RC: <span className={numberTextColor(item.pct_actual)}>{item.pct_actual}%</span></div>
                                    <div className="text-xs italic text-gray-400">FC: <span className={numberTextColor(item.pct_predicted)}>{item.pct_predicted}%</span></div>

                                </div>
                            </div>
                            </div>

                        </div>

                    </li>
                ))}
            </ul>
        )
    } else {
        <div> There is no data </div>
    }

}