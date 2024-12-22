import React from 'react';

import { CircularProgress, Progress } from '@nextui-org/react';
import useRefOrWait from './base/useRefOrWait';
import { Button } from "@nextui-org/react";
import { Updating } from './updating';

interface MyComponentProps {
  waitForNewUpdate: number;
  lastUplate: string
}

const WaitToRefresh: React.FC<MyComponentProps> = ({ waitForNewUpdate, lastUplate }) => {
  const { isWaiting, progress, handleRefresh } = useRefOrWait(waitForNewUpdate);
  return (



    <button onClick={handleRefresh} className='relative place-items-center place-content-center h-8 w-20'>
      {
        // false ?
        isWaiting ?
          <div>
            <div className=' text-text-active text-xs '>{lastUplate}</div>
            <div className='absolute inset-x-0 -bottom-2'>
              <Progress
                classNames={{
                  base: "max-w-md",
                  track: `drop-shadow-md border  border-gray-700`,
                  indicator: "bg-red-high",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                // label="Lose weight"
                radius="sm"
                aria-label='CircularProgress'
                // showValueLabel={true}
                size="sm"
                value={progress == 0 ? 100 : progress}
              />
            </div>
          </div>
          // <div className=' text-text-active text-xs place-items-center place-content-center  '>Refresh Page</div>
          :
          <Updating />
        // <div className='w-full h-8 text-red-high text-xs place-items-center place-content-center border border-x-1  rounded-lg border-red-high '><div className=' text-red-high text-xs '>{lastUplate ? lastUplate : "Cheking"}</div> </div>
      }
    </button>

  );
}

export default WaitToRefresh;


