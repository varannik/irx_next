import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/utils/dbActions/getCollection';


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