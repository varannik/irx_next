// Utility to get the MongoDB collection
import clientPromise from "@/lib/gMangodb";
import { IDayPredictAsset } from "@/types/HistPredict";


export const fetchHistoy = async (userId:string, limit:number) => {
  
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGO_DB);
      const cl = db.collection('HistPredicts');
      const passDays = new Date();
      passDays.setDate(passDays.getDate() - limit);
      const result  = await cl.findOne({userId})
      if (result!==null){
          const assets:IDayPredictAsset[] = result.assets
          const selectedDates = assets.map((element:IDayPredictAsset) => {
            const asset = Object.keys(element)[0];
            // Filter the data
            const filteredData = {
              [asset] : element[asset].filter((item) => {
                const dateKey = Object.keys(item)[0]; // Extract the date key
                const dateValue = new Date(dateKey); // Convert date string to Date object
                return dateValue >= passDays; // Keep dates within the last 10 days
              })
            };
            return filteredData
          });
          return selectedDates
      } else {
        return "user dosent exist"
      }
  } catch (error) {
      console.error("Error querying MongoDB:", error);
      return { error: "An error occurred while processing the query." };
  } 
  };
