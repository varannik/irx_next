import { NextRequest, NextResponse } from 'next/server';
import { PredictSchemaVl } from './vl'
import { getCollection } from '@/utils/dbActions/getCollection';
import { ObjectId } from 'mongodb';
import { parseDate } from '@/utils/global/parseDate';



export async function GET(req: NextRequest, { params }: { params: { userId: string; submitDate: string }}) {
  const { userId, submitDate} = params;
try {

  const c = await getCollection('UserDailyPredicts');

  const startDate = new Date(`${parseDate(submitDate)}T00:00:00Z`)
  const endDate = new Date(`${parseDate(submitDate)}T23:59:59Z`)


  const query = { userId:new ObjectId(userId), submitDate: { $gte: startDate, $lt: endDate }}
  const prediction = await c.find(query).toArray();
  return NextResponse.json({ success: true, data: prediction }, { status: 200 });
} catch (error) {
  return NextResponse.json({ success: false, message: 'Failed to Search Prediction' }, { status: 400 });
}
}


export async function POST(req: NextRequest, { params }: { params: { userId: string; submitDate: string}}) {
  const { userId, submitDate } = params;
  try {
    // Validate the data
    const json = await req.json();
    const validatedData = PredictSchemaVl.parse(json);

    // Extract data from the request body
    const { selectedAsset, nextDayRate } = validatedData;

    const startDate = new Date(`${parseDate(submitDate)}T00:00:00Z`)
    const endDate = new Date(`${parseDate(submitDate)}T23:59:59Z`)
    

    const c = await getCollection('UserDailyPredicts');
    const query = { userId:new ObjectId(userId), submitDate:{ $gte: startDate, $lt: endDate }, selectedAsset}
    const prediction = await c.findOne(query);

    // check if prediction made by user
    if (prediction) {
      return NextResponse.json({ success: false, message: 'Prediction is already exist' }, { status: 404 });
    }
    // Create a new prediction document
    
    const newPredictionQuery = { userId:new ObjectId(userId), submitDate: parseDate(submitDate) , selectedAsset, nextDayRate}

    // Insert the document into the collection
    const result = await c.insertOne(newPredictionQuery);

    // Return a success response
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Prediction Failed to save in DB" }, { status: 500 });
  }
}


// PUT: Update a prediction by id and submitDate and asset
export async function PUT(req: NextRequest, { params }: { params: { userId: string; submitDate: string }}) {
  const { userId, submitDate} = params;
  try {
    // Validate the data
    const json = await req.json();
    const validatedData = PredictSchemaVl.parse(json);

    // Extract data from the request body
    const { selectedAsset, nextDayRate} = validatedData;

    const c = await getCollection('UserDailyPredicts');
    const query = { userId:new ObjectId(userId), submitDate: parseDate(submitDate), selectedAsset}
    const updatedPrediction = await c.findOneAndUpdate(query,
                                                      { $set: {nextDayRate} },
                                                      {returnDocument: 'after'});

    // check if prediction made by user
    if (!updatedPrediction) {
      return NextResponse.json({ success: false, message: 'Prediction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPrediction }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// // DELETE: Delete a prediction by id and submitDate
// export async function DELETE(req: NextRequest, { params }: { params: { id: string; date: string ,asset:string } }) {
//   try {
//     await connectDB();

//     const { id, date , asset} = params;
//     const refineDate = parseDate(date);


//     const deletedPrediction = await Predict.findOneAndDelete({ userId: id, submitDate:refineDate, selectedAsset: asset });
//     if (!deletedPrediction) {
//       return NextResponse.json({ success: false, message: 'Prediction not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: 'Prediction deleted successfully' }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ success: false, message: error.message }, { status: 400 });
//   }
// }