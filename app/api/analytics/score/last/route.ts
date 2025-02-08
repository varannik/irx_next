import { NextRequest, NextResponse } from 'next/server';
import { getUserAssetScore } from '@/utils/dbActions/getUserAssetScore';


export async function GET(req: NextRequest) {

  try {
    const c = await getUserAssetScore();
    return NextResponse.json(c);
  } catch (error) {
    console.error(`Error fetching score `, error);
    return NextResponse.json({ error: `Failed to fetch score` }, { status: 500 });
  }
}