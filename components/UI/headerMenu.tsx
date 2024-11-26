'use client'
import Link from 'next/link'
import {Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import useSelectedAsset from '@/stores/useSelectedAssetStore'


import useHeaderDrawerStore from '@/stores/useHeaderDrawerStore'
import clsx from 'clsx'
import useAssetDrawerStore from '@/stores/useAssetDrawerStore'
import MainMenuDesktop from './mainMenuDesktop'
import WaitToRefresh from './waitToRefresh'
import { Logo } from '../QuanticalLogo'
import { getCorrectTimeZone } from '@/utils/global/getCorrectTimeZone'



export default function HeaderMenu({LastUpdateDate}:{LastUpdateDate:Date}) {
 
  const [logoHovered, setLogoHovered] = useState(false)

  const { currentAsset, setCurrentAsset } = useSelectedAsset()
  const {openAsset, setAssetDrawerOpen} = useAssetDrawerStore()
  const { openHeader, setHeaderOpen } = useHeaderDrawerStore()
  const [waitForNewUpdate, setWaitForNewUpdate] = useState(15)
  const [time, setTime] = useState('');



  // Use useEffect to update the time every second
  useEffect(() => {
    if (LastUpdateDate !== null) {
      const intervalId = setInterval(() => {

        // Get the current date and time
        const now = new Date();

        // Convert last update string to date
        const lastDate = new Date(LastUpdateDate);

        // Calculate the difference in milliseconds
        const diffInMilliseconds = now.getTime() - lastDate.getTime()

        // Convert milliseconds to minutes
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const tillToUpdate = 15 - diffInMinutes

        setWaitForNewUpdate(tillToUpdate)
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [LastUpdateDate]);


  useEffect(()=>{
    const lastTime =  getCorrectTimeZone(LastUpdateDate)
    setTime(lastTime)
  }, [LastUpdateDate])

  

  return (
    <>
      <Transition show={openHeader}>
        <div
          className={clsx([
            // Base styles
            'fixed items-center flex mx-auto max-w-7xl inset-x-0 top-0 h-12  pl-5 pr-2 py-2 text-sm z-50  divide-x divide-div-diff overflow-hidden rounded-b-lg bg-bg-layer1 shadow',
            // Shared closed styles
            'data-[closed]:opacity-0',
            // Entering styles
            'data-[enter]:duration-300 data-[enter]:data-[closed]:-translate-y-full',
            // Leaving styles
            'data-[leave]:duration-300 data-[leave]:data-[closed]:-translate-y-full',
          ])}>

          <div className="w-1/5 max-w-32 justify-center ">
            <Link
              onClick={() => { setHeaderOpen(!openHeader) }}
              href="/"
              aria-label="Home"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <Logo
                invert={true}
                filled={logoHovered}
              />
            </Link>
            
          </div>
          <div className='grow ml-6'>
            <div className='hidden md:flex '>
             <MainMenuDesktop />
            </div>
          
          </div>

          <div className='grid justify-items-center px-2'>
        <button onClick={() => setAssetDrawerOpen(true)} type="button">
          <div className='text-xs text-gray-600 '>
            Current currency
          </div>
          <div className='text-sx text-gray-400'>
          
          {currentAsset.name}
          
          </div>
          </button>
        </div>

          <div className='grid justify-items-center px-2'>
            <div className='text-xs text-gray-600 '>
              Last Update
            </div>
            <div className='text-sx text-gray-400'>
              {time}
            </div>
          </div>
          <div className='flex justify-center pl-2 text-xs '>
          <WaitToRefresh waitForNewUpdate={waitForNewUpdate}/>
          </div>
        </div>

      </Transition>
    </>
  )
}