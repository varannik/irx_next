import { Document } from "mongoose";

// Define the interface for a single Rate entry
export interface IBBDay {
    date: string;
    Rate: number;
    Lower: number;
    Middle: number;
    Upper: number;
  }
  
  // Define the interface for the Moving Averages (MA3, MA5, MA10)
  export interface IBBMovs {
    [key: string]: IBBDay[];
  }
  
  // Define the main interface that extends Document for Mongoose
  export interface IBB  {
    bb: {
      [key: string]: IBBMovs;
    };
  }


  export type IBBAsset = IBB & Document