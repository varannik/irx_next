import clientPromise from "@/lib/gMangodb";
import { IDayPredict, IDayPredictAsset, IUpdateAssetRequest, IUserHistoryPredict } from "@/types/HistPredict";


// Utility to get the MongoDB collection
export const getUserHistLastUpdate = async (userId:string)=> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  const cl = db.collection('HistPredicts');

  try{
    // Find the document with the matching userId
  const user = await cl.findOne({ userId });
    
    // Return the lastUpdate field, or handle if not found
    if (user) {
      return user.lastUpdate;
    } else {
      return 'No assets or lastUpdate found for the given userId.';
    }
  } catch (error) {
    console.error('Error retrieving lastUpdate:', error);
    throw error;
  } 
};


export async function sendHistUpdate(userData:IUpdateAssetRequest) {

  // Get request body
  const { userId, assetType, newData , date} = userData

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  const cl = db.collection('HistPredicts');


  // Find the user document
  const user = await cl.findOne({ userId });

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  // Find or create the asset entry
  let asset = user.assets.find((a:IDayPredictAsset) => a[assetType]);

  if (!asset) {
    asset = { [assetType]: [] };
    user.assets.push(asset);
  }

  // Check if the date already exists in the asset array
  const existingEntry = asset[assetType].find((entry: IDayPredict) => entry[date]);

  if (existingEntry) {
    // Update existing entry if found
    existingEntry[date] = newData;
  } else {
    // Otherwise, add the new entry
    asset[assetType].push({ [date]: newData });
  }

  // Update the lastUpdate field
  user.lastUpdate = date

  // Save the updated user document
  await cl.updateOne(
    { userId },
    { $set: { assets: user.assets, lastUpdate: user.lastUpdate } }
  );

  // Return updated document
  return new Response(JSON.stringify(user), { status: 200 });

}


// Function to insert the data
export async function insertFullData(userData:IUserHistoryPredict) {
  try {

      const client = await clientPromise;
      const db = client.db(process.env.MONGO_DB);
      const cl = db.collection('HistPredicts');
      
      const result = await cl.insertOne(userData);
      console.log("Document inserted with ID:", result.insertedId);
  } catch (error) {
      console.error("Error inserting document:", error);
  }
}