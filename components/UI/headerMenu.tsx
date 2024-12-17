'use client'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import useSelectedAsset from '@/stores/useSelectedAssetStore'


import useHeaderDrawerStore from '@/stores/useHeaderDrawerStore'
import clsx from 'clsx'
import useAssetDrawerStore from '@/stores/useAssetDrawerStore'
import MainMenuDesktop from './mainMenuDesktop'
import WaitToRefresh from './waitToRefresh'
import { Logo } from '../QuanticalLogo'
import { getCorrectTimeZone } from '@/utils/global/getCorrectTimeZone'
import { Button } from '@nextui-org/react'
import Flag from 'react-world-flags'
import SelectCalendar from './base/calendar'



export default function HeaderMenu({ LastUpdateDate }: { LastUpdateDate: Date }) {

  const [logoHovered, setLogoHovered] = useState(false)

  const { currentAsset, setCurrentAsset } = useSelectedAsset()
  const { openAsset, setAssetDrawerOpen } = useAssetDrawerStore()
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


  useEffect(() => {
    const lastTime = getCorrectTimeZone(LastUpdateDate)
    setTime(lastTime)
  }, [LastUpdateDate])



  return (
    <>
      <Transition show={openHeader}>
        <div
          className={clsx([
            // Base styles
            'fixed items-center flex mx-auto max-w-7xl inset-x-0 top-0 h-12  p-2 text-sm z-50    rounded-b-lg bg-bg-layer1 shadow',
            // Shared closed styles
            'data-[closed]:opacity-0',
            // Entering styles
            'data-[enter]:duration-300 data-[enter]:data-[closed]:-translate-y-full',
            // Leaving styles
            'data-[leave]:duration-300 data-[leave]:data-[closed]:-translate-y-full',
          ])}>
          <div className='flex justify-items-center grow  divide-x divide-div-diff  '>


            <Link className='w-2/6 max-w-32 p-2'
              onClick={() => { setHeaderOpen(!openHeader) }}
              href="/"
              aria-label="Home"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <Logo
                className='w-full h-full'
                invert={true}
                filled={logoHovered}
              />
            </Link>

            <div className='flex justify-center items-center p-2 text-xs  '>
                <WaitToRefresh waitForNewUpdate={waitForNewUpdate} lastUplate={time} />
            </div>

            <div className='flex grow '>
              <div className='hidden md:flex '>
                <MainMenuDesktop />
              </div>
            </div>

          </div>

          <div>

            <div className='flex justify-items-center  divide-x divide-div-diff '>
              <SelectCalendar />
              <button className='flex w-full justify-center items-center ml-2 ' onClick={() => setAssetDrawerOpen(true)}>
                <Flag className="h-6 w-6 object-cover object-center rounded-lg" code={currentAsset.info.ALPHA_2} />
              </button>
            </div>


          </div>
        </div>

      </Transition>
    </>
  )
}