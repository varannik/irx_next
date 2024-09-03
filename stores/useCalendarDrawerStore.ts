import {create} from 'zustand';

// Define the DrawerOpen interface
interface CalendarDrawerOpen {
  openCalendar: boolean;
  setCalendarDrawerOpen: (openCalendar: boolean) => void;
}

// Create the Zustand store using the DrawerOpen interface
const useCalendarDrawerStore = create<CalendarDrawerOpen>((set) => ({
  openCalendar: false, // Initial state of the drawer
  setCalendarDrawerOpen: (openCalendar: boolean) => set({ openCalendar }), // Method to update the drawer state
}));

export default useCalendarDrawerStore;