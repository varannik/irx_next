import {create} from 'zustand';

// Define the DrawerOpen interface
interface HeaderDrawerOpen {
  openHeader: boolean;
  setHeaderOpen: (openHeader: boolean) => void;
}

// Create the Zustand store using the DrawerOpen interface
const useHeaderDrawerStore = create<HeaderDrawerOpen>((set) => ({
  openHeader: true, // Initial state of the drawer
  setHeaderOpen: (openHeader: boolean) => set({ openHeader }), // Method to update the drawer state
}));

export default useHeaderDrawerStore;