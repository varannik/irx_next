import { NextRequest, NextResponse } from 'next/server';
import clientPromise from "@/lib/gMangodb";
import { IAssetDays } from '@/types/DurationTrend';


// Utility to get the MongoDB collection
const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  return db.collection<IAssetDays[]>('trends');
};


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const collection = await getCollection();
    const trendData = await collection.find().toArray();
    return NextResponse.json(trendData);
  } catch (error) {
    console.error('Error fetching trend Data:', error);
    return NextResponse.json({ error: 'Failed to fetch trend Data' }, { status: 500 });
  }
}

