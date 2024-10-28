"use client"

import { Card } from "@/components/UI/cardTremor"
import { BollingerBands } from "./BollingerBands"
import { RSI } from "./RSI"
import { PlusIcon } from "@heroicons/react/20/solid"

export function Bands() {


  return (
    
    <Card >

      <div className="flex flex-col divide-y-1 divide-div-diff gap-4">
      <div>
      <div className="flex justify-between">
        <div>
          <p className="text-base font-normal text-text-active">Bollinger Bands</p>
        </div>
      </div>

      <BollingerBands />

      </div>

      <div className="pt-3">
      <div className="flex justify-between">
        <div>
          <p className="text-base font-normal text-text-active">RSI</p>
        </div>
      </div>
      </div>

      </div>







      <RSI />

    </Card>
  )
}