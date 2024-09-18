import {create} from 'zustand';

export type TCalendar = any

interface ISelectedCalendar {
  currentCalendar: TCalendar  ;
  setCurrentCalendar: (currentCalendar: TCalendar) => void;
}

const useSelectedCalendar = create<ISelectedCalendar>((set) => ({
  currentCalendar: 'J' , // Initial state of Calendar
  setCurrentCalendar: (currentCalendar: TCalendar) => set({ currentCalendar }), // Method to update Current Calendar
}));

export default useSelectedCalendar;