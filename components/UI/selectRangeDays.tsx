import React, { PropsWithChildren, useEffect, useState } from "react";
import { RadioGroup, Radio, cn, Slider } from "@nextui-org/react";
import useSelectRangeGaugeChart from "@/stores/useSelectRangeGaugeChart";



export const CustomRadio = (props: any) => {


  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-bg-layer3 hover:bg-hov-c  items-center justify-around",
          "flex-row-reverse max-w-[300px] h-12 cursor-pointer rounded-lg gap-1  border-2 border-transparent",
          "data-[selected=true]:border-border-selected"
        ),
        control: 'bg-gray-light ',
        wrapper: 'group-data-[selected=true]:border-border-selected z-0',
        label: ' w-full text-xs text-gray-light',
        description: 'text-xs'
      }}
    >
      {children}
    </Radio>
  );
};

export const CustomRadioSidbar = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "flex col-span-3 inline-flex m-0 bg-bg-layer3 hover:bg-hov-c items-center justify-end ",
          "flex-row-reverse max-w-full h-18 cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-border-selected"
        ),
        labelWrapper: "grow ",
        control: 'bg-gray-light text-gray-mid',
        label: 'text-xs text-gray-light',
        wrapper: 'group-data-[selected=true]:border-border-selected z-0'

      }}
    >
      {children}
    </Radio>
  );
};

export default function SelectRangeDays() {

  const { selectedRange, setRange } = useSelectRangeGaugeChart()

  return (

    <RadioGroup
      classNames={{
        'base': "h-full  gap-0"
        , 'wrapper': " h-full   py-0 gap-0 "
        , 'label': "bg-white"
      }}
      defaultValue={selectedRange.range}
      onValueChange={((value: string) => setRange({ ...selectedRange, range: value }))}

      description=" ">
      <div className="grid grid-rows-3 h-full ">

        <div className="grid place-items-center row-span-1 grid-cols-3 gap-1 ">
          <CustomRadio description="Current" value="today">
            Day
          </CustomRadio>

          <CustomRadio description="Current" value="week">
            Week
          </CustomRadio>

          <CustomRadio description="Current" value="month">
            Month
          </CustomRadio>
        </div>


        <div className="grid place-items-center row-span-2  gap-1">
          <CustomRadioSidbar
            description=""
            value="days"
          >
            <Slider
              label=" "
              size="sm"
              color="foreground"
              showTooltip={true}
              minValue={1}
              maxValue={90}
              defaultValue={1}
              getValue={(day) => `Last ${day}  days`}
              onChangeEnd={(value) => {
                setRange({ ...selectedRange, selectedDaysAsRange: Number(value) })
              }}

              classNames={{
                base: "w-48",
                track: " border-s-gray-200",
                labelWrapper: "justify-start"
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group p-1 top-1/2 bg-gray-800 border-small  border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-gray-200 rounded-full w-4 h-4 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
            />

          </CustomRadioSidbar>

        </div>
      </div>



    </RadioGroup>

  );
}
