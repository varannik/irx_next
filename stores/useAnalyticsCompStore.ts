import {create} from 'zustand';

// Define the DrawerOpen interface
interface ICurrentComp {
  currentComp: string;
  setcurrentComp: (currentComp: string) => void;
}

// Create the Zustand store using the DrawerOpen interface
const useAnalyticsCompStore = create<ICurrentComp>((set) => ({
  currentComp: 'MaxMinGauge', // Initial state of the drawer
  setcurrentComp: (currentComp: string) => set({ currentComp }), // Method to update the drawer state
}));

export default useAnalyticsCompStore;