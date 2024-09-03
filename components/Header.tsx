import Link from 'next/link'
import { Logo } from './QuanticalLogo'
import { useEffect, useState } from 'react'
import useSelectedAsset from '@/stores/useSelectedAssetStore'
import useSelectedCalendar from '@/stores/useSelectedCalendar'
import RefreshWaiting from './UI/circularProgress'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getCorrectTimeZone(dateStr:string){

    // Convert string to Date object
    const dateObj = new Date(dateStr);

    // Extract time
    const timeStr = dateObj.toLocaleTimeString();

  return timeStr
}


export default function Header() {
  const [logoHovered, setLogoHovered] = useState(false)
  const [lastTime, setLastTime] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const {currentAsset, setCurrentAsset } = useSelectedAsset()
  const [waitForNewUpdate, setWaitForNewUpdate] = useState(15)



  // Use useEffect to update the time every second
  useEffect(() => {
      const intervalId = setInterval(() => {

        // Get the current date and time
        const now = new Date();
        
        // Convert last update string to date
        const lastDate = new Date(lastTime);

        // Calculate the difference in milliseconds
        const diffInMilliseconds = now - lastDate;

        // Convert milliseconds to minutes
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); 
        const tillToUpdate = 15 - diffInMinutes

        setWaitForNewUpdate(tillToUpdate)

      }, 1000);
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
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
        console.log(error.message);
      }
    };

    fetchData();
  }, [lastUpdate, ])

  return (
    <div>
      <div className="fixed items-center flex inset-x-0 top-0 h-14  px-5 py-2 text-sm z-10  divide-x divide-div-diff overflow-hidden rounded-b-lg bg-bg-layer1 shadow ">

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
        <div className='grid justify-left pl-2 text-xs '>
          {/* <div className="radial-progress" style={{ "--value": String() , "--size": "2.5rem", "--thickness": "2px" }} role="progressbar">{waitForNewUpdate} m </div> */}
          <RefreshWaiting value={(15-waitForNewUpdate)/15 * 100} />
        </div>
      </div>
    </div>
  )
}

RefreshWaiting