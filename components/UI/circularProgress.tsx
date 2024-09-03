import React from "react";
import {CircularProgress} from "@nextui-org/react";

export default function RefreshWaiting({value}:{value:number}) {
  return (
    <CircularProgress
      aria-label='CircularProgress'
      size="lg"
      value={value}
      showValueLabel={true}
      classNames={{
        indicator:'stroke-gray-mid'
      }}
    />
  );
}