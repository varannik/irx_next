import {create} from 'zustand';
import { connectDB } from '@/utils/db'
import CurrentRate  from '@/models/CurrentRate'; // Adjust the path as necessary


interface ISelectedAsset {
  currentAsset: string;
  setCurrentAsset: (currentAsset: string) => void;
}

const useSelectedAsset = create<ISelectedAsset>((set) => ({
    currentAsset: 'US', // Initial state of Asset
    setCurrentAsset: (currentAsset: string) => set({ currentAsset }), // Method to update Current Asset
}));

export default useSelectedAsset;