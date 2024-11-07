'use client'

import useSelectedAsset from '@/stores/useSelectedAssetStore'
import { useState, useEffect } from 'react'
import Flag from 'react-world-flags'
import useAssetDrawerStore from '@/stores/useAssetDrawerStore'
import SpinerIcon from './icons/Spinner'
import { IAsset } from '@/types/Assets'


export default function AssetsList({AssetListData}:{AssetListData:IAsset[]}) {

  const { currentAsset, setCurrentAsset } = useSelectedAsset();
  const { openAsset, setAssetDrawerOpen } = useAssetDrawerStore()

  const [currencies, setCurrencies] = useState<IAsset[]>([]) 
  const [isLoading, setLoading] = useState(true)


  useEffect(()=>{
    if (AssetListData){
      const dataSorted = AssetListData.sort((a:IAsset, b:IAsset) => a.info.NUMERIC - b.info.NUMERIC);
      const filterData = dataSorted.filter((obj:IAsset) => obj.info.ALPHA_2 !== currentAsset.info.ALPHA_2);
  
      setCurrencies(filterData);
      setLoading(false)
    }
 
  },[AssetListData, currentAsset])

  if (isLoading || currencies == null) {return <SpinerIcon />} 
  else {
    return (

      <ul role="list" className="space-y-1">
        <li>
          <div className='flex px-2 py-2 items-center rounded-md text-xs text-gray-900 bg-slate-400'>
            <Flag className=" basis-1/4  h-6 w-6 object-cover object-center rounded-lg" code={currentAsset.info.ALPHA_2} />
            <div className=" ml-3 justify-start">
              {currentAsset.name}
            </div>
          </div>
        </li>
        {currencies.map((asset:IAsset) => (
          <li key={asset.name} className="overflow-hidden shadow">
            <button
              type="button"
              className=" flex flex-row  items-center rounded-md w-full bg-gray-900 px-2 py-1 text-xs font-light shadow-sm text-gray-400 div hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() => {
                setCurrentAsset(asset)
                setAssetDrawerOpen(false)
              }}
            >
              <Flag className="basis-1/4  h-6 w-6 object-cover object-center rounded-lg" code={asset.info.ALPHA_2} />
  
              <div className="flex basis-3/4 ml-3 justify-start">
                {asset.name}
              </div>
  
            </button>
          </li>
        ))}
      </ul>
    )
  }



}