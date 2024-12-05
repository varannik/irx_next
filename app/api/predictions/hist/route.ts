import { fetchHistoy } from '@/utils/dbActions/historyActions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest){

    // Extract query parameters using the URL
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const limit = searchParams.get("limit");
  
    if (id!==null && limit!==null){
      const parsedIds = JSON.parse(id);
      const parsedLimit = parseInt(limit, 10);

      try{
          const data = await fetchHistoy(parsedIds,parsedLimit)


            return NextResponse.json({ message: `Histoty data for ids/ id ${parsedIds} fetched successfuly`, data: data}, { status: 200 });
          
          

      } catch(error){

        return NextResponse.json({ message: `Failed to fetch histoty data for ids/ id ${parsedIds}`}, { status: 400 });
      }

    } else {
      return NextResponse.json({ message: "ids or limit are not exist in url"}, { status: 400 });
    }

}

