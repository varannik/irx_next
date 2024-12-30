"use server";

import { authOptions } from "@/utils/auth";
import { getCollection } from "@/utils/dbActions/getCollection";
import { getSubmitionDate } from "@/utils/global/currentday";

import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";


interface query {
  userId :ObjectId,
  submitDate: Date,
  selectedAsset: string,
}

const c = await getCollection('UserDailyPredicts');

async function handleCreate(query:query, nextDayRate:number){
  const post = { ...query, nextDayRate };
  try {
  const result = await c.insertOne(post);

  if (result.acknowledged) {
    return { success: true, insertedId: result.insertedId };
  } else {
    return { success: false, message: 'Failed to insert document' };
  }
} catch (error) {
  console.error('Error inserting data:', error);
  return { success: false, message: 'Error inserting data' };
}
}

async function handleUpdate(query:query, nextDayRate:number){

  try {
  const result = await c.updateOne(
    query, 
    { $set: {nextDayRate} } 
  );

  if (result.matchedCount > 0) {
    return { success: true, updatedCount: result.modifiedCount };
  } else {
    return { success: false, message: 'No matching document found' };
  }

} catch (error) {
  console.error('Error updating data:', error);
  return { success: false, message: 'Error updating data' };
}
}

async function handleDelete(query:query){


    const startDate = new Date(`${getSubmitionDate()}T00:00:00Z`)
    const endDate = new Date(`${getSubmitionDate()}T23:59:59Z`)
  
  
    const queryref = { userId:query.userId, submitDate: { $gte: startDate, $lt: endDate }, selectedAsset:query.selectedAsset}
    console.log(queryref)
  try {
  const result = await c.deleteMany(queryref);

  if (result.deletedCount > 0) {
    return { success: true, deletedCount: result.deletedCount };
  } else {
    console.log('No document found to delete')
    return { success: false, message: 'No document found to delete' };
  }
} catch (error) {
  console.error('Error deleting data:', error);
  return { success: false, message: 'Error deleting data' };
}
}


export async function forcastAction( {submitDate,
                                      selectedAsset,
                                      nextDayRate,
                                      action}:{
                                        submitDate:Date,
                                        selectedAsset:string,
                                        nextDayRate:number,
                                        action:string
                                      }
                                    ) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = new ObjectId(session.user.id);
  const query:query = { userId , submitDate, selectedAsset}

  switch (action) {
    case "CREATE":
      return await handleCreate(query, nextDayRate);
    case "UPDATE":
      return await handleUpdate(query, nextDayRate);
    case "DELETE":
      return await handleDelete(query);
    default:
      console.log("Invalid action.");
  }
}



