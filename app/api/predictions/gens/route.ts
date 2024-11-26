import { NextRequest, NextResponse } from 'next/server';
import { jwtMiddleware } from '@/utils/jwt';
import { vGenDayPredictionsSchema } from './vl';
import { getGenData, insertGenData } from '@/utils/dbActions/updateGenPredicts';
import { isValidDate } from '@/utils/global/dateValidation';


export async function GET(req:NextRequest){

  // const checkSource = await jwtMiddleware(req)
  // if (checkSource === 'Authorized') {

    // Extract query parameters using the URL
    const { searchParams } = new URL(req.url);

    // Example: Get specific parameters
    const date = searchParams.get('date');

    if (isValidDate(date)){
      try {
        const genData = await getGenData(date)
    
        return NextResponse.json({ success: true, data: genData }, { status: 200 });
          } catch(error){
            return NextResponse.json({ success: false, message: error }, { status: 400 });
          }
    } else {
      return NextResponse.json({ success: false, message: "Wrong date requested" }, { status: 400 });
    }
  // } else {
  //   return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
  // }

}


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
