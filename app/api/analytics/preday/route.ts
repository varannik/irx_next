import { NextRequest, NextResponse } from 'next/server';
import { jwtMiddleware } from '@/utils/jwt';
import { vPreDayRateSchema } from './vl'
import { connectDB } from '@/utils/dbActions/db'
import PreDayRate from '@/models/PreDayRate';


export async function POST(request: NextRequest) {

  const checkSource = await jwtMiddleware(request)

  if (checkSource === 'Authorized') { 

  try {
    const json = await request.json();
    
    // Validate the data
    const validatedData = vPreDayRateSchema.parse(json);

    // Connect to MongoDB
    await connectDB();
    // Delete if any data exist
    await PreDayRate.deleteMany({})
    // Insert the validated data into MongoDB
    await PreDayRate.create(validatedData);

    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Error saving data'}, { status: 400 });
  }
}  else {
  return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
}
}