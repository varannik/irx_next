import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/utils/dbActions/getCollection';
import { parseDate } from '@/utils/global/parseDate';
import { jwtMiddleware } from '@/utils/jwt';



export async function GET(req: NextRequest, { params }: { params: { submitDate: string }}) {

  const checkSource = await jwtMiddleware(req)

  if (checkSource === 'Authorized') { 
  
        const {submitDate} = params;
      try {
        const c = await getCollection('UserDailyPredicts');

        const startDate = new Date(`${parseDate(submitDate)}T00:00:00Z`)
        const endDate = new Date(`${parseDate(submitDate)}T23:59:59Z`)

        const query = {submitDate:{ $gte: startDate, $lt: endDate }}
        const prediction = await c.find(query).toArray();
        return NextResponse.json({ success: true, data: prediction }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to Search Prediction' }, { status: 400 });
      }
} else {
  return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
}
}
