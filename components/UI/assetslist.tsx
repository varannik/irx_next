'use client'


import useSelectedAsset from '@/stores/useSelectedAssetStore'
import { useState, useEffect } from 'react'
import { useStore } from 'zustand'
import { Field, Label } from './catalyst/fieldset'
import { Listbox, ListboxLabel, ListboxOption } from './catalyst/listbox'
import Flag from 'react-flagpack'
import {IAsset} from '@/models/Countries'


export default function AssetsList() {

  const { currentAsset, setCurrentAsset } = useSelectedAsset();
  const [currencies, setCurrencies] = useState(null)
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/countries');
        if (!response.ok) {
          
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data =  result[0].assets;

        setCurrencies(data);
        setLoading(false)
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [currentAsset]);

  if (isLoading) return <p>Loading...</p>
  if (!currencies) return <p>No profile data</p>

  // return (

  //   <Field >
  //     <Listbox name="asset" value={currentAsset} defaultValue={currentAsset}>
  //       {currencies.map((asset:IAsset) => (
  //         <ListboxOption value={asset.info.ALPHA_2} key={asset.name} > 
  //           <Flag className="w-5 sm:w-4" code={asset.info.ALPHA_2}/>
  //           <ListboxLabel>{asset.name}</ListboxLabel>
  //         </ListboxOption>
  //       ))}
  //     </Listbox>
  //   </Field>
  // )


  // return (
  //   <div>
  //     <select
  //       id="Currency"
  //       name="Currency"
  //       className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
  //       defaultValue={currentAsset}
  //     >
  //       {currencies.map((asset) => (
  //         <option key={asset.name}>
  //           <Flag  code={asset.info.ALPHA_2}/>
  //           {asset.name}
  
  //         </option>
  
  //       ))}
  //     </select>
  //   </div>
  // )



    return (
      <Field>
        <Label>Project status</Label>
        <Listbox name="status" defaultValue="active">
          <ListboxOption value="active">
            <ListboxLabel>Active</ListboxLabel>
          </ListboxOption>
          <ListboxOption value="paused">
            <ListboxLabel>Paused</ListboxLabel>
          </ListboxOption>
          <ListboxOption value="delayed">
            <ListboxLabel>Delayed</ListboxLabel>
          </ListboxOption>
          <ListboxOption value="canceled">
            <ListboxLabel>Canceled</ListboxLabel>
          </ListboxOption>
        </Listbox>
      </Field>
    )
  


}












