import clientPromise from "@/lib/gMangodb";
import { IScore } from "@/types/Score";


export async function getUserAssetScore() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB);
        const cl = db.collection('scores');
        const lastRecord= await cl.find().sort({ updateDate: -1 }).limit(1).toArray();


        if (lastRecord.length > 0) {
            return lastRecord
        }else {
            console.log('No records found.');
        }

    } catch (error) {
        console.error("Error replacing or inserting document:", error);
    }
  }

