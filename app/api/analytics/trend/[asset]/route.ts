import { NextRequest, NextResponse } from "next/server";
import { jwtMiddleware } from "@/utils/jwt";
import { trendSchemaValidation } from "./vl";
import { connectDB } from "@/utils/dbActions/db";
import Trend from "@/models/Trend"; // Adjust the path as necessary

export async function GET(request: NextRequest, { params }: { params: { asset:string}}) {
  const { asset} = params;
  try {
    // Connect to MongoDB
    await connectDB();
    const items = await Trend.findOne({ asset });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: "Data dosent exist" }, { status: 404 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { asset:string} }) {

  const checkSource = await jwtMiddleware(request);

  if (checkSource === "Authorized") {
    const { asset} = params;

    try {
      const json = await request.json();

      // Validate the data
      const validatedData = trendSchemaValidation.parse(json);

      // Connect to MongoDB
      await connectDB();
      // Delete if any data exist
      await Trend.deleteOne ({ asset });
      // Insert the validated data into MongoDB
      await Trend.create(validatedData);

      return NextResponse.json(
        { message: "Data saved successfully" },
        { status: 200 }
      );
    } catch (error) {
   
      console.error("Error saving data:", error);
      return NextResponse.json(
        { message: "Error saving data" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Unauthorized source" },
      { status: 401 }
    );
  }
}
