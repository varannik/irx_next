// app/api/maxmin/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { jwtMiddleware } from '@/utils/jwt';
import { vScoreSchema  } from './vl'
import { connectDB } from '@/utils/dbActions/db'
import Score from '@/models/Score';



export async function POST(req: NextRequest) {

  const checkSource = await jwtMiddleware(req)

  if (checkSource === 'Authorized') { 

    try {
      const json = await req.json();
      
      // Validate the data
      const validatedData = vScoreSchema.parse(json);
      
      const { updateDate, assets } = validatedData

      // Connect to MongoDB
      connectDB();

      // Check if a Score with the same updateDate already exists
      const existingScore = await Score.findOne({ updateDate });

      if (existingScore) {
        // If the object exists, update it
        existingScore.assets = assets; // Replace with new assets
        await existingScore.save();
        return NextResponse.json({ message: 'Score updated successfully', success: true });
      } else {
        // If the object does not exist, create a new one
        const newScore = new Score({ updateDate, assets });
        await newScore.save();
        return NextResponse.json({ message: 'Score added successfully', success: true });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to process the request', success: false }, { status: 500 });
    }

  } else {
    return NextResponse.json({ message: 'Unauthorized source' }, { status: 401 });
  }
}