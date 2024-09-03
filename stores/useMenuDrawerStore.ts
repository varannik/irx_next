import {create} from 'zustand';

// Define the DrawerOpen interface
interface MenuDrawerOpen {
  openMenu: boolean;
  setMenuDrawerOpen: (openMenu: boolean) => void;
}

// Create the Zustand store using the DrawerOpen interface
const useMenuDrawerStore = create<MenuDrawerOpen>((set) => ({
  openMenu: false, // Initial state of the drawer
  setMenuDrawerOpen: (openMenu: boolean) => set({ openMenu }), // Method to update the drawer state
}));

export default useMenuDrawerStore;