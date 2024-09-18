import Link from 'next/link'
import { Logo } from './QuanticalLogo'
import { useEffect, useState } from 'react'
import useSelectedAsset from '@/stores/useSelectedAssetStore'
import RefreshWaiting from './UI/circularProgress'
import {Button} from "@nextui-org/react";


function getCorrectTimeZone(dateStr:string){

    // Convert string to Date object
    const dateObj = new Date(dateStr);

    // Extract time
    const timeStr = dateObj.toLocaleTimeString();

  return timeStr
}

export default function Header() {
  const [logoHovered, setLogoHovered] = useState(false)
  const [lastTime, setLastTime] = useState<number | Date | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const {currentAsset, setCurrentAsset } = useSelectedAsset()
  const [waitForNewUpdate, setWaitForNewUpdate] = useState(15)



  function refOrWait (){
    
    const handleRefresh = () => {
        window.location.reload(); // Forces a full page refresh
      }

    if (waitForNewUpdate>0){
      return <RefreshWaiting value={(15-waitForNewUpdate)/15 * 100} />
    } else {
      return (
      <Button isIconOnly variant="faded" onClick={handleRefresh}  radius="full" className='  flex justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </Button>
      )
    }
  }



  // Use useEffect to update the time every second
  useEffect(() => {
    if (lastTime !==null){
      const intervalId = setInterval(() => {

        // Get the current date and time
        const now = new Date();
        
        // Convert last update string to date
        const lastDate = new Date(lastTime);

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
    }, [lastTime, lastUpdate]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/current');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();

        setLastUpdate(getCorrectTimeZone(result[0].last_update))
        setLastTime(result[0].last_update)

      } catch (error) {
        console.log('Current data is not reachable');
      }
    };

    fetchData();
  }, [lastUpdate, ])

  return (
    <div>
      <div className="fixed items-center flex inset-x-0 top-0 h-14  pl-5 pr-2 py-2 text-sm z-10  divide-x divide-div-diff overflow-hidden rounded-b-lg bg-bg-layer1 shadow ">

        <div className="w-1/5 max-w-32 justify-start">
          <Link
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
        <div className='grow'>

        </div>

        <div className='grid justify-items-center px-2'>
          <div className='text-xs text-gray-600 '>
            Current currency
          </div>
          <div className='text-sx text-gray-400'>
            {currentAsset.name}
          </div>
        </div>

        <div className='grid justify-items-center px-2'>
          <div className='text-xs text-gray-600 '>
            Last Update
          </div>
          <div className='text-sx text-gray-400'>
            {lastUpdate}
          </div>
        </div>
        <div className='flex justify-center pl-2 text-xs '>
          {refOrWait()}
        </div>
      </div>
    </div>
  )
}
