import clientPromise from "@/lib/gMangodb";


// Utility to get the MongoDB collection
export const getCollection = async (collection:string) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  return db.collection(collection);
};
