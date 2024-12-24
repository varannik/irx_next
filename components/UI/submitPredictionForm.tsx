"use client";
import { useState, startTransition, useEffect } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import { IAssetCurrentRate } from "@/types/Current";
import { IScore } from "@/types/Score";
import { Session } from "next-auth";
import { forcastAction } from "@/app/actions/forcastAction";
import { IUserPredict } from "@/types/UserDailyPredict";
import { getCurrentTimeInTehran, getSubmitionDate, getToday } from "@/utils/global/currentday";

import {
    Button,
    Avatar,
    Badge,
    Input,
    Slider,
    SliderValue,
    Chip,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useProfileDrawerStore from "@/stores/useProfileDrawerStore";
import useAssetDrawerStore from '@/stores/useAssetDrawerStore'
import Flag from "react-world-flags";
import { IAsset } from "@/types/Assets";
import { Card } from "./cardTremor";
import { getScore } from "@/utils/global/getScore";
import { getPredictOfAsset, predictOfAsset } from "@/utils/global/getPredictionOfAsset";
import Alert from "./alert";



export default function SubmitPredictionForm({ User, CurrentRateS, ForcastedRateS, AssetListData, Score }: { User: Session | null, CurrentRateS: IAssetCurrentRate, ForcastedRateS: IUserPredict[], AssetListData: IAsset[], Score: IScore[] }) {

    const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();
    const { openAsset, setAssetDrawerOpen } = useAssetDrawerStore()
    const { currentAsset, setCurrentAsset } = useSelectedAsset();
    const [userPredictOfAsset, setUserPredictOfAsset] = useState<predictOfAsset>(null);
    const [usc, setUsc] = useState<number | null>(null)
    const [countUsers, seCountUsers] = useState<number | null>(null)
    const [message, setMessage] = useState("");
    const [newValue, setNewValue] = useState('0')
    const [currentRate, setCurrentRate] = useState<number>(0)
    const [newPercent, setNewPercent] = useState<SliderValue>(0)
    const [percent, setPercent] = useState<SliderValue>(0)
    const [timeNowInTehran, setTimeNowInTehran] = useState<string>("Loading...");
    const [nextDay, setNextDay] = useState<string>("Loading...");
    const [submitDate, setSubmitDate] = useState<Date>(new Date())


    useEffect(() => {
        // Update the time every second
        const intervalId = setInterval(() => {
            let nowInTehran = getCurrentTimeInTehran()

            // Parse the date string into components
            const [datePart, timePart] = nowInTehran.split(", ");
            const [month, day, year] = datePart.split("/");

            // Reformat to the desired format
            const formattedDateTime = `${year}-${month}-${day}, ${timePart}`;

            setTimeNowInTehran(formattedDateTime);


            setSubmitDate(new Date(`${getSubmitionDate()}T${timePart}`))
            setNextDay(getSubmitionDate())

        }, 1000);
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        if (CurrentRateS !== null) {
            let cr = CurrentRateS.currentrate[currentAsset.name]['price']['sell']
            setCurrentRate(cr)
            setNewValue(String(cr))
            setUserPredictOfAsset(getPredictOfAsset({ selectedAsset: currentAsset.name, ForcastedRateS }))
            const { rank, total } = getScore({ scores: Score, userId: User?.user.id, asset: currentAsset.name })
            setUsc(rank)
            seCountUsers(total)
        }
    }, [CurrentRateS, currentAsset])


    useEffect(() => {
        let newv = Number(currentRate) + (Number(currentRate) * (Number(percent) / 100))
        let roundedNewv = Math.round(newv / 100) * 100;
        setNewValue(String(roundedNewv))
    }, [percent, currentRate])


    useEffect(() => {
        if (currentRate !== null) {
            let newp = (Number(currentRate) - Number(newValue)) / Number(currentRate) * 100 * -1
            setNewPercent(newp)
        }
    }, [CurrentRateS, newValue])


    useEffect(() => {
        if (userPredictOfAsset !== null) {
            setNewValue(String(userPredictOfAsset))
        }
    }, [userPredictOfAsset])


    const handleForcastSubmit = async (action: 'CREATE' | 'UPDATE' | 'DELETE') => {
        startTransition(async () => {
            try {
                await forcastAction({
                    submitDate,
                    selectedAsset: currentAsset.name,
                    nextDayRate: Number(newValue),
                    action
                });
                setMessage(`Your forecast has been successfully ${action.toLowerCase()}ed!`);
            } catch (error) {
                setMessage(`Failed to ${action.toLowerCase} your forcast!`);
            }
        });
    };

    
    if (currentAsset.name !== 'US Dollar') return (
        <Card  >

            <div className="flex justify-between w-full ">
                <div className="text-large grow-1 text-text-active">Forcast details</div>
                <div className="flex text-xs grow-0 items-center justify-center ">
                    <div className="mr-3 text-slate-400 ">
                        {currentAsset.name}
                    </div>
                    <Flag className="h-6 w-6 object-cover object-center rounded-lg" code={currentAsset.info.ALPHA_2} />

                </div>

            </div>
            <div className="flex items-center justify-center text-xs text-gray-light">
                It is not available right now.
            </div>

        </Card>
    )

    return (
        <Card className="max-h-none">

            <div className="flex flex-col row-span-10 gap-6">

                {/* Header with 2 row span */}
                <div className="grid grid-cols-8 ">
                    <div className="col-span-5 text-large grow-1 text-text-active">Forecast details</div>
                    <div className="col-span-3 flex text-xs grow-0 items-start justify-center ">
                        <div className="flex mt-1 justify-center items-center">
                            <div className="mr-3  text-gray-400">
                                {currentAsset.name}
                            </div>
                            <Flag className="h-6 w-6 object-cover object-center rounded-lg" code={currentAsset.info.ALPHA_2} />
                        </div>

                    </div>
                </div>




                {/* User details */}
                <div className="grid grid-col-6 gap-2 grid-flow-col ">
                    <div className="col-span-2 ">
                        <Badge classNames={{
                            badge: "w-5 h-5",
                        }}
                            color="primary" content={
                                <Button
                                    onClick={() => setProfileDrawerOpen(true)}
                                    isIconOnly
                                    className=" text-primary-foreground"
                                    radius="full"
                                    size="sm"
                                    variant="light"
                                >
                                    <Icon icon="solar:pen-2-linear" />
                                </Button>
                            } placement="bottom-right">
                            <Avatar size="lg" isBordered radius="md" src={User?.user.image} />
                        </Badge>
                    </div>

                    <div className="flex flex-col col-span-4">
                        <div className="flex justify-center items-center font-medium text-text-active">{User?.user.name}</div>
                        <div className="flex w-full justify-between items-center">
                            <Chip color="primary" variant="bordered">
                                <span className="text-xs text-gray-400">Rank: {usc == null ? "-" : `#${usc}`}</span>
                            </Chip>
                            <div className="text-xs text-gray-400">{`${countUsers} Participants`}</div>
                        </div>
                    </div>

                    
                </div>

                {usc == null ? <div className="text-xs text-gray-400">"Your rank will be determined after your first forecast." </div> : ""}


                {/* Select Range */}
                <div className="flex flex-col ">
                    <div className="flex gap-4">
                        <div className="flex w-3/5 flex-col items-start justify-center">
                            <div className="text-sm pb-2 text-gray-400">
                                Tehran Time
                            </div>
                            <div className="flex text-xs text-gray-300 ring-1 p-1 rounded-xl ring-yellow-400 w-full items-center justify-center">
                                {timeNowInTehran}
                            </div>
                        </div>

                        <div className="flex  w-2/5 flex-col items-start ">
                            <div className="text-sm text-gray-400 pb-2">
                                Forecast for
                            </div>
                            <div className="flex  text-xs text-gray-300 ring-1 p-1 rounded-xl ring-yellow-400 w-full items-center justify-center">
                                {nextDay}
                            </div>
                        </div>


                    </div>
                </div>


                <div className="border-gray-800 border-1 rounded-lg p-2 ">
                    <Input className="md:col-span-2 "
                        min={Number(currentRate) - (Number(currentRate) * .05)}
                        max={Number(currentRate) + (Number(currentRate) * .05)}
                        isDisabled={userPredictOfAsset !== null}
                        type="number"
                        label="Rate"
                        placeholder="0.0"
                        labelPlacement="outside"
                        value={newValue}
                        step={100}
                        onValueChange={setNewValue}
                        classNames={{
                            inputWrapper: "group-data-[focus=true]:bg-gray-900 bg-gray-900 data-[hover=true]:bg-gray-900 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-none",
                            input: "border-none border-0 text-gray-300 group-data-[has-value=true]:text-gray-300   ",
                            label: "group-data-[filled-within=true]:text-gray-400 text-gray-400 placeholder:text-gray-400",

                        }}

                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-gray-400 text-small">IRR</span>
                            </div>
                        }
                    />

                    <Slider
                        label="Rate Shift %"
                        value={newPercent}
                        onChange={setPercent}
                        isDisabled={userPredictOfAsset !== null}
                        color={"primary"}
                        size="sm"
                        step={0.2}
                        maxValue={5}
                        minValue={-5}
                        fillOffset={0}
                        defaultValue={0}
                        classNames={
                            {
                                trackWrapper: "h-full ",
                                labelWrapper: "text-gray-300",
                                label: "group-data-[filled-within=true]:text-gray-400 text-gray-400 placeholder:text-gray-400",
                            }
                        }
                        className="max-w-md md:col-span-2 mt-5"
                        formatOptions={{ signDisplay: 'always' }}
                    />
                </div>


                {/* submit or delete buttom */}
                <div className="flex flex-col ">

                    {userPredictOfAsset == null
                        ?
                        <div className="flex ">

                            <Button
                                className=" max-w-20"
                                onClick={() => {
                                    handleForcastSubmit("CREATE")
                                    setUserPredictOfAsset(Number(newValue))
                                }} color="primary">
                                Save
                            </Button>

                        </div>
                        :

                        <div className="grid grid-rows-2 grid-col-3  grid-flow-col gap-1 ">
                            <div className="row-span-1 col-span-2 text-text-active text-sm">You have submitted your forecast.</div>
                            <div className="row-span-1 col-span-2 text-text-active text-[10px] ">If you change your mind, delete it to edit or remove it. </div>
                            <div className="row-span-2  col-span-1 ml-3">
                                <Button onClick={() => {
                                    handleForcastSubmit("DELETE")
                                    setUserPredictOfAsset(null)
                                }} color="danger">
                                    Delete
                                </Button>
                            </div>
                        </div>

                    }
                </div>

                {/* Alarm */}
                <Alert text="Forecasts submitted before 9:00 AM Tehran time will be considered for the next day. Submissions made after 9:00 AM will be applied to forecasts for two days later." />



            </div>
        </Card>

    );
}


