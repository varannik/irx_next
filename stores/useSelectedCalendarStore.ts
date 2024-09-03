import {create} from 'zustand';


const defaultCalendar = 'J'

type TCalendar = 'J'| 'G'

interface ISelectedCalendar {
  currentCalendar:TCalendar  ;
  setCurrentCalendar: (currentCalendar: TCalendar) => void;
}

const useSelectedCalendar = create<ISelectedCalendar>((set) => ({
  currentCalendar: defaultCalendar , // Initial state of Calendar
  setCurrentCalendar: (currentCalendar: TCalendar) => set({ currentCalendar }), // Method to update Current Calendar
}));

export default useSelectedCalendar;