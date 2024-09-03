import {create} from 'zustand';

// Define the DrawerOpen interface
interface AssetDrawerOpen {
  openAsset: boolean;
  setAssetDrawerOpen: (openAsset: boolean) => void;
}

// Create the Zustand store using the DrawerOpen interface
const useAssetDrawerStore = create<AssetDrawerOpen>((set) => ({
  openAsset: false, // Initial state of the drawer
  setAssetDrawerOpen: (openAsset: boolean) => set({ openAsset }), // Method to update the drawer state
}));

export default useAssetDrawerStore;