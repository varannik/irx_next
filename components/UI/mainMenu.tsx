'use client'
import useMenuDrawerStore from "@/stores/useMenuDrawerStore"
import clsx from "clsx";
import Link from "next/link";
import UserSign from "../UserSign";
import AnalyticsIcon from "./icons/AnalyticsIcon";
import ForecastIcon from "./icons/ForecastIcon";
import UserIcon from "./icons/UserIcon";
import useProfileDrawerStore from "@/stores/useProfileDrawerStore";
const className = "flex items-center hover:rounded-lg justify-center bg-bg-layer1 basis-1/3 px-3 py-2 text-md text-text-active font-semibold  hover:bg-slate-800 focus:z-10"


export default function MainMenu(){
    const {setMenuDrawerOpen } = useMenuDrawerStore();
    const {setProfileDrawerOpen } = useProfileDrawerStore();

    return (

        <div className="flex m-2 lg:gap-5 divide-x lg:divide-x-0 divide-solid divide-div-diff  ">

        <Link href={'/analytics'} className={clsx(className)}>
        <div className="flex flex-col mx-auto justify-center items-center gap-1 pb-2">
          <div className="h-6 w-6">
          <AnalyticsIcon />
          </div>
          <p className="text-xs">
          Analysis
          </p>
          </div>
        </Link>
        <Link href={'/forecast'} className={clsx(className)}>
        <div className="flex flex-col mx-auto justify-center items-center gap-1 pb-2">
          <div className="h-6 w-6">
          <ForecastIcon />
          </div>
          <p className="text-xs">
          Forecast
          </p>
          </div>
        </Link>

        <button onClick={() => {
                            setProfileDrawerOpen(true)
                            setMenuDrawerOpen(false)
                          }}

          type="button"
          className={clsx(className)}
        >
        <div className="flex flex-col mx-auto justify-center items-center gap-1 pb-2">
          <div className="h-6 w-6">
          <UserIcon />
          </div>
          <p className="text-xs">
          {UserSign()}
          </p>
          </div>
        </button>
        </div>
    )

}


