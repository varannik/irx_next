
import { NextRequest, NextResponse } from 'next/server';
import { jwtMiddleware } from '@/utils/jwt';
import { vGetLastUpdate, vUpdateAssetRequestSchema, vUserHistoryPredictSchema } from './vl'
import { getUserHistLastUpdate, insertFullData, sendHistUpdate } from '@/utils/updateUserHist';


export async function GET(req:NextRequest){

  const checkSource = await jwtMiddleware(req)

  if (checkSource === 'Authorized') {
    try {
      // Extract query parameters using the URL
      const { searchParams } = new URL(req.url);

      // Example: Get specific parameters
      const userId = searchParams.get('userId');

      // Validate the data
      const validatedData = vGetLastUpdate.parse(userId);
      const lastUpdate = await getUserHistLastUpdate(validatedData)
      return NextResponse.json({ success: true, data: lastUpdate }, { status: 200 });
      }
     catch{
      return NextResponse.json({ success: false, message: 'User Id dosent exist' }, { status: 400 });
    }
} else {
  return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
}
}

export async function POST(req:NextRequest){

  const checkSource = await jwtMiddleware(req)

  if (checkSource === 'Authorized') {
      try {

    const json = await req.json();
    // Validate the data
    const validatedData = vUserHistoryPredictSchema.parse(json);
    const lastUpdate = await insertFullData(validatedData)

    return NextResponse.json({ success: true, data: lastUpdate }, { status: 200 });
      } catch(error){
        return NextResponse.json({ success: false, message: error }, { status: 400 });
      }
  } else {
    return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
  }

}


export async function PUT(req:NextRequest){

  const checkSource = await jwtMiddleware(req)

  if (checkSource === 'Authorized') {
      try {

    const json = await req.json();
    // Validate the data
    const validatedData = vUpdateAssetRequestSchema.parse(json);
    const lastUpdate = await sendHistUpdate(validatedData)

    return NextResponse.json({ success: true, data: lastUpdate }, { status: 200 });
      } catch(error){
        return NextResponse.json({ success: false, message: error }, { status: 400 });
      }
  } else {
    return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
  }

}

