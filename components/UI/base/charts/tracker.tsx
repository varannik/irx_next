// Tremor Tracker [v0.1.3]

import React from "react"
import * as HoverCardPrimitives from "@radix-ui/react-hover-card"

import { cx } from "@/lib/utils"
import { recCatTrackTooltip } from "@/types/Forcasts"


function trackTooltipColor (value: number | null){
  if (value == null){
    return 'text-gray-500'
  } if (value > 0 ) {
    return 'text-red-500'
  } if (value < 0 ){
    return 'text-green-500'
  }
}



interface TrackerBlockProps {
  key?: string | number
  color: string
  tooltip: recCatTrackTooltip
  hoverEffect?: boolean
  defaultBackgroundColor?: string
}

const Block = ({
  color,
  tooltip,
  defaultBackgroundColor,
  hoverEffect,
}: TrackerBlockProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <HoverCardPrimitives.Root
      open={open}
      onOpenChange={setOpen}
      openDelay={0}
      closeDelay={0}
      tremor-id="tremor-raw"
    >
      <HoverCardPrimitives.Trigger onClick={() => setOpen(true)} asChild>
        <div className="size-full overflow-hidden px-[0.5px] transition first:rounded-l-[4px] first:pl-0 last:rounded-r-[4px] last:pr-0 sm:px-px">
          <div
            className={cx(
              "size-full rounded-[1px]",
              color || defaultBackgroundColor,
              hoverEffect ? "hover:opacity-50" : "",
            )}
          />
        </div>
      </HoverCardPrimitives.Trigger>
      <HoverCardPrimitives.Portal>
        <HoverCardPrimitives.Content
          sideOffset={10}
          side="top"
          align="center"
          avoidCollisions
          className={cx(
            // base
            "w-auto rounded-md px-2 py-1 text-sm shadow-md",
            // text color
            "text-gray-900",
            // background color
            " bg-bg-layer3",
          )}
        >
          <div className="grid grid-cols-3 text-gray-300  text-xs">
            <div className="col-span-2">
            <div >
              Date: 
            </div>
            <div >
              Actual Shift %:
            </div>
            <div>
                Forcasted Shift %:
            </div>
            </div>
            <div className="grid col-span-1">
              <div>
              {tooltip?.date}
              </div>
              <div>
              <span className={trackTooltipColor(tooltip["Actual Shift %"])}>
                {tooltip?.["Actual Shift %"]}%
              </span>
              </div>
              <div>
              <span className={trackTooltipColor(tooltip["Forcasted Shift %"])}>
              { tooltip?.["Forcasted Shift %"]}%
              </span>
              </div>
            </div>

          </div>
        </HoverCardPrimitives.Content>
      </HoverCardPrimitives.Portal>
    </HoverCardPrimitives.Root>
  )
}

Block.displayName = "Block"

interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackerBlockProps[]
  defaultBackgroundColor?: string
  hoverEffect?: boolean
}

const Tracker = React.forwardRef<HTMLDivElement, TrackerProps>(
  (
    {
      data = [],
      defaultBackgroundColor = "bg-gray-400",
      className,
      hoverEffect,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx("group flex h-8 w-full items-center", className)}
        {...props}
      >
        {data.map((props, index) => (
          <Block
            key={props.key ?? index}
            defaultBackgroundColor={defaultBackgroundColor}
            hoverEffect={hoverEffect}
            {...props}
          />
        ))}
      </div>
    )
  },
)

Tracker.displayName = "Tracker"

export  { Tracker, type TrackerBlockProps }