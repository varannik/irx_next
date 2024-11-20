import { NextRequest, NextResponse } from 'next/server';
import { jwtMiddleware } from '@/utils/jwt';
import { vGenDayPredictionsSchema } from './vl';
import { insertGenData } from '@/utils/updateGenPredicts';



export async function POST(req:NextRequest){

  const checkSource = await jwtMiddleware(req)

  if (checkSource === 'Authorized') {
      try {

    const json = await req.json();
    // Validate the data
    const validatedData = vGenDayPredictionsSchema.parse(json);
    const lastUpdate = await insertGenData(validatedData)

    return NextResponse.json({ success: true, data: lastUpdate }, { status: 200 });
      } catch(error){
        return NextResponse.json({ success: false, message: error }, { status: 400 });
      }
  } else {
    return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
  }

}
