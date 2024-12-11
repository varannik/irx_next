import { NextRequest, NextResponse } from 'next/server';
import { jwtMiddleware } from '@/utils/jwt';
import { AssetCollectionSchemaVal } from './vl'
import { connectDB } from '@/utils/dbActions/db'
import Country  from '@/models/Countries'; // Adjust the path as necessary


export async function GET(request:NextRequest) {

  try {
    // Connect to MongoDB
    await connectDB();
    const items = await Country.find({})

    return NextResponse.json(items);
  } catch(error)  {
    return NextResponse.json({ message: 'Data dosent exist'}, { status: 404 });
  }
  
}1


export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    
    // Validate the data
    const validatedData = AssetCollectionSchemaVal.parse(json);

    // Connect to MongoDB
    await connectDB();
    // Delete if any data exist
    await Country.deleteMany({})
    // Insert the validated data into MongoDB
    await Country.create(validatedData);

    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Error saving data'}, { status: 400 });
  }
}


export async function PUT(req: NextRequest) {

  const checkSource = await jwtMiddleware(req)

  if (checkSource === 'Authorized') { 

    try {
      const json = req.json();
      
      // Validate the data
      const validatedData = AssetCollectionSchemaVal.parse(json);

      // Connect to MongoDB
      connectDB();
      // Update the validated data into MongoDB
      Country.updateOne({}, validatedData);
  
      return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error updating data:', error);
      return NextResponse.json({ message: 'Error updating data'}, { status: 400 });
    }

  } else {
    return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
  }
}




