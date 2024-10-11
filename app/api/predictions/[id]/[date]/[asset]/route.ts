import { NextRequest, NextResponse } from 'next/server';
import { jwtMiddleware } from '@/utils/jwt';
import { PredictSchemaVl } from './vl'
import { connectDB } from '@/utils/db'
import Predict  from '@/models/Predicts'; // Adjust the path as necessary

// Helper function to parse date string into Date object
const parseDate = (dateString: string) => {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date');
  }
  return parsedDate;
};


// GET: Fetch a prediction by id and submitDate
export async function GET(req: NextRequest, { params }: { params: { id: string; date: string , asset:string} }) {
  try {
    await connectDB();

    const { id, date, asset} = params;
    const refineDate = parseDate(date);

    const prediction = await Predict.findOne({ userId: id, submitDate: refineDate, selectedAsset:asset});
    if (!prediction) {
      return NextResponse.json({ success: false, message: 'Prediction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: prediction }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}



export async function POST(req: NextRequest, { params }: {  params: { id: string; date: string , asset:string}}) {
  try {
    await connectDB();

    const { id, date, asset} = params;
    const refineDate = parseDate(date);


    const json = await req.json();
    // Validate the data
    const validatedData = PredictSchemaVl.parse(json);

    // Extract data from the request body
    const { nextDay } = validatedData;


    // check if prediction made by user
    const prediction = await Predict.findOne({ userId: id, submitDate:refineDate, selectedAsset:asset });
    if (prediction) {
      return NextResponse.json({ success: false, message: 'Prediction is already exist' }, { status: 404 });
    }

    // Create a new prediction document
    const newPrediction = new Predict({
      userId:id,
      submitDate: new Date(refineDate), // Parse the date string
      selectedAsset:asset,
      nextDay
    });

    // Save to the database
    await newPrediction.save();

    // Return a success response
    return NextResponse.json({ success: true, data: newPrediction }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update a prediction by id and submitDate and asset
export async function PUT(req: NextRequest, { params }: { params: { id: string; date: string ,asset:string } }) {
  try {
    await connectDB();

    const { id, date , asset} = params;
    const refineDate = parseDate(date);

    const json = await req.json();
    // Validate the data
    const validatedData = PredictSchemaVl.parse(json);

    const updatedPrediction = await Predict.findOneAndUpdate(
      { userId: id, submitDate:refineDate, selectedAsset: asset},
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPrediction) {
      return NextResponse.json({ success: false, message: 'Prediction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPrediction }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// DELETE: Delete a prediction by id and submitDate
export async function DELETE(req: NextRequest, { params }: { params: { id: string; date: string ,asset:string } }) {
  try {
    await connectDB();

    const { id, date , asset} = params;
    const refineDate = parseDate(date);


    const deletedPrediction = await Predict.findOneAndDelete({ userId: id, submitDate:refineDate, selectedAsset: asset });
    if (!deletedPrediction) {
      return NextResponse.json({ success: false, message: 'Prediction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Prediction deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}