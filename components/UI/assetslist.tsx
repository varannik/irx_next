'use client'

import useSelectedAsset from '@/stores/useSelectedAssetStore'
import { useState, useEffect } from 'react'
import { IAsset, IAssetCollection, IAssetInfo } from '@/models/Countries'
import Flag from 'react-world-flags'

import useAssetDrawerStore from '@/stores/useAssetDrawerStore'
import SpinerIcon from './icons/Spinner'


export default function AssetsList() {

  const { currentAsset, setCurrentAsset } = useSelectedAsset();
  const { openAsset, setAssetDrawerOpen } = useAssetDrawerStore()

  const [currencies, setCurrencies] = useState<IAssetCollection | null>(null)
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/countries', { next: { revalidate: 3600 }, cache: 'force-cache' });
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0].assets;
        const dataSorted = data.sort((a:IAsset, b:IAsset) => a.info.NUMERIC - b.info.NUMERIC);
        const filterData = dataSorted.filter((obj:IAsset) => obj.info.ALPHA_2 !== currentAsset.info.ALPHA_2);

        setCurrencies(filterData);
        setLoading(false)
      } catch (error) {
        console.log('List of currencies are not reachable');
      }
    };

    fetchData();
  }, [currentAsset]);

  if (isLoading) return <SpinerIcon />
  if (!currencies) return <p>Connection Fail</p>

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