import { IKey } from "@/stores/useSelectedCalendarStore";

export const IndexCurrentCalendar = (key: IKey): 'G' | 'J' => {
    if (key === 'J') {
      return 'J';  // Valid return value
    } else if (key === 'G') {
      return 'G';  // Valid return value
    } else {
      throw new Error("Invalid key. Only 'J' or 'G' are allowed.")
  }}


  export const IndexRange = (key: null | number | number[]): number => {
    if ( typeof key === 'number') {
      return key
    } 
    if (key == null ) {
      console.log('Index must be a singular number');
      return 0
    }
    else {
      return key[0]
    }

    
  }

