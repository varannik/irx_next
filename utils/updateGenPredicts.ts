import clientPromise from "@/lib/gMangodb";
import { IGenDayPredictions } from "@/types/EnsemblePredictions";

// Function to insert the data
export async function insertGenData(genData:IGenDayPredictions) {
    try {
  
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB);
        const cl = db.collection('GenDailyPredicts');
        
        // Query to match the document by `date`
        const query = { date: genData.date };
        
    // Replace the entire document or insert if it doesn't exist
    const result = await cl.replaceOne(query, genData, { upsert: true });

        if (result.matchedCount > 0) {
        console.log(
            `Document with date "${genData.date}" was replaced.`
        );
        } else if (result.upsertedCount > 0) {
        console.log(
            `No document with date "${genData.date}" existed. Inserted new document.`
        );
        }
    } catch (error) {
        console.error("Error replacing or inserting document:", error);
    }
  }



