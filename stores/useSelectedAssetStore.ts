import { IAsset } from '@/types/Assets';
import {create} from 'zustand';

const defaultAsset = {'name': 'US Dollar', 'info': {'COUNTRY_NAME': 'United States of America', 'ALPHA_2': 'US', 'ALPHA_3': 'USA', 'NUMERIC': 840.0}}

interface ISelectedAsset {
  currentAsset: IAsset;
  setCurrentAsset: (currentAsset: IAsset) => void;
}

const useSelectedAsset = create<ISelectedAsset>((set) => ({
    currentAsset: defaultAsset , // Initial state of Asset
    setCurrentAsset: (currentAsset: IAsset) => set({ currentAsset }), // Method to update Current Asset
}));

export default useSelectedAsset;