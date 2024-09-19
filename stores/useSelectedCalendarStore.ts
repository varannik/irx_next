import { Key } from 'react';
import {create} from 'zustand';

type IKey = Exclude<Key, bigint>

interface ISelectedCalendar {
  currentCalendar: IKey  ;
  setCurrentCalendar: (currentCalendar: IKey) => void;
}

const useSelectedCalendar = create<ISelectedCalendar>((set) => ({
  currentCalendar: 'J' , // Initial state of Calendar
  setCurrentCalendar: (currentCalendar: IKey) => set({ currentCalendar }), // Method to update Current Calendar
}));

export default useSelectedCalendar;