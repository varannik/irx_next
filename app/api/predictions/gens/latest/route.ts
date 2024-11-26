import { NextRequest, NextResponse } from "next/server";
import { jwtMiddleware } from "@/utils/jwt";
import { getLatesUpdate } from "@/utils/dbActions/updateGenPredicts";


export async function GET(req: NextRequest) {
  const checkSource = await jwtMiddleware(req);
  if (checkSource === "Authorized") {

    try {

      const latestDate = await getLatesUpdate()
      console.log(latestDate)
      return NextResponse.json(
        { success: true, data: latestDate },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error },
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
