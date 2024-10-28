// Tremor Card [v0.0.2]

import React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cx } from "@/lib/utils"

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div"
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          "relative rounded-lg border lg:border-none text-left shadow-sm  mx-auto min-w-80 max-w-96 lg:max-w-7xl items-center justify-between px-4 py-3.5",
          // background color
          "bg-[#090E1A]", 
          // border color
          "border-gray-900 ",
          className,
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    )
  },
)

Card.displayName = "Card"

export { Card, type CardProps }