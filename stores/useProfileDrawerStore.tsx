
import {create} from 'zustand';

// Define the DrawerOpen interface
interface ProfileDrawerOpen {
  open: boolean;
  setProfileDrawerOpen: (open: boolean) => void;
}

// Create the Zustand store using the DrawerOpen interface
const useProfileDrawerStore = create<ProfileDrawerOpen>((set) => ({
  open: false, // Initial state of the drawer
  setProfileDrawerOpen: (open: boolean) => set({ open }), // Method to update the drawer state
}));

export default useProfileDrawerStore;