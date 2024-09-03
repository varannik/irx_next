import {create} from 'zustand';

// Define the DrawerOpen interface
interface ProfileDrawerOpen {
  openProfile: boolean;
  setProfileDrawerOpen: (openProfile: boolean) => void;
}

// Create the Zustand store using the DrawerOpen interface
const useProfileDrawerStore = create<ProfileDrawerOpen>((set) => ({
  openProfile: false, // Initial state of the drawer
  setProfileDrawerOpen: (openProfile: boolean) => set({ openProfile }), // Method to update the drawer state
}));

export default useProfileDrawerStore;