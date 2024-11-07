import { NextRequest, NextResponse } from 'next/server';
import clientPromise from "@/lib/gMangodb";

// Utility to get the MongoDB collection
const getCollection = async (collection:string) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  return db.collection(collection);
};

export async function GET(req: NextRequest, { params }: { params: { collection: string } }) {
    const { collection} = params;
  try {
    const c = await getCollection(collection);
    const Data = await c.find().toArray();
    return NextResponse.json(Data);
  } catch (error) {
    console.error(`Error fetching ${collection} Data`, error);
    return NextResponse.json({ error: `Failed to fetch ${collection} Data` }, { status: 500 });
  }
}