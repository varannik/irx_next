"use client";
import { useState, startTransition, useEffect } from "react";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import { IAssetCurrentRate } from "@/types/Current";
import { Session } from "next-auth";
import { forcastAction } from "@/app/actions/forcastAction";
import { IUserForcastRes, IUserPredict } from "@/types/UserDailyPredict";
import { getToday } from "@/utils/global/currentday";

import {
    SliderValue,
    Card,
    CardHeader,
    CardBody,
    Button,
    Avatar,
    Badge,
    Input,
    CardFooter,
    Autocomplete,
    AutocompleteItem,
    Slider,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useProfileDrawerStore from "@/stores/useProfileDrawerStore";
import useAssetDrawerStore from '@/stores/useAssetDrawerStore'
import Flag from "react-world-flags";
import { IAsset } from "@/types/Assets";


type predictOfAsset = number | null

const today = getToday()
const currentDay = today.toISOString().split('T')[0];
today.setDate(today.getDate() + 1); // Adds one day
const nextDay = today.toISOString().split('T')[0];

function getPredictOfAsset({ selectedAsset, ForcastedRateS }: { selectedAsset: string, ForcastedRateS: IUserPredict[] }): predictOfAsset {
    const asset = ForcastedRateS.find((item) => item.selectedAsset === selectedAsset);
    return asset?.nextDayRate || null;
}


export default function SubmitPredictionForm({ User, CurrentRateS, ForcastedRateS, AssetListData }: { User: Session | null, CurrentRateS: IAssetCurrentRate, ForcastedRateS: IUserPredict[], AssetListData: IAsset[] }) {

    const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();
    const { openAsset, setAssetDrawerOpen } = useAssetDrawerStore()
    const { currentAsset, setCurrentAsset } = useSelectedAsset();
    const [userPredictOfAsset, setUserPredictOfAsset] = useState<predictOfAsset>(null);

    const [message, setMessage] = useState("");

    const [newValue, setNewValue] = useState('0')
    const [currentRate, setCurrentRate] = useState<number>(0)

    const [newPercent, setNewPercent] = useState<SliderValue>(0)
    const [percent, setPercent] = useState<SliderValue>(0)


    useEffect(() => {
        if (CurrentRateS !== null) {
            let cr = CurrentRateS.currentrate[currentAsset.name]['price']['sell']
            setCurrentRate(cr)
            setNewValue(String(cr))
            setUserPredictOfAsset(getPredictOfAsset({ selectedAsset: currentAsset.name, ForcastedRateS }))
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
                    submitDate: getToday(),
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
        <Card className="min-w-80 max-w-96 lg:max-w-7xl p-2 bg-black" >
            <CardHeader className="flex flex-col items-start px-4 pb-5 pt-4">
                <div className="flex justify-between w-full ">
                    <div className="text-large grow-1">Forcast details</div>
                    <div className="flex text-xs grow-0 items-center justify-center ">
                        <div className="mr-3  ">
                            {currentAsset.name}
                        </div>
                        <Flag className="h-6 w-6 object-cover object-center rounded-lg" code={currentAsset.info.ALPHA_2} />

                    </div>

                </div>
                <div className="flex items-center justify-center text-xs text-gray-light">
                    It is not available right now.
                </div>
            </CardHeader >
        </Card>
    )

    return (
        <>
            <Card className="min-w-80 max-w-96 lg:max-w-7xl p-2 bg-black" >
                <CardHeader className="flex flex-col items-start px-4 pb-5 pt-4">
                    <div className="flex justify-between w-full ">
                        <div className="text-large grow-1">Forcast details</div>
                        <div className="flex text-xs grow-0 items-center justify-center ">

                            <div className="mr-3  ">
                                {currentAsset.name}
                            </div>
                            <Flag className="h-6 w-6 object-cover object-center rounded-lg" code={currentAsset.info.ALPHA_2} />

                        </div>
                    </div>

                    <div className="flex gap-4 py-4 pt-5">
                        <Badge
                            classNames={{
                                badge: "w-5 h-5",
                            }}
                            color="primary"
                            content={
                                <Button
                                    onClick={() => setProfileDrawerOpen(true)}
                                    isIconOnly
                                    className="p-0 text-primary-foreground"
                                    radius="full"
                                    size="sm"
                                    variant="light"
                                >
                                    <Icon icon="solar:pen-2-linear" />
                                </Button>
                            }
                            placement="bottom-right"
                            shape="circle"
                        >
                            <Avatar className="h-14 w-14" src={User?.user.image} />
                        </Badge>
                        <div className="flex flex-col items-start justify-center">
                            <p className="font-medium">{User?.user.name}</p>
                            <span className="text-small text-default-500">Rank: #1</span>
                        </div>
                    </div>
                    {/* <p className="text-small text-default-400">
                        The photo will be used for your profile, and will be visible to other users of the
                        platform.
                    </p> */}
                </CardHeader>
                <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2  pb-5">

                    {/* Current Date */}
                    <Input
                        variant="bordered"
                        classNames={{
                            input: "border-none border-0"
                        }}
                        isReadOnly
                        label="Current Date:" labelPlacement="outside" placeholder={currentDay} />

                    <Input
                        variant="bordered"
                        classNames={{
                            input: "border-none border-0"
                        }}
                        isReadOnly
                        label="Your Prediction for:" labelPlacement="outside" placeholder={nextDay} />

                    <Input className=""
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
                            input: "border-none border-0"
                        }}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">IRR</span>
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
                                trackWrapper: "h-full"
                            }
                        }
                        className="max-w-md"
                        formatOptions={{ signDisplay: 'always' }}
                    />

                </CardBody>

                <CardFooter className="mt-4 justify-center lg:justify-end gap-2">
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
                            <div className="row-span-1 col-span-2 text-sm">You have already submitted your forecast.</div>
                            <div className="row-span-1 col-span-2 text-[10px] ">If you change your mind, delete it to edit or remove it. </div>
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
                </CardFooter>
            </Card >
        </>

    );
}


