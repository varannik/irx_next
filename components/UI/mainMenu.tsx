'use client'
import useMenuDrawerStore from "@/stores/useMenuDrawerStore"
import clsx from "clsx";
import Link from "next/link";
import UserSign from "../UserSign";
import {AnalyticsIcon} from "./icons/AnalyticsIcon";
import {ForecastIcon} from "./icons/ForecastIcon";
import {UserIcon} from "./icons/UserIcon";
import useProfileDrawerStore from "@/stores/useProfileDrawerStore";
import { Transition } from "@headlessui/react";
import useHeaderDrawerStore from "@/stores/useHeaderDrawerStore";



const className = "flex flex-shrink-0 flex-grow-0 items-center hover:rounded-lg justify-center bg-bg-layer1 basis-1/3 px-3 py-2 text-md text-text-active font-semibold  hover:bg-slate-800 focus:z-10"




export default function MainMenu() {
  const { setMenuDrawerOpen } = useMenuDrawerStore();
  const { setProfileDrawerOpen } = useProfileDrawerStore();
  const { openHeader, setHeaderOpen } = useHeaderDrawerStore()

  return (
    <Transition show={openHeader}>
      <div
        className={clsx([
          // Base styles
                     
          'fixed items-center flex mx-auto w-full inset-x-0 bottom-0 h-20  pl-5 pr-2 py-2 text-sm z-50  rounded-t-2xl  overflow-hidden  bg-bg-layer1 shadow   md:hidden',
          // Shared closed styles
          'data-[closed]:opacity-0',
          // Entering styles
          'data-[enter]:duration-300 data-[enter]:data-[closed]:translate-y-full',
          // Leaving styles
          'data-[leave]:duration-300 data-[leave]:data-[closed]:translate-y-full',
        ])}>

        <div className="w-full flex-row items-center justify-center flex m-2 lg:gap-5 divide-x lg:divide-x-0 divide-solid divide-div-diff  ">

          <Link href={'/analytics'} className={clsx(className)}>
            <div className="flex  flex-col mx-auto justify-center items-center gap-1 pb-2">
              <div className="h-6 w-6">
                {AnalyticsIcon}
              </div>
              <p className="text-xs">
                Analysis
              </p>
            </div>
          </Link>
          <Link href={'/forecast'} className={clsx(className)}>
            <div className="flex  flex-col mx-auto justify-center items-center gap-1 pb-2">
              <div className="h-6 w-6">
                {ForecastIcon}
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
            className={clsx(className , 'overflow-hidden')}
          >
            <div className="flex   flex-col mx-auto justify-center items-center gap-1 pb-2">
              <div className="h-6 w-6">
                {UserIcon}
              </div>
              <p className="text-xs">
                {UserSign()}
              </p>
            </div>
          </button>
        </div>
      </div>

    </Transition>
  )

}


