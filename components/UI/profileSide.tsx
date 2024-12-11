'use client'

import { Fragment, useEffect, useState} from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { ArrowLeftEndOnRectangleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import useProfileDrawerStore from '@/stores/useProfileDrawerStore'
import { Session } from 'next-auth'
import {Chip } from '@nextui-org/react'
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import { IScore } from "@/types/Score";
import { getPredictOfAsset, predictOfAsset } from '@/utils/global/getPredictionOfAsset'
import { getScore } from '@/utils/global/getScore'
import { IUserPredict } from '@/types/UserDailyPredict'
import UserForecastCard from './userForecastCard'
import { IDayHist, IHist } from '@/types/UserHistoryCards'


export default function ProfileSideBar({ 
  User,
  HistCurrData,
  Score}: { 
    User: Session,
    HistCurrData: IHist[] ,
    Score: IScore[] 
  }) {

  const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();
  const { currentAsset } = useSelectedAsset();
  const [userPredictOfAsset, setUserPredictOfAsset] = useState<IDayHist[]| null>(null);
  const [usc, setUsc] = useState<number | null>(null)
  const [countUsers, seCountUsers] = useState<number | null>(null)


  
  useEffect(() => {
    if (HistCurrData !== null) {
        
        const HistAsset = HistCurrData.find((item) => item[currentAsset.name])
        if (HistAsset){
          setUserPredictOfAsset(HistAsset[currentAsset.name])
        }
        const { rank, total } = getScore({ scores: Score, userId: User?.user.id, asset: currentAsset.name })
        setUsc(rank)
        seCountUsers(total)
    }
}, [HistCurrData, currentAsset])

  return (
    <Transition show={openProfile} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setProfileDrawerOpen}>
        <div className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className=" pointer-events-auto w-screen max-w-sm">
                  <div className="grid grid-rows-10 h-full  overflow-y-scroll bg-gray-900 shadow-xl">





                    {/* Main */}
                    <div className=" row-span-1  bg-gradient-to-t from-slate-900 to-slate-700" >


                    </div>
                    <div className="row-span-1 flex flex-col justify-center items-center   md:-mt-10 -mt-5 ">
                      <img className="h-16 w-16 md:h-20 md:w-20 bg-gray-900/80 p-2  rounded-full   " src={User.user.image} alt="" />
                      <div className=' flex justify-center font-semibold text-medium text-slate-400 bg-transparent h-6  '>
                      {User.user.name}
                    </div>
                    <div className='  flex justify-center font-semibold text-xs text-slate-400 bg-transparent italic '>
                      {User.user.email}
                    </div>
                    <div className='  flex justify-center mt-3 '>
                      <Chip color="default" variant="bordered">
                        Rank: {usc == null ? "-" : `#${usc}`}
                      </Chip>
                    </div>
                    </div>
{/* 

                    <div className='row-span-1  '>

                    </div> */}


                    <div className='flex flex-col items-center row-span-6 overflow-y-scroll mt-10 m-3   overflow-hidden  rounded-2xl '>
                    <div className='text-md p-3 flex flex-col justify-center items-center text-slate-400'>Recent Forecasts 
                      <p className='text-xs italic text-gray-500'>R(Real Rate) - RC(Real Change)</p>
                      <p className='text-xs italic text-gray-500'>F(Forecasted) - FC(Forecasted Change)</p>
                      </div>

                    <UserForecastCard Data={userPredictOfAsset}/>
                    </div>


                    <div className='row-span-1 flex justify-center items-center  gap-3'>
         

                      <button className='w-28  h-10 flex justify-center items-center border-2 rounded-2xl text-slate-500 border-slate-500 ' onClick={() => setProfileDrawerOpen(false)} >
                          <ArrowLeftEndOnRectangleIcon className="h-6 w-6 pr-2" aria-hidden="true" /> Back
                      </button>

                      <button className='w-28  h-10 flex justify-center items-center border-2 border-red-800 rounded-2xl  text-red-800' onClick={() => setProfileDrawerOpen(false)} >
                        Log out  <ArrowRightStartOnRectangleIcon className="h-6 w-6 pl-2 " aria-hidden="true" />
                      </button >

                      

                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}



